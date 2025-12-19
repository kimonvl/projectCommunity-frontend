import { User } from "../auth/auth.types";

export interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    owner: User;
    participants: User[];
}

export interface ProjectError {
    message: string;
    status?: number;
}

export interface ProjectState {
    myProjects: Project[];
    selectedProject: Project | null;
    createProjectLoading: boolean;
    loading: boolean;
    error: ProjectError | null;
}