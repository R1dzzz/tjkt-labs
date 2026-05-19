export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'teacher' | 'student';
  avatar_url?: string;
  created_at: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_name: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

export interface TopologyProject {
  id: string;
  name: string;
  type: 'star' | 'bus' | 'ring' | 'mesh' | 'tree' | 'hybrid';
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  created_by: string;
  created_at: string;
}

export interface TopologyNode {
  id: string;
  type: 'router' | 'switch' | 'pc' | 'server';
  label: string;
  x: number;
  y: number;
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface CLIConfig {
  id: string;
  title: string;
  type: 'static' | 'dhcp' | 'vlan' | 'static-route' | 'rip' | 'nat' | 'subnetting';
  config: string;
  created_by: string;
  created_at: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LearningProgress {
  id: string;
  user_id: string;
  module: string;
  completed: boolean;
  score?: number;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: string;
  created_at: string;
}

export interface Language {
  code: 'id' | 'en';
  name: string;
  flag: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  absen: number;
  class: string;
  year: string;
  avatar: string;
}

export interface AITool {
  name: string;
  icon: string;
  color: string;
}

export interface CLIOption {
  id: string;
  label: string;
  value: string;
  params: CLIParam[];
}

export interface CLIParam {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { label: string; value: string }[];
  placeholder?: string;
  default?: string;
}
