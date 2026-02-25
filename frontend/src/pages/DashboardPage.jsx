import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNewsStore } from "../store/newsStore";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiCalendar, 
  FiFolder,
  FiUser,
  FiMail,
  FiCamera,
  FiPlus
} from "react-icons/fi";

const DashboardPage = () => {
  const { user, updateProfile, isLoading: authLoading } = useAuthStore();
  const {
    userNews,
    fetchUserNews,
    deleteNews,
    isLoading: newsLoading,
  } = useNewsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePicture: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        profilePicture: null,
      });
      fetchUserNews();
    }
  }, [user, fetchUserNews]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      await deleteNews(id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      technology: "bg-blue-100 text-blue-800",
      sports: "bg-green-100 text-green-800",
      entertainment: "bg-purple-100 text-purple-800",
      business: "bg-yellow-100 text-yellow-800",
      health: "bg-red-100 text-red-800",
      science: "bg-indigo-100 text-indigo-800",
      politics: "bg-orange-100 text-orange-800",
      default: "bg-gray-100 text-gray-800",
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">Please login to view your dashboard</p>
          <Link 
            to="/login" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            Login to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - NewsPortal</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">Manage your profile and news articles</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
                  <h2 className="text-xl font-semibold text-white mb-1">Profile Information</h2>
                  <p className="text-blue-100 text-sm">Manage your personal details</p>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Picture
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="relative group">
                            {user.profilePicture ? (
                              <img
                                src={user.profilePicture}
                                alt={user.name}
                                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold border-4 border-blue-100">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <FiCamera className="text-white text-xl" />
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {authLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </span>
                        ) : "Save Changes"}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="text-center">
                      {/* Profile Picture */}
                      <div className="mb-6">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 shadow-lg"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-5xl font-bold mx-auto mb-4 border-4 border-blue-100 shadow-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* User Info */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h3>
                      
                      <div className="flex items-center justify-center text-gray-600 mb-3">
                        <FiMail className="mr-2" />
                        <p>{user.email}</p>
                      </div>

                      {user.bio && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                          <p className="text-gray-700 italic">"{user.bio}"</p>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-2xl font-bold text-blue-600">{userNews.length}</p>
                          <p className="text-sm text-gray-600">Total Articles</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-2xl font-bold text-green-600">
                            {userNews.reduce((sum, news) => sum + (news.views || 0), 0)}
                          </p>
                          <p className="text-sm text-gray-600">Total Views</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        <FiEdit2 className="mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* My News Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* News Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-1">My News Articles</h2>
                      <p className="text-blue-100">Manage and track your published articles</p>
                    </div>
                    <Link
                      to="/create-news"
                      className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center"
                    >
                      <FiPlus className="w-5 h-5 mr-2" />
                      Write New
                    </Link>
                  </div>
                </div>

                {/* News Content */}
                <div className="p-6">
                  {newsLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : userNews.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mb-4">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
                      <p className="text-gray-600 mb-6">You haven't written any news articles yet.</p>
                      <Link
                        to="/create-news"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                      >
                        <FiPlus className="w-5 h-5 mr-2" />
                        Write Your First Article
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userNews.map((news) => (
                        <article
                          key={news._id}
                          className="group bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <div className="flex flex-col md:flex-row">
                            {/* News Image */}
                            <div className="md:w-48 h-48 md:h-auto overflow-hidden bg-gray-100">
                              {news.imageUrl ? (
                                <img
                                  src={news.imageUrl}
                                  alt={news.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* News Content */}
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {news.title}
                                </h3>
                                <div className="flex space-x-2 ml-4">
                                  {/* Edit Button - This sends the ID to edit page */}
                                  <Link
                                    to={`/edit-news/${news._id}`}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit article"
                                  >
                                    <FiEdit2 className="w-5 h-5" />
                                  </Link>
                                  <button
                                    onClick={() => handleDeleteNews(news._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete article"
                                  >
                                    <FiTrash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {news.summary || news.content?.substring(0, 150)}...
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(news.category)}`}>
                                  <FiFolder className="inline mr-1" />
                                  {news.category}
                                </span>
                                
                                <span className="flex items-center text-gray-500">
                                  <FiCalendar className="mr-1" />
                                  {format(new Date(news.publishedAt), "MMM dd, yyyy")}
                                </span>
                                
                                <span className="flex items-center text-gray-500">
                                  <FiEye className="mr-1" />
                                  {news.views || 0} views
                                </span>

                                {news.isPremium && (
                                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                    Premium
                                  </span>
                                )}
                              </div>

                              {/* Author Info - Optional */}
                              {news.author && (
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center">
                                  <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-500">
                                    By {news.author.name || "Anonymous"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;