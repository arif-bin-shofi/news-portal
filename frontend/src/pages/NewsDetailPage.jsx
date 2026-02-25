import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleNews, isLoading, fetchNewsById } = useNewsStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const lastFetchedIdRef = useRef(null);

  useEffect(() => {
    // Only fetch if ID changed
    if (id && id !== lastFetchedIdRef.current) {
      lastFetchedIdRef.current = id;
      fetchNewsById(id);
    }

    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, fetchNewsById]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Share function
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = singleNews?.title || "Check this news";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Copy link function
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            {/* Animated loader */}
            <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-primary-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  if (!singleNews) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Browse All News
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{singleNews.title} - NewsPortal</title>
        <meta name="description" content={singleNews.summary} />
        <meta property="og:title" content={singleNews.title} />
        <meta property="og:description" content={singleNews.summary} />
        <meta property="og:image" content={singleNews.imageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      >
        {/* Hero Section with Image */}
        <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
          {/* Background Image with Parallax */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse"></div>
            )}
            <img
              src={singleNews.imageUrl}
              alt={singleNews.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          {/* Back Button */}
          <motion.div
            variants={itemVariants}
            className="absolute top-8 left-8 z-10"
          >
            <button
              onClick={() => navigate("/news")}
              className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to News</span>
            </button>
          </motion.div>

          {/* Title Section Overlay */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white"
          >
            <div className="container-custom">
              <div className="max-w-4xl">
                {/* Category Badge */}
                <span className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                  {singleNews.category}
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {singleNews.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                      {singleNews.author?.profilePicture ? (
                        <img
                          src={singleNews.author.profilePicture}
                          alt={singleNews.author.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = singleNews.author?.name?.charAt(0).toUpperCase() || 'A';
                          }}
                        />
                      ) : (
                        <span className="text-white font-bold">
                          {singleNews.author?.name?.charAt(0).toUpperCase() || 'A'}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {singleNews.author?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-300">
                        {format(
                          new Date(singleNews.publishedAt),
                          "MMMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 ml-auto">
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {singleNews.views?.toLocaleString()} views
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {singleNews.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            {/* Summary Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-primary-50 to-blue-50 p-8 rounded-2xl mb-10 border border-primary-100 shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
                    Summary
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {singleNews.summary}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={itemVariants}
              className="prose prose-lg max-w-none"
            >
              {singleNews.content.split("\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6 text-gray-700 leading-relaxed text-justify"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Article Footer */}
            <motion.div
              variants={itemVariants}
              className="border-t border-gray-200 mt-12 pt-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {singleNews.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Share Buttons - Fixed Version */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 mr-2">Share:</span>
                  
                  {/* Facebook */}
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-200 group"
                    aria-label="Share on Facebook"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/>
                    </svg>
                  </button>

                  {/* Twitter */}
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-sky-100 transition-all duration-200 group"
                    aria-label="Share on Twitter"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-sky-500" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-200 group"
                    aria-label="Share on LinkedIn"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-blue-700" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
                    </svg>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-100 transition-all duration-200 group"
                    aria-label="Share on WhatsApp"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-green-600" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.473-.149-.673.15-.197.3-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.672-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 transition-all duration-200 group"
                    aria-label="Copy link"
                  >
                    <svg 
                      className="w-4 h-4 text-gray-500 group-hover:text-purple-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Reading Time */}
              <div className="mt-6 text-sm text-gray-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Estimated reading time:{" "}
                {Math.ceil(singleNews.content.split(" ").length / 200)} min
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Articles Section */}
        <motion.div variants={itemVariants} className="bg-gray-50 py-16 mt-16">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Related articles will be populated from API */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-500 text-center">More articles coming soon...</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NewsDetailPage;