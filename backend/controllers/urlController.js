const generateShortId = require('../utils/generateShortId');
const Url = require("../models/Url");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

// CREATE SHORT URL
exports.createShortUrl = async (req, res) => {
  const { longUrl, customAlias, expiryDate } = req.body;

  try {
    if (!longUrl) {
      return res.status(400).json("Long URL required");
    }

    let shortId;

    if (customAlias && customAlias.trim() !== "") {
      const existing = await Url.findOne({ shortId: customAlias });
      if (existing) {
        return res.status(400).json("Alias already taken");
      }
      shortId = customAlias;
    } else {
      let isUnique = false;
      while (!isUnique) {
        shortId = generateShortId();
        const existing = await Url.findOne({ shortId });
        if (!existing) isUnique = true;
      }
    }

    const newUrl = new Url({
      longUrl,
      shortId,
      customAlias: customAlias || null,
      expiryDate: expiryDate || null,
      userId: req.user ? req.user.id : null,
    });

    await newUrl.save();

    return res.json({ shortUrl: `${BASE_URL}/${shortId}` });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json("Server error");
  }
};

// GET ALL URLS
exports.getAllUrls = async (req, res) => {
  try {
    let urls;
    if (req.user) {
      urls = await Url.find({ userId: req.user.id }).sort({ createdAt: -1 });
    } else {
      urls = await Url.find().sort({ createdAt: -1 });
    }
    res.json(urls);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

// DELETE URL
exports.deleteUrl = async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json("URL not found");
    }

    // Only allow the owner to delete
    if (url.userId.toString() !== req.user.id) {
      return res.status(403).json("Not authorized");
    }

    await Url.findByIdAndDelete(req.params.id);
    res.json("URL deleted");

  } catch (err) {
    res.status(500).json("Server error");
  }
};

// REDIRECT
exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (!url) {
      return res.status(404).json("URL not found");
    }

    if (url.expiryDate && new Date() > url.expiryDate) {
      return res.status(400).json("Link expired");
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json("Server error");
  }
};