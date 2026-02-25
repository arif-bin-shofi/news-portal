import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import NewsCard from "../components/news/NewsCard";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion"; // 👈 ইম্পোর্ট যোগ করুন
import { format } from "date-fns"; // 👈 ইম্পোর্ট যোগ করুন
import { 
  FiTrendingUp, 
  FiClock, 
  FiGrid, 
  FiArrowRight,
  FiChevronRight,
  FiCamera,
  FiVideo,
  FiMic,
  FiAward
} from "react-icons/fi";

const HomePage = () => {
  const { topNews, fetchTopNews, fetchNews, news } = useNewsStore();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchTopNews();
        await fetchNews(1);
      } catch (error) {
        console.error("Error loading news:", error);
      }
    };
    
    loadData();
  }, [fetchTopNews, fetchNews]); 

  const categories = [
    { name: "Technology", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { name: "Sports", icon: "⚽", color: "from-green-500 to-emerald-500" },
    { name: "Business", icon: "📈", color: "from-purple-500 to-pink-500" },
    { name: "Entertainment", icon: "🎬", color: "from-yellow-500 to-orange-500" },
    { name: "Politics", icon: "🏛️", color: "from-red-500 to-rose-500" },
    { name: "Health", icon: "🏥", color: "from-teal-500 to-green-500" },
    { name: "Science", icon: "🔬", color: "from-indigo-500 to-blue-500" },
  ];

  const featuredNews = topNews?.[0];
  const otherTopNews = topNews?.slice(1, 4) || [];

 
  if (!topNews || !news) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>NewsPortal - Your Trusted News Source</title>
        <meta
          name="description"
          content="Get the latest news from around the world"
        />
      </Helmet>

      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              NewsPortal
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Your trusted source for the latest news and updates from around the world
            </p>

          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Breaking News Ticker */}
      {topNews?.length > 0 && (
        <div className="bg-red-600 text-white py-3 overflow-hidden">
          <div className="container-custom">
            <div className="flex items-center">
              <span className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm mr-4 animate-pulse">
                BREAKING
              </span>
              <div className="overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-marquee">
                  {topNews.slice(0, 5).map((news, index) => (
                    <span key={news._id} className="mx-8">
                      {news.title}
                      {index < 4 && <span className="mx-4">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Story Section */}
      {featuredNews && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FiTrendingUp className="text-2xl text-red-500 mr-2" />
                <h2 className="text-3xl font-bold">Featured Story</h2>
              </div>
              <Link to="/news" className="text-primary-600 hover:text-primary-700 flex items-center group">
                View All <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Featured News */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl h-[500px]">
                <img
                  src={featuredNews.imageUrl || "https://via.placeholder.com/800x600"}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {featuredNews.category}
                    </span>
                    <span className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      ⏱️ {featuredNews.readTime || "5 min read"}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{featuredNews.title}</h3>
                  <p className="text-gray-200 mb-6 line-clamp-2">{featuredNews.summary}</p>
                  <Link
                    to={`/news/${featuredNews._id}`}
                    className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Read Full Story <FiChevronRight className="ml-2" />
                  </Link>
                </div>
              </div>

              {/* Side News */}
              <div className="space-y-4">
                {otherTopNews.map((news) => (
                  <Link
                    key={news._id}
                    to={`/news/${news._id}`}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={news.imageUrl || "https://via.placeholder.com/150x150"}
                      alt={news.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-primary-600">{news.category}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{news.readTime || "3 min read"}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 line-clamp-2">{news.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{news.views || 0} views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top News Section */}
{topNews && topNews.length > 0 && (
  <section className="py-16">
    <div className="container-custom">
      <h2 className="text-3xl font-bold mb-8">Top News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topNews.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <Link to={`/news/${item._id}`}>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.summary}</p>
                
                {/* Author and Date Section */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    {/* Author Profile Image */}
                    <img
                      src={item.author?.profilePicture }
                      alt={item.author?.name || 'Author'}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/36x36?text=User';
                      }}
                    />
                    <span className="font-medium text-gray-700">
                      {item.author?.name || 'Unknown Author'}
                    </span>
                  </div>
                  <span>
                    {item.publishedAt 
                      ? format(new Date(item.publishedAt), 'MMM dd, yyyy') 
                      : 'No date'}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)}

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest News</h2>
              <p className="text-gray-600">Stay updated with the most recent articles</p>
            </div>
            <Link
              to="/news"
              className="hidden md:flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
            >
              View All News
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((newsItem, index) => (
              <div key={newsItem._id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                      NEW
                    </span>
                  </div>
                )}
                <div className="transform hover:-translate-y-1 transition-all duration-300">
                  <NewsCard news={newsItem} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="text-center mt-8 md:hidden">
            <Link
              to="/news"
              className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View All News
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Add custom animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>
  );
};

export default HomePage;