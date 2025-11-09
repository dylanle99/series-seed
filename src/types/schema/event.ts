export interface Event {
  id: string;
  created_at: string;
  title: string;
  type: string;
  occured_at: string | null;
  in_person_location: string | null;
  virtual_location: string | null;
  description: string | null;
  banner_image: string | null;
  updated_at: string | null;
}

