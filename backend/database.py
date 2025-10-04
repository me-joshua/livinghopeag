from supabase import create_client, Client
from datetime import datetime
import uuid
import bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError("❌ SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables")

# Create Supabase client
print("🔄 Connecting to Supabase...")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
print("✅ Supabase connection established!")

# Database Helper Functions
class SupabaseDB:
    def __init__(self):
        self.client = supabase
    
    # Admin Users
    def create_admin_user(self, username: str, email: str, password: str):
        """Create a new admin user"""
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        data = {
            "id": str(uuid.uuid4()),
            "username": username,
            "email": email,
            "password_hash": password_hash,
            "is_active": True,
            "created_at": datetime.utcnow().isoformat(),
            "last_login": None
        }
        
        result = self.client.table("admin_users").insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_admin_user_by_username(self, username: str):
        """Get admin user by username"""
        result = self.client.table("admin_users").select("*").eq("username", username).execute()
        return result.data[0] if result.data else None
    
    def update_admin_last_login(self, user_id: str):
        """Update admin user's last login time"""
        data = {"last_login": datetime.utcnow().isoformat()}
        result = self.client.table("admin_users").update(data).eq("id", user_id).execute()
        return result.data[0] if result.data else None
    
    # Contact Forms
    def create_contact_form(self, form_data: dict):
        """Create a new contact form submission"""
        data = {
            "id": str(uuid.uuid4()),
            "fullName": form_data["fullName"],
            "email": form_data["email"],
            "countryCode": form_data.get("countryCode", "+968"),
            "phone": form_data.get("phone"),
            "subject": form_data["subject"],
            "message": form_data["message"],
            "contact_permission": form_data.get("contact_permission", False),
            "isRead": False,
            "created_at": datetime.utcnow().isoformat()
        }
        
        result = self.client.table("contact_forms").insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_all_contact_forms(self):
        """Get all contact form submissions"""
        result = self.client.table("contact_forms").select("*").order("created_at", desc=True).execute()
        return result.data
    
    def mark_contact_form_as_read(self, form_id: str):
        """Mark contact form as read"""
        data = {"isRead": True}
        result = self.client.table("contact_forms").update(data).eq("id", form_id).execute()
        return result.data[0] if result.data else None
    
    def delete_contact_form(self, form_id: str):
        """Delete contact form"""
        result = self.client.table("contact_forms").delete().eq("id", form_id).execute()
        return True
    
    # Media
    def create_media(self, media_data: dict):
        """Create a new media entry"""
        data = {
            "id": str(uuid.uuid4()),
            "title": media_data["title"],
            "name": media_data["name"],
            "date": media_data["date"],
            "description": media_data["description"],
            "video_url": media_data.get("video_url"),
            "audio_url": media_data.get("audio_url"),
            "scripture": media_data.get("scripture"),
            "series": media_data.get("series"),
            "duration": media_data.get("duration"),
            "created_at": datetime.utcnow().isoformat()
        }
        
        result = self.client.table("media").insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_all_media(self):
        """Get all media entries"""
        result = self.client.table("media").select("*").order("created_at", desc=True).execute()
        return result.data
    
    def update_media(self, media_id: str, media_data: dict):
        """Update media entry"""
        result = self.client.table("media").update(media_data).eq("id", media_id).execute()
        return result.data[0] if result.data else None
    
    def delete_media(self, media_id: str):
        """Delete media entry"""
        result = self.client.table("media").delete().eq("id", media_id).execute()
        return True
    
    # Events
    def create_event(self, event_data: dict):
        """Create a new event"""
        data = {
            "id": str(uuid.uuid4()),
            "title": event_data["title"],
            "date": event_data["date"],
            "time": event_data["time"],
            "location": event_data["location"],
            "description": event_data["description"],
            "category": event_data.get("category"),
            "registration_required": event_data.get("registration_required", False),
            "contact_info": event_data.get("contact_info"),
            "created_at": datetime.utcnow().isoformat()
        }
        
        result = self.client.table("events").insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_all_events(self):
        """Get all events"""
        result = self.client.table("events").select("*").order("created_at", desc=True).execute()
        return result.data
    
    def update_event(self, event_id: str, event_data: dict):
        """Update event"""
        result = self.client.table("events").update(event_data).eq("id", event_id).execute()
        return result.data[0] if result.data else None
    
    def delete_event(self, event_id: str):
        """Delete event"""
        result = self.client.table("events").delete().eq("id", event_id).execute()
        return True
    
    # Announcements
    def create_announcement(self, announcement_data: dict):
        """Create a new announcement"""
        data = {
            "id": str(uuid.uuid4()),
            "title": announcement_data["title"],
            "content": announcement_data["content"],
            "date": announcement_data["date"],
            "icon": announcement_data.get("icon", "Megaphone"),
            "created_at": datetime.utcnow().isoformat()
        }
        
        result = self.client.table("announcements").insert(data).execute()
        return result.data[0] if result.data else None
    
    def get_all_announcements(self):
        """Get all announcements"""
        result = self.client.table("announcements").select("*").order("created_at", desc=True).execute()
        return result.data
    
    def update_announcement(self, announcement_id: str, announcement_data: dict):
        """Update announcement"""
        result = self.client.table("announcements").update(announcement_data).eq("id", announcement_id).execute()
        return result.data[0] if result.data else None
    
    def delete_announcement(self, announcement_id: str):
        """Delete announcement"""
        result = self.client.table("announcements").delete().eq("id", announcement_id).execute()
        return True

    # Get single records by ID methods
    def get_media_by_id(self, media_id: str):
        """Get media by ID"""
        result = self.client.table("media").select("*").eq("id", media_id).execute()
        return result.data[0] if result.data else None

    def get_event_by_id(self, event_id: str):
        """Get event by ID"""
        result = self.client.table("events").select("*").eq("id", event_id).execute()
        return result.data[0] if result.data else None

    def get_announcement_by_id(self, announcement_id: str):
        """Get announcement by ID"""
        result = self.client.table("announcements").select("*").eq("id", announcement_id).execute()
        return result.data[0] if result.data else None

    def get_contact_form_by_id(self, form_id: str):
        """Get contact form by ID"""
        result = self.client.table("contact_forms").select("*").eq("id", form_id).execute()
        return result.data[0] if result.data else None

# Create database instance
db = SupabaseDB()

# Helper functions for backward compatibility
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_db():
    """Get database instance (for FastAPI dependency)"""
    return db

def create_tables():
    """Create database tables - handled automatically by Supabase"""
    print("✅ Database tables managed by Supabase")
    
    # Check if admin user exists, if not create one
    try:
        admin_username = os.getenv("INITIAL_ADMIN_USERNAME")
        admin_password = os.getenv("INITIAL_ADMIN_PASSWORD") 
        admin_email = os.getenv("INITIAL_ADMIN_EMAIL")
        
        if not admin_username or not admin_password or not admin_email:
            print("⚠️ Admin user creation skipped - Please set INITIAL_ADMIN_USERNAME, INITIAL_ADMIN_PASSWORD, and INITIAL_ADMIN_EMAIL in .env file")
            return
        
        if len(admin_password) < 8:
            print("⚠️ Admin user creation skipped - Password must be at least 8 characters")
            return
            
        existing_admin = db.get_admin_user_by_username(admin_username)
        if not existing_admin:
            print("🔄 Creating initial admin user...")
            db.create_admin_user(admin_username, admin_email, admin_password)
            print(f"✅ Initial admin user created: {admin_username}")
            print("⚠️ IMPORTANT: Change the admin password immediately after first login!")
        else:
            print(f"✅ Admin user already exists: {admin_username}")
    except Exception as e:
        print(f"⚠️ Could not create admin user: {str(e)}")

def create_initial_admin():
    """Create initial admin user"""
    create_tables()  # This will handle admin creation