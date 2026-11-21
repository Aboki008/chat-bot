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
  | "qwen/qwen3.8-27b" 
  | "openai/gpt-oss-120b" 
  | "openai/gpt-oss-20b";

export interface ChatSettings {
  apiKey: string;
  model: GroqModel;
  institutionName: string;
  streamSpeed: "normal" | "fast";
}
