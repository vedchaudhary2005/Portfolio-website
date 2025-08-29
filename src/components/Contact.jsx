import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Toast from './Toast';

const Contact = ({ isDarkMode, theme }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Ved Chaudhary'
      };
      
      await emailjs.send(
        'service_zosfngm',
        'template_odgfb3r',
        templateParams,
        '-HaQJgmCMfP4HMMxf'
      );
      
      setToast({ isVisible: true, message: 'Message sent successfully!', type: 'success' });
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setToast({ isVisible: true, message: 'Failed to send message. Please try again.', type: 'error' });
    }
  };

  return (
    <section id="contact" className={`py-20 ${theme.cardBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.text}`}>Contact Me</h2>
          <p className={`text-lg ${theme.textSecondary}`}>Let's work together on your next project</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className={`text-2xl font-semibold mb-6 ${theme.text}`}>Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={theme.textSecondary}>vedchaudhary162005@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={theme.textSecondary}>(+91) 8429366583</span>
              </div>
              <div className="flex items-center">
                <MapPin className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={theme.textSecondary}>INDIA, IN</span>
              </div>
              <div className="flex items-center">
                <Calendar className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <button className={`${theme.textSecondary} hover:text-blue-600 transition-colors duration-200`}>
                  Schedule a Meeting
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${theme.inputBg} ${theme.inputBorder} ${theme.text} ${formErrors.firstName ? 'border-red-500' : ''}`}
                  />
                  {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${theme.inputBg} ${theme.inputBorder} ${theme.text} ${formErrors.lastName ? 'border-red-500' : ''}`}
                  />
                  {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${theme.inputBg} ${theme.inputBorder} ${theme.text} ${formErrors.email ? 'border-red-500' : ''}`}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textSecondary}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${theme.inputBg} ${theme.inputBorder} ${theme.text}`}
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        type={toast.type}
      />
    </section>
  );
};

export default Contact;