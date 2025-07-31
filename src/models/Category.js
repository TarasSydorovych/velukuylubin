import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    ua: { type: String, required: true },
  },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
  shorttitle: {
    ua: { type: String },
  },
  longdesc: {
    ua: { type: String },
  },
  seotitle: {
    ua: { type: String },
  },
  ceodescriptions: {
    ua: { type: String },
  },
});

export const Category = models?.Category || model("Category", CategorySchema);
