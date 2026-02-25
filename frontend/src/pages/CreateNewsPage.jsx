import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import { useAuthStore } from "../store/authStore";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Hash,
  AlignLeft,
  Image as ImageIcon,
  X,
  Check,
  AlertCircle,
  ArrowLeft,
  Send,
  Eye,
  Edit3,
  Loader,
} from "lucide-react";

const CreateNewsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();
  const { createNews, updateNews, fetchNewsById, singleNews, isLoading } = useNewsStore();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [touched, setTouched] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    console.log("URL ID from params:", id);
    if (id) {
      setIsEditMode(true);
      loadNewsForEdit(id);
    } else {
      setIsEditMode(false);
      // Reset form for new news
      setFormData({
        title: "",
        summary: "",
        content: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
      setExistingImage(null);
    }
  }, [id]);

  const loadNewsForEdit = async (newsId) => {
    setInitialLoading(true);
    try {
      console.log("Loading news for edit. News ID:", newsId);
      
      // Fetch news by ID
      const news = await fetchNewsById(newsId);
      console.log("Fetched news data:", news);
      
      if (news) {
        console.log("Setting form data with:", {
          title: news.title,
          summary: news.summary,
          content: news.content,
          category: news.category,
        });
        
        // Set form data
        setFormData({
          title: news.title || "",
          summary: news.summary || "",
          content: news.content || "",
          category: news.category || "",
          image: null,
        });
        
        // Set existing image preview
        if (news.imageUrl) {
          console.log("Setting image preview:", news.imageUrl);
          setExistingImage(news.imageUrl);
          setImagePreview(news.imageUrl);
        }

        // Mark all fields as touched to show validation if needed
        setTouched({
          title: true,
          summary: true,
          content: true,
          category: true,
        });
      } else {
        console.error("No news data found for ID:", newsId);
      }
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  // Watch for singleNews changes from store
  useEffect(() => {
    console.log("singleNews from store:", singleNews);
    if (singleNews && id && isEditMode) {
      console.log("Setting form data from singleNews");
      setFormData({
        title: singleNews.title || "",
        summary: singleNews.summary || "",
        content: singleNews.content || "",
        category: singleNews.category || "",
        image: null,
      });
      
      if (singleNews.imageUrl) {
        setExistingImage(singleNews.imageUrl);
        setImagePreview(singleNews.imageUrl);
      }
    }
  }, [singleNews, id, isEditMode]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const categories = [
    { id: "technology", name: "Technology", icon: "💻" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "business", name: "Business", icon: "📊" },
    { id: "entertainment", name: "Entertainment", icon: "🎬" },
    { id: "politics", name: "Politics", icon: "🏛️" },
    { id: "health", name: "Health", icon: "🏥" },
    { id: "science", name: "Science", icon: "🔬" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(`Field ${name} updated:`, value);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large (max 5MB)");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      setExistingImage(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    setExistingImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFieldError = (field) => {
    const value = formData[field];
    if (!value && touched[field]) return "This field is required";
    if (field === "title" && value?.length < 10 && touched[field])
      return "Title needs at least 10 characters";
    if (field === "summary" && value?.length < 50 && touched[field])
      return "Summary needs at least 50 characters";
    if (field === "content" && value?.length < 200 && touched[field])
      return "Content needs at least 200 characters";
    return null;
  };

  const isFormValid = () => {
    if (isEditMode) {
      return (
        formData.title?.length >= 10 &&
        formData.summary?.length >= 50 &&
        formData.content?.length >= 200 &&
        formData.category
      );
    }
    
    return (
      formData.title?.length >= 10 &&
      formData.summary?.length >= 50 &&
      formData.content?.length >= 200 &&
      formData.category &&
      formData.image
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setTouched({
        title: true,
        summary: true,
        content: true,
        category: true,
        image: true,
      });
      return;
    }

    let result;
    if (isEditMode) {
      console.log("Updating news with ID:", id);
      console.log("Update data:", formData);
      result = await updateNews(id, formData);
    } else {
      console.log("Creating new news");
      result = await createNews(formData);
    }

    if (result) {
      navigate(`/news/${result._id || id}`);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading news data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditMode ? "Edit News" : "Create News"} - NewsPortal</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center text-gray-600 hover:text-primary-600 transition-all mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  {isEditMode ? "Edit Story" : "Create Story"}
                  {isEditMode ? (
                    <Edit3 className="w-8 h-8 text-primary-500" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-primary-500" />
                  )}
                </h1>
                
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-6 py-3 bg-primary-50 rounded-xl text-primary-600 border border-primary-200 hover:bg-primary-100 transition-all"
              >
                <Eye className="w-5 h-5" />
                Preview
              </motion.button>
            </div>
          </motion.div>

        

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Title Input */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <label className="block text-gray-700 text-sm font-medium mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary-500" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("title")}
                  placeholder="e.g., Breakthrough in Quantum Computing..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 text-gray-900 placeholder-gray-400 text-xl font-medium focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                />
                <AnimatePresence>
                  {getFieldError("title") && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {getFieldError("title")}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="mt-2 flex justify-end">
                  <span
                    className={`text-sm ${
                      formData.title?.length >= 10
                        ? "text-green-600 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.title?.length || 0}/10 min
                  </span>
                </div>
              </div>

              {/* Category Selection */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <label className="block text-gray-700 text-sm font-medium mb-4">
                  Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, category: cat.id }));
                        handleBlur("category");
                      }}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        formData.category === cat.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div
                        className={`text-sm font-medium ${
                          formData.category === cat.id
                            ? "text-primary-700"
                            : "text-gray-600"
                        }`}
                      >
                        {cat.name}
                      </div>
                      {formData.category === cat.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 bg-primary-500 rounded-full p-0.5"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <label className="block text-gray-700 text-sm font-medium mb-3 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-primary-500" />
                  Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.summary || ""}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("summary")}
                  rows="3"
                  placeholder="A brief overview of your story..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                />
                <AnimatePresence>
                  {getFieldError("summary") && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {getFieldError("summary")}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="mt-2 flex justify-between">
                  <span className="text-gray-400 text-sm">
                    Max 300 characters
                  </span>
                  <span
                    className={`text-sm ${
                      formData.summary?.length > 250
                        ? "text-orange-500 font-medium"
                        : formData.summary?.length >= 50
                          ? "text-green-600 font-medium"
                          : "text-gray-400"
                    }`}
                  >
                    {formData.summary?.length || 0}/300
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formData.content || ""}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("content")}
                  rows="10"
                  placeholder="Write your story here..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-6 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                />
                <AnimatePresence>
                  {getFieldError("content") && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {getFieldError("content")}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="mt-2 flex justify-end">
                  <span
                    className={`text-sm ${
                      formData.content?.length >= 200
                        ? "text-green-600 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.content?.length || 0}/200 min
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Image Upload */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <h3 className="text-gray-800 font-medium mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary-500" />
                  Featured Image
                  {isEditMode && existingImage && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full ml-2">
                      Existing
                    </span>
                  )}
                </h3>

                {!imagePreview ? (
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-600 text-sm">
                        Click to upload
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        PNG, JPG, GIF up to 5MB
                      </span>
                    </label>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-xl overflow-hidden group"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={removeImage}
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {isEditMode && existingImage && !imagePreview && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Current image will be kept. Upload new to replace.
                  </p>
                )}
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-gray-800 font-medium mb-4">
                  Story Progress
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Title",
                      required: 10,
                      current: formData.title?.length || 0,
                    },
                    {
                      label: "Summary",
                      required: 50,
                      current: formData.summary?.length || 0,
                    },
                    {
                      label: "Content",
                      required: 200,
                      current: formData.content?.length || 0,
                    },
                    {
                      label: "Category",
                      required: 1,
                      current: formData.category ? 1 : 0,
                    },
                    {
                      label: "Image",
                      required: 1,
                      current: formData.image || existingImage ? 1 : 0,
                    },
                  ].map((item, index) => {
                    const completed = item.current >= item.required;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-600">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              completed
                                ? "text-green-600 font-medium"
                                : "text-gray-400"
                            }
                          >
                            {completed
                              ? "Completed"
                              : `${item.current}/${item.required}`}
                          </span>
                          {completed && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ([
                          (formData.title?.length || 0) >= 10,
                          (formData.summary?.length || 0) >= 50,
                          (formData.content?.length || 0) >= 200,
                          !!formData.category,
                          !!(formData.image || existingImage),
                        ].filter(Boolean).length /
                          5) *
                        100
                      }%`,
                    }}
                    className="h-full bg-primary-500 rounded-full"
                  />
                </div>
              </div>

              {/* Publish Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!isFormValid() || isLoading}
                className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                  isFormValid() && !isLoading
                    ? "bg-primary-600 text-white shadow-lg hover:bg-primary-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditMode ? "Updating..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {isEditMode ? "Update Story" : "Publish Story"}
                  </>
                )}
              </motion.button>

              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                )}

                {formData.category && (
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                    {categories.find((c) => c.id === formData.category)?.name}
                  </span>
                )}

                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {formData.title || "Your Title"}
                </h2>

                <p className="text-gray-600 text-lg mb-4">
                  {formData.summary || "Your summary will appear here..."}
                </p>

                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {formData.content || "Your content will appear here..."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateNewsPage;