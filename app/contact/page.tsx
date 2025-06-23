"use client"
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Get in touch via email for detailed inquiries",
      contact: "hello@tripplanner.com",
      action: "mailto:hello@tripplanner.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 24/7",
      action: "#chat"
    },
    {
      icon: "📱",
      title: "Social Media",
      description: "Follow us for updates and travel inspiration",
      contact: "@TripPlannerAI",
      action: "#social"
    }
  ];

  const faqs = [
    {
      question: "How does the AI itinerary planning work?",
      answer: "Our AI analyzes your preferences, budget, travel dates, and interests to create personalized itineraries. It considers factors like travel time between locations, opening hours, weather, and local events to optimize your trip."
    },
    {
      question: "Can I modify the AI-generated itinerary?",
      answer: "Absolutely! Our platform allows you to easily modify, add, or remove activities from your itinerary. The AI will automatically adjust recommendations and hotel suggestions based on your changes."
    },
    {
      question: "How are hotels selected for my trip?",
      answer: "Hotels are matched based on your itinerary, ensuring you're always close to your planned activities. We consider factors like location, budget, amenities, and guest reviews to recommend the best options."
    },
    {
      question: "Is there a cost to use TripPlanner?",
      answer: "We offer both free and premium plans. The free plan includes basic itinerary creation, while premium plans offer advanced AI features, unlimited itineraries, and exclusive hotel deals."
    },
    {
      question: "Can I book hotels and activities directly through the platform?",
      answer: "Yes! Once your itinerary is ready, you can book hotels, activities, and experiences directly through our platform with our trusted partners, all in one place."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-10 p-6 border-b border-orange-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold text-orange-500">
            ✈️ TripPlanner
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/hotels" className="text-muted-foreground hover:text-orange-500 transition-colors font-medium">
              Hotels & Stays
            </Link>
            <Link href="/contact" className="text-orange-500 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Have questions about TripPlanner? We're here to help you plan your perfect journey.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Ways to Reach Us</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-orange-500 font-semibold">{method.contact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="press">Press & Media</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-vertical"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Planning?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Don't let planning hold you back from your next adventure. Try TripPlanner today!
          </p>
          <Link href="/auth">
            <button className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}