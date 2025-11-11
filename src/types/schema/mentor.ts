export interface Education {
  school: string;
  degree: string;
  field?: string;
  from?: string;
  to?: string;
}

export interface Experience {
  company: string;
  title: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  current?: boolean;
}

export interface Mentor {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  email_address: string | null;
  phone_number: string | null;
  bio: string | null;
  educations: Education[] | null;
  experiences: Experience[] | null;
}

