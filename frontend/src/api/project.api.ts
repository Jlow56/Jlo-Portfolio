import { http } from "./http";
import { Project } from "../contracts";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const res = await http.get("api/projects");
    return Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (err) {
    console.error("Erreur fetchProjects:", err);
    return [];
  }
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const res = await http.get(`/projects/${slug}`);
    return res.data?.data || null;
  } catch (err) {
    console.error(`Erreur fetchProjectBySlug (${slug}):`, err);
    return null;
  }
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  try {
    const res = await http.get(`/projects/${id}`);
    return res.data?.data || null;
  } catch (err) {
    console.error(`Erreur fetchProjectById (${id}):`, err);
    return null;
  }
};