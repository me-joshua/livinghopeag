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
      console.warn('⚠️ Supabase credentials not found - running in offline mode');
      return null;
    }
    
    try {
      console.log('🔄 Connecting to Supabase...');
      supabase = createClient(supabaseUrl, supabaseServiceKey);
      console.log('✅ Supabase connection established!');
    } catch (error) {
      console.error('❌ Failed to connect to Supabase:', error);
      return null;
    }
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

  async createAdminUser(username, email, password) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const passwordHash = await bcrypt.hash(password, 12);
      
      const data = {
        id: uuidv4(),
        username,
        email,
        password_hash: passwordHash,
        is_active: true,
        created_at: new Date().toISOString(),
        last_login: null
      };

      const { data: result, error } = await client
        .from('admin_users')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('Error creating admin user:', error);
        return null;
      }

      return result;
    } catch (error) {
      console.error('Error creating admin user:', error);
      return null;
    }
  }

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
        if (error.code === 'PGRST116') return null; // No rows found
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

  async createContactForm(formData) {
    const client = this.getClient();
    if (!client) return null;

    try {
      const data = {
        id: uuidv4(),
        ...formData,
        isRead: false,
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

  async getAllEvents() {
    const client = this.getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

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