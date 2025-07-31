// import mongoose, { Schema, model, models } from "mongoose";

// const ProductSchema = new Schema({
//   name: {
//     ua: { type: String, required: true },
//   },

//   shortDescription: {
//     ua: { type: String },
//   },

//   longDescription: {
//     ua: { type: String },
//   },

//   seotitle: {
//     ua: { type: String },
//   },

//   seodescriptions: {
//     ua: { type: String },
//   },

//   seoText: {
//     ua: { type: String },
//   },

//   images: [{ type: String }],

//   characteristics: [
//     {
//       name: { type: String },
//       value: { type: String },
//     },
//   ],

//   category: { type: mongoose.Types.ObjectId, ref: "Category" },
// });

// export const Product = models?.Product || model("Product", ProductSchema);
import mongoose, { Schema, model, models } from "mongoose";
const ProductSchema = new Schema({
  name: {
    ua: { type: String, required: true },
  },

  shortDescription: {
    ua: { type: String },
  },

  longDescription: {
    ua: { type: String },
  },

  seotitle: {
    ua: { type: String },
  },

  seodescriptions: {
    ua: { type: String },
  },

  seoText: {
    ua: { type: String },
  },

  images: [{ type: String }],

  characteristics: [
    {
      name: { type: String },
      value: { type: String },
    },
  ],

  category: { type: mongoose.Types.ObjectId, ref: "Category" },

  // ✅ Додаємо поле ціни
  price: { type: Number, required: true }, // наприклад, 255
});
export const Product = models?.Product || model("Product", ProductSchema);
