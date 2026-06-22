export interface Skill {
  name: string;
  category: 'hard' | 'soft' | 'creative'; // 'creative' matches creative and adaptive skills
  description?: string;
  rating: number; // 0-100 indicating competence depth
}

export interface PsychometricTrait {
  name: string;
  score: number; // 0-100
  description: string;
}

export interface CVParseResult {
  candidateName: string;
  email: string;
  summary: string;
  skills: Skill[];
  careerPathSuggestions: string[];
}

export interface DiaryNote {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date
  anxietyLevel: number; // 1-10 (level of anxiety/worry)
  interviewDate?: string; // Optional interview date linked to calendar
  interviewCompany?: string; // Company name for interview
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  description: string;
  requiredSkills: string[];
  responsivenessScore: number; // 0-100%
  publishDate: string;
  ttlRemainingHours: number; // Time-to-Live for recruiter to reply
  status: 'active' | 'expired' | 'hidden';
}

export interface Recruiter {
  id: string;
  name: string;
  company: string;
  averageReplyTimeHours: number;
  totalApplications: number;
  unresolvedApplications: number;
  unresolvedOverTTL: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  mode: 'interview' | 'empathy' | 'general';
}
