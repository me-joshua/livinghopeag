const express = require('express');
const { db } = require('../database');
const { exec } = require('child_process');
const { promisify } = require('util');
const https = require('https');
const http = require('http');
const ytdl = require('ytdl-core');

const execPromise = promisify(exec);
const router = express.Router();

// Get active announcements (public)
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await db.getActiveAnnouncements();
    res.json({
      success: true,
      data: announcements
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch announcements'
    });
  }
});

// Get active events (public)
router.get('/events', async (req, res) => {
  try {
    const events = await db.getActiveEvents();
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events'
    });
  }
});

// Get single event by ID (public)
router.get('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await db.getEventById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event'
    });
  }
});

// Get active media (public)
router.get('/media', async (req, res) => {
  try {
    const media = await db.getActiveMedia();
    res.json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch media'
    });
  }
});

// Get church info (public)
router.get('/church-info', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        name: 'Living Hope AG',
        address: 'Your Church Address',
        phone: 'Your Church Phone',
        email: 'contact@livinghopeag.com',
        serviceTime: 'Sunday 10:00 AM',
        description: 'A welcoming community of faith'
      }
    });
  } catch (error) {
    console.error('Error fetching church info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch church info'
    });
  }
});

// Submit contact form (public)
router.post('/contact', async (req, res) => {
  try {
    const { fullname, email, phone, countrycode, subject, message, contact_permission } = req.body;

    if (!fullname || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email, subject, and message are required'
      });
    }

    const contactForm = await db.createContactForm({
      fullname,
      email,
      phone: phone || null,
      countrycode: countrycode || '+968',
      subject,
      message,
      contact_permission: contact_permission || false
    });

    if (!contactForm) {
      return res.status(500).json({
        success: false,
        error: 'Failed to submit contact form'
      });
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Contact form submitted successfully'
      }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    });
  }
});

// Extract YouTube video metadata (public)
router.post('/extract-youtube', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube URL'
      });
    }

    // Use ytdl-core to extract video metadata
    const videoInfo = await ytdl.getBasicInfo(url);
    const details = videoInfo.videoDetails;

    // Extract the first line of description
    const description = details.description || '';
    const firstLineDescription = description.split('\n')[0].trim();

    // Format duration (convert seconds to HH:MM:SS or MM:SS)
    const durationSeconds = parseInt(details.lengthSeconds) || 0;
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = Math.floor(durationSeconds % 60);
    
    let formattedDuration;
    if (hours > 0) {
      formattedDuration = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Format upload date
    const uploadDate = details.publishDate || details.uploadDate || '';
    const formattedDate = uploadDate ? new Date(uploadDate).toISOString().split('T')[0] : '';

    res.json({
      success: true,
      data: {
        title: details.title || '',
        description: firstLineDescription,
        date: formattedDate,
        duration: formattedDuration
      }
    });
  } catch (error) {
    console.error('Error extracting YouTube metadata:', error);
    
    // Check for common ytdl-core errors
    if (error.message.includes('Video unavailable')) {
      return res.status(404).json({
        success: false,
        error: 'Video is unavailable or private'
      });
    }
    
    if (error.message.includes('Invalid URL')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube URL format'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to extract video metadata'
    });
  }
});

// Resolve shortened Google Maps URLs to get full URL with coordinates
router.post('/resolve-map-url', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Check if it's a shortened URL
    const isShortenedUrl = url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps');
    
    if (!isShortenedUrl) {
      return res.json({
        success: true,
        data: { resolvedUrl: url }
      });
    }

    // Follow redirects to get the final URL
    const resolvedUrl = await new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      
      const request = protocol.get(url, (response) => {
        // Follow redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          resolve(response.headers.location);
        } else {
          resolve(url);
        }
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.setTimeout(10000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });

    if (!resolvedUrl || resolvedUrl === url) {
      return res.status(500).json({
        success: false,
        error: 'Failed to resolve shortened URL'
      });
    }

    res.json({
      success: true,
      data: { resolvedUrl }
    });
  } catch (error) {
    console.error('Error resolving map URL:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resolve map URL'
    });
  }
});

// Get event gallery files from Google Drive folder
router.get('/events/:id/gallery', async (req, res) => {
  try {
    const { id } = req.params;
    const event = await db.getEventById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    if (!event.gallery_folder_url) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Extract folder ID from the Google Drive URL
    const extractFolderId = (url) => {
      if (!url) return null;
      if (/^[\w-]{25,33}$/.test(url)) return url;
      const folderMatch = url.match(/\/folders\/([\w-]{25,33})/);
      if (folderMatch) return folderMatch[1];
      const uFolderMatch = url.match(/\/u\/\d+\/folders\/([\w-]{25,33})/);
      if (uFolderMatch) return uFolderMatch[1];
      return null;
    };

    const folderId = extractFolderId(event.gallery_folder_url);
    
    if (!folderId) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Google Drive folder URL'
      });
    }

    // Use Google Drive API to fetch files
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Google Drive API key not configured'
      });
    }

    // Fetch files from the folder using HTTPS module
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&key=${apiKey}`;
    
    const driveData = await new Promise((resolve, reject) => {
      https.get(apiUrl, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (response.statusCode === 200) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.error?.message || 'Failed to fetch gallery files'));
            }
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });

    // Filter and format files
    const files = (driveData.files || [])
      .filter(file => {
        const isImage = file.mimeType?.startsWith('image/');
        const isVideo = file.mimeType?.startsWith('video/');
        return isImage || isVideo;
      })
      .map(file => ({
        id: file.id,
        name: file.name,
        type: file.mimeType?.startsWith('image/') ? 'image' : 'video',
        mimeType: file.mimeType,
        // Use public thumbnail endpoint that works without authentication
        thumbnail: `https://drive.google.com/thumbnail?sz=w400&id=${file.id}`,
        // Multiple URL options for better fallback  
        url: `https://lh3.googleusercontent.com/d/${file.id}=w1920-h1080-rw`,
        // Alternative URLs for fallback
        fallbackUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
        previewUrl: file.mimeType?.startsWith('video/') 
          ? `https://drive.google.com/file/d/${file.id}/preview`
          : `https://lh3.googleusercontent.com/d/${file.id}=w1920-h1080-rw`
      }));

    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    console.error('Error fetching event gallery:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event gallery'
    });
  }
});

module.exports = router;
