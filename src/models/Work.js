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

const workSchema = new mongoose.Schema(
  {
    translations: {
      en: localizedContentSchema, // Англійська
      pl: localizedContentSchema, // Польська
      ru: localizedContentSchema, // Російська
      ua: localizedContentSchema, // Українська
    },
    videoId: {
      type: String,
      required: true,
      trim: true,
    },
    photos: [
      {
        type: String, // URL або шлях до фото
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Work || mongoose.model("Work", workSchema);
