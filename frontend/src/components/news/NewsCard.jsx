import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";

const NewsCard = ({ news, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback image if the main image fails to load
  const fallbackImage = `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(news.category || "News")}`;

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      technology: "bg-blue-100 text-blue-800 border-blue-200",
      sports: "bg-green-100 text-green-800 border-green-200",
      business: "bg-purple-100 text-purple-800 border-purple-200",
      entertainment: "bg-pink-100 text-pink-800 border-pink-200",
      politics: "bg-red-100 text-red-800 border-red-200",
      health: "bg-emerald-100 text-emerald-800 border-emerald-200",
      science: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Link
      to={`/news/${news._id}`}
      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${featured ? "h-72" : "h-56"} bg-gray-100`}
      >
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-linear-to-r from-gray-200 to-gray-300 animate-pulse" />
        )}

        {/* Image */}
        <img
          src={imageError ? fallbackImage : news.imageUrl}
          alt={news.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge - Floating */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border-2 border-white/50 backdrop-blur-sm shadow-lg ${getCategoryColor(news.category)}`}
          >
            {news.category}
          </span>
        </div>

        {/* Reading Time Badge - Optional if you have this data */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/30 shadow-lg">
            📖 {Math.ceil(news.content?.length / 1000) || 3} min read
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3
          className={`font-bold mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200 ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {news.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {news.summary}
        </p>

        {/* Meta Information */}
        <div className="space-y-3">
          {/* Author and Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Author Avatar */}
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                <img
                  src={news.author?.profilePicture}
                  alt={news.author?.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-100"
                  />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {news.author?.name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(news.publishedAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            {/* Views */}
            <div className="flex items-center space-x-1 text-gray-500">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-xs font-medium">
                {news.views?.toLocaleString() || 0}
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {/* Like Button - Optional */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add like functionality
                }}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                <span className="text-xs">{news.likes || 0}</span>
              </button>

              {/* Comment Button - Optional */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Add comment functionality
                }}
                className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-xs">{news.comments || 0}</span>
              </button>
            </div>

            {/* Read More Link */}
            <span className="inline-flex items-center text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
              Read More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Featured Badge - Only for featured news */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            FEATURED
          </span>
        </div>
      )}
    </Link>
  );
};

export default NewsCard;
