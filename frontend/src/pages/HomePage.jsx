import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import NewsCard from "../components/news/NewsCard";
import { Helmet } from "react-helmet-async";
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
    fetchTopNews();
    fetchNews(1);
  }, []);

  const categories = [
    { name: "Technology", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { name: "Sports", icon: "⚽", color: "from-green-500 to-emerald-500" },
    { name: "Business", icon: "📈", color: "from-purple-500 to-pink-500" },
    { name: "Entertainment", icon: "🎬", color: "from-yellow-500 to-orange-500" },
    { name: "Politics", icon: "🏛️", color: "from-red-500 to-rose-500" },
    { name: "Health", icon: "🏥", color: "from-teal-500 to-green-500" },
    { name: "Science", icon: "🔬", color: "from-indigo-500 to-blue-500" },
  ];

  const featuredNews = topNews[0];
  const otherTopNews = topNews.slice(1, 4);

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

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                <input
                  type="text"
                  placeholder="Search for news, topics, or categories..."
                  className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  Search
                </button>
              </div>
            </div>

           
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
      {topNews.length > 0 && (
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
                      <p className="text-sm text-gray-500 mt-1">{news.views} views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest News Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2"> News</h2>
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
              <div
                key={newsItem._id}
                className="transform hover:-translate-y-1 transition-all duration-300"
              >
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                      NEW
                    </span>
                  </div>
                )}
                <NewsCard news={newsItem} />
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
      <style jsx>{`
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