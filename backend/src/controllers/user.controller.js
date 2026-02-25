import User from '../models/User.model.js';
import News from '../models/News.model.js';
import { cloudinary } from '../config/cloudinary.js';
import jwt from 'jsonwebtoken';


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    const userNews = await News.find({ author: req.userId })
      .sort({ publishedAt: -1 });

    res.json({
      user,
      news: userNews
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    
    if (req.file) {
      if (user.profilePicture) {
        const publicId = user.profilePicture.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`newsportal/profiles/${publicId}`);
      }
      user.profilePicture = req.file.path;
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
  
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};