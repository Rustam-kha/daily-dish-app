import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
import validator from "validator";

const requestStore = new Map();

const simpleRateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; 
  const maxRequests = 10;
  
  if (!requestStore.has(ip)) {
    requestStore.set(ip, []);
  }
  
  const requests = requestStore.get(ip);
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Too many contact attempts. Please try again later.'
    });
  }
  
  validRequests.push(now);
  requestStore.set(ip, validRequests);
  next();
};

export const contactLimiter = simpleRateLimit;

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
};

const validateContactInput = (data) => {
  const errors = [];
  
  if (!data.firstName || !data.firstName.trim()) {
    errors.push("First name is required");
  }
  
  if (!data.lastName || !data.lastName.trim()) {
    errors.push("Last name is required");
  }
  
  if (!data.email || !validator.isEmail(data.email)) {
    errors.push("Valid email is required");
  }
  
  if (!data.message || data.message.length < 20) {
    errors.push("Message must be at least 20 characters");
  }
  
  return errors;
};

export const submitContact = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      subject, 
      message,
      source = 'website_contact_form'
    } = req.body;

    const validationErrors = validateContactInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    const contact = new Contact({
      firstName: validator.escape(firstName.trim()),
      lastName: validator.escape(lastName.trim()),
      email: email.toLowerCase().trim(),
      phone: phone ? validator.escape(phone.trim()) : '',
      subject: subject || 'general',
      message: validator.escape(message.trim()),
      source,
      status: 'new' 
    });

    await contact.save();

    try {
      await sendContactEmails(contact);
    } catch (emailError) {
      console.log("Email sending failed, but contact was saved:", emailError.message);
    }

    const responseData = {
      success: true,
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
      referenceId: `CONTACT-${contact._id.toString().slice(-6).toUpperCase()}`,
      contactId: contact._id
    };

    res.status(201).json(responseData);

  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const sendContactEmails = async (contact) => {
  try {
    const transporter = createTransporter();
    const referenceId = `CONTACT-${contact._id.toString().slice(-6).toUpperCase()}`;

    const userMailOptions = {
      from: `"DailyDish Support" <${process.env.GMAIL_USER}>`,
      to: contact.email,
      subject: `We've Received Your Message - ${referenceId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #10b981, #047857); color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Thank You, ${contact.firstName}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="padding: 30px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 25px;">
              <div style="width: 80px; height: 80px; background: #d1fae5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px;">📧</span>
              </div>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Hi ${contact.firstName}, we've received your <strong>${contact.subject}</strong> inquiry and our team is reviewing it now.
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #bbf7d0;">
              <h3 style="color: #065f46; margin-top: 0;">Your Inquiry Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #dcfce7;"><strong>Reference ID:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #dcfce7; color: #10b981;">${referenceId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #dcfce7;"><strong>Submitted:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #dcfce7;">${new Date().toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Subject:</strong></td>
                  <td style="padding: 8px 0;">${contact.subject.charAt(0).toUpperCase() + contact.subject.slice(1)}</td>
                </tr>
              </table>
            </div>
            
            <h3 style="color: #374151;">What Happens Next?</h3>
            <ol style="padding-left: 20px; color: #4b5563;">
              <li>Our support team reviews your message</li>
              <li>You'll receive a personalized response via email</li>
              <li>If needed, we may follow up with a phone call</li>
            </ol>
            
            <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af;"><strong>Need Immediate Assistance?</strong></p>
              <p style="margin: 10px 0 0 0; color: #4b5563;">
                📞 Call us: +923325577359<br>
                🕐 Available: 7 days a week, 7:00 AM - 10:00 PM EST
              </p>
            </div>
            
            <p style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
            <p>DailyDish • 123 Food Street • Culinary City, CC 10001</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};