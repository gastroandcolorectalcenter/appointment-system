# Hospital Appointment Booking System

A web-based appointment booking system for multiple hospitals, allowing patients to schedule appointments based on hospital availability and operating hours.

## Features

- Patient information collection
- Hospital-specific scheduling
- Automatic time slot allocation
- Date validation based on hospital operating days
- reCAPTCHA integration for security
- Responsive design for all devices

## Hospital Operating Hours

1. **Sumeru Hospital Dhapakhel**
   - Operating Days: Sunday to Friday
   - Time Slots: 10:00 AM - 4:00 PM

2. **Vayodha Hospital**
   - Operating Days: Sunday, Tuesday, Thursday
   - Time Slots: 9:00 AM - 12:00 PM

3. **Norvic International Hospital**
   - Operating Days: Wednesday, Friday
   - Time Slots: 2:00 PM - 5:00 PM

## Setup

1. Replace `YOUR_RECAPTCHA_SITE_KEY` in `index.html` with your actual Google reCAPTCHA site key
2. Deploy the files to your web server
3. Ensure all files are in their correct directories:
   ```
   appointment-system/
   ├── index.html
   ├── styles/
   │   └── main.css
   └── js/
       └── app.js
   ```

## Security Features

- Form validation
- reCAPTCHA integration
- Secure time slot allocation
- Input sanitization

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Email confirmation
- SMS notifications
- Admin dashboard
- Appointment management system
- Online payment integration
