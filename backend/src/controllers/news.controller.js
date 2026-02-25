import News from "../models/News.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    let query = {};
    if (category) query.category = category;

    const news = await News.find(query)
      .populate("author", "name email profilePicture")
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await News.countDocuments(query);

    res.json({
      news,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalNews: total,
    });
  } catch (error) {
    console.error("Get all news error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getTopNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("author", "profilePicture name")
      .sort({ views: -1, publishedAt: -1 })
      .limit(6);

    res.json(news);
  } catch (error) {
    console.error("Get top news error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      "author",
      "name email profilePicture bio",
    );

    if (!news) return res.status(404).json({ message: "News not found" });

    news.views += 1;
    await news.save();

    res.json(news);
  } catch (error) {
    console.error("Get news by id error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};


export const createNews = async (req, res) => {
  try {
    const { title, content, summary, category } = req.body;


    if (!title || !content || !summary || !category) {
      return res.status(400).json({
        message: "Missing required fields: title, content, summary, category",
      });
    }

    const imageUrl = req.file
      ? req.file.path
      : "https://res.cloudinary.com/duumnigni/image/upload/v1771916324/newsportal/news/news-1771916321986-991788482.jpg";

    const news = new News({
      title,
      content,
      summary,
      category,
      imageUrl,
      author: req.userId,
    });

    await news.save();
    await news.populate("author", "name email");

    res.status(201).json(news);
  } catch (error) {
    console.error("Create news error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};


export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content, summary, category } = req.body;

    news.title = title || news.title;
    news.content = content || news.content;
    news.summary = summary || news.summary;
    news.category = category || news.category;

    if (req.file) {
      if (news.imageUrl) {
        const publicId = news.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`newsportal/news/${publicId}`);
      }
      news.imageUrl = req.file.path;
    }

    await news.save();
    await news.populate("author", "name email");

    res.json(news);
  } catch (error) {
    console.error("Update news error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (news.imageUrl) {
      const publicId = news.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`newsportal/news/${publicId}`);
    }

    await news.deleteOne();

    res.json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Delete news error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getUserNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.userId }).sort({
      publishedAt: -1,
    });

    res.json(news);
  } catch (error) {
    console.error("Get user news error:", error);
    res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
