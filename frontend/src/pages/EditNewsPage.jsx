import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import { useAuthStore } from "../store/authStore";
import { Helmet } from "react-helmet-async";

const EditNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { singleNews, fetchNewsById, updateNews, isLoading } = useNewsStore();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "technology",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (id) {
      fetchNewsById(id);
    }
  }, [id]);

  useEffect(() => {
    if (singleNews) {
      setFormData({
        title: singleNews.title || "",
        summary: singleNews.summary || "",
        content: singleNews.content || "",
        category: singleNews.category || "technology",
        image: null,
      });
    }
  }, [singleNews]);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!singleNews) {
    return <div className="container-custom py-12 text-center">Loading...</div>;
  }

  // Check if user is author
  if (singleNews.author?._id !== user.id && user.role !== "admin") {
    navigate("/dashboard");
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const news = await updateNews(id, formData);
    if (news) {
      navigate(`/news/${news._id}`);
    }
  };

  const categories = [
    "technology",
    "sports",
    "business",
    "entertainment",
    "politics",
    "health",
    "science",
  ];

  return (
    <>
      <Helmet>
        <title>Edit News - NewsPortal</title>
      </Helmet>

      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Edit News Article</h1>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium mb-2">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows="3"
              className="input"
              required
              maxLength="300"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="10"
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Featured Image (Leave empty to keep current)
            </label>
            {singleNews.imageUrl && !previewUrl && (
              <div className="mb-2">
                <img
                  src={singleNews.imageUrl}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
            {previewUrl && (
              <div className="mb-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update News"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNewsPage;
