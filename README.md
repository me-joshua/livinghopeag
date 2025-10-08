# Living Hope AG Church Website

A modern, full-stack church website built with React and FastAPI, featuring event management, media content, announcements, and administrative functionality.

## 🌟 Features

### Frontend (React + Vite)
- **Modern UI/UX**: Responsive design with Tailwind CSS and smooth animations
- **Event Management**: Browse upcoming and past events with detailed pages
- **Google Maps Integration**: Supports multiple URL formats including DMS coordinates
- **Media Section**: View sermons and church content
- **Announcements**: Stay updated with church news
- **Contact System**: Multi-language contact form with country code selection
- **Admin Dashboard**: Complete CRUD operations for events, media, and announcements
- **Donation/Giving**: Secure giving options with bank transfer details

### Backend (Node.js + Express + Supabase)
- **RESTful API**: Complete CRUD endpoints for all content types
- **Admin Authentication**: Secure JWT-based admin system
- **Database**: Supabase PostgreSQL
- **Contact Management**: Store and manage contact form submissions
- **CORS Support**: Configured for frontend integration
- **YouTube Metadata Extraction**: Automatic video info extraction using youtube-dl

### Key Technical Features
- **Enhanced Google Maps**: Converts various Google Maps URL formats to embeddable maps
- **Smart Event Display**: Conditional rendering based on event timing (past vs upcoming)
- **Admin Edit Functionality**: In-place editing for all content types
- **Responsive Design**: Mobile-first approach with modern UI patterns
- **Production Ready**: Build configuration and deployment setup

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router 6.28.0** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.x** - Web framework
- **Supabase** - PostgreSQL database
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **youtube-dl** - YouTube metadata extraction (Python dependency)

## 📁 Project Structure

```
livinghopeag/
├── frontend/                 # React application
│   ├── public/
│   │   ├── images/          # Static images (hero, events, gallery)
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Custom styles
│   │   ├── index.jsx        # Application entry point
│   │   └── index.css        # Global styles
│   ├── package.json
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind CSS configuration
├── backend/                 # Express application
│   ├── routes/             # API route handlers
│   │   ├── admin.js       # Admin endpoints
│   │   └── public.js      # Public endpoints
│   ├── server.js          # Main Express application
│   ├── database.js        # Supabase database client
│   ├── auth.js           # JWT authentication
│   ├── package.json      # Node.js dependencies
│   ├── requirements.txt  # Python dependencies (yt-dlp)
│   └── .env             # Environment variables
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+ (for yt-dlp)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

**Install Node.js dependencies:**
```bash
cd backend
npm install
```

**Install Python dependencies (for YouTube metadata extraction):**
```bash
pip install -r requirements.txt
# Or directly: pip install yt-dlp
```

**Start the backend server:**
```bash
npm run dev
# Or: node server.js
```

### Environment Variables

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:8001
```

**Backend (.env)**
```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret-key
PORT=8001
```

## 📱 Usage

### Public Features
- **Home**: Welcome page with hero images and church information
- **Events**: Browse upcoming and past events with detailed views
- **Media**: Access sermons and church content
- **Announcements**: Read church news and updates
- **About**: Learn about the church's mission and values
- **Contact**: Get in touch with the church
- **Know God**: Spiritual guidance and salvation information
- **Give**: Support the church through donations

### Admin Features
Access the admin dashboard at `/admin`:
- **Event Management**: Create, edit, and delete events
- **Media Management**: Upload and manage sermons/content
- **Announcement Management**: Post and edit church announcements
- **Contact Messages**: View and manage contact form submissions

## 🗺️ Google Maps Integration

The website supports multiple Google Maps URL formats:
- Standard coordinates: `23.634389,58.105556`
- DMS format: `23°38'03.8"N+58°06'20.0"E`
- Google Maps URLs with embedded coordinates
- Google Maps place URLs

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Animations**: Smooth transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized images and lazy loading
- **SEO Ready**: Proper meta tags and semantic HTML

## 🔒 Security Features

- **JWT Authentication**: Secure admin access
- **Password Hashing**: bcrypt for secure password storage
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Pydantic models for data validation

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render/Heroku)
```bash
# Use main.py as entry point
# Configure environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email [your-email@example.com] or join our Slack channel.

## 🎯 Future Enhancements

- [ ] Online event registration system
- [ ] Live streaming integration
- [ ] Member portal with authentication
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced media gallery
- [ ] Prayer request system
- [ ] Newsletter subscription

---

Built with ❤️ for Living Hope AG Church