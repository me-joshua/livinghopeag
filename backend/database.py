from sqlalchemy import create_engine, Column, String, DateTime, Boolean, Text, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import uuid
import bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./livinghope.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class AdminUser(Base):
    __tablename__ = "admin_users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

class ContactForm(Base):
    __tablename__ = "contact_forms"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    fullName = Column(String, nullable=False)
    email = Column(String, nullable=False)
    countryCode = Column(String, nullable=True, default='+968')
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    contact_permission = Column(Boolean, default=False)
    isRead = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Media(Base):
    __tablename__ = "media"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    name = Column(String, nullable=False)  # Changed from 'pastor' to 'name'
    date = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    video_url = Column(String, nullable=True)
    audio_url = Column(String, nullable=True)
    scripture = Column(String, nullable=True)
    series = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Event(Base):
    __tablename__ = "events"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=True)
    registration_required = Column(Boolean, default=False)
    contact_info = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Announcement(Base):
    __tablename__ = "announcements"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    date = Column(String, nullable=False)  # Display date (user-defined)
    icon = Column(String, nullable=False, default='Megaphone')  # Icon name
    created_at = Column(DateTime, default=datetime.utcnow)

# Create all tables
def create_tables():
    Base.metadata.create_all(bind=engine)

# Password hashing utilities
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()