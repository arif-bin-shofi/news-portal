import { useEffect, useState } from "react";
import { useNewsStore } from "../store/newsStore";
import NewsCard from "../components/news/NewsCard";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Skeleton Loader Component with Shimmer Effect
const NewsCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-5">
        {/* Category & date skeleton */}
        <div className="flex justify-between items-center mb-3">
          <div className="w-20 h-6 bg-gray-200 rounded-full" />
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </div>

        {/* Title skeleton */}
        <div className="w-3/4 h-7 bg-gray-200 rounded mb-2" />
        <div className="w-full h-7 bg-gray-200 rounded mb-3" />

        {/* Summary skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="w-5/6 h-4 bg-gray-200 rounded" />
          <div className="w-4/6 h-4 bg-gray-200 rounded" />
        </div>

        {/* Author & views skeleton */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-24 h-4 bg-gray-200 rounded" />
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

// Category Skeleton
const CategorySkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
};

const NewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("latest"); // 'latest', 'popular', 'trending'

  const { news, pagination, isLoading, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews(pagination.currentPage, selectedCategory, sortBy);
  }, [pagination.currentPage, selectedCategory, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams(category ? { category } : {});
  };

  const handlePageChange = (page) => {
    fetchNews(page, selectedCategory, sortBy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    { id: "", name: "All", icon: "📰" },
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "business", name: "Business", icon: "💼" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "politics", name: "Politics", icon: "🏛️" },
    { id: "health", name: "Health", icon: "🏥" },
    { id: "science", name: "Science", icon: "🔬" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <>
      <Helmet>
        <title>Latest News - NewsPortal | Stay Updated</title>
        <meta
          name="description"
          content="Browse the latest news articles across various categories including Technology, Sports, Business, Entertainment, and more."
        />
        <meta property="og:title" content="Latest News - NewsPortal" />
        <meta
          property="og:description"
          content="Stay updated with the latest news from around the world."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 mb-8">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Latest News
              </h1>
              <p className="text-xl text-primary-100 max-w-2xl">
                Stay informed with the most recent updates and stories from
                around the world
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container-custom pb-16">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            {/* Category Filter with Icons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    (category.id === "" && !selectedCategory) ||
                    category.id === selectedCategory
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-200"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* View and Sort Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          {/* News Grid with Shimmer Loading */}
          {isLoading ? (
            <>
              {/* Category skeletons */}
              <CategorySkeleton />

              {/* News cards skeletons */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {[...Array(6)].map((_, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <NewsCardSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-4 text-sm text-gray-600">
                Showing {news.length} of {pagination.totalItems} articles
              </div>

              {/* News Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode + selectedCategory}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {news.map((newsItem, index) => (
                    <motion.div
                      key={newsItem._id}
                      variants={itemVariants}
                      custom={index}
                    >
                      <NewsCard news={newsItem} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {news.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or check back later
                  </p>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center items-center mt-12 space-x-2"
                >
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Show first, last, and pages around current
                      if (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= pagination.currentPage - 1 &&
                          page <= pagination.currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg transition-colors ${
                              pagination.currentPage === page
                                ? "bg-primary-600 text-white"
                                : "border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === pagination.currentPage - 2 ||
                        page === pagination.currentPage + 2
                      ) {
                        return <span key={page}>...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center space-x-1"
                  >
                    <span>Next</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

export default NewsPage;
