export type Project = {
  name: string;
  description: string;
  skills: string;
  image?: string;
  link?: string;
};

export type Experience = {
  name: string;
  description: string;
  position: string;
  date: string;
  coding: string;
  activities?: string[];
};

export type Skill = {
  name: string;
  category: string;
  icon?: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  categories: string[];
};
export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  response: string;
}

export interface ChatRequest {
  message: string;
  sessionToken?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  experience: string[];
  skills: string[];
  projects: string[];
  stories: string[];
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
  };
}
