const { handleCors, sendSuccess } = require('./utils');

module.exports = async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    const churchInfo = {
      name: "Living Hope AG",
      address: "123 Faith Street, Hope City, HC 12345",
      phone: "+968 1234 5678",
      email: "info@livinghopeag.com",
      website: "https://livinghopeag.com",
      servicesTimes: [
        { day: "Sunday", time: "09:00 AM", service: "Morning Worship" },
        { day: "Sunday", time: "11:00 AM", service: "Main Service" },
        { day: "Wednesday", time: "07:00 PM", service: "Bible Study" },
        { day: "Friday", time: "07:00 PM", service: "Prayer Meeting" }
      ],
      socialMedia: {
        facebook: "https://facebook.com/livinghopeag",
        instagram: "https://instagram.com/livinghopeag",
        youtube: "https://youtube.com/livinghopeag"
      },
      pastor: {
        name: "Pastor John Smith",
        bio: "Lead Pastor with over 20 years of ministry experience."
      },
      mission: "To spread the love of Christ and build a community of faith, hope, and love.",
      vision: "To be a lighthouse of hope in our community, guiding people to Christ."
    };

    sendSuccess(res, churchInfo);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};