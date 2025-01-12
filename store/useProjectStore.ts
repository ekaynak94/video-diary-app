import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => {
        set((state) => ({
          projects: [...state.projects, project],
        }));
      },
    }),
    {
      name: "project-store",
    }
  )
);

export default useProjectStore;
