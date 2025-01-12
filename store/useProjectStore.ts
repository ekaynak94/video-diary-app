import { create } from "zustand";

interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  uri: string;
  thumbnail: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
}

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
}));

export default useProjectStore;
