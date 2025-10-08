const express = require('express');
const { db, verifyPassword } = require('../database');
const { createAccessToken, requireAuth } = require('../auth');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    const user = await db.getAdminUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const passwordValid = await verifyPassword(password, user.password_hash);
    
    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        error: 'Account is disabled'
      });
    }

    await db.updateAdminLastLogin(user.id);

    const token = createAccessToken({
      userId: user.id,
      username: user.username
    });

    res.json({
      success: true,
      data: {
        access_token: token,
        token_type: 'bearer',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// Get all contact forms (protected)
router.get('/contact-forms', requireAuth, async (req, res) => {
  try {
    const contactForms = await db.getAllContactForms();
    res.json({
      success: true,
      data: contactForms
    });
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact forms'
    });
  }
});

// Mark contact form as read (protected)
router.patch('/contact-forms/:id/read', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const success = await db.markContactFormAsRead(id);
    
    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to mark message as read'
      });
    }

    res.json({
      success: true,
      data: { message: 'Message marked as read' }
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark message as read'
    });
  }
});

// Get all announcements (protected)
router.get('/announcements', requireAuth, async (req, res) => {
  try {
    const announcements = await db.getAllAnnouncements();
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

// Create announcement (protected)
router.post('/announcements', requireAuth, async (req, res) => {
  try {
    const { title, content, date, icon } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const announcement = await db.createAnnouncement({
      title,
      content,
      date: date || new Date().toISOString().split('T')[0], // Use provided date or current date
      icon: icon || 'Megaphone' // Use provided icon or default
    });

    if (!announcement) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create announcement'
      });
    }

    res.status(201).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create announcement'
    });
  }
});

// Update announcement (protected)
router.put('/announcements/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date, icon } = req.body;

    const announcement = await db.updateAnnouncement(id, {
      title,
      content,
      date,
      icon
    });

    if (!announcement) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update announcement'
      });
    }

    res.json({
      success: true,
      data: announcement
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update announcement'
    });
  }
});

// Delete announcement (protected)
router.delete('/announcements/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const success = await db.deleteAnnouncement(id);

    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete announcement'
      });
    }

    res.json({
      success: true,
      data: { message: 'Announcement deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete announcement'
    });
  }
});

// Events endpoints (protected)
router.get('/events', requireAuth, async (req, res) => {
  try {
    const events = await db.getAllEvents();
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

router.post('/events', requireAuth, async (req, res) => {
  try {
    const { title, description, date, time, location, category, registration_required, contact_info, gallery_folder_url } = req.body;

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({
        success: false,
        error: 'Title, description, date, time, and location are required'
      });
    }

    const event = await db.createEvent({
      title,
      description,
      date,
      time,
      location,
      category: category || null,
      registration_required: registration_required || false,
      contact_info: contact_info || null,
      gallery_folder_url: gallery_folder_url || null
    });

    if (!event) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create event'
      });
    }

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create event'
    });
  }
});

router.put('/events/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, category, registration_required, contact_info, gallery_folder_url } = req.body;

    const event = await db.updateEvent(id, {
      title,
      description,
      date,
      time,
      location,
      category,
      registration_required,
      contact_info,
      gallery_folder_url
    });

    if (!event) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update event'
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update event'
    });
  }
});

router.delete('/events/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const success = await db.deleteEvent(id);

    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete event'
      });
    }

    res.json({
      success: true,
      data: { message: 'Event deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete event'
    });
  }
});

// Media endpoints (protected)
router.get('/media', requireAuth, async (req, res) => {
  try {
    const media = await db.getAllMedia();
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

router.post('/media', requireAuth, async (req, res) => {
  try {
    const { title, name, date, description, video_url, audio_url, scripture, series, duration } = req.body;

    if (!title || !name || !date) {
      return res.status(400).json({
        success: false,
        error: 'Title, name, and date are required'
      });
    }

    const media = await db.createMedia({
      title,
      name,
      date,
      description: description || '',
      video_url: video_url || null,
      audio_url: audio_url || null,
      scripture: scripture || null,
      series: series || null,
      duration: duration || null
    });

    if (!media) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create media'
      });
    }

    res.status(201).json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Error creating media:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create media'
    });
  }
});

router.put('/media/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name, date, description, video_url, audio_url, scripture, series, duration } = req.body;

    const media = await db.updateMedia(id, {
      title,
      name,
      date,
      description,
      video_url,
      audio_url,
      scripture,
      series,
      duration
    });

    if (!media) {
      return res.status(500).json({
        success: false,
        error: 'Failed to update media'
      });
    }

    res.json({
      success: true,
      data: media
    });
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update media'
    });
  }
});

router.delete('/media/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const success = await db.deleteMedia(id);

    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to delete media'
      });
    }

    res.json({
      success: true,
      data: { message: 'Media deleted successfully' }
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete media'
    });
  }
});

module.exports = router;
