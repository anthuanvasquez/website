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
  projects?: {
    name: string;
    description: string;
    skills: string;
  }[];
};

export type Skill = {
  name: string;
  category: string;
  icon?: string;
};

export type Service = {
  name: string;
  icon: string;
};
// types/chat.ts
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  sessionId?: string;
  error?: string;
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
  sessionId?: string;
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
