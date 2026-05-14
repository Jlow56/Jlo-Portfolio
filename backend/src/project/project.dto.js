/**
 * DTO récuperation des données d’un projet — liste
 */
export const projectToDTO = (project) => ({
  id: project._id.toString(),
  name: project.name,
  slug: project.slug,
  technology: project.technology,
  category: project.category,
  cover: project.cover,
  image: project.image,
  link: project.link,
  gitHub: project.gitHub,
  shortDescription: project.shortDescription,
  description: project.description,
  problematic: project.problematic,
  solution: project.solution,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt
});
/**
 * DTO — récuperation d’un projet — liste
 */
export const projectsToDTO = (projects) =>
  projects.map(projectToDTO);

/**
 * DTO — création d’un projet
 */
export const projectCreateDTO = (data) => ({
  name: data.name,
  technology: data.technology,
  category: data.category,
  cover: data.cover,
  image: data.image,
  link: data.link,
  gitHub: data.gitHub,
  shortDescription: data.shortDescription,
  description: data.description,
  problematic: data.problematic,
  solution: data.solution,
});
/**
 * DTO d’entrée — mise à jour
 * Même surface que create, sans mutation implicite
 */
export const projectUpdateDTO = (data) => {
  const dto = {};
  const fields = ["name","technology","category","cover","image","link","gitHub","shortDescription","description","problematic","solution"];
  
  fields.forEach(f => {
    if (data[f] !== undefined) dto[f] = data[f];
  });
  
  return dto;
};