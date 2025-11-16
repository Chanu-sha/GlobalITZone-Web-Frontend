import React, { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const form = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      // Reset controlled state (this also resets visible inputs because they are controlled)
      setFormData({
        user_name: "",
        user_email: "",
        user_phone: "",
        subject: "",
        message: "",
      });

      // Optionally, if you want to completely reset the underlying native form:
      // form.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or contact us directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Touch
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Send className="w-8 h-8 text-red-500" />
                Send us a Message
              </h2>

              {/* Status Messages */}
              {status.message && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    status.type === "success"
                      ? "bg-green-500/20 border border-green-500/50 text-green-300"
                      : "bg-red-500/20 border border-red-500/50 text-red-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p>{status.message}</p>
                </div>
              )}

              {/* IMPORTANT: use a real <form> element and attach the ref */}
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="Your Name..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user_email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      value={formData.user_email}
                      onChange={handleChange}
                      placeholder="example@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="user_phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="user_phone"
                      name="user_phone"
                      value={formData.user_phone}
                      onChange={handleChange}
                      placeholder="+91 xxxxx xxxxx"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group"
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Address
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Plot number 269, near Hotel Empire, E-Block, Saheed Nagar,
                    Bhubaneswar, Odisha 751007, India
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+917205691103"
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    +91 72056 91103
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:globalitzone200@gmail.com"
                    className="text-gray-300 hover:text-red-400 transition-colors break-all"
                  >
                    globalitzone200@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-red-500/30">
              <h3 className="text-lg font-semibold text-white mb-3">
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-red-400">
                    10:00 AM - 10:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
