import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project } from "@/types";

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
