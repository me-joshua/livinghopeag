const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Supabase client
let supabase = null;

function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn('⚠️ Supabase credentials not found');
      return null;
    }
    
    console.log('🔄 Connecting to Supabase...');
    supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Supabase connection established!');
  }
  
  return supabase;
}

// Database operations class
class SupabaseDB {
  constructor() {
    this.client = null;
  }

  getClient() {
    if (!this.client) {
      this.client = getSupabaseClient();
    }
    return this.client;
  }

  // Admin Users
  async getAdminUserByUsername(username) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        console.error('Error getting admin user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting admin user:', error);
      return null;
    }
  }

  async updateAdminLastLogin(userId) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating admin last login:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating admin last login:', error);
      return null;
    }
  }

  // Contact Forms
  async getAllContactForms() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting contact forms:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting contact forms:', error);
      return [];
    }
  }

  async createContactForm(formData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const data = {
        id: uuidv4(),
        ...formData,
        isread: false,
        created_at: new Date().toISOString()
      };

      const { data: result, error } = await client
        .from('contact_forms')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('Error creating contact form:', error);
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error creating contact form:', error);
      return null;
    }
  }

  async markContactFormAsRead(id) {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client
        .from('contact_forms')
        .update({ isread: true })
        .eq('id', id);

      if (error) {
        console.error('Error marking contact form as read:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error marking contact form as read:', error);
      return false;
    }
  }

  // Events
  async getAllEvents() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('events')
        .select('*')
        .order('created_at', { ascending: false});

      if (error) {
        console.error('Error getting events:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  }

  async getEventById(id) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error getting event by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting event by ID:', error);
      return null;
    }
  }

  async getActiveEvents() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error getting active events:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting active events:', error);
      return [];
    }
  }

  async createEvent(eventData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const data = {
        id: uuidv4(),
        ...eventData,
        created_at: new Date().toISOString()
      };

      const { data: result, error } = await client
        .from('events')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  async updateEvent(id, eventData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating event:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  }

  async deleteEvent(id) {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting event:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }

  // Announcements
  async getAllAnnouncements() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting announcements:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting announcements:', error);
      return [];
    }
  }

  async getActiveAnnouncements() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting active announcements:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting active announcements:', error);
      return [];
    }
  }

  async createAnnouncement(announcementData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const data = {
        id: uuidv4(),
        ...announcementData,
        created_at: new Date().toISOString()
      };

      const { data: result, error } = await client
        .from('announcements')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('Error creating announcement:', error);
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error creating announcement:', error);
      return null;
    }
  }

  async updateAnnouncement(id, announcementData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('announcements')
        .update(announcementData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating announcement:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating announcement:', error);
      return null;
    }
  }

  async deleteAnnouncement(id) {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting announcement:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      return false;
    }
  }

  // Media
  async getAllMedia() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting media:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting media:', error);
      return [];
    }
  }

  async getActiveMedia() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting active media:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting active media:', error);
      return [];
    }
  }

  async createMedia(mediaData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const data = {
        id: uuidv4(),
        ...mediaData,
        created_at: new Date().toISOString()
      };

      const { data: result, error } = await client
        .from('media')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('Error creating media:', error);
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error creating media:', error);
      return null;
    }
  }

  async updateMedia(id, mediaData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error} = await client
        .from('media')
        .update(mediaData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating media:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating media:', error);
      return null;
    }
  }

  async deleteMedia(id) {
    const client = this.getClient();
    if (!client) return false;

    try {
      const { error } = await client
        .from('media')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting media:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting media:', error);
      return false;
    }
  }
}

// Utility functions
async function verifyPassword(plainPassword, hashedPassword) {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

// Create database instance
const db = new SupabaseDB();

module.exports = {
  db,
  verifyPassword,
  SupabaseDB
};
