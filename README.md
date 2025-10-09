# Living Hope AG Church Website

A modern, responsive church website built with React and Node.js, featuring dynamic content management, event handling, gallery integration, and beautiful particle animations.

![Living Hope AG](https://img.shields.io/badge/Church-Website-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel)

## 🌟 Features

### Frontend
- **Modern React SPA** with React Router for navigation
- **Responsive Design** using Tailwind CSS
- **Auto-switching Hero Images** with smooth transitions
- **Particle Animation System** for enhanced visual appeal
- **Dynamic Content Management** for announcements and events
- **Google Drive Gallery Integration** with lightbox viewing
- **Interactive Event Management** with location links
- **Mobile-optimized Navigation** with hamburger menu
- **Admin Dashboard** for content management

### Backend
- **RESTful API** built with Express.js
- **Google Drive API Integration** for secure gallery access
- **YouTube Integration** for media content
- **Database Management** with SQLite
- **CORS-enabled** for frontend integration
- **Environment-based Configuration**

### Visual Effects
- **Custom Particle System** with canvas-based animations
- **Gradient Overlays** and backdrop blur effects
- **Smooth Hero Transitions** with fade effects
- **Text Shadows and Glows** for enhanced readability
- **Responsive Animations** using CSS and React

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://your-frontend-url.vercel.app)
- **Backend**: [API on Vercel](https://your-backend-url.vercel.app)

## 📁 Project Structure

```
livinghopeag/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Particles.jsx          # Custom particle animation system
│   │   │   └── GalleryLightbox.jsx    # Gallery viewer component
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Global styles and animations
│   │   └── index.jsx        # Application entry point
│   ├── public/              # Static assets
│   │   └── images/          # Image assets (hero, gallery, events)
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind CSS configuration
│
├── backend/                 # Node.js backend API
│   ├── routes/             # API route handlers
│   │   └── public.js       # Public routes (gallery, events)
│   ├── server.js           # Express server setup
│   ├── database.py         # Database management (Python)
│   ├── package.json        # Backend dependencies
│   └── requirements.txt    # Python dependencies
│
└── README.md               # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router DOM 6.28.0** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API calls
- **GSAP** - Animation library
- **OGL** - WebGL library for graphics

### Backend
- **Node.js 22.x** - Runtime environment
- **Express.js** - Web framework
- **Google APIs** - Drive API integration
- **ytdl-core** - YouTube downloader
- **SQLite** - Database
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend and backend hosting
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x or higher
- npm 10.x or higher
- Google Drive API credentials
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/me-joshua/livinghopeag.git
   cd livinghopeag
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create environment variables
   cp .env.example .env
   # Add your Google Drive API key and other secrets
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create environment variables
   cp .env.example .env
   # Add your backend API URL
   ```

### Environment Variables

#### Backend (.env)
```env
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
PORT=8001
NODE_ENV=production
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8001
```

### Development

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd backend
   npm start
   ```

## 🎨 Features in Detail

### Particle Animation System
- Custom canvas-based particle renderer
- React.memo optimization for performance
- No mouse interaction for stability
- Seamless transitions between sections
- Configurable colors, count, and behavior

### Google Drive Gallery
- Secure thumbnail access without authentication
- Lightbox viewing with navigation
- Automatic image optimization
- Mobile-responsive gallery grid

### Admin Dashboard
- Protected authentication system
- Dynamic content management
- Event creation and editing
- Announcement management
- Real-time updates

### Hero Section
- Auto-switching background images
- Smooth fade transitions
- Gradient overlays for text readability
- Smudged bottom border for particle integration
- Responsive text sizing

## 🔧 Configuration

### Particle System
Located in `frontend/src/components/Particles.jsx`:
```javascript
{
  particleColors: ['#000000', '#000000ff'],
  particleCount: 15,
  speed: 0.5,
  particleBaseSize: 200,
  alphaParticles: true,
  disableRotation: false
}
```

### Hero Images
Auto-switching images located in `public/images/hero/`:
- hero-1.jpg
- hero-2.jpg  
- hero-3.jpg

Add more images to extend the rotation.

## 📱 Mobile Responsiveness

- Responsive navigation with hamburger menu
- Optimized particle count for mobile devices
- Adaptive text sizing using CSS clamp()
- Touch-friendly interface elements
- Mobile-optimized gallery grid

## 🚀 Deployment

### Vercel Deployment

1. **Frontend Deployment**
   ```bash
   # Connect to Vercel
   cd frontend
   vercel
   
   # Set environment variables in Vercel dashboard
   ```

2. **Backend Deployment**
   ```bash
   # Deploy to Vercel
   cd backend
   vercel
   
   # Configure environment variables
   ```

3. **Update Frontend API URL**
   Update `REACT_APP_API_URL` to point to your deployed backend.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

### Public Endpoints

#### Gallery
- `GET /api/public/gallery/:folderId` - Get gallery images from Google Drive

#### Events
- `GET /api/public/events` - Get all public events

#### Announcements  
- `GET /api/public/announcements` - Get all announcements

## 🔒 Security Features

- Environment-based API key management
- CORS configuration for secure cross-origin requests
- Public-only Google Drive access (no authentication required)
- Protected admin routes with token authentication

## 🐛 Troubleshooting

### Common Issues

1. **Particles not showing**
   - Check if canvas size is properly set
   - Verify z-index layering
   - Ensure React.memo is not preventing updates

2. **Gallery not loading**
   - Verify Google Drive API key
   - Check folder sharing settings
   - Confirm CORS configuration

3. **Build failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Joshua
- **Church**: Living Hope AG
- **Location**: Oman

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for utility-first approach
- Vercel for seamless deployment
- Google Drive API for gallery integration
- Lucide React for beautiful icons

---

**Living Hope AG** - Sharing the life-changing love of Jesus Christ with our community and the world.

*"Jesus said to her, 'Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst.'" - John 4:13-14*