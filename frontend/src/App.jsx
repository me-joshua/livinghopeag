import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import './App.css';
import { 
  Home, 
  BookOpen, 
  Video,  // Added Video icon for media
  Info, 
  Calendar, 
  Heart, 
  Phone, 
  Cross,
  PartyPopper,
  Megaphone,
  Users,
  Moon,
  Star,
  MapPin,
  Mail,
  MessageCircle,
  MessageSquare,
  ChevronDown,
  Clock,
  Map,
  Church,
  Sparkles,
  HandHeart,
  Settings,
  Shield,
  Trash2,
  Plus,
  LogOut,
  Play,
  ExternalLink,
  Eye,
  EyeOff,
  Youtube,
  Instagram,
  Facebook,
  Image,
  Edit
} from 'lucide-react';

// Comprehensive list of countries with phone codes (sorted alphabetically)
const COUNTRIES = [
  { code: '+968', name: 'Oman' },
  { code: '+971', name: 'United Arab Emirates' },
  { code: '+966', name: 'Saudi Arabia' },
  { code: '+965', name: 'Kuwait' },
  { code: '+974', name: 'Qatar' },
  { code: '+973', name: 'Bahrain' },
  { code: '+91', name: 'India' },
  { code: '+92', name: 'Pakistan' },
  { code: '+94', name: 'Sri Lanka' },
  { code: '+880', name: 'Bangladesh' },
  { code: '+63', name: 'Philippines' },
  { code: '+1', name: 'United States' },
  { code: '+1', name: 'Canada' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+93', name: 'Afghanistan' },
  { code: '+355', name: 'Albania' },
  { code: '+213', name: 'Algeria' },
  { code: '+376', name: 'Andorra' },
  { code: '+244', name: 'Angola' },
  { code: '+54', name: 'Argentina' },
  { code: '+374', name: 'Armenia' },
  { code: '+61', name: 'Australia' },
  { code: '+43', name: 'Austria' },
  { code: '+994', name: 'Azerbaijan' },
  { code: '+1242', name: 'Bahamas' },
  { code: '+375', name: 'Belarus' },
  { code: '+32', name: 'Belgium' },
  { code: '+501', name: 'Belize' },
  { code: '+229', name: 'Benin' },
  { code: '+975', name: 'Bhutan' },
  { code: '+591', name: 'Bolivia' },
  { code: '+387', name: 'Bosnia and Herzegovina' },
  { code: '+267', name: 'Botswana' },
  { code: '+55', name: 'Brazil' },
  { code: '+673', name: 'Brunei' },
  { code: '+359', name: 'Bulgaria' },
  { code: '+226', name: 'Burkina Faso' },
  { code: '+257', name: 'Burundi' },
  { code: '+855', name: 'Cambodia' },
  { code: '+237', name: 'Cameroon' },
  { code: '+238', name: 'Cape Verde' },
  { code: '+236', name: 'Central African Republic' },
  { code: '+235', name: 'Chad' },
  { code: '+56', name: 'Chile' },
  { code: '+86', name: 'China' },
  { code: '+57', name: 'Colombia' },
  { code: '+269', name: 'Comoros' },
  { code: '+242', name: 'Congo' },
  { code: '+243', name: 'Congo (Democratic Republic)' },
  { code: '+506', name: 'Costa Rica' },
  { code: '+225', name: 'Côte d\'Ivoire' },
  { code: '+385', name: 'Croatia' },
  { code: '+53', name: 'Cuba' },
  { code: '+357', name: 'Cyprus' },
  { code: '+420', name: 'Czech Republic' },
  { code: '+45', name: 'Denmark' },
  { code: '+253', name: 'Djibouti' },
  { code: '+593', name: 'Ecuador' },
  { code: '+20', name: 'Egypt' },
  { code: '+503', name: 'El Salvador' },
  { code: '+240', name: 'Equatorial Guinea' },
  { code: '+291', name: 'Eritrea' },
  { code: '+372', name: 'Estonia' },
  { code: '+251', name: 'Ethiopia' },
  { code: '+679', name: 'Fiji' },
  { code: '+358', name: 'Finland' },
  { code: '+33', name: 'France' },
  { code: '+241', name: 'Gabon' },
  { code: '+220', name: 'Gambia' },
  { code: '+995', name: 'Georgia' },
  { code: '+49', name: 'Germany' },
  { code: '+233', name: 'Ghana' },
  { code: '+30', name: 'Greece' },
  { code: '+502', name: 'Guatemala' },
  { code: '+224', name: 'Guinea' },
  { code: '+592', name: 'Guyana' },
  { code: '+509', name: 'Haiti' },
  { code: '+504', name: 'Honduras' },
  { code: '+852', name: 'Hong Kong' },
  { code: '+36', name: 'Hungary' },
  { code: '+354', name: 'Iceland' },
  { code: '+62', name: 'Indonesia' },
  { code: '+98', name: 'Iran' },
  { code: '+964', name: 'Iraq' },
  { code: '+353', name: 'Ireland' },
  { code: '+972', name: 'Israel' },
  { code: '+39', name: 'Italy' },
  { code: '+81', name: 'Japan' },
  { code: '+962', name: 'Jordan' },
  { code: '+7', name: 'Kazakhstan' },
  { code: '+254', name: 'Kenya' },
  { code: '+850', name: 'Korea (North)' },
  { code: '+82', name: 'Korea (South)' },
  { code: '+996', name: 'Kyrgyzstan' },
  { code: '+856', name: 'Laos' },
  { code: '+371', name: 'Latvia' },
  { code: '+961', name: 'Lebanon' },
  { code: '+266', name: 'Lesotho' },
  { code: '+231', name: 'Liberia' },
  { code: '+218', name: 'Libya' },
  { code: '+423', name: 'Liechtenstein' },
  { code: '+370', name: 'Lithuania' },
  { code: '+352', name: 'Luxembourg' },
  { code: '+853', name: 'Macao' },
  { code: '+389', name: 'Macedonia' },
  { code: '+261', name: 'Madagascar' },
  { code: '+265', name: 'Malawi' },
  { code: '+60', name: 'Malaysia' },
  { code: '+960', name: 'Maldives' },
  { code: '+223', name: 'Mali' },
  { code: '+356', name: 'Malta' },
  { code: '+52', name: 'Mexico' },
  { code: '+373', name: 'Moldova' },
  { code: '+377', name: 'Monaco' },
  { code: '+976', name: 'Mongolia' },
  { code: '+382', name: 'Montenegro' },
  { code: '+212', name: 'Morocco' },
  { code: '+258', name: 'Mozambique' },
  { code: '+95', name: 'Myanmar' },
  { code: '+264', name: 'Namibia' },
  { code: '+977', name: 'Nepal' },
  { code: '+31', name: 'Netherlands' },
  { code: '+64', name: 'New Zealand' },
  { code: '+505', name: 'Nicaragua' },
  { code: '+227', name: 'Niger' },
  { code: '+234', name: 'Nigeria' },
  { code: '+47', name: 'Norway' },
  { code: '+680', name: 'Palau' },
  { code: '+970', name: 'Palestine' },
  { code: '+507', name: 'Panama' },
  { code: '+675', name: 'Papua New Guinea' },
  { code: '+595', name: 'Paraguay' },
  { code: '+51', name: 'Peru' },
  { code: '+48', name: 'Poland' },
  { code: '+351', name: 'Portugal' },
  { code: '+40', name: 'Romania' },
  { code: '+7', name: 'Russia' },
  { code: '+250', name: 'Rwanda' },
  { code: '+378', name: 'San Marino' },
  { code: '+239', name: 'São Tomé and Príncipe' },
  { code: '+221', name: 'Senegal' },
  { code: '+381', name: 'Serbia' },
  { code: '+248', name: 'Seychelles' },
  { code: '+232', name: 'Sierra Leone' },
  { code: '+65', name: 'Singapore' },
  { code: '+421', name: 'Slovakia' },
  { code: '+386', name: 'Slovenia' },
  { code: '+677', name: 'Solomon Islands' },
  { code: '+252', name: 'Somalia' },
  { code: '+27', name: 'South Africa' },
  { code: '+34', name: 'Spain' },
  { code: '+249', name: 'Sudan' },
  { code: '+597', name: 'Suriname' },
  { code: '+268', name: 'Swaziland' },
  { code: '+46', name: 'Sweden' },
  { code: '+41', name: 'Switzerland' },
  { code: '+963', name: 'Syria' },
  { code: '+886', name: 'Taiwan' },
  { code: '+992', name: 'Tajikistan' },
  { code: '+255', name: 'Tanzania' },
  { code: '+66', name: 'Thailand' },
  { code: '+670', name: 'Timor-Leste' },
  { code: '+228', name: 'Togo' },
  { code: '+676', name: 'Tonga' },
  { code: '+216', name: 'Tunisia' },
  { code: '+90', name: 'Turkey' },
  { code: '+993', name: 'Turkmenistan' },
  { code: '+256', name: 'Uganda' },
  { code: '+380', name: 'Ukraine' },
  { code: '+598', name: 'Uruguay' },
  { code: '+998', name: 'Uzbekistan' },
  { code: '+678', name: 'Vanuatu' },
  { code: '+379', name: 'Vatican City' },
  { code: '+58', name: 'Venezuela' },
  { code: '+84', name: 'Vietnam' },
  { code: '+967', name: 'Yemen' },
  { code: '+260', name: 'Zambia' },
  { code: '+263', name: 'Zimbabwe' }
].sort((a, b) => a.name.localeCompare(b.name));

// Icon options for announcements
const ANNOUNCEMENT_ICONS = [
  { name: 'Megaphone', component: Megaphone, color: 'text-blue-600' },
  { name: 'Calendar', component: Calendar, color: 'text-green-600' },
  { name: 'Heart', component: Heart, color: 'text-red-600' },
  { name: 'Users', component: Users, color: 'text-purple-600' },
  { name: 'Star', component: Star, color: 'text-yellow-600' },
  { name: 'Church', component: Church, color: 'text-indigo-600' },
  { name: 'Cross', component: Cross, color: 'text-gray-600' },
  { name: 'HandHeart', component: HandHeart, color: 'text-pink-600' },
  { name: 'PartyPopper', component: PartyPopper, color: 'text-orange-600' },
  { name: 'Moon', component: Moon, color: 'text-slate-600' },
  { name: 'Sparkles', component: Sparkles, color: 'text-cyan-600' },
  { name: 'MapPin', component: MapPin, color: 'text-emerald-600' }
];

// Helper function to get icon component by name
const getIconComponent = (iconName) => {
  const iconConfig = ANNOUNCEMENT_ICONS.find(icon => icon.name === iconName);
  return iconConfig || ANNOUNCEMENT_ICONS[0]; // Default to Megaphone if not found
};

// Subject options for contact form
const SUBJECT_OPTIONS = [
  { value: 'prayer', label: 'Prayer Request', icon: Heart },
  { value: 'visit', label: 'Planning to Visit', icon: MapPin },
  { value: 'baptism', label: 'Baptism Inquiry', icon: Cross },
  { value: 'volunteer', label: 'Volunteer Opportunity', icon: HandHeart },
  { value: 'other', label: 'Other', icon: MessageCircle }
];

// Media type options for admin panel
const MEDIA_TYPE_OPTIONS = [
  { value: 'video', label: 'Video Content', icon: Video },
  { value: 'audio', label: 'Audio Content', icon: Megaphone }
];

// Event category options for admin panel
const EVENT_CATEGORY_OPTIONS = [
  { value: 'general', label: 'General', icon: <Calendar className="w-4 h-4" /> },
  { value: 'service', label: 'Service', icon: <Church className="w-4 h-4" /> },
  { value: 'prayer', label: 'Prayer Meeting', icon: <Heart className="w-4 h-4" /> },
  { value: 'fellowship', label: 'Fellowship', icon: <Users className="w-4 h-4" /> },
  { value: 'conference', label: 'Conference', icon: <Megaphone className="w-4 h-4" /> },
  { value: 'outreach', label: 'Outreach', icon: <HandHeart className="w-4 h-4" /> },
  { value: 'youth', label: 'Youth Event', icon: <Star className="w-4 h-4" /> },
  { value: 'children', label: "Children's Event", icon: <Sparkles className="w-4 h-4" /> },
  { value: 'special', label: 'Special Event', icon: <PartyPopper className="w-4 h-4" /> }
];

// Helper function to convert various Google Maps URL formats to proper embed URLs
const convertToGoogleMapsEmbed = (location) => {
  if (!location) return null;
  
  // If it's already an embed URL, return as is
  if (location.includes('maps/embed')) {
    return location;
  }
  
  // If it's coordinates (lat,lng format)
  const coordRegex = /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/;
  const coordMatch = location.match(coordRegex);
  if (coordMatch) {
    const [, lat, lng] = coordMatch;
    // Use a format that includes a marker pin
    return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }
  
  // If it's a Google Maps URL with coordinates in q parameter
  const qParamMatch = location.match(/[?&]q=([^&]+)/);
  if (qParamMatch) {
    const qValue = decodeURIComponent(qParamMatch[1]);
    const coordInQ = qValue.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordInQ) {
      const [, lat, lng] = coordInQ;
      return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    // For place names or addresses, include the query which will show a pin
    return `https://maps.google.com/maps?q=${encodeURIComponent(qValue)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }
  
  // If it's a full Google Maps URL, try to extract coordinates from the URL path
  if (location.includes('google.com/maps') || location.includes('maps.google.com')) {
    // Handle /place/ URLs with DMS coordinates like: /place/23°38'03.8"N+58°06'20.0"E
    if (location.includes('/place/')) {
      const placeMatch = location.match(/\/place\/([^\/\?]+)/);
      if (placeMatch) {
        const placeString = decodeURIComponent(placeMatch[1]);
        
        // Parse DMS (Degrees Minutes Seconds) format
        const dmsRegex = /(\d+)°(\d+)'([\d.]+)"([NS])\+(\d+)°(\d+)'([\d.]+)"([EW])/;
        const dmsMatch = placeString.match(dmsRegex);
        
        if (dmsMatch) {
          const [, latDeg, latMin, latSec, latDir, lngDeg, lngMin, lngSec, lngDir] = dmsMatch;
          
          // Convert DMS to decimal degrees
          let lat = parseInt(latDeg) + parseInt(latMin)/60 + parseFloat(latSec)/3600;
          let lng = parseInt(lngDeg) + parseInt(lngMin)/60 + parseFloat(lngSec)/3600;
          
          // Apply direction (negative for S and W)
          if (latDir === 'S') lat = -lat;
          if (lngDir === 'W') lng = -lng;
          
          return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
      }
    }
    
    // Handle URLs like: https://maps.google.com/@23.634389,58.105556,15z
    const atMatch = location.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (atMatch) {
      const [, lat, lng] = atMatch;
      return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // Handle standard /maps URLs by converting to embed format
    if (location.includes('/maps?')) {
      const urlParams = new URLSearchParams(location.split('?')[1]);
      const q = urlParams.get('q');
      if (q) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
      // If no q parameter, try to convert the URL directly
      return location.replace('maps.google.com/maps', 'maps.google.com/maps').replace(/([?&])([^=]+=[^&]*)/g, (match, prefix, param) => {
        if (param.startsWith('q=')) {
          return `${prefix}${param}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
        return '';
      }) || `${location}&output=embed`;
    }
    
    // If it's a Google Maps share URL, extract what we can
    if (location.includes('goo.gl/maps') || location.includes('maps.app.goo.gl')) {
      // For shortened URLs, we'll need to use them as-is but convert to embed
      const baseUrl = location.split('?')[0];
      return `https://maps.google.com/maps?q=${encodeURIComponent(baseUrl)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
  }
  
  // If it's just a place name or address, create an embed URL with pin
  if (!location.includes('http')) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }
  
  // Default fallback - try to convert any URL to show a pin
  return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
};

// ScrollToTop component to handle scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Event Detail Page Component
const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetail, setEventDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setEventDetail(data);
        } else {
          setError('Event not found');
        }
      } catch (error) {
        console.error('Failed to fetch event details:', error);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetail();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !eventDetail) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(eventDetail.date);
  const isPastEvent = eventDate < new Date();
  const categoryInfo = EVENT_CATEGORY_OPTIONS.find(cat => cat.value === eventDetail.category);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/events')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </button>
        </div>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg font-bold tracking-wide drop-shadow-lg">Event Image</p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center mb-4">
              {categoryInfo && (
                <span className="inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 mr-4">
                  {categoryInfo.icon}
                  <span className="ml-2">{categoryInfo.label}</span>
                </span>
              )}
              <span className="text-sm text-gray-500">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md text-base">
                  <Calendar className="h-5 w-5 mr-2" />
                  {eventDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  <span className="mx-2">|</span>
                  <Clock className="h-5 w-5 mr-2" />
                  {eventDetail.time}
                </span>
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{eventDetail.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{eventDetail.description}</p>
          </div>
        </div>

        {/* Location Section - Only show for upcoming events */}
        {eventDetail.location && !isPastEvent && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-600" />
              Location
            </h2>
            
            {(() => {
              const embedUrl = convertToGoogleMapsEmbed(eventDetail.location);
              const isMapUrl = eventDetail.location.includes('google.com/maps') || eventDetail.location.includes('maps.google.com') || /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/.test(eventDetail.location);
              
              return isMapUrl ? (
                <div className="space-y-4">
                  <a
                    href={eventDetail.location.includes('http') ? eventDetail.location : `https://maps.google.com/?q=${encodeURIComponent(eventDetail.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Google Maps
                  </a>
                  
                  <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Event Location"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">{eventDetail.location}</p>
              );
            })()}
          </div>
        )}

        {/* Gallery Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Image className="h-6 w-6 mr-2 text-blue-600" />
            Event Gallery
          </h2>
          
          {isPastEvent ? (
            <div className="text-center py-12">
              <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg">Gallery photos are being processed.</p>
              <p className="text-gray-500 mt-2">Photos from this event will be available soon!</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg">Check back after the event!</p>
              <p className="text-gray-500 mt-2">Photos will be available once the event is completed.</p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        {eventDetail.contact_info && !isPastEvent && (
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Phone className="h-6 w-6 mr-2 text-blue-600" />
              Contact Information
            </h2>
            <p className="text-gray-600">{eventDetail.contact_info}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component that will contain all the routing logic
const AppContent = () => {
  // API Base URL - use environment variable or fallback to localhost
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001';
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [showNext, setShowNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Contact form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+968',
    phone: '',
    subject: '',
    message: ''
  });
  
  // Country dropdown state
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Subject dropdown state
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  
  // Admin dropdown states
  const [isAnnouncementIconDropdownOpen, setIsAnnouncementIconDropdownOpen] = useState(false);
  const [isEditAnnouncementIconDropdownOpen, setIsEditAnnouncementIconDropdownOpen] = useState(false);
  const [isMediaTypeDropdownOpen, setIsMediaTypeDropdownOpen] = useState(false);
  const [isEditMediaTypeDropdownOpen, setIsEditMediaTypeDropdownOpen] = useState(false);
  const [isEventCategoryDropdownOpen, setIsEventCategoryDropdownOpen] = useState(false);
  const [isEditEventCategoryDropdownOpen, setIsEditEventCategoryDropdownOpen] = useState(false);
  


  // Admin panel state
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const [contactMessages, setContactMessages] = useState([]);
  const [adminSermons, setAdminSermons] = useState([]);
  const [adminEvents, setAdminEvents] = useState([]);
  const [adminAnnouncements, setAdminAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: '',
    icon: 'Megaphone'
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editAnnouncementData, setEditAnnouncementData] = useState({
    title: '',
    content: '',
    date: '',
    icon: 'Megaphone'
  });
  const [newSermon, setNewSermon] = useState({
    title: '',
    description: '',
    video_url: '',
    audio_url: '',
    name: '',  // Changed from 'pastor' to 'name'
    date: '',
    scripture: '',
    duration: '',
    type: 'video' // 'video' or 'audio'
  });
  const [editingMedia, setEditingMedia] = useState(null);
  const [editMediaData, setEditMediaData] = useState({
    title: '',
    description: '',
    video_url: '',
    audio_url: '',
    name: '',
    date: '',
    scripture: '',
    duration: '',
    type: 'video'
  });
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'service',
    registration_required: false,
    contact_info: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventData, setEditEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'service',
    registration_required: false,
    contact_info: ''
  });

  // Public sermons state
  const [sermons, setSermons] = useState([]);

  // Public events state
  const [events, setEvents] = useState([]);

  // Auto-extraction state
  const [isAutoExtracting, setIsAutoExtracting] = useState(false);

  // Contact form ref for scrolling
  const contactFormRef = useRef(null);

  // Logout confirmation modal state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Authentication error state
  const [authError, setAuthError] = useState('');

  // Auto-switching images for home page (using local images)
  const heroImages = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg', 
    '/images/hero/hero-3.jpg'
  ];

  // Authentication utility functions
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      const expirationTime = payload.exp;
      
      // Add 30 seconds buffer to account for minor time differences
      const timeUntilExpiry = expirationTime - currentTime;
      const isExpired = timeUntilExpiry <= 30; // 30-second buffer
      
      if (isExpired) {
        console.log('Token expired check:');
        console.log('Current time:', new Date(currentTime * 1000));
        console.log('Token expires:', new Date(expirationTime * 1000));
        console.log('Time until expiry (seconds):', Math.floor(timeUntilExpiry));
      }
      
      return isExpired;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  };

  const handleTokenExpired = (reason = 'Session expired') => {
    console.log('Token expired, logging out user');
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    // Clear any other sensitive data
    setContactMessages([]);
    setAdminSermons([]);
    setAdminEvents([]);
    setAdminAnnouncements([]);
    
    // Show user-friendly message
    if (reason === 'Session expired') {
      setAuthError('Your session has expired. Please log in again.');
    } else if (reason === 'Inactivity') {
      setAuthError('You have been logged out due to inactivity. Please log in again.');
    }
  };

  const validateTokenAndLogout = () => {
    // Use adminToken state first, fallback to localStorage
    const tokenToCheck = adminToken || localStorage.getItem('adminToken');
    
    if (tokenToCheck && isTokenExpired(tokenToCheck)) {
      handleTokenExpired();
      return false;
    }
    return !!tokenToCheck; // Return true only if we have a token
  };

  // Session timeout management
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionTimeoutId, setSessionTimeoutId] = useState(null);

  const resetSessionTimeout = () => {
    setLastActivity(Date.now());
    if (sessionTimeoutId) {
      clearTimeout(sessionTimeoutId);
    }
    
    if (adminToken) {
      const timeoutId = setTimeout(() => {
        console.log('Session timeout - logging out due to inactivity');
        handleTokenExpired('Inactivity');
      }, SESSION_TIMEOUT);
      setSessionTimeoutId(timeoutId);
    }
  };

  // Track user activity for session management
  useEffect(() => {
    const handleUserActivity = () => {
      if (adminToken) {
        resetSessionTimeout();
      }
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Initial session timeout setup
    if (adminToken) {
      resetSessionTimeout();
    }

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
      }
    };
  }, [adminToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1;
      
      // Prepare next image
      setNextImageIndex(nextIndex);
      
      // Start crossfade
      setShowNext(true);
      
      // After fade completes, swap images
      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setShowNext(false);
      }, 1000); // Match CSS transition duration
      
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex, heroImages.length]);

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Custom country dropdown functions
  const handleCountrySelect = (countryCode) => {
    setFormData(prev => ({ ...prev, countryCode }));
    setIsCountryDropdownOpen(false);
    setCountrySearchTerm('');
  };

  // Custom subject dropdown functions
  const handleSubjectSelect = (subjectValue) => {
    setFormData(prev => ({ ...prev, subject: subjectValue }));
    setIsSubjectDropdownOpen(false);
  };

  // Custom announcement icon dropdown functions
  const handleAnnouncementIconSelect = (iconName) => {
    setNewAnnouncement(prev => ({ ...prev, icon: iconName }));
    setIsAnnouncementIconDropdownOpen(false);
  };

  // Custom media type dropdown functions
  const handleMediaTypeSelect = (mediaType) => {
    setNewSermon(prev => ({ ...prev, type: mediaType }));
    setIsMediaTypeDropdownOpen(false);
  };

  // Custom event category dropdown functions
  const handleEventCategorySelect = (category) => {
    setNewEvent(prev => ({ ...prev, category: category }));
    setIsEventCategoryDropdownOpen(false);
  };

  const handleCountrySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setCountrySearchTerm(searchTerm);
    
    // Find first country that starts with the search term
    const matchedCountry = COUNTRIES.find(country => 
      country.name.toLowerCase().startsWith(searchTerm)
    );
    if (matchedCountry) {
      setFormData(prev => ({ ...prev, countryCode: matchedCountry.code }));
    }
  };

  // Filter countries based on search term
  const getFilteredCountries = () => {
    if (!countrySearchTerm) return COUNTRIES;
    return COUNTRIES.filter(country => 
      country.name.toLowerCase().includes(countrySearchTerm.toLowerCase())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Message sent successfully! We will get back to you soon.');
        setFormData({
          fullName: '',
          email: '',
          countryCode: '+968',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Professional scroll behavior - scroll to top of form with proper offset
        setTimeout(() => {
          if (contactFormRef.current) {
            const headerHeight = 80; // Account for fixed header
            const elementTop = contactFormRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementTop - headerHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100); // Small delay to ensure DOM updates
        
        // Auto-clear success message after 8 seconds (modern UX pattern)
        setTimeout(() => {
          setSubmitMessage('');
        }, 8000);
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitMessage('Error sending message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Simulate loading and show content
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Fetch sermons and events on component mount
    fetchSermons();
    fetchEvents();
    fetchAnnouncements();
  }, []);

  // Fetch admin data when adminToken is available
  useEffect(() => {
    if (adminToken) {
      fetchContactMessages();
      fetchAdminSermons();
      fetchAdminEvents();
      fetchAdminAnnouncements();
    }
  }, [adminToken]);

  // Validate token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        console.log('Stored token is expired, clearing it');
        localStorage.removeItem('adminToken');
        setAdminToken(null);
      } else {
        console.log('Valid token found, user remains logged in');
        setAdminToken(storedToken);
      }
    }
  }, []); // Run only once on mount

  // Fetch public media
  const fetchSermons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/media`);
      if (response.ok) {
        const data = await response.json();
        setSermons(data);
      }
    } catch (error) {
      console.error('Failed to fetch sermons:', error);
    }
  };

  // Fetch public events
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  // Fetch public announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/announcements`);
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    }
  };

  // Utility function to check if announcement is new (less than 3 days old)
  const isNewAnnouncement = (dateString) => {
    const now = new Date();
    const announcementDate = new Date(dateString);
    const diffInDays = Math.floor((now - announcementDate) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3;
  };

  // Auto-extract title and description from video URL
  const autoExtractFromURL = async (url) => {
    if (!url || !url.trim()) return;

    console.log('Attempting to extract from URL:', url);
    setIsAutoExtracting(true);

    try {
      let title = '';
      let description = '';

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Extract video ID
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
          videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        }

        console.log('Extracted video ID:', videoId);

        if (videoId) {
          try {
            console.log('=== EXTRACTING YOUTUBE INFO USING BACKEND ===');
            console.log('Video URL:', url);
            
            // Call our backend endpoint for YouTube extraction
            const response = await fetch(`${API_BASE_URL}/api/extract-youtube`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: url })
            });
            
            if (response.ok) {
              const result = await response.json();
              console.log('✅ Backend extraction successful:', result);
              
              if (result.success && result.data) {
                title = result.data.title || '';
                description = result.data.description || '';
                const extractedDate = result.data.date || '';
                
                const extractedDuration = result.data.duration || '';
                
                console.log('📹 Title:', title);
                console.log('📝 Description:', description.substring(0, 100) + '...');
                console.log('📅 Extracted Date:', extractedDate);
                console.log('⏱️ Duration:', extractedDuration);
                
                // Update the form with extracted data
                setTimeout(() => {
                  setNewSermon(prev => ({
                    ...prev,
                    title: title,
                    video_url: url,
                    audio_url: '', // Clear audio URL when setting video
                    description: description,
                    date: extractedDate,
                    duration: extractedDuration,
                    type: 'video' // Ensure type is set to video for auto-extracted content
                  }));
                }, 100);
              } else {
                console.log('❌ Backend returned no data');
              }
            } else {
              const errorData = await response.json();
              console.log('❌ Backend extraction failed:', errorData);
              console.log('Status:', response.status);
            }
          } catch (error) {
            console.log('❌ YouTube extraction failed:', error);
          }
        }
      } else if (url.includes('vimeo.com')) {
        const vimeoId = url.split('vimeo.com/')[1]?.split('/')[0];
        if (vimeoId) {
          try {
            const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`, {
              mode: 'cors'
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log('Vimeo response:', data);
              title = data.title || '';
              description = `A sermon from ${data.author_name || 'Living Hope AG'}. Watch this inspiring message.`;
              
              // Vimeo oEmbed includes upload_date in some cases
              let extractedDate = '';
              if (data.upload_date) {
                extractedDate = data.upload_date.split('T')[0]; // Convert to YYYY-MM-DD
              } else {
                // Look for date in title like YouTube
                const dateMatch = data.title?.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
                if (dateMatch) {
                  const [, month, day, year] = dateMatch;
                  const fullYear = year.length === 2 ? `20${year}` : year;
                  extractedDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                } else {
                  console.log('No date pattern found in Vimeo title');
                }
              }
              
              // Update date field
              if (extractedDate) {
                setTimeout(() => {
                  setNewSermon(prev => ({
                    ...prev,
                    date: extractedDate
                  }));
                }, 500);
              }
            }
          } catch (error) {
            console.log('Vimeo extraction failed:', error);
            // Don't use fallback values - let user fill manually
          }
        }
      }

      // Update fields if we got data or use defaults
      if (title) {
        console.log('Updating sermon with:', { title, description });
        setNewSermon(prev => ({
          ...prev,
          title: title,
          description: description || prev.description
        }));
      }
    } catch (error) {
      console.log('Auto-extraction failed:', error);
    } finally {
      setIsAutoExtracting(false);
    }
  };



  // Check if current path is admin for special handling
  const isAdminPath = location.pathname === '/admin';

  // Helper function to convert YouTube URLs to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // Handle YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url; // Already in embed format
    }
    
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      // Convert Google Drive sharing URL to preview URL
      if (url.includes('/file/d/')) {
        const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (fileId) {
          return `https://drive.google.com/file/d/${fileId}/preview`;
        }
      }
      // If already in preview format, return as is
      if (url.includes('/preview')) {
        return url;
      }
    }
    
    return url; // For other video platforms
  };

  // Check if URL can be embedded for direct playback
  const canEmbedVideo = (url) => {
    if (!url) return false;
    // Allow YouTube, Vimeo, and Google Drive for iframe embedding
    return url.includes('youtube.com') || 
           url.includes('youtu.be') || 
           url.includes('vimeo.com') ||
           url.includes('drive.google.com');
  };

  // Check if we should show thumbnail preview instead of direct embed
  const shouldShowThumbnailPreview = (url) => {
    if (!url) return false;
    // We're no longer using thumbnail preview - let Google Drive embed directly
    return false;
  };

  // Get direct link for external viewing
  const getDirectLink = (url) => {
    if (!url) return '';
    
    // For Google Drive, convert to direct view link
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/view`;
      }
    }
    
    return url;
  };

  // Get video thumbnail
  const getVideoThumbnail = (url) => {
    if (!url) return null;
    
    // YouTube thumbnail
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    
    // Google Drive thumbnail
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        // Try multiple Google Drive thumbnail formats for better compatibility
        return `https://lh3.googleusercontent.com/d/${fileId}=s1920`;
      }
    }
    
    return null;
  };



  // Admin functions
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError(''); // Clear any previous errors
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCredentials)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Log token details for debugging
        try {
          const payload = JSON.parse(atob(data.access_token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          const expirationTime = payload.exp;
          const timeUntilExpiry = expirationTime - currentTime;
          
          console.log('Token received:');
          console.log('Current time:', new Date(currentTime * 1000));
          console.log('Token expires:', new Date(expirationTime * 1000));
          console.log('Time until expiry (minutes):', Math.floor(timeUntilExpiry / 60));
          
          // Only validate if token expires in less than 1 minute (very suspicious)
          if (timeUntilExpiry < 60) {
            setAuthError('Received token expires too soon. Please contact administrator.');
            return;
          }
        } catch (debugError) {
          console.error('Error parsing token for debug:', debugError);
        }
        
        setAdminToken(data.access_token);
        localStorage.setItem('adminToken', data.access_token);
        resetSessionTimeout(); // Start session timeout
        navigate('/admin');
        fetchContactMessages();
        fetchAdminSermons();
        setAdminCredentials({ username: '', password: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          setAuthError('Invalid username or password');
        } else if (response.status === 429) {
          setAuthError('Too many login attempts. Please try again later.');
        } else {
          setAuthError(errorData.detail || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Unable to connect to server. Please check your internet connection and try again.');
    }
  };

  const handleAdminLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    if (sessionTimeoutId) {
      clearTimeout(sessionTimeoutId);
      setSessionTimeoutId(null);
    }
    handleTokenExpired(); // Use the secure logout function
    setShowLogoutModal(false);
    navigate('/home');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const fetchContactMessages = async () => {
    if (!validateTokenAndLogout()) {
      console.log('Token invalid or expired, user logged out');
      return;
    }
    
    // Use the most current token
    const currentToken = adminToken || localStorage.getItem('adminToken');
    
    try {
      console.log('Fetching contact messages with token:', currentToken?.substring(0, 20) + '...');
      const response = await fetch(`${API_BASE_URL}/api/admin/contact-forms`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Contact messages response:', data);
        setContactMessages(data);
      } else if (response.status === 401) {
        console.log('Unauthorized - token may be expired');
        handleTokenExpired('Session expired');
      } else {
        console.error('Failed to fetch contact messages, status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    }
  };

  const markMessageAsRead = async (messageId) => {
    if (!validateTokenAndLogout()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/contact-forms/${messageId}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (response.ok) {
        // Update the local state to mark message as read
        setContactMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, isRead: true } : msg
          )
        );
      } else if (response.status === 401) {
        handleTokenExpired('Session expired');
      }
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const fetchAdminSermons = async () => {
    if (!adminToken) return;
    console.log('Fetching admin sermons with token:', adminToken?.substring(0, 20) + '...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/media`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      console.log('Admin media response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Admin media response data:', data);
        setAdminSermons(data.media || []);  // Handle new response structure
        console.log('Set adminSermons to:', data.media || []);
      } else {
        console.error('Failed to fetch admin media, status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch media', error);
    }
  };

  const handleAddSermon = async (e) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(newSermon)
      });

      if (response.ok) {
        setNewSermon({
          title: '',
          description: '',
          video_url: '',
          audio_url: '',
          name: '',
          date: '',
          scripture: '',
          duration: '',
          type: 'video'
        });
        fetchAdminSermons();
        alert('Sermon added successfully!');
      } else {
        alert('Failed to add sermon');
      }
    } catch (error) {
      alert('Error adding sermon');
    }
  };

  const deleteContactMessage = async (messageId) => {
    if (!adminToken || !confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/contact-messages/${messageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (response.ok) {
        fetchContactMessages();
      }
    } catch (error) {
      alert('Failed to delete message');
    }
  };

  const generateWhatsAppLink = (message) => {
    // Use the phone number directly with country code (no auto-modification)
    // Format: Remove + and any spaces/dashes for WhatsApp URL
    const phoneNumber = (message.countryCode + message.phone).replace(/[\s\-\+]/g, '') || '';
    
    if (!phoneNumber) {
      return '#'; // Return dummy link if no phone number
    }
    
    // Create reply message template
    const replyMessage = `Hi ${message.fullName}! 

Thank you for contacting Living Hope AG regarding "${message.subject}".

We received your message: "${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}"

We'd love to help you further. How can we assist you?

Blessings,
Living Hope AG Team`;

    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(replyMessage)}`;
    
    return whatsappUrl;
  };

  const deleteSermon = async (sermonId) => {
    if (!adminToken || !confirm('Are you sure you want to delete this media?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/media/${sermonId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (response.ok) {
        fetchAdminSermons();
      }
    } catch (error) {
      alert('Failed to delete sermon');
    }
  };

  const startEditMedia = (media) => {
    setEditingMedia(media.id);
    setEditMediaData({
      title: media.title,
      description: media.description,
      video_url: media.video_url || '',
      audio_url: media.audio_url || '',
      name: media.name,
      date: media.date,
      scripture: media.scripture || '',
      duration: media.duration || '',
      type: media.video_url ? 'video' : 'audio'
    });
  };

  const cancelEditMedia = () => {
    setEditingMedia(null);
    setEditMediaData({
      title: '',
      description: '',
      video_url: '',
      audio_url: '',
      name: '',
      date: '',
      scripture: '',
      duration: '',
      type: 'video'
    });
  };

  const handleEditMedia = async (e) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/media/${editingMedia}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(editMediaData)
      });

      if (response.ok) {
        fetchAdminSermons();
        cancelEditMedia();
        alert('Media updated successfully!');
      } else {
        alert('Failed to update media');
      }
    } catch (error) {
      console.error('Error updating media:', error);
      alert('Error updating media');
    }
  };

  // Event management functions
  const fetchAdminEvents = async () => {
    if (!adminToken) return;
    console.log('Fetching admin events with token:', adminToken?.substring(0, 20) + '...');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/events`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      console.log('Admin events response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Admin events response data:', data);
        setAdminEvents(data);
        console.log('Set adminEvents to:', data);
      } else {
        console.error('Failed to fetch admin events, status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(newEvent)
      });
      
      if (response.ok) {
        setNewEvent({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          category: 'service',
          registration_required: false,
          contact_info: ''
        });
        fetchAdminEvents();
        alert('Event added successfully!');
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event');
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      
      if (response.ok) {
        fetchAdminEvents();
        alert('Event deleted successfully!');
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  const startEditEvent = (event) => {
    setEditingEvent(event.id);
    setEditEventData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      registration_required: event.registration_required,
      contact_info: event.contact_info || ''
    });
  };

  const cancelEditEvent = () => {
    setEditingEvent(null);
    setEditEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'service',
      registration_required: false,
      contact_info: ''
    });
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/events/${editingEvent}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(editEventData)
      });

      if (response.ok) {
        fetchAdminEvents();
        fetchEvents(); // Also refresh public events
        cancelEditEvent();
        alert('Event updated successfully!');
      } else {
        alert('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event');
    }
  };

  // Announcement management functions
  const fetchAdminAnnouncements = async () => {
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/announcements`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAdminAnnouncements(data);
      }
    } catch (error) {
      console.error('Failed to fetch announcements', error);
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(newAnnouncement)
      });

      if (response.ok) {
        fetchAdminAnnouncements();
        fetchAnnouncements(); // Also refresh public announcements
        setNewAnnouncement({ title: '', content: '', date: '', icon: 'Megaphone' });
        alert('Announcement added successfully!');
      } else {
        alert('Failed to add announcement');
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('Error adding announcement');
    }
  };

  const deleteAnnouncement = async (announcementId) => {
    if (!adminToken || !confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/announcements/${announcementId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });

      if (response.ok) {
        fetchAdminAnnouncements();
        fetchAnnouncements(); // Also refresh public announcements
        alert('Announcement deleted successfully!');
      } else {
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Error deleting announcement');
    }
  };

  const startEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement.id);
    setEditAnnouncementData({
      title: announcement.title,
      content: announcement.content,
      date: announcement.date,
      icon: announcement.icon
    });
  };

  const cancelEditAnnouncement = () => {
    setEditingAnnouncement(null);
    setEditAnnouncementData({
      title: '',
      content: '',
      date: '',
      icon: 'Megaphone'
    });
  };

  const handleEditAnnouncement = async (e) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/announcements/${editingAnnouncement}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(editAnnouncementData)
      });

      if (response.ok) {
        fetchAdminAnnouncements();
        fetchAnnouncements(); // Also refresh public announcements
        cancelEditAnnouncement();
        alert('Announcement updated successfully!');
      } else {
        alert('Failed to update announcement');
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
      alert('Error updating announcement');
    }
  };

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'knowgod', label: 'Know God', icon: Cross },
    { id: 'media', label: 'Media', icon: Video },  // Changed ID from 'sermons' to 'media'
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'give', label: 'Give', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'about', label: 'About', icon: Info }
  ];

  // Floating particles component
  const FloatingParticles = () => (
    <div className="particles">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${12 + Math.random() * 6}s`
          }}
        />
      ))}
    </div>
  );

  const renderHome = () => (
    <div className="min-h-screen">
      {/* Hero Section with Auto-switching Images */}
      <div className="relative h-screen overflow-hidden hero-special">
        <FloatingParticles />
        {/* Background Image - Current */}
        <div className="absolute inset-0">
          <img
            src={heroImages[currentImageIndex]}
            alt="Living Hope AG"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Foreground Image - Next (fades in during transition) */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${showNext ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={heroImages[nextImageIndex]}
            alt="Living Hope AG"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 gradient-flow opacity-70 z-10"></div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg text-glow">
              Living Hope AG
            </h1>
            <p className="text-lg md:text-xl mb-6 text-shadow slide-in-left">
              "Jesus said to her, 'Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst.'" - John 4:13-14
            </p>
            <div className="bg-white/20 rounded-lg p-4 mt-3 mb-6 card-hover subtle-glow slide-in-right max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center"><PartyPopper className="mr-2 h-5 w-5" /> Join Us This Friday</h3>
              <p className="text-base">10:00 AM Oman Time</p>
              <a 
                href="https://maps.google.com/?q=23.634389,58.105556" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm opacity-90 mb-1 hover:opacity-100 hover:underline transition-all duration-200 inline-flex items-center justify-center"
              >
                <MapPin className="mr-1 h-3 w-3" />
                Location
              </a>
              
            </div>
            <div className="flex flex-col items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-base btn-primary btn-ripple scale-hover flex items-center mb-2">
                Join Our Service Online <Sparkles className="ml-2 h-4 w-4" />
              </button>
              <p className="text-sm opacity-75 italic">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white subtle-glow' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Animated wave */}
        <div className="wave"></div>
      </div>

      {/* Announcements Section */}
      <div className="bg-gray-50 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 fade-in">
              Latest Announcements
            </h2>
            {announcements.length > 0 && (
              <Link 
                to="/announcements"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200 flex items-center"
              >
                View All
                <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
              </Link>
            )}
          </div>
          
          {announcements.length === 0 ? (
            // No announcements message
            <div className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <Megaphone className="h-16 w-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Announcements Yet</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Check back soon for the latest updates and announcements from Living Hope AG.
              </p>
            </div>
          ) : (
            // Dynamic announcements - show only first 3 on home page
            <div className="grid md:grid-cols-3 gap-8">
              {announcements.slice(0, 3).map((announcement, index) => {
                const iconConfig = getIconComponent(announcement.icon);
                const IconComponent = iconConfig.component;
                const iconColor = iconConfig.color;
                
                return (
                  <div key={announcement.id} className="bg-white rounded-lg shadow-lg p-6 card-hover stagger-animation relative">
                    {isNewAnnouncement(announcement.date) && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        NEW
                      </div>
                    )}
                    <div className={`text-3xl mb-4 icon-float ${iconColor}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{announcement.title}</h3>
                    <p className="text-gray-600 mb-4">{announcement.content}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(announcement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Time ago utility function (YouTube-style)
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (let [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    
    return 'Just now';
  };

  const renderSermons = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 fade-in">
          Latest Media
        </h2>
        {sermons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50"><BookOpen className="h-16 w-16 mx-auto" /></div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Media Available</h3>
            <p className="text-gray-500">Check back soon for new videos and content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon, index) => (
              <div key={sermon.id || index} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover stagger-animation">
                {sermon.video_url ? (
                  <div className="aspect-video relative overflow-hidden">
                    {canEmbedVideo(sermon.video_url) ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={getEmbedUrl(sermon.video_url)}
                        title={sermon.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="img-transition"
                      ></iframe>
                    ) : (
                      /* Fallback for non-embeddable videos */
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group cursor-pointer">
                        <a 
                          href={getDirectLink(sermon.video_url)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-center text-white group-hover:scale-105 transition-transform duration-300"
                        >
                          <Play className="h-16 w-16 mx-auto mb-2 opacity-60" />
                          <p className="text-sm opacity-80">Watch Video</p>
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Video className="h-12 w-12 mx-auto mb-2" />
                      <p>Audio Only</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{sermon.title}</h3>
                  <p className="text-gray-600 mb-4">{sermon.description}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    {sermon.name} • {timeAgo(sermon.date)}
                    {sermon.duration && <span> • {sermon.duration}</span>}
                    <span className={`ml-2 inline-block px-2 py-1 text-xs rounded-full ${
                      sermon.video_url ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {sermon.video_url ? 'Video' : 'Audio'}
                    </span>
                  </div>
                  {sermon.scripture && (
                    <p className="text-sm text-blue-600 italic mb-2">{sermon.scripture}</p>
                  )}
                  {sermon.series && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {sermon.series}
                    </span>
                  )}
                  {sermon.audio_url && (
                    <div className="mt-3">
                      <audio controls className="w-full">
                        <source src={sermon.audio_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Church Announcements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news and announcements from Living Hope AG
          </p>
        </div>
        
        {announcements.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <Megaphone className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Announcements Yet</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Check back soon for the latest updates and announcements from Living Hope AG.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement, index) => {
              const iconConfig = getIconComponent(announcement.icon);
              const IconComponent = iconConfig.component;
              const iconColor = iconConfig.color;
              
              return (
                <div key={announcement.id} className="bg-white rounded-lg shadow-lg p-6 card-hover stagger-animation relative">
                  {isNewAnnouncement(announcement.date) && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      NEW
                    </div>
                  )}
                  <div className={`text-3xl mb-4 icon-float ${iconColor}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{announcement.title}</h3>
                  <p className="text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            About Living Hope AG
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a community of believers passionate about experiencing and sharing the life-changing love of Jesus Christ.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="slide-in-left">
            <img
              src="https://images.unsplash.com/photo-1695938746747-ec185ea81325"
              alt="Church Community"
              className="rounded-lg shadow-lg w-full h-96 object-cover img-transition"
            />
          </div>
          <div className="slide-in-right">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Life at Living Hope AG</h3>
            <p className="text-gray-600 mb-6 text-lg">
              At Living Hope AG, we believe in creating a warm, welcoming environment where everyone can grow in their relationship with God. Our community is built on love, acceptance, and the transformative power of Christ's message.
            </p>
            <p className="text-gray-600 mb-6 text-lg">
              We offer various programs and services designed to help you connect with God and with others in our faith community. Whether you're seeking spiritual growth, community connection, or simply exploring faith, you'll find a place here.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-lg p-8 text-center card-hover stagger-animation">
            <div className="text-4xl mb-4 icon-float"><Users className="h-10 w-10" /></div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Kid's Meeting</h3>
            <p className="text-gray-600">
              Every Sunday, we host special programs for children aged 3-12. Our kids enjoy interactive Bible stories, music, games, and activities that help them learn about God's love in age-appropriate ways.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-8 text-center card-hover stagger-animation">
            <div className="text-4xl mb-4 icon-float"><Moon className="h-10 w-10" /></div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">All Night Meeting</h3>
            <p className="text-gray-600">
              Once a month, we gather for powerful overnight prayer and worship sessions. These special services run from 10 PM to 6 AM, featuring extended worship, prayer, testimonies, and seeking God's presence together.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-8 text-center card-hover stagger-animation">
            <div className="text-4xl mb-4 icon-float"><Star className="h-10 w-10" /></div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Living Hope Experience</h3>
            <p className="text-gray-600">
              Our church name comes from the hope we have in Jesus Christ - the eternal life and future He offers. We strive to help every person discover this life-giving relationship with Christ that satisfies the deepest longings of the soul.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 fade-in">
          Events
        </h2>
        
        {events.length === 0 ? (
          <div className="text-center py-12 mb-16">
            <div className="text-6xl mb-4 opacity-50"><Calendar className="h-16 w-16 mx-auto" /></div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Events Scheduled</h3>
            <p className="text-gray-500">Check back soon for upcoming events and activities!</p>
          </div>
        ) : (
          <>
            {/* Upcoming Events Section */}
            {(() => {
              const currentDate = new Date();
              const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
              
              if (upcomingEvents.length > 0) {
                return (
                  <div className="mb-16">
                    <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 fade-in">
                      Upcoming Events
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {upcomingEvents.map((event, index) => (
                        <Link 
                          key={event.id || index} 
                          to={`/events/${event.id}`}
                          className="block bg-white rounded-lg shadow-lg overflow-hidden card-hover stagger-animation transition-transform duration-200 hover:scale-105 cursor-pointer"
                        >
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <Calendar className="h-12 w-12 mx-auto mb-2" />
                              <p>Event Image</p>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center mb-2">
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                {EVENT_CATEGORY_OPTIONS.find(cat => cat.value === event.category)?.label || event.category || 'Event'}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            {event.registration_required && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                                <p className="text-xs text-yellow-800">Registration Required</p>
                                {event.contact_info && (
                                  <p className="text-xs text-yellow-600">{event.contact_info}</p>
                                )}
                              </div>
                            )}
                            <div className="text-blue-600 hover:text-blue-800 font-semibold btn-ripple scale-hover inline-flex items-center">
                              View Details →
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Past Events Section */}
            {(() => {
              const currentDate = new Date();
              const pastEvents = events.filter(event => new Date(event.date) < currentDate);
              
              if (pastEvents.length > 0) {
                return (
                  <div>
                    <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 fade-in">
                      Past Events
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {pastEvents.map((event, index) => (
                        <Link 
                          key={event.id || index} 
                          to={`/events/${event.id}`}
                          className="block bg-white rounded-lg shadow-lg overflow-hidden card-hover stagger-animation transition-transform duration-200 hover:scale-105"
                        >
                          <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <Calendar className="h-8 w-8 mx-auto mb-1" />
                              <p className="text-xs">Event Image</p>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-1">{event.title}</h4>
                            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-xs text-blue-600 mt-2 font-medium">View Gallery →</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </>
        )}

      </div>
    </div>
  );

  // Event Detail Page
  const renderEventDetail = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventDetail, setEventDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchEventDetail = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
          if (response.ok) {
            const data = await response.json();
            setEventDetail(data);
          } else {
            setError('Event not found');
          }
        } catch (error) {
          console.error('Failed to fetch event details:', error);
          setError('Failed to load event details');
        } finally {
          setLoading(false);
        }
      };

      if (eventId) {
        fetchEventDetail();
      }
    }, [eventId]);

    if (loading) {
      return (
        <div className="min-h-screen bg-white py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      );
    }

    if (error || !eventDetail) {
      return (
        <div className="min-h-screen bg-white py-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/events')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Back to Events
            </button>
          </div>
        </div>
      );
    }

    const eventDate = new Date(eventDetail.date);
    const currentDate = new Date();
    const isEventPast = eventDate < currentDate;
    const categoryInfo = EVENT_CATEGORY_OPTIONS.find(cat => cat.value === eventDetail.category);

    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate('/events')}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
            Back to Events
          </button>

          {/* Event Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Event Image</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center mb-4">
                {categoryInfo && (
                  <span className="flex items-center text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 mr-4">
                    {categoryInfo.icon}
                    <span className="ml-2">{categoryInfo.label}</span>
                  </span>
                )}
                <span className="text-lg text-gray-600">
                  {eventDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {eventDetail.time}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{eventDetail.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{eventDetail.description}</p>
              
              {eventDetail.registration_required && !isEventPast && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-yellow-800 mb-2">Registration Required</h3>
                  {eventDetail.contact_info && (
                    <p className="text-yellow-700">{eventDetail.contact_info}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Location Section */}
          {eventDetail.location && !isEventPast && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                Location
              </h2>
              {(() => {
                const embedUrl = convertToGoogleMapsEmbed(eventDetail.location);
                const isMapUrl = eventDetail.location.includes('google.com/maps') || eventDetail.location.includes('maps.google.com') || /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/.test(eventDetail.location);
                
                return isMapUrl ? (
                  <div>
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                    <a
                      href={eventDetail.location.includes('http') ? eventDetail.location : `https://maps.google.com/?q=${encodeURIComponent(eventDetail.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-600">{eventDetail.location}</p>
                );
              })()}
            </div>
          )}

          {/* Gallery Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2" />
              Event Gallery
            </h2>
            
            {!isEventPast ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Gallery Coming Soon</h3>
                <p className="text-gray-500">
                  Check back after the event to see photos and highlights from this gathering.
                </p>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Gallery Not Available</h3>
                <p className="text-gray-500">
                  Photos from this event are not yet available. Please check back later or contact us if you have questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGive = () => (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Support Our Ministry
          </h2>
          <p className="text-xl text-gray-600">
            Your generous giving helps us continue spreading the Gospel and serving our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-lg p-8 card-hover slide-in-left">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Where Your Giving Goes</h3>
            <ul className="space-y-3 text-gray-600">
              {[
                "Supporting local community outreach programs",
                "Maintaining and improving our worship facilities",
                "Funding children's and youth ministry programs",
                "Supporting mission work and evangelism",
                "Providing assistance to families in need"
              ].map((item, index) => (
                <li key={index} className="flex items-center stagger-animation">
                  <span className="text-blue-600 mr-3">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 card-hover slide-in-right">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Ways to Give</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border card-hover">
                <h4 className="font-semibold mb-2">Online Giving</h4>
                <p className="text-sm text-gray-600 mb-3">Secure online giving through our payment processor</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-primary btn-ripple flex items-center justify-center">
                  Give Online <Sparkles className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg border card-hover">
                <h4 className="font-semibold mb-2">Bank Transfer</h4>
                <p className="text-sm text-gray-600 mb-2">Bank: Muscat Bank</p>
                <p className="text-sm text-gray-600 mb-2">Account: Living Hope AG</p>
                <p className="text-sm text-gray-600">Account Number: 1234567890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center appear">
          <p className="text-gray-600 mb-6 italic text-lg">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded gentle-pulse">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> All gifts are used solely for church activities and community service. We maintain full transparency in our financial records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 fade-in">
          Contact Us
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8 card-hover slide-in-left">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Get In Touch</h3>
            
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Address", content: "23°38'03.8\"N 58°06'20.0\"E\nMuscat, Oman" },
                { icon: Phone, title: "Phone", content: "+968 1234 5678" },
                { icon: Mail, title: "Email", content: "info@livinghopechurch.om" },
                { icon: Clock, title: "Service Times", content: "Friday Service: 10:00 AM\nSunday Kids Meeting: 3:00 PM\nMonthly All Night: Last Friday" }
              ].map((contact, index) => (
                <div key={index} className="flex items-start stagger-animation">
                  <div className="text-blue-600 text-xl mr-4 mt-1 icon-hover"><contact.icon className="h-5 w-5" /></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.title}</h4>
                    <p className="text-gray-600 whitespace-pre-line">{contact.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">Location</h4>
              <div className="bg-gray-200 rounded-lg h-64 overflow-hidden card-hover">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3656.1234567890!2d58.10555!3d23.634388888888888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDM4JzAzLjgiTiA1OMKwMDYnMjAuMCJF!5e0!3m2!1sen!2som!4v1234567890!5m2!1sen!2som"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Living Hope AG Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div ref={contactFormRef} className="bg-white rounded-lg shadow-lg p-8 card-hover slide-in-right">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
            
            {submitMessage && (
              <div className={`p-6 rounded-xl mb-8 border-l-4 shadow-lg transform transition-all duration-500 ${
                submitMessage.includes('successfully') 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-800' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-500 text-red-800'
              }`}>
                <div className="flex items-center">
                  {submitMessage.includes('successfully') ? (
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">
                      {submitMessage.includes('successfully') ? 'Message Sent!' : 'Something went wrong'}
                    </h4>
                    <p className="text-sm opacity-90">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="stagger-animation">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="stagger-animation">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="stagger-animation">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  {/* Custom Country Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="min-w-[140px] px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input bg-gray-50 text-left flex items-center justify-between transition-colors duration-200 hover:border-gray-400"
                    >
                      <span className="font-mono text-sm">
                        {COUNTRIES.find(c => c.code === formData.countryCode)?.code || '+968'} {COUNTRIES.find(c => c.code === formData.countryCode)?.name || 'Oman'}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>
                    
                    {isCountryDropdownOpen && (
                      <div className="absolute z-50 w-80 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-hidden">
                        <div className="p-2 border-b border-gray-200">
                          <input
                            type="text"
                            placeholder="Type to search countries..."
                            value={countrySearchTerm}
                            onChange={handleCountrySearch}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto max-h-48">
                          {getFilteredCountries().map((country, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleCountrySelect(country.code)}
                              className={`w-full text-left px-3 py-2 hover:bg-gray-100 text-sm border-b border-gray-100 font-mono transition-colors duration-150 ${
                                formData.countryCode === country.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                              }`}
                            >
                              <span className="inline-block w-12 text-gray-600">{country.code}</span>
                              <span className="ml-2">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Click outside to close */}
                    {isCountryDropdownOpen && (
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => {
                          setIsCountryDropdownOpen(false);
                          setCountrySearchTerm('');
                        }}
                      />
                    )}
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="stagger-animation">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input bg-white text-left flex items-center justify-between transition-colors duration-200 hover:border-gray-400"
                  >
                    <span className="text-gray-700">
                      {formData.subject ? 
                        SUBJECT_OPTIONS.find(opt => opt.value === formData.subject)?.label || 'Select a subject' 
                        : 'Select a subject'
                      }
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {isSubjectDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                      {SUBJECT_OPTIONS.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSubjectSelect(option.value)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center ${
                              formData.subject === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            <IconComponent className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Click outside to close */}
                  {isSubjectDropdownOpen && (
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsSubjectDropdownOpen(false)}
                    ></div>
                  )}
                </div>
              </div>

              <div className="stagger-animation">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed scale-95' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl scale-100 hover:scale-105'
                } text-white focus:outline-none focus:ring-4 focus:ring-blue-300`}
              >
                <div className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKnowGod = () => (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Know God</h2>
          <p className="text-xl text-gray-600">
            Discover the life-changing relationship with Jesus Christ, your Lord and Savior
          </p>
        </div>

        <div className="space-y-12">
          {[
            {
              number: 1,
              title: "God Loves You",
              verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
              content: "God created you for a purpose and loves you unconditionally. His love is not based on your performance or worthiness, but on His character and grace.",
              color: "bg-blue-600"
            },
            {
              number: 2,
              title: "We Are All Sinners",
              verse: "For all have sinned and fall short of the glory of God. - Romans 3:23",
              content: "Sin separates us from God and creates a barrier in our relationship with Him. We cannot reach God through our own efforts or good works.",
              color: "bg-red-600"
            },
            {
              number: 3,
              title: "Jesus Died for You",
              verse: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us. - Romans 5:8",
              content: "Jesus Christ, God's Son, took the punishment for our sins by dying on the cross. Through His sacrifice, the barrier between us and God is removed.",
              color: "bg-green-600"
            },
            {
              number: 4,
              title: "Accept Jesus as Your Savior",
              verse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved. - Romans 10:9",
              content: "Salvation is a gift from God that cannot be earned. You receive it by faith - trusting in Jesus Christ as your Lord and Savior.",
              color: "bg-purple-600"
            },
            {
              number: 5,
              title: "Live as a New Creation",
              verse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here! - 2 Corinthians 5:17",
              content: "When you accept Jesus, you become a new creation. God gives you a new heart, a new purpose, and the promise of eternal life with Him.",
              color: "bg-yellow-600"
            }
          ].map((step, index) => (
            <div key={index} className="flex items-start space-x-6 stagger-animation">
              <div className={`flex-shrink-0 w-12 h-12 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-xl step-indicator`}>
                {step.number}
              </div>
              <div className="slide-in-right">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 mb-4 italic">{step.verse}</p>
                <p className="text-gray-600">{step.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 mt-12 card-hover">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Ready to Take the Next Step?
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            If you want to accept Jesus Christ as your Lord and Savior, you can pray this prayer:
          </p>
          <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 subtle-glow">
            <p className="text-gray-700 italic">
              "Dear God, I know that I am a sinner and I need Your forgiveness. I believe that Jesus Christ died for my sins and rose from the dead. I want to turn from my sins and invite Jesus to come into my heart and life. I want to trust and follow Him as my Lord and Savior. In Jesus' name, Amen."
            </p>
          </div>
          <div className="text-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg btn-primary btn-ripple scale-hover">
              I Prayed This Prayer
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            What's Next?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Read the Bible", description: "Start with the Gospel of John to learn more about Jesus." },
              { icon: HandHeart, title: "Pray Daily", description: "Talk to God regularly and build your relationship with Him." },
              { icon: Church, title: "Join Our Church", description: "Connect with other believers and grow in your faith." }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg card-hover stagger-animation">
                <div className="text-3xl mb-4 icon-float"><step.icon className="h-8 w-8" /></div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Admin login page
  const renderAdminLogin = () => (
    <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Admin Access</h2>
          <p className="text-gray-600 mt-2">Living Hope AG Administration</p>
        </div>
        
        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin password"
              required
            />
          </div>
          
          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 text-center">{authError}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Login to Admin Panel
          </button>
        </form>
      </div>
    </div>
  );

  // Admin dashboard
  const renderAdminDashboard = () => (
    <div className="min-h-screen bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-gray-600 mt-2">Living Hope AG Administration Panel</p>
          </div>
          <button
            onClick={handleAdminLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
        
        {/* Contact Messages Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Contact Messages</h3>
            <div className="flex gap-2">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {contactMessages.filter(msg => !msg.isRead).length} unread
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {contactMessages.length} total
              </span>
            </div>
          </div>
          
          {contactMessages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No contact messages yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contactMessages.map((message) => (
                <div key={message.id} className={`border rounded-lg p-6 hover:bg-gray-50 transition-colors duration-200 ${
                  message.isRead ? 'border-gray-200 bg-white' : 'border-blue-300 bg-white shadow-md'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-xl text-gray-800">{message.fullName}</h4>
                        {!message.isRead && (
                          <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Unread
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                      <p className="text-sm text-gray-600">{message.phone ? `${message.countryCode || ''} ${message.phone}` : 'No phone provided'}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{new Date(message.created_at).toLocaleDateString()}</span>
                      <button
                        onClick={() => deleteContactMessage(message.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded transition-colors duration-200"
                        title="Delete message"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-semibold text-blue-700 mb-3 text-lg">Subject: {message.subject}</p>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-gray-800 leading-relaxed">{message.message}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <a 
                        href={`mailto:${message.email}`}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2 transition-colors duration-200"
                      >
                        <Mail className="h-4 w-4" />
                        Reply via Email
                      </a>
                      {message.phone && message.countryCode && (
                        <a 
                          href={generateWhatsAppLink(message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 text-sm flex items-center gap-2 transition-colors duration-200"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Reply in WhatsApp
                        </a>
                      )}
                    </div>
                    
                    {!message.isRead && (
                      <button
                        onClick={() => markMessageAsRead(message.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Announcements Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Manage Announcements</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {adminAnnouncements.length} announcements
            </span>
          </div>
          
          {/* Add New Announcement Form */}
          <form onSubmit={handleAddAnnouncement} className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Add New Announcement</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Announcement Title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                placeholder="Date"
                value={newAnnouncement.date}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, date: e.target.value})}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementIconDropdownOpen(!isAnnouncementIconDropdownOpen)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between transition-colors duration-200 hover:border-gray-400"
                >
                  <span className="flex items-center">
                    {(() => {
                      const IconComponent = getIconComponent(newAnnouncement.icon).component;
                      const iconColor = getIconComponent(newAnnouncement.icon).color;
                      return (
                        <>
                          <IconComponent className={`h-5 w-5 mr-2 ${iconColor}`} />
                          <span className="text-gray-700">{newAnnouncement.icon}</span>
                        </>
                      );
                    })()}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {isAnnouncementIconDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {ANNOUNCEMENT_ICONS.map((icon, index) => {
                      const IconComponent = icon.component;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleAnnouncementIconSelect(icon.name)}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center ${
                            newAnnouncement.icon === icon.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          <IconComponent className={`h-4 w-4 mr-3 ${icon.color}`} />
                          <span>{icon.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {/* Click outside to close */}
                {isAnnouncementIconDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsAnnouncementIconDropdownOpen(false)}
                  ></div>
                )}
              </div>
            </div>
            <textarea
              placeholder="Announcement Content"
              value={newAnnouncement.content}
              onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Announcement
            </button>
          </form>
          
          {/* Existing Announcements List */}
          {adminAnnouncements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No announcements added yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {adminAnnouncements.map((announcement) => {
                const iconConfig = getIconComponent(announcement.icon);
                const IconComponent = iconConfig.component;
                const iconColor = iconConfig.color;
                
                return (
                  <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                    {editingAnnouncement === announcement.id ? (
                      // Edit Mode
                      <form onSubmit={handleEditAnnouncement} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            value={editAnnouncementData.title}
                            onChange={(e) => setEditAnnouncementData({...editAnnouncementData, title: e.target.value})}
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <input
                            type="date"
                            value={editAnnouncementData.date}
                            onChange={(e) => setEditAnnouncementData({...editAnnouncementData, date: e.target.value})}
                            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsEditAnnouncementIconDropdownOpen(!isEditAnnouncementIconDropdownOpen)}
                              className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between transition-colors duration-200 hover:border-gray-400"
                            >
                              <span className="flex items-center">
                                {(() => {
                                  const IconComponent = getIconComponent(editAnnouncementData.icon).component;
                                  const iconColor = getIconComponent(editAnnouncementData.icon).color;
                                  return (
                                    <>
                                      <IconComponent className={`h-5 w-5 mr-2 ${iconColor}`} />
                                      <span className="text-gray-700">{editAnnouncementData.icon}</span>
                                    </>
                                  );
                                })()}
                              </span>
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            </button>
                            
                            {isEditAnnouncementIconDropdownOpen && (
                              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                {ANNOUNCEMENT_ICONS.map((icon, index) => {
                                  const IconComponent = icon.component;
                                  return (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() => {
                                        setEditAnnouncementData({...editAnnouncementData, icon: icon.name});
                                        setIsEditAnnouncementIconDropdownOpen(false);
                                      }}
                                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center ${
                                        editAnnouncementData.icon === icon.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                      }`}
                                    >
                                      <IconComponent className={`h-4 w-4 mr-3 ${icon.color}`} />
                                      <span>{icon.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                            
                            {/* Click outside to close */}
                            {isEditAnnouncementIconDropdownOpen && (
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsEditAnnouncementIconDropdownOpen(false)}
                              ></div>
                            )}
                          </div>
                        </div>
                        <textarea
                          value={editAnnouncementData.content}
                          onChange={(e) => setEditAnnouncementData({...editAnnouncementData, content: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows="3"
                          required
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditAnnouncement}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // View Mode
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4 flex-1">
                          <div className={`${iconColor} mt-1`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-800">{announcement.title}</h4>
                            <p className="text-gray-600 mb-2">Date: {new Date(announcement.date).toLocaleDateString()}</p>
                            <p className="text-gray-700 mb-3">{announcement.content}</p>
                            <p className="text-xs text-gray-400">Created: {new Date(announcement.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditAnnouncement(announcement)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                            title="Edit Announcement"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteAnnouncement(announcement.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                            title="Delete Announcement"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Media Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Manage Media</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {adminSermons.length} videos
            </span>
          </div>
          
          {/* Add New Sermon Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Media
            </h4>
            <form onSubmit={handleAddSermon} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Media Title"
                  value={newSermon.title}
                  onChange={(e) => setNewSermon({...newSermon, title: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Creator/Speaker Name"
                  value={newSermon.name}
                  onChange={(e) => setNewSermon({...newSermon, name: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="date"
                  value={newSermon.date}
                  onChange={(e) => setNewSermon({...newSermon, date: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsMediaTypeDropdownOpen(!isMediaTypeDropdownOpen)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between transition-colors duration-200 hover:border-gray-400"
                  >
                    <span className="flex items-center">
                      {(() => {
                        const selectedType = MEDIA_TYPE_OPTIONS.find(opt => opt.value === newSermon.type);
                        const IconComponent = selectedType?.icon || Video;
                        return (
                          <>
                            <IconComponent className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="text-gray-700">{selectedType?.label || 'Video Content'}</span>
                          </>
                        );
                      })()}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {isMediaTypeDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                      {MEDIA_TYPE_OPTIONS.map((option, index) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleMediaTypeSelect(option.value)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center ${
                              newSermon.type === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            }`}
                          >
                            <IconComponent className="h-4 w-4 mr-3 text-blue-600" />
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Click outside to close */}
                  {isMediaTypeDropdownOpen && (
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsMediaTypeDropdownOpen(false)}
                    ></div>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="url"
                    placeholder={newSermon.type === 'video' ? "Video URL (YouTube, Vimeo, etc.)" : "Audio URL (SoundCloud, podcast link, etc.)"}
                    value={newSermon.type === 'video' ? newSermon.video_url : newSermon.audio_url}
                    onChange={(e) => {
                      if (newSermon.type === 'video') {
                        setNewSermon({...newSermon, video_url: e.target.value, audio_url: ''});
                      } else {
                        setNewSermon({...newSermon, audio_url: e.target.value, video_url: ''});
                      }
                    }}
                    onBlur={(e) => {
                      // Auto-extract only works for video URLs (YouTube, Vimeo)
                      const url = e.target.value;
                      if (newSermon.type === 'video' && url && (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com'))) {
                        setTimeout(() => autoExtractFromURL(url), 100);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {isAutoExtracting && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
              <textarea
                placeholder="Media Description"
                value={newSermon.description}
                onChange={(e) => setNewSermon({...newSermon, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Scripture Reference (e.g., John 3:16)"
                value={newSermon.scripture}
                onChange={(e) => setNewSermon({...newSermon, scripture: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Duration (auto-filled from video, e.g., 45:30)"
                value={newSermon.duration}
                onChange={(e) => setNewSermon({...newSermon, duration: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                title="This will be automatically filled when you paste a video URL"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Media
              </button>
            </form>
          </div>
          
          {/* Existing Sermons List */}
          {adminSermons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No media added yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {adminSermons.map((sermon) => (
                <div key={sermon.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  {editingMedia === sermon.id ? (
                    // Edit Mode
                    <form onSubmit={handleEditMedia} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Media Title"
                          value={editMediaData.title}
                          onChange={(e) => setEditMediaData({...editMediaData, title: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Speaker/Pastor Name"
                          value={editMediaData.name}
                          onChange={(e) => setEditMediaData({...editMediaData, name: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <input
                          type="date"
                          value={editMediaData.date}
                          onChange={(e) => setEditMediaData({...editMediaData, date: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsEditMediaTypeDropdownOpen(!isEditMediaTypeDropdownOpen)}
                            className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-left flex items-center justify-between transition-colors duration-200 hover:border-gray-400"
                          >
                            <span className="flex items-center">
                              {(() => {
                                const selectedType = MEDIA_TYPE_OPTIONS.find(opt => opt.value === editMediaData.type);
                                const IconComponent = selectedType?.icon || Video;
                                return (
                                  <>
                                    <IconComponent className="h-4 w-4 mr-2 text-blue-600" />
                                    <span className="text-gray-700">{selectedType?.label || 'Video Content'}</span>
                                  </>
                                );
                              })()}
                            </span>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          </button>
                          
                          {isEditMediaTypeDropdownOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
                              {MEDIA_TYPE_OPTIONS.map((option, index) => {
                                const IconComponent = option.icon;
                                return (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                      setEditMediaData({...editMediaData, type: option.value});
                                      setIsEditMediaTypeDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center ${
                                      editMediaData.type === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                    }`}
                                  >
                                    <IconComponent className="h-4 w-4 mr-3 text-blue-600" />
                                    <span>{option.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* Click outside to close */}
                          {isEditMediaTypeDropdownOpen && (
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsEditMediaTypeDropdownOpen(false)}
                            ></div>
                          )}
                        </div>
                      </div>
                      <textarea
                        placeholder="Media Description"
                        value={editMediaData.description}
                        onChange={(e) => setEditMediaData({...editMediaData, description: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        required
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="url"
                          placeholder="Video URL"
                          value={editMediaData.video_url}
                          onChange={(e) => setEditMediaData({...editMediaData, video_url: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          placeholder="Audio URL"
                          value={editMediaData.audio_url}
                          onChange={(e) => setEditMediaData({...editMediaData, audio_url: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Scripture Reference"
                          value={editMediaData.scripture}
                          onChange={(e) => setEditMediaData({...editMediaData, scripture: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Duration"
                          value={editMediaData.duration}
                          onChange={(e) => setEditMediaData({...editMediaData, duration: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditMedia}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // View Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-800">{sermon.title}</h4>
                        <p className="text-gray-600 mb-2">by {sermon.name} • {new Date(sermon.date).toLocaleDateString()}</p>
                        <p className="text-gray-700 mb-3">{sermon.description}</p>
                        {sermon.video_url && (
                          <a 
                            href={sermon.video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <Video className="h-3 w-3" />
                            Watch Video
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditMedia(sermon)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Edit Media"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteSermon(sermon.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Delete Media"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Events Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Manage Events</h3>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {adminEvents.length} events
            </span>
          </div>
          
          {/* Add New Event Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Event
            </h4>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
                <div className="relative">
                  <button
                    onClick={() => setIsEventCategoryDropdownOpen(!isEventCategoryDropdownOpen)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 transition-colors duration-200 hover:border-gray-400 bg-white text-left flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      {newEvent.category && EVENT_CATEGORY_OPTIONS.find(option => option.value === newEvent.category) ? (
                        <>
                          {EVENT_CATEGORY_OPTIONS.find(option => option.value === newEvent.category).icon}
                          <span className="ml-2">{EVENT_CATEGORY_OPTIONS.find(option => option.value === newEvent.category).label}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Select category...</span>
                      )}
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  {isEventCategoryDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                      {EVENT_CATEGORY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleEventCategorySelect(option.value)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                        >
                          <span className="mr-2">{option.icon}</span>
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newEvent.registration_required}
                    onChange={(e) => setNewEvent({...newEvent, registration_required: e.target.checked})}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">Registration Required</span>
                </label>
              </div>
              {newEvent.registration_required && (
                <input
                  type="text"
                  placeholder="Contact Info for Registration"
                  value={newEvent.contact_info}
                  onChange={(e) => setNewEvent({...newEvent, contact_info: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              )}
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Event
              </button>
            </form>
          </div>
          
          {/* Existing Events List */}
          {adminEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events added yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {adminEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  {editingEvent === event.id ? (
                    // Edit Mode
                    <form onSubmit={handleEditEvent} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Event Title"
                          value={editEventData.title}
                          onChange={(e) => setEditEventData({...editEventData, title: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          required
                        />
                        <input
                          type="date"
                          value={editEventData.date}
                          onChange={(e) => setEditEventData({...editEventData, date: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          required
                        />
                        <input
                          type="time"
                          value={editEventData.time}
                          onChange={(e) => setEditEventData({...editEventData, time: e.target.value})}
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          required
                        />
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsEditEventCategoryDropdownOpen(!isEditEventCategoryDropdownOpen)}
                            className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 transition-colors duration-200 hover:border-gray-400 bg-white text-left flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              {editEventData.category && EVENT_CATEGORY_OPTIONS.find(option => option.value === editEventData.category) ? (
                                <>
                                  {EVENT_CATEGORY_OPTIONS.find(option => option.value === editEventData.category).icon}
                                  <span className="ml-2">{EVENT_CATEGORY_OPTIONS.find(option => option.value === editEventData.category).label}</span>
                                </>
                              ) : (
                                <span className="text-gray-500">Select category...</span>
                              )}
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </button>
                          
                          {isEditEventCategoryDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                              {EVENT_CATEGORY_OPTIONS.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setEditEventData({...editEventData, category: option.value});
                                    setIsEditEventCategoryDropdownOpen(false);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                                >
                                  <span className="mr-2">{option.icon}</span>
                                  <span>{option.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {/* Click outside to close */}
                          {isEditEventCategoryDropdownOpen && (
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsEditEventCategoryDropdownOpen(false)}
                            ></div>
                          )}
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Location"
                        value={editEventData.location}
                        onChange={(e) => setEditEventData({...editEventData, location: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      />
                      <textarea
                        placeholder="Event Description"
                        value={editEventData.description}
                        onChange={(e) => setEditEventData({...editEventData, description: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows="3"
                        required
                      />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editEventData.registration_required}
                            onChange={(e) => setEditEventData({...editEventData, registration_required: e.target.checked})}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">Registration Required</span>
                        </label>
                      </div>
                      {editEventData.registration_required && (
                        <input
                          type="text"
                          placeholder="Contact Info for Registration"
                          value={editEventData.contact_info}
                          onChange={(e) => setEditEventData({...editEventData, contact_info: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditEvent}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // View Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-lg text-gray-800">{event.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${{
                            'service': 'bg-blue-100 text-blue-800',
                            'prayer': 'bg-green-100 text-green-800',
                            'fellowship': 'bg-yellow-100 text-yellow-800',
                            'conference': 'bg-red-100 text-red-800',
                            'outreach': 'bg-purple-100 text-purple-800',
                            'youth': 'bg-pink-100 text-pink-800',
                            'children': 'bg-orange-100 text-orange-800',
                            'special': 'bg-indigo-100 text-indigo-800'
                          }[event.category] || 'bg-gray-100 text-gray-800'}`}>
                            {event.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        </p>
                        <p className="text-gray-700 mb-3">{event.description}</p>
                        {event.registration_required && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                            <p className="text-sm text-yellow-800 font-medium">Registration Required</p>
                            {event.contact_info && (
                              <p className="text-sm text-yellow-700">{event.contact_info}</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditEvent(event)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Edit Event"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Delete Event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 gentle-pulse"><Church className="h-16 w-16 mx-auto" /></div>
          <h1 className="text-4xl font-bold mb-4">Living Hope AG</h1>
          <div className="loading w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600 text-glow flex items-center"><Church className="mr-2 h-6 w-6" /> Living Hope AG</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  to={item.id === 'home' ? '/' : `/${item.id}`}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 nav-item ${
                    (location.pathname === '/' && item.id === 'home') || location.pathname === `/${item.id}`
                      ? 'bg-blue-600 text-white subtle-glow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600 icon-hover">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="section-enter">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={renderHome()} />
          <Route path="/home" element={renderHome()} />
          <Route path="/media" element={renderSermons()} />  {/* Changed from /sermons to /media */}
          <Route path="/announcements" element={renderAnnouncements()} />
          <Route path="/about" element={renderAbout()} />
          <Route path="/events" element={renderEvents()} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/give" element={renderGive()} />
          <Route path="/contact" element={renderContact()} />
          <Route path="/knowgod" element={renderKnowGod()} />
          <Route path="/admin" element={adminToken ? renderAdminDashboard() : renderAdminLogin()} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 gradient-flow opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="fade-in">
              <h3 className="text-xl font-bold mb-4 flex items-center"><Church className="mr-2 h-5 w-5" /> Living Hope AG</h3>
              <p className="text-gray-300">
                Sharing the life-changing love of Jesus Christ with our community and the world.
              </p>
            </div>
            <div className="slide-in-left">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li className="stagger-animation">
                  <Link to="/about" className="text-gray-300 hover:text-white scale-hover">About Us</Link>
                </li>
                <li className="stagger-animation">
                  <Link to="/sermons" className="text-gray-300 hover:text-white scale-hover">Services</Link>
                </li>
                <li className="stagger-animation">
                  <Link to="/events" className="text-gray-300 hover:text-white scale-hover">Events</Link>
                </li>
                <li className="stagger-animation">
                  <Link to="/contact" className="text-gray-300 hover:text-white scale-hover">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="slide-in-right">
              <h4 className="text-lg font-semibold mb-4">Service Times</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Friday: 10:00 AM</li>
                <li>Sunday Kids: 3:00 PM</li>
                <li>All Night: Monthly</li>
              </ul>
            </div>
            <div className="appear">
              <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.youtube.com/@Living.Hope_AG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-800 hover:bg-red-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="Follow us on YouTube"
                >
                  <Youtube className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="https://www.instagram.com/living.hope_ag/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
              <p className="text-gray-400 text-sm mt-4">Stay connected with our community</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Living Hope AG. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to log out of the admin panel? You'll need to enter your credentials again to access it.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App component with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
