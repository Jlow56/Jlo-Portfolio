import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
{
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true },

  category: {
    type: String,
    enum: [ "site-web", "application", "api-backend", "seo-optimisation", "gestion-projet" ],
    required: true,
    index: true
  },

  technology: { type: [String], required: true, index: true },

  cover: { type: String, required: true },
  image: { type: [String], default: [] },

  link: { type: String },
  gitHub: { type: String, required: true },

  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  problematic: { type: String, required: true },
  solution: { type: String, required: true }
},
{ 
  timestamps: true 
} 
);

// slug auto + unicité
projectSchema.pre("save", async function(next) {
  if (!this.slug || this.isModified("name")) {
    let baseSlug = this.name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    let slug = baseSlug;
    let count = 1;

    while (await this.constructor.exists({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }

  next();
});

projectSchema.index({ createdAt: -1 });

export default mongoose.model("Project", projectSchema);