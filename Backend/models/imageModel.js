import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  picture: {
    picture_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    }
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
  }],
  hash: {
    type: String,
    required: true,
    unique: true,
  },
//   comments: [{
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     text: String,
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   }],
});

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Image;
