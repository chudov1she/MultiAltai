export interface WorkingHour {
  day_of_week: number; // 0..6 (Пн..Вс)
  start_time?: string; // HH:MM
  end_time?: string; // HH:MM
  is_active: boolean;
}

export interface Contact {
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  office_address?: string;
  working_hours?: WorkingHour[];
}

export interface MenuItem {
  id: number;
  title: string;
  path: string;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: "vk" | "telegram" | "youtube" | "whatsapp";
  url: string;
}

export type { Contact as ContactInfo };

