import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-switching images for home page
  const heroImages = [
    'https://images.unsplash.com/photo-1496185524395-81f295f4859e',
    'https://images.unsplash.com/photo-1579975096649-e773152b04cb',
    'https://images.unsplash.com/photo-1665251912434-d8a7aa95dcea'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const navigation = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'sermons', label: 'Sermons', icon: '📖' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'donate', label: 'Donate', icon: '💝' },
    { id: 'contact', label: 'Contact', icon: '📞' },
    { id: 'knowgod', label: 'Know God', icon: '✝️' }
  ];

  const renderHome = () => (
    <div className="min-h-screen">
      {/* Hero Section with Auto-switching Images */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
            src={heroImages[currentImageIndex]}
            alt="Living Water Church"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow-lg">
              Living Water Church
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-shadow">
              "Jesus said to her, 'Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst.'" - John 4:13-14
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Join Us This Friday</h3>
              <p className="text-lg">10:00 AM Oman Time</p>
              <p className="text-base opacity-90">Come and experience the Living Water</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Join Our Service
            </button>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Announcements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-blue-600 text-3xl mb-4">📢</div>
              <h3 className="text-xl font-semibold mb-3">Weekly Service</h3>
              <p className="text-gray-600">Join us every Friday at 10:00 AM Oman Time for our weekly worship service. Come as you are and experience God's love.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-green-600 text-3xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-semibold mb-3">Kids Meeting</h3>
              <p className="text-gray-600">Special programs for children every Sunday. Fun activities, stories, and lessons that help kids grow in faith.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-purple-600 text-3xl mb-4">🌙</div>
              <h3 className="text-xl font-semibold mb-3">All Night Meeting</h3>
              <p className="text-gray-600">Monthly overnight prayer and worship sessions. Join us for powerful times of prayer and spiritual breakthrough.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSermons = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Recent Sermons</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample YouTube embed - replace with actual church channel videos */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Living Water Church Sermon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Faith That Moves Mountains</h3>
              <p className="text-gray-600 mb-4">A powerful message about stepping out in faith and trusting God's promises.</p>
              <div className="text-sm text-gray-500">Pastor John • March 15, 2025</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Living Water Church Sermon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">The Living Water</h3>
              <p className="text-gray-600 mb-4">Discovering the eternal source of life and refreshment in Jesus Christ.</p>
              <div className="text-sm text-gray-500">Pastor Sarah • March 8, 2025</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Living Water Church Sermon"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Walking in Love</h3>
              <p className="text-gray-600 mb-4">Understanding how to live out Christ's love in our daily relationships and interactions.</p>
              <div className="text-sm text-gray-500">Pastor David • March 1, 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">About Living Water Church</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a community of believers passionate about experiencing and sharing the life-changing love of Jesus Christ.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1695938746747-ec185ea81325"
              alt="Church Community"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Life at Living Water Church</h3>
            <p className="text-gray-600 mb-6 text-lg">
              At Living Water Church, we believe in creating a warm, welcoming environment where everyone can grow in their relationship with God. Our community is built on love, acceptance, and the transformative power of Christ's message.
            </p>
            <p className="text-gray-600 mb-6 text-lg">
              We offer various programs and services designed to help you connect with God and with others in our faith community. Whether you're seeking spiritual growth, community connection, or simply exploring faith, you'll find a place here.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Kid's Meeting</h3>
            <p className="text-gray-600">
              Every Sunday, we host special programs for children aged 3-12. Our kids enjoy interactive Bible stories, music, games, and activities that help them learn about God's love in age-appropriate ways. We believe in nurturing the next generation of believers.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🌙</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">All Night Meeting</h3>
            <p className="text-gray-600">
              Once a month, we gather for powerful overnight prayer and worship sessions. These special services run from 10 PM to 6 AM, featuring extended worship, prayer, testimonies, and seeking God's presence together. It's a time of spiritual breakthrough and deep connection with God.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">💧</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Living Water Experience</h3>
            <p className="text-gray-600">
              Our church name comes from Jesus' words about living water - the eternal life He offers. We strive to help every person discover this life-giving relationship with Christ that satisfies the deepest longings of the soul and brings true spiritual fulfillment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Upcoming Events</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1516474642997-b86ccf7065a4"
              alt="Baptism Service"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Upcoming</span>
                <span className="ml-2 text-sm text-gray-500">March 25, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Baptism Service</h3>
              <p className="text-gray-600 mb-4">Join us for a special baptism service at the beach. If you're ready to take this step of faith, contact us to participate.</p>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">Learn More →</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1655636237961-1fa3457c19a9"
              alt="Easter Celebration"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Special</span>
                <span className="ml-2 text-sm text-gray-500">April 1, 2025</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easter Celebration</h3>
              <p className="text-gray-600 mb-4">Celebrate the resurrection of Jesus Christ with us. Special music, messages, and fellowship meal following the service.</p>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">Learn More →</button>
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Past Events</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579975096649-e773152b04cb"
              alt="Worship Night"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold mb-1">Worship Night</h4>
              <p className="text-sm text-gray-600">February 28, 2025</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1496185524395-81f295f4859e"
              alt="Prayer Meeting"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold mb-1">Prayer Meeting</h4>
              <p className="text-sm text-gray-600">February 15, 2025</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1665251912434-d8a7aa95dcea"
              alt="Community Outreach"
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold mb-1">Community Outreach</h4>
              <p className="text-sm text-gray-600">February 1, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDonate = () => (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Support Our Ministry</h2>
          <p className="text-xl text-gray-600">
            Your generous donations help us continue spreading the Gospel and serving our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Where Your Donation Goes</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">•</span>
                Supporting local community outreach programs
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">•</span>
                Maintaining and improving our worship facilities
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">•</span>
                Funding children's and youth ministry programs
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">•</span>
                Supporting mission work and evangelism
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-3">•</span>
                Providing assistance to families in need
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Ways to Give</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Online Donation</h4>
                <p className="text-sm text-gray-600 mb-3">Secure online giving through our payment processor</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                  Give Online
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Bank Transfer</h4>
                <p className="text-sm text-gray-600 mb-2">Bank: Muscat Bank</p>
                <p className="text-sm text-gray-600 mb-2">Account: Living Water Church</p>
                <p className="text-sm text-gray-600">Account Number: 1234567890</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">In-Person</h4>
                <p className="text-sm text-gray-600">Drop your donation in the offering box during service</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> All donations are used solely for church activities and community service. We maintain full transparency in our financial records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-blue-600 text-xl mr-4 mt-1">📍</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">123 Church Street<br />Muscat, Oman</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-600 text-xl mr-4 mt-1">📞</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+968 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-600 text-xl mr-4 mt-1">✉️</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">info@livingwaterchurch.om</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-blue-600 text-xl mr-4 mt-1">⏰</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Service Times</h4>
                  <p className="text-gray-600">
                    Friday Service: 10:00 AM<br />
                    Sunday Kids Meeting: 3:00 PM<br />
                    Monthly All Night: Last Friday
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">Location</h4>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>Google Maps Integration</p>
                  <p className="text-sm">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="prayer">Prayer Request</option>
                  <option value="visit">Planning to Visit</option>
                  <option value="baptism">Baptism Inquiry</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contact-permission"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="contact-permission" className="ml-2 block text-sm text-gray-700">
                  I would like to be contacted by the church
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Send Message
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Know God</h2>
          <p className="text-xl text-gray-600">
            Discover the life-changing relationship with Jesus Christ, your Lord and Savior
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">God Loves You</h3>
              <p className="text-gray-600 mb-4">
                "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16
              </p>
              <p className="text-gray-600">
                God created you for a purpose and loves you unconditionally. His love is not based on your performance or worthiness, but on His character and grace.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">We Are All Sinners</h3>
              <p className="text-gray-600 mb-4">
                "For all have sinned and fall short of the glory of God." - Romans 3:23
              </p>
              <p className="text-gray-600">
                Sin separates us from God and creates a barrier in our relationship with Him. We cannot reach God through our own efforts or good works.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Jesus Died for You</h3>
              <p className="text-gray-600 mb-4">
                "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." - Romans 5:8
              </p>
              <p className="text-gray-600">
                Jesus Christ, God's Son, took the punishment for our sins by dying on the cross. Through His sacrifice, the barrier between us and God is removed.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Accept Jesus as Your Savior</h3>
              <p className="text-gray-600 mb-4">
                "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved." - Romans 10:9
              </p>
              <p className="text-gray-600">
                Salvation is a gift from God that cannot be earned. You receive it by faith - trusting in Jesus Christ as your Lord and Savior.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              5
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Live as a New Creation</h3>
              <p className="text-gray-600 mb-4">
                "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" - 2 Corinthians 5:17
              </p>
              <p className="text-gray-600">
                When you accept Jesus, you become a new creation. God gives you a new heart, a new purpose, and the promise of eternal life with Him.
              </p>
            </div>
          </div>
        </div>

        {/* Prayer Section */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Ready to Take the Next Step?</h3>
          <p className="text-gray-600 mb-6 text-center">
            If you want to accept Jesus Christ as your Lord and Savior, you can pray this prayer:
          </p>
          <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
            <p className="text-gray-700 italic">
              "Dear God, I know that I am a sinner and I need Your forgiveness. I believe that Jesus Christ died for my sins and rose from the dead. I want to turn from my sins and invite Jesus to come into my heart and life. I want to trust and follow Him as my Lord and Savior. In Jesus' name, Amen."
            </p>
          </div>
          <div className="text-center mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              I Prayed This Prayer
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-4">📖</div>
              <h4 className="font-semibold mb-2">Read the Bible</h4>
              <p className="text-gray-600 text-sm">Start with the Gospel of John to learn more about Jesus.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-4">🙏</div>
              <h4 className="font-semibold mb-2">Pray Daily</h4>
              <p className="text-gray-600 text-sm">Talk to God regularly and build your relationship with Him.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-4">⛪</div>
              <h4 className="font-semibold mb-2">Join Our Church</h4>
              <p className="text-gray-600 text-sm">Connect with other believers and grow in your faith.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 'home': return renderHome();
      case 'sermons': return renderSermons();
      case 'about': return renderAbout();
      case 'events': return renderEvents();
      case 'donate': return renderDonate();
      case 'contact': return renderContact();
      case 'knowgod': return renderKnowGod();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Living Water Church</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Living Water Church</h3>
              <p className="text-gray-300">
                Sharing the life-changing love of Jesus Christ with our community and the world.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Events</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Times</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Friday: 10:00 AM</li>
                <li>Sunday Kids: 3:00 PM</li>
                <li>All Night: Monthly</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">📘</a>
                <a href="#" className="text-gray-300 hover:text-white">📷</a>
                <a href="#" className="text-gray-300 hover:text-white">🐦</a>
                <a href="#" className="text-gray-300 hover:text-white">📺</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Living Water Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;