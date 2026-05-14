import Project from "./Project.model.js";
import { projectToDTO, projectsToDTO, projectCreateDTO, projectUpdateDTO } from "./project.dto.js";
import { AppError } from "../errors/AppError.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

/**
 * GET /api/projects
 */
export const getAllProjects = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments()
  ]);

  res.status(200).json({
    data: projectsToDTO(projects),
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
    error: null
  });
});
/**
 * GET /api/projects/:slug
 */
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug }).lean();

  if (!project) {
    throw new AppError("Projet introuvable", 404);
  }

  res.status(200).json({
    data: projectToDTO(project),
    error: null
  });
});


/**
 * GET /api/projects/category/:category
 */
export const getProjectsByCategory = asyncHandler(async (req, res) => {
  const projects = await Project.find({ category: req.params.category }).lean();
  res.status(200).json({
    data: projectsToDTO(projects),
    error: null
  });
});

// ==============================
// ========== ADMIN ONLY ========
// ==============================

export const createProject = asyncHandler(async (req, res) => {
  const data = projectCreateDTO(req.body);
  
  const project = await Project.create(data);

  if (!project) {
    throw new AppError("Impossible de générer un slug unique", 500);
  }

  res.status(201).json({ data: projectToDTO(project), error: null });
});

export const updateProject = asyncHandler(async (req, res) => {
  const data = projectUpdateDTO(req.body);

  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError("Projet introuvable", 404);
  }

  Object.assign(project, data);

  await project.save();

  res.status(200).json({
    data: projectToDTO(project),
    error: null
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);

  if (!deleted) {
    throw new AppError("Projet introuvable", 404);
  }

  res.status(200).json({ data: null, error: null });
});