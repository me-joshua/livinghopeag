from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime, timedelta
import uuid
import json
from jose import JWTError, jwt, ExpiredSignatureError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import database functions
try:
    from database import get_db, create_tables, verify_password, SupabaseDB
except ImportError:
    # Fallback for serverless environment
    SupabaseDB = None
    def get_db():
        return None
    def create_tables():
        pass
    def verify_password(password, hashed):
        return False

# Create FastAPI app without lifespan for Vercel compatibility
app = FastAPI(title="Living Hope AG API", version="1.0.0")

# Configuration from environment variables
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-secret-key-in-production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256") 
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

# CORS Origins - Allow all Vercel preview URLs and production
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000,https://livinghopeag.vercel.app")
CORS_ORIGINS = cors_origins_env.split(",")

# Add wildcard for Vercel preview URLs
CORS_ORIGINS.extend([
    "https://*.vercel.app",
    "https://livinghopeag-*.vercel.app"
])

# CORS middleware with environment-based origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now to fix CORS issues
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Pydantic models
class ContactForm(BaseModel):
    id: Optional[str] = None
    fullName: str
    email: str
    countryCode: Optional[str] = '+968'
    phone: Optional[str] = None
    subject: str
    message: str
    contact_permission: bool = False
    isRead: bool = False
    created_at: Optional[datetime] = None

class Event(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    date: str
    time: str
    location: str
    category: Optional[str] = 'general'
    registration_required: Optional[bool] = False
    contact_info: Optional[str] = ''
    image_url: Optional[str] = None
    is_upcoming: bool = True
    created_at: Optional[datetime] = None

class Announcement(BaseModel):
    id: Optional[str] = None
    title: str
    content: str
    date: str
    icon: str = 'Megaphone'
    created_at: Optional[datetime] = None

class Media(BaseModel):
    id: Optional[str] = None
    title: str
    name: str  # Changed from 'pastor' to 'name'
    date: str
    description: str
    video_url: Optional[str] = None
    audio_url: Optional[str] = None
    scripture: Optional[str] = None
    series: Optional[str] = None
    duration: Optional[str] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Helper functions for admin authentication
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security), db: SupabaseDB = Depends(get_db)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        # Verify user exists in database and is active
        admin_user = db.get_admin_user_by_username(username)
        if not admin_user or not admin_user.get('is_active', False):
            raise HTTPException(status_code=401, detail="User not found or inactive")
            
        return username
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Database initialization is now handled in the lifespan context manager above

@app.get("/")
async def root():
    return {"message": "Living Hope AG API is running"}

# Announcement endpoints
@app.get("/api/announcements")
async def get_announcements(db: SupabaseDB = Depends(get_db)):
    announcements = db.get_all_announcements()
    return [
        {
            "id": announcement["id"],
            "title": announcement["title"],
            "content": announcement["content"],
            "date": announcement["date"],
            "icon": announcement.get("icon", "Megaphone"),
            "created_at": announcement["created_at"]
        } for announcement in announcements
    ]

# Admin authentication endpoints
@app.post("/api/admin/login", response_model=Token)
async def admin_login(admin_data: AdminLogin, db: SupabaseDB = Depends(get_db)):
    # Look up admin user in database
    try:
        admin_user = db.get_admin_user_by_username(admin_data.username)
        
        if not admin_user or not admin_user.get('is_active', False) or not verify_password(admin_data.password, str(admin_user['password_hash'])):
            raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
            )
        
        # Update last login time
        db.update_admin_last_login(admin_user['id'])
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Admin-only endpoints
@app.get("/api/admin/contact-messages")
async def get_admin_contact_messages(current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    messages = db.get_all_contact_forms()
    return {
        "success": True,
        "messages": [
            {
                "id": msg["id"],
                "fullName": msg["fullName"],
                "email": msg["email"],
                "countryCode": msg["countryCode"],
                "phone": msg["phone"],
                "subject": msg["subject"],
                "message": msg["message"],
                "contact_permission": msg["contact_permission"],
                "created_at": msg["created_at"]
            } for msg in messages
        ],
        "total": len(messages)
    }

@app.delete("/api/admin/contact-messages/{message_id}")
async def delete_contact_message(message_id: str, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    result = db.delete_contact_form(message_id)
    if not result:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"success": True, "message": "Contact message deleted successfully"}

@app.post("/api/admin/media")
async def admin_create_media(media: Media, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    media_data = {
        "title": media.title,
        "name": media.name,
        "date": media.date,
        "description": media.description,
        "video_url": media.video_url,
        "audio_url": media.audio_url,
        "scripture": media.scripture,
        "series": media.series,
        "duration": media.duration
    }
    
    new_media = db.create_media(media_data)
    if not new_media:
        raise HTTPException(status_code=500, detail="Failed to create media")
    
    return {
        "success": True,
        "message": "Media created successfully",
        "media": {
            "id": new_media["id"],
            "title": new_media["title"],
            "name": new_media["name"],
            "date": new_media["date"],
            "description": new_media["description"],
            "video_url": new_media["video_url"],
            "audio_url": db_media.audio_url,
            "scripture": db_media.scripture,
            "series": db_media.series,
            "duration": db_media.duration
        }
    }

@app.get("/api/admin/media")
async def admin_get_media(current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    media_items = db.get_all_media()
    return {
        "success": True,
        "media": [
            {
                "id": media["id"],
                "title": media["title"],
                "name": media["name"],
                "date": media["date"],
                "description": media["description"],
                "video_url": media["video_url"],
                "audio_url": media["audio_url"],
                "scripture": media["scripture"],
                "series": media["series"],
                "duration": media["duration"]
            } for media in media_items
        ],
        "total": len(media_items)
    }

@app.put("/api/admin/media/{media_id}")
async def update_media(
    media_id: str, 
    media: Media, 
    current_admin: str = Depends(verify_token), 
    db: SupabaseDB = Depends(get_db)
):
    db_media = db.query(DBMedia).filter(DBMedia.id == media_id).first()
    if not db_media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    # Update the media fields
    db_media.title = media.title
    db_media.name = media.name
    db_media.date = media.date
    db_media.description = media.description
    db_media.video_url = media.video_url
    db_media.audio_url = media.audio_url
    db_media.scripture = media.scripture
    db_media.series = media.series
    db_media.duration = media.duration
    
    db.commit()
    db.refresh(db_media)
    
    return {
        "success": True,
        "message": "Media updated successfully",
        "media": {
            "id": db_media.id,
            "title": db_media.title,
            "name": db_media.name,
            "date": db_media.date,
            "description": db_media.description,
            "video_url": db_media.video_url,
            "audio_url": db_media.audio_url,
            "scripture": db_media.scripture,
            "series": db_media.series,
            "duration": db_media.duration
        }
    }

@app.delete("/api/admin/media/{media_id}")
async def admin_delete_media(media_id: str, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    media = db.query(DBMedia).filter(DBMedia.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    db.delete(media)
    db.commit()
    return {"success": True, "message": "Media deleted successfully"}

# Contact form endpoints
@app.post("/api/contact")
async def submit_contact_form(form: ContactForm, db: SupabaseDB = Depends(get_db)):
    try:
        # Create database record
        db_form = DBContactForm(
            fullName=form.fullName,
            email=form.email,
            countryCode=form.countryCode,
            phone=form.phone,
            subject=form.subject,
            message=form.message,
            contact_permission=form.contact_permission,
            isRead=False
        )
        db.add(db_form)
        db.commit()
        db.refresh(db_form)
        
        # Log the submission
        print(f"📝 New contact form submission from {form.fullName} ({form.email})")
        
        return {
            "message": "Contact form submitted successfully! We will get back to you soon.",
            "id": db_form.id,
            "status": "success"
        }
    except Exception as e:
        print(f"❌ Error processing contact form: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to process contact form")

@app.get("/api/admin/contact-forms")
async def get_contact_forms(token: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    # Order by created_at descending (newest first)
    forms = db.get_all_contact_forms()
    return [
        {
            "id": form["id"],
            "fullName": form["fullName"],
            "email": form["email"],
            "countryCode": form["countryCode"],
            "phone": form["phone"],
            "subject": form["subject"],
            "message": form["message"],
            "contact_permission": form["contact_permission"],
            "isRead": form["isRead"],
            "created_at": form["created_at"]
        } for form in forms
    ]

# Mark contact message as read
@app.patch("/api/admin/contact-forms/{form_id}/read")
async def mark_contact_form_as_read(form_id: str, token: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    form = db.query(DBContactForm).filter(DBContactForm.id == form_id).first()
    if not form:
        raise HTTPException(status_code=404, detail="Contact form not found")
    
    form.isRead = True
    db.commit()
    db.refresh(form)
    
    return {"message": "Contact form marked as read", "isRead": form.isRead}

# Event endpoints
@app.get("/api/events")
async def get_events(db: SupabaseDB = Depends(get_db)):
    events = db.get_all_events()
    return [
        {
            "id": event["id"],
            "title": event["title"],
            "date": event["date"],
            "time": event["time"],
            "location": event["location"],
            "description": event["description"],
            "category": event["category"],
            "registration_required": event["registration_required"],
            "contact_info": event.contact_info
        } for event in events
    ]

@app.get("/api/events/{event_id}")
async def get_event(event_id: str, db: SupabaseDB = Depends(get_db)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return {
        "id": event.id,
        "title": event.title,
        "date": event.date,
        "time": event.time,
        "location": event.location,
        "description": event.description,
        "category": event.category,
        "registration_required": event.registration_required,
        "contact_info": event.contact_info
    }

# Media endpoints (public)
@app.get("/api/media")
async def get_media(db: SupabaseDB = Depends(get_db)):
    media_items = db.get_all_media()
    return [
        {
            "id": media["id"],
            "title": media["title"],
            "name": media["name"],
            "date": media["date"],
            "description": media["description"],
            "video_url": media["video_url"],
            "audio_url": media["audio_url"],
            "scripture": media["scripture"],
            "series": media.series,
            "duration": media.duration
        } for media in media_items
    ]

@app.get("/api/media/{media_id}")
async def get_media_item(media_id: str, db: SupabaseDB = Depends(get_db)):
    media = db.get_media_by_id(media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    return {
        "id": media["id"],
        "title": media["title"],
        "name": media["name"],
        "date": media["date"],
        "description": media.description,
        "video_url": media.video_url,
        "audio_url": media.audio_url,
        "scripture": media.scripture,
        "series": media.series,
        "duration": media.duration
    }

# YouTube video extraction endpoint
class YouTubeExtractRequest(BaseModel):
    url: str

@app.post("/api/extract-youtube")
async def extract_youtube_info(request: YouTubeExtractRequest):
    """Extract video information from YouTube URL using yt-dlp"""
    try:
        # Use yt-dlp to extract video metadata
        cmd = [
            "yt-dlp",
            "--skip-download",
            "--print-json",
            "--no-warnings",
            request.url
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        
        if result.returncode != 0:
            raise HTTPException(status_code=400, detail=f"Failed to extract video info: {result.stderr}")
        
        # Parse the JSON output
        video_data = json.loads(result.stdout)
        
        # Extract the information we need
        title = video_data.get('title', '')
        description = video_data.get('description', '')
        upload_date = video_data.get('upload_date', '')
        uploader = video_data.get('uploader', '')
        duration_seconds = video_data.get('duration', 0)
        
        # Format the upload date from YYYYMMDD to YYYY-MM-DD
        formatted_date = ''
        if upload_date and len(upload_date) == 8:
            formatted_date = f"{upload_date[:4]}-{upload_date[4:6]}-{upload_date[6:8]}"
        
        # Format duration from seconds to MM:SS or HH:MM:SS
        formatted_duration = ''
        if duration_seconds and isinstance(duration_seconds, (int, float)):
            hours = int(duration_seconds // 3600)
            minutes = int((duration_seconds % 3600) // 60)
            seconds = int(duration_seconds % 60)
            
            if hours > 0:
                formatted_duration = f"{hours}:{minutes:02d}:{seconds:02d}"
            else:
                formatted_duration = f"{minutes}:{seconds:02d}"
        
        # Create a nice description if the original is too long or empty
        if not description or len(description) > 500:
            description = f"A sermon from {uploader or 'Living Hope AG'}. Watch this inspiring message that will strengthen your faith."
        
        return {
            "success": True,
            "data": {
                "title": title,
                "description": description,
                "date": formatted_date,
                "uploader": uploader,
                "duration": formatted_duration,
                "duration_seconds": duration_seconds,
                "original_upload_date": upload_date
            }
        }
        
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=408, detail="Request timeout - video extraction took too long")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse video metadata")
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="yt-dlp not found - please install yt-dlp")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

# Church information endpoints
@app.get("/api/church-info")
async def get_church_info():
    return {
        "name": "Living Hope AG",
        "address": "123 Church Street, Muscat, Oman",
        "phone": "+968 1234 5678",
        "email": "info@livingwaterchurch.om",
        "service_times": {
            "friday_service": "10:00 AM",
            "sunday_kids": "3:00 PM",
            "all_night": "Last Friday of each month"
        },
        "social_media": {
            "facebook": "#",
            "instagram": "#",
            "twitter": "#",
            "youtube": "#"
        }
    }

# Admin Event Management endpoints
@app.get("/api/admin/events")
async def get_admin_events(current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    events = db.get_all_events()
    return [
        {
            "id": event["id"],
            "title": event["title"],
            "date": event["date"],
            "time": event["time"],
            "location": event["location"],
            "description": event["description"],
            "category": event["category"],
            "registration_required": event["registration_required"],
            "contact_info": event["contact_info"],
            "created_at": event["created_at"]
        } for event in events
    ]

@app.post("/api/admin/events")
async def create_event(event: Event, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    new_event = DBEvent(
        id=str(uuid.uuid4()),
        title=event.title,
        description=event.description,
        date=event.date,
        time=event.time,
        location=event.location,
        category=event.category,
        registration_required=event.registration_required,
        contact_info=event.contact_info,
        created_at=datetime.now()
    )
    db.add(new_event)
    db.commit()
    return {"message": "Event created successfully", "event_id": new_event.id}

@app.put("/api/admin/events/{event_id}")
async def update_event(
    event_id: str, 
    event: Event, 
    current_admin: str = Depends(verify_token), 
    db: SupabaseDB = Depends(get_db)
):
    db_event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Update the event fields
    db_event.title = event.title
    db_event.description = event.description
    db_event.date = event.date
    db_event.time = event.time
    db_event.location = event.location
    db_event.category = event.category
    db_event.registration_required = event.registration_required
    db_event.contact_info = event.contact_info
    
    db.commit()
    db.refresh(db_event)
    
    return {
        "success": True,
        "message": "Event updated successfully",
        "event": {
            "id": db_event.id,
            "title": db_event.title,
            "description": db_event.description,
            "date": db_event.date,
            "time": db_event.time,
            "location": db_event.location,
            "category": db_event.category,
            "registration_required": db_event.registration_required,
            "contact_info": db_event.contact_info,
            "created_at": db_event.created_at
        }
    }

@app.delete("/api/admin/events/{event_id}")
async def delete_event(event_id: str, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}

# Admin announcement endpoints
@app.get("/api/admin/announcements")
async def admin_get_announcements(current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    announcements = db.get_all_announcements()
    return [
        {
            "id": announcement["id"],
            "title": announcement["title"],
            "content": announcement["content"],
            "date": announcement["date"],
            "icon": announcement.get("icon", "Megaphone"),
            "created_at": announcement["created_at"]
        } for announcement in announcements
    ]

@app.post("/api/admin/announcements")
async def create_announcement(announcement: Announcement, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    new_announcement = DBannouncement(
        id=str(uuid.uuid4()),
        title=announcement.title,
        content=announcement.content,
        date=announcement.date,
        icon=announcement.icon,
        created_at=datetime.now()
    )
    db.add(new_announcement)
    db.commit()
    return {"message": "Announcement created successfully", "announcement_id": new_announcement.id}

@app.put("/api/admin/announcements/{announcement_id}")
async def update_announcement(
    announcement_id: str, 
    announcement: Announcement, 
    current_admin: str = Depends(verify_token), 
    db: SupabaseDB = Depends(get_db)
):
    db_announcement = db.query(DBannouncement).filter(DBannouncement.id == announcement_id).first()
    if not db_announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    # Update the announcement fields
    db_announcement.title = announcement.title
    db_announcement.content = announcement.content
    db_announcement.date = announcement.date
    db_announcement.icon = announcement.icon
    
    db.commit()
    db.refresh(db_announcement)
    
    return {
        "success": True,
        "message": "Announcement updated successfully",
        "announcement": {
            "id": db_announcement.id,
            "title": db_announcement.title,
            "content": db_announcement.content,
            "date": db_announcement.date,
            "icon": db_announcement.icon,
            "created_at": db_announcement.created_at
        }
    }

@app.delete("/api/admin/announcements/{announcement_id}")
async def delete_announcement(announcement_id: str, current_admin: str = Depends(verify_token), db: SupabaseDB = Depends(get_db)):
    announcement = db.query(DBannouncement).filter(DBannouncement.id == announcement_id).first()
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    db.delete(announcement)
    db.commit()
    return {"message": "Announcement deleted successfully"}

# Health check endpoint (always available)
@app.get("/")
async def root():
    return {"status": "Living Hope AG API is running", "timestamp": datetime.now()}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# Initialize database on first import (for serverless)
try:
    if SupabaseDB:
        create_tables()
        print("✅ Database connection established")
except Exception as e:
    print(f"⚠️ Database initialization error: {e}")

# For Vercel deployment
handler = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
