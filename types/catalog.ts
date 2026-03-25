// Минимальные типы для главной страницы и моковых карточек.
// Без бэкенд-запросов: только структура данных для визуального гридa.

export interface Location {
  id: number;
  region: string;
  locality: string;
  address_line: string;
  latitude: string;
  longitude: string;
}

export interface MediaFile {
  id?: number;
  url: string;
  file_url?: string; // используется в карточке
  description?: string;
  type?: string; // e.g. 'image' | 'document'
  type_display?: string;
  is_main?: boolean;
  order?: number;
}

export interface Feature {
  id: number;
  name: string;
  type: string;
  type_display: string;
}

export interface LandUseType {
  id: number;
  name: string;
  description?: string;
}

export interface LandCategory {
  id: number;
  name: string;
}

interface BaseListing {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  location: Location;
  price: string; // формат как в API (строка для display)
  listing_status: "published" | "hidden" | "sold" | "reserved" | string;
  media_files: MediaFile[];
  created_at: string;
  updated_at: string;
  view_count?: number;
}

export interface LandPlot extends BaseListing {
  area: string; // в сотках
  price_per_are: string;
  features: Feature[];
  land_category?: LandCategory | null;
  land_use_types?: LandUseType[] | null;
  plot_status?: "available" | "sold" | "reserved";
  // Используется в `ListingCard` для отображения баннера "ПРОДАН".
  plot_status_display?: string;
}

export interface GenericProperty extends BaseListing {
  property_type?: { name: string; slug: string };
  attributes?: Record<string, any>;
}

export interface Helicopter extends BaseListing {
  model: string;
  capacity: string;
  engine: string;
  max_speed: string;
  range: string;
  features: string[];
}

export type Listing = LandPlot | GenericProperty | Helicopter;

// ──────────────────────────────────────────────
// Detail page types
// ──────────────────────────────────────────────

export interface DocumentFile {
  id: string;
  url: string;
  name: string;
}

export interface LandPlotDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  land_type: 'russia' | 'novorossia';
  land_type_display: string;
  location: Location;
  cadastral_numbers: string[];
  land_use_types: LandUseType[];
  land_category: LandCategory | null;
  features: Feature[];
  area: string;
  price: string;
  price_per_are: string;
  plot_status: 'available' | 'reserved' | 'sold';
  plot_status_display: string;
  listing_status: 'published' | 'hidden';
  listing_status_display: string;
  media_files: MediaFile[];
  document_files: DocumentFile[];
  created_at: string;
  updated_at: string;
}

export function isLandPlotDetail(v: unknown): v is LandPlotDetail {
  return typeof v === 'object' && v !== null && 'land_type' in v;
}

