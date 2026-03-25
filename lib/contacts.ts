import type { Contact } from "@/types/site";

export const COMPANY_CONTACT: Contact = {
  phone: "+79030730909",
  working_hours: [
    { day_of_week: 0, start_time: "09:00", end_time: "20:00", is_active: true },
    { day_of_week: 1, start_time: "09:00", end_time: "20:00", is_active: true },
    { day_of_week: 2, start_time: "09:00", end_time: "20:00", is_active: true },
    { day_of_week: 3, start_time: "09:00", end_time: "20:00", is_active: true },
    { day_of_week: 4, start_time: "09:00", end_time: "20:00", is_active: true },
    { day_of_week: 5, start_time: "09:00", end_time: "20:00", is_active: true },
    { day_of_week: 6, is_active: false },
  ],
};
