from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime
import uuid

app = FastAPI(title="Living Water Church API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ContactForm(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    phone: str
    subject: str
    message: str
    contact_permission: bool = False
    created_at: Optional[datetime] = None

class PrayerRequest(BaseModel):
    id: Optional[str] = None
    name: str
    email: Optional[str] = None
    prayer_request: str
    created_at: Optional[datetime] = None

class Event(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    date: str
    time: str
    location: str
    image_url: Optional[str] = None
    is_upcoming: bool = True
    created_at: Optional[datetime] = None

class Sermon(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    youtube_url: str
    pastor: str
    date: str
    created_at: Optional[datetime] = None

# In-memory storage (replace with MongoDB in production)
contact_forms = []
prayer_requests = []
events = []
sermons = []

# Initialize with sample data
def initialize_sample_data():
    # Sample sermons
    sample_sermons = [
        {
            "id": str(uuid.uuid4()),
            "title": "Faith That Moves Mountains",
            "description": "A powerful message about stepping out in faith and trusting God's promises.",
            "youtube_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "pastor": "Pastor John",
            "date": "March 15, 2025",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "The Living Water",
            "description": "Discovering the eternal source of life and refreshment in Jesus Christ.",
            "youtube_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "pastor": "Pastor Sarah",
            "date": "March 8, 2025",
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Walking in Love",
            "description": "Understanding how to live out Christ's love in our daily relationships and interactions.",
            "youtube_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "pastor": "Pastor David",
            "date": "March 1, 2025",
            "created_at": datetime.now()
        }
    ]
    
    # Sample events
    sample_events = [
        {
            "id": str(uuid.uuid4()),
            "title": "Baptism Service",
            "description": "Join us for a special baptism service at the beach. If you're ready to take this step of faith, contact us to participate.",
            "date": "March 25, 2025",
            "time": "10:00 AM",
            "location": "Qantab Beach",
            "image_url": "https://images.unsplash.com/photo-1516474642997-b86ccf7065a4",
            "is_upcoming": True,
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Easter Celebration",
            "description": "Celebrate the resurrection of Jesus Christ with us. Special music, messages, and fellowship meal following the service.",
            "date": "April 1, 2025",
            "time": "10:00 AM",
            "location": "Church Main Hall",
            "image_url": "https://images.unsplash.com/photo-1655636237961-1fa3457c19a9",
            "is_upcoming": True,
            "created_at": datetime.now()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Worship Night",
            "description": "An evening of worship and praise to God.",
            "date": "February 28, 2025",
            "time": "7:00 PM",
            "location": "Church Main Hall",
            "image_url": "https://images.unsplash.com/photo-1579975096649-e773152b04cb",
            "is_upcoming": False,
            "created_at": datetime.now()
        }
    ]
    
    sermons.extend(sample_sermons)
    events.extend(sample_events)

# Initialize sample data
initialize_sample_data()

@app.get("/")
async def root():
    return {"message": "Living Water Church API is running"}

# Contact form endpoints
@app.post("/api/contact")
async def submit_contact_form(form: ContactForm):
    form.id = str(uuid.uuid4())
    form.created_at = datetime.now()
    contact_forms.append(form.dict())
    return {"message": "Contact form submitted successfully", "id": form.id}

@app.get("/api/contact", response_model=List[ContactForm])
async def get_contact_forms():
    return contact_forms

# Prayer request endpoints
@app.post("/api/prayer-request")
async def submit_prayer_request(request: PrayerRequest):
    request.id = str(uuid.uuid4())
    request.created_at = datetime.now()
    prayer_requests.append(request.dict())
    return {"message": "Prayer request submitted successfully", "id": request.id}

@app.get("/api/prayer-requests", response_model=List[PrayerRequest])
async def get_prayer_requests():
    return prayer_requests

# Event endpoints
@app.get("/api/events", response_model=List[Event])
async def get_events():
    return events

@app.get("/api/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    for event in events:
        if event["id"] == event_id:
            return event
    raise HTTPException(status_code=404, detail="Event not found")

@app.post("/api/events")
async def create_event(event: Event):
    event.id = str(uuid.uuid4())
    event.created_at = datetime.now()
    events.append(event.dict())
    return {"message": "Event created successfully", "id": event.id}

@app.put("/api/events/{event_id}")
async def update_event(event_id: str, event: Event):
    for i, existing_event in enumerate(events):
        if existing_event["id"] == event_id:
            event.id = event_id
            event.created_at = existing_event["created_at"]
            events[i] = event.dict()
            return {"message": "Event updated successfully"}
    raise HTTPException(status_code=404, detail="Event not found")

@app.delete("/api/events/{event_id}")
async def delete_event(event_id: str):
    for i, event in enumerate(events):
        if event["id"] == event_id:
            del events[i]
            return {"message": "Event deleted successfully"}
    raise HTTPException(status_code=404, detail="Event not found")

# Sermon endpoints
@app.get("/api/sermons", response_model=List[Sermon])
async def get_sermons():
    return sermons

@app.get("/api/sermons/{sermon_id}", response_model=Sermon)
async def get_sermon(sermon_id: str):
    for sermon in sermons:
        if sermon["id"] == sermon_id:
            return sermon
    raise HTTPException(status_code=404, detail="Sermon not found")

@app.post("/api/sermons")
async def create_sermon(sermon: Sermon):
    sermon.id = str(uuid.uuid4())
    sermon.created_at = datetime.now()
    sermons.append(sermon.dict())
    return {"message": "Sermon created successfully", "id": sermon.id}

@app.put("/api/sermons/{sermon_id}")
async def update_sermon(sermon_id: str, sermon: Sermon):
    for i, existing_sermon in enumerate(sermons):
        if existing_sermon["id"] == sermon_id:
            sermon.id = sermon_id
            sermon.created_at = existing_sermon["created_at"]
            sermons[i] = sermon.dict()
            return {"message": "Sermon updated successfully"}
    raise HTTPException(status_code=404, detail="Sermon not found")

@app.delete("/api/sermons/{sermon_id}")
async def delete_sermon(sermon_id: str):
    for i, sermon in enumerate(sermons):
        if sermon["id"] == sermon_id:
            del sermons[i]
            return {"message": "Sermon deleted successfully"}
    raise HTTPException(status_code=404, detail="Sermon not found")

# Church information endpoints
@app.get("/api/church-info")
async def get_church_info():
    return {
        "name": "Living Water Church",
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

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)