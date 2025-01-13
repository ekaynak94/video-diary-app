import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useProjectStore;
