import URL from '../models/urlModel.js';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';
import geoip from 'geoip-lite';

export const createShortURL = async (req, res) => {
  const { originalUrl, customUrl, password, expirationDate } = req.body;
  try {
    const shortUrl = customUrl ? customUrl : shortid.generate();

    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newUrl = new URL({
      originalUrl,
      shortUrl,
      expirationDate,
      password: hashedPassword, 
      createdBy: req.user ? req.user._id : null, 
    });

    await newUrl.save();

    res.status(201).json({ shortUrl: newUrl.shortUrl, qrCode: newUrl.qrCode });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const redirectShortURL = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.isUrlExpired()) {
      return res.status(410).json({ message: 'This URL has expired' });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    url.clickStats.totalClicks += 1;
    if (!url.clickStats.clickDetails.some((detail) => detail.ip === ip)) {
      url.clickStats.uniqueClicks += 1;
    }

    url.clickStats.clickDetails.push({
      ip,
      location: geo ? `${geo.city}, ${geo.country}` : 'Unknown',
      timestamp: new Date(),
    });

    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getURLAnalytics = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Check if the user is authorized to view analytics (only the creator can view them)
    // if (!req.user || !url.createdBy.equals(req.user._id)) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    res.status(200).json({
      totalClicks: url.clickStats.totalClicks,
      uniqueClicks: url.clickStats.uniqueClicks,
      clickDetails: url.clickStats.clickDetails,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const accessPasswordProtectedURL = async (req, res) => {
  const { shortUrl } = req.params;
  const { password } = req.body;

  try {
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    if (url.password) {
      const isMatch = await bcrypt.compare(password, url.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    url.clickStats.totalClicks += 1;
    if (!url.clickStats.clickDetails.some((detail) => detail.ip === ip)) {
      url.clickStats.uniqueClicks += 1;
    }

    url.clickStats.clickDetails.push({
      ip,
      location: geo ? `${geo.city}, ${geo.country}` : 'Unknown',
      timestamp: new Date(),
    });

    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
