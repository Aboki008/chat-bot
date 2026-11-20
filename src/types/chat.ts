export type Role = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  suggestedFollowUps?: string[];
}

export interface InquiryTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "admissions" | "programs" | "tuition" | "campus" | "dates" | "contact";
  prompt: string;
}

export type GroqModel = 
  | "llama-3.3-70b-versatile" 
  | "llama-3.1-8b-instant" 
  | "mixtral-8x7b-32768";

export interface ChatSettings {
  apiKey: string;
  model: GroqModel;
  institutionName: string;
  streamSpeed: "normal" | "fast";
}
