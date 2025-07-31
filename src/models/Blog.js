import mongoose from "mongoose";

const localizedContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  seotitle: {
    type: String,
    required: true,
    trim: true,
  },
  seodescription: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  longDescription: {
    type: String,
    required: true,
    trim: true,
  },
});

const blogSchema = new mongoose.Schema(
  {
    ua: localizedContentSchema, // лише українська
    photos: [
      {
        type: String, // URL або шлях до фото
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
