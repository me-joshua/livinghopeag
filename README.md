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

### Backend (FastAPI + SQLAlchemy)
- **RESTful API**: Complete CRUD endpoints for all content types
- **Admin Authentication**: Secure JWT-based admin system
- **Database**: SQLite with SQLAlchemy ORM
- **Contact Management**: Store and manage contact form submissions
- **CORS Support**: Configured for frontend integration

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
- **FastAPI 0.110.1** - Modern Python web framework
- **SQLAlchemy 2.0+** - Python SQL toolkit and ORM
- **Uvicorn** - ASGI server
- **Pydantic 2.6+** - Data validation
- **python-jose** - JWT handling
- **bcrypt** - Password hashing

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
├── backend/                 # FastAPI application
│   ├── server.py           # Main FastAPI application
│   ├── database.py         # Database models and configuration
│   ├── main.py            # Entry point for deployment
│   ├── requirements.txt   # Python dependencies
│   └── livinghope.db      # SQLite database
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

### Environment Variables

**Frontend (.env)**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Backend (.env)**
```
SECRET_KEY=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password
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