import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineUser,
 
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineArrowNarrowRight,

} from "react-icons/hi";

import {
  BsFillTelephoneFill,
  BsGeoAltFill,
  BsEnvelopeFill,
  BsChatDotsFill,
  BsShieldCheck,
  BsLightningCharge,
  BsStars,
} from "react-icons/bs";
import {
  MdOutlineEmail,
  MdOutlineMessage,
  MdOutlineSubject,
} from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTelegramPlane,
  FaWhatsapp,
  FaHeadset,
} from "react-icons/fa";
import { IoIosSend, IoIosChatbubbles, IoIosGlobe } from "react-icons/io";
import {
  RiCustomerService2Fill,
  RiMessage2Fill,
  RiMailSendFill,
} from "react-icons/ri";

// reference `motion` to satisfy linter when tooling doesn't detect JSX usage
void motion;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [messageCharCount, setMessageCharCount] = useState(0);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "message") {
      setMessageCharCount(value.length);
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(
        <div className="flex items-center space-x-2">
          <BsStars className="w-5 h-5 text-yellow-500" />
          <span>Message sent successfully! We'll get back to you soon.</span>
        </div>,
        { duration: 5000 },
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setMessageCharCount(0);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Visit Us",
      content: ["Rangpur", "Bangladesh"],
      gradient: "from-blue-600 to-cyan-500",
      bgIcon: (
        <BsGeoAltFill className="w-24 h-24 absolute -bottom-4 -right-4 opacity-10" />
      ),
      action: "Get Directions",
      link: "#",
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email Us",
      content: ["support@newsportal.com"],
      gradient: "from-purple-600 to-pink-500",
      bgIcon: (
        <BsEnvelopeFill className="w-24 h-24 absolute -bottom-4 -right-4 opacity-10" />
      ),
      action: "Send Email",
      link: "mailto:support@newsportal.com",
    },
    {
      icon: <FaPhoneAlt className="w-6 h-6" />,
      title: "Call Us",
      content: ["+01722559872"],
      gradient: "from-green-600 to-emerald-500",
      bgIcon: (
        <BsFillTelephoneFill className="w-24 h-24 absolute -bottom-4 -right-4 opacity-10" />
      ),
      action: "Call Now",
      link: "tel:+01722559872",
    },
  ];

  const stats = [
    {
      label: "Happy Clients",
      value: "10K+",
      icon: <BsShieldCheck className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      label: "Messages Answered",
      value: "50K+",
      icon: <IoIosChatbubbles className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      label: "Response Time",
      value: "< 24h",
      icon: <BsLightningCharge className="w-6 h-6" />,
      color: "text-yellow-500",
    },
  ];


  const supportChannels = [
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      name: "WhatsApp",
      description: "Fast response",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: <FaTelegramPlane className="w-5 h-5" />,
      name: "Telegram",
      description: "Instant messaging",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: <RiCustomerService2Fill className="w-5 h-5" />,
      name: "Live Chat",
      description: "24/7 support",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - NewsPortal</title>
        <meta
          name="description"
          content="Get in touch with NewsPortal. We're here to help and answer any questions you might have."
        />
      </Helmet>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-200/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-secondary-200/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 1000),
              }}
              animate={{
                y: [null, -50, 50, -50],
                x: [null, 50, -50, 50],
                scale: [1, 2, 0.5, 1],
                opacity: [0.2, 0.6, 0.2, 0.2],
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Icons */}
        <motion.div
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 text-white/10"
        >
          <IoIosChatbubbles className="w-32 h-32" />
        </motion.div>
        <motion.div
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          custom={1}
          className="absolute bottom-20 right-10 text-white/10"
        >
          <RiMailSendFill className="w-40 h-40" />
        </motion.div>

        <div className="container-custom relative py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto">
                <RiCustomerService2Fill className="w-10 h-10 text-yellow-300" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent inline-block">
                Touch
              </span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>

            {/* Support Channels */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              {supportChannels.map((channel, index) => (
                <motion.button
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-3 px-6 py-3 ${channel.bg} rounded-xl text-gray-700 hover:shadow-lg transition-all`}
                >
                  <span className={channel.color}>{channel.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold">{channel.name}</p>
                    <p className="text-xs text-gray-500">
                      {channel.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 relative overflow-hidden group"
                >
                  <motion.div
                    variants={pulseAnimation}
                    initial="initial"
                    animate="animate"
                    className={`absolute top-4 right-4 ${stat.color}`}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      className={`h-full ${stat.color.replace("text", "bg")}`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInLeft}
                whileHover={{ scale: 1.02, y: -5, rotateX: 5 }}
                className={`bg-gradient-to-br ${info.gradient} p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group cursor-pointer`}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                {/* Background Icon */}
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-4 -right-4 text-white/20"
                >
                  {info.bgIcon}
                </motion.div>

                {/* Animated Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all"
                  >
                    {info.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                  {info.content.map((line, i) => (
                    <p key={i} className="text-white/90 text-sm mb-1">
                      {line}
                    </p>
                  ))}
                  <motion.a
                    href={info.link}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center space-x-2 mt-4 text-sm font-medium group-hover:text-white/90"
                  >
                    <span>{info.action}</span>
                    <HiOutlineArrowNarrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}

           
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="initial"
            animate="animate"
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-primary-100 rounded-full opacity-20"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -45, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-100 rounded-full opacity-20"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Send us a message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-500"
                  >
                    <RiMessage2Fill className="w-8 h-8" />
                  </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                      >
                        <HiOutlineUser className="w-4 h-4 mr-1 text-primary-500" />
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all pl-11 ${
                            formErrors.name
                              ? "border-red-300 bg-red-50"
                              : activeField === "name"
                                ? "border-primary-500 bg-primary-50/30 shadow-lg shadow-primary-100"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="Your Name"
                        />
                        <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <AnimatePresence>
                          {activeField === "name" && !formErrors.name && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500"
                            >
                              <HiOutlineCheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence>
                        {formErrors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            <HiOutlineExclamationCircle className="w-4 h-4 mr-1" />
                            {formErrors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                      >
                        <MdOutlineEmail className="w-4 h-4 mr-1 text-primary-500" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all pl-11 ${
                            formErrors.email
                              ? "border-red-300 bg-red-50"
                              : activeField === "email"
                                ? "border-primary-500 bg-primary-50/30 shadow-lg shadow-primary-100"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="email@example.com"
                        />
                        <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <AnimatePresence>
                          {activeField === "email" && !formErrors.email && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500"
                            >
                              <HiOutlineCheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence>
                        {formErrors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-1 flex items-center"
                          >
                            <HiOutlineExclamationCircle className="w-4 h-4 mr-1" />
                            {formErrors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                    >
                      <MdOutlineSubject className="w-4 h-4 mr-1 text-primary-500" />
                      Subject
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setActiveField("subject")}
                        onBlur={() => setActiveField(null)}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all pl-11 ${
                          formErrors.subject
                            ? "border-red-300 bg-red-50"
                            : activeField === "subject"
                              ? "border-primary-500 bg-primary-50/30 shadow-lg shadow-primary-100"
                              : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="What's this about?"
                      />
                      <MdOutlineSubject className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <AnimatePresence>
                        {activeField === "subject" && !formErrors.subject && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500"
                          >
                            <HiOutlineCheckCircle className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence>
                      {formErrors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm mt-1 flex items-center"
                        >
                          <HiOutlineExclamationCircle className="w-4 h-4 mr-1" />
                          {formErrors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                    >
                      <MdOutlineMessage className="w-4 h-4 mr-1 text-primary-500" />
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        rows="6"
                        maxLength={500}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all pl-11 resize-none ${
                          formErrors.message
                            ? "border-red-300 bg-red-50"
                            : activeField === "message"
                              ? "border-primary-500 bg-primary-50/30 shadow-lg shadow-primary-100"
                              : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Tell us how we can help..."
                      />
                      <MdOutlineMessage className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                      <AnimatePresence>
                        {activeField === "message" && !formErrors.message && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute right-3 bottom-3 text-primary-500"
                          >
                            <HiOutlineCheckCircle className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence>
                      {formErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm mt-1 flex items-center"
                        >
                          <HiOutlineExclamationCircle className="w-4 h-4 mr-1" />
                          {formErrors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Character Counter and Attachments */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <span
                          className={
                            messageCharCount >= 450
                              ? "text-yellow-600 font-medium"
                              : ""
                          }
                        >
                          {messageCharCount}/500
                        </span>{" "}
                        characters
                      </div>
                      {messageCharCount >= 450 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                        >
                          Approaching limit
                        </motion.span>
                      )}
                    </div>

                    {/* Attachment Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm text-gray-500 hover:text-primary-500 flex items-center space-x-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <span>Attach files</span>
                    </motion.button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <motion.div
                      animate={{
                        x: ["0%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />

                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <IoIosSend className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Privacy Policy */}
                  <p className="text-xs text-gray-500 text-center">
                    By sending this message, you agree to our{" "}
                    <a href="/privacy" className="text-primary-600 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary-600 hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
