import { prisma } from "./prisma";
import type { Contact } from "@/types/site";
import { COMPANY_CONTACT } from "./contacts";
import type { LandPlot as FrontendLandPlot, LandPlotDetail } from "@/types/catalog";

export async function getRecommendedListings(): Promise<FrontendLandPlot[]> {
  const plots = await prisma.landPlot.findMany({
    where: { isPublished: true },
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      location: true,
      category: true,
      permittedUse: true,
      features: true,
      mediaFiles: { orderBy: { order: "asc" } },
    },
  });

  return plots.map((plot) => ({
    id: plot.id,
    title: plot.title,
    slug: plot.slug,
    description: plot.description,
    location: {
      id: 0,
      region: "",
      locality: "",
      address_line: plot.location.address,
      latitude: "",
      longitude: "",
    },
    price: String(plot.price),
    price_per_are: String(plot.pricePerHundred),
    listing_status: plot.isPublished ? "published" : "hidden",
    plot_status:
      plot.status === "AVAILABLE"
        ? "available"
        : plot.status === "SOLD"
          ? "sold"
          : "reserved",
    plot_status_display: plot.status === "SOLD" ? "Продан" : "",
    area: String(plot.area),
    media_files: plot.mediaFiles.map((f, i) => ({
      id: 0,
      url: f.url,
      file_url: f.url,
      is_main: i === 0,
      type: f.type === "IMAGE" ? "image" : "video",
      order: f.order,
    })),
    features: plot.features.map((f) => ({
      id: 0,
      name: f.name,
      type: "",
      type_display: "",
    })),
    land_category: plot.category ? { id: 0, name: plot.category.name } : null,
    land_use_types: plot.permittedUse
      ? [
          {
            id: 0,
            name: plot.permittedUse.name,
            description: plot.permittedUse.description ?? "",
          },
        ]
      : [],
    created_at: plot.createdAt.toISOString(),
    updated_at: plot.updatedAt.toISOString(),
  }));
}

export async function getCatalogListings(
  page = 1,
  pageSize = 20,
): Promise<{ plots: FrontendLandPlot[]; total: number }> {
  const [plots, total] = await Promise.all([
    prisma.landPlot.findMany({
      where: { isPublished: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        location: true,
        category: true,
        permittedUse: true,
        features: true,
        mediaFiles: { orderBy: { order: "asc" } },
      },
    }),
    prisma.landPlot.count({ where: { isPublished: true } }),
  ]);

  return {
    total,
    plots: plots.map((plot) => ({
      id: plot.id,
      title: plot.title,
      slug: plot.slug,
      description: plot.description,
      location: {
        id: 0,
        region: "",
        locality: "",
        address_line: plot.location.address,
        latitude: "",
        longitude: "",
      },
      price: String(plot.price),
      price_per_are: String(plot.pricePerHundred),
      listing_status: plot.isPublished ? "published" : "hidden",
      plot_status:
        plot.status === "AVAILABLE"
          ? "available"
          : plot.status === "SOLD"
            ? "sold"
            : "reserved",
      plot_status_display: plot.status === "SOLD" ? "Продан" : "",
      area: String(plot.area),
      media_files: plot.mediaFiles.map((f, i) => ({
        id: 0,
        url: f.url,
        file_url: f.url,
        is_main: i === 0,
        type: f.type === "IMAGE" ? "image" : "video",
        order: f.order,
      })),
      features: plot.features.map((f) => ({
        id: 0,
        name: f.name,
        type: "",
        type_display: "",
      })),
      land_category: plot.category ? { id: 0, name: plot.category.name } : null,
      land_use_types: plot.permittedUse
        ? [{ id: 0, name: plot.permittedUse.name, description: plot.permittedUse.description ?? "" }]
        : [],
      created_at: plot.createdAt.toISOString(),
      updated_at: plot.updatedAt.toISOString(),
    })),
  };
}

export async function getLandPlotBySlug(slug: string): Promise<LandPlotDetail | null> {
  let plot;
  try {
    plot = await prisma.landPlot.findUnique({
      where: { slug },
      include: {
        location: true,
        category: true,
        permittedUse: true,
        features: true,
        mediaFiles: { orderBy: { order: "asc" } },
        documentFiles: true,
      },
    });
  } catch (err) {
    console.error(`[getLandPlotBySlug] Prisma error for slug "${slug}":`, err);
    return null;
  }

  if (!plot) return null;

  const statusMap: Record<string, 'available' | 'reserved' | 'sold'> = {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
  };
  const plotStatus = statusMap[plot.status] ?? 'available';
  const statusDisplayMap: Record<string, string> = {
    available: 'Доступен',
    reserved: 'Забронирован',
    sold: 'Продан',
  };

  const cadastralNumbers = Array.isArray(plot.cadastralNumbers)
    ? (plot.cadastralNumbers as string[])
    : [];

  return {
    id: plot.id,
    title: plot.title,
    slug: plot.slug,
    description: plot.description,
    land_type: plot.plotType === 'RUSSIA' ? 'russia' : 'novorossia',
    land_type_display: plot.plotType === 'RUSSIA' ? 'Россия' : 'Новороссия',
    location: {
      id: 0,
      region: '',
      locality: '',
      address_line: plot.location.address,
      latitude: '',
      longitude: '',
    },
    cadastral_numbers: cadastralNumbers,
    land_use_types: plot.permittedUse
      ? [{ id: 0, name: plot.permittedUse.name, description: plot.permittedUse.description ?? '' }]
      : [],
    land_category: plot.category ? { id: 0, name: plot.category.name } : null,
    features: plot.features.map((f) => ({ id: 0, name: f.name, type: '', type_display: '' })),
    area: String(plot.area),
    price: String(plot.price),
    price_per_are: String(plot.pricePerHundred),
    plot_status: plotStatus,
    plot_status_display: statusDisplayMap[plotStatus] ?? 'Доступен',
    listing_status: plot.isPublished ? 'published' : 'hidden',
    listing_status_display: plot.isPublished ? 'Опубликовано' : 'Скрыто',
    media_files: plot.mediaFiles.map((f, i) => ({
      id: 0,
      url: f.url,
      file_url: f.url,
      is_main: i === 0,
      type: f.type === 'IMAGE' ? 'image' : 'video',
      order: f.order,
    })),
    document_files: plot.documentFiles.map((d) => ({
      id: d.id,
      url: d.url,
      name: d.name,
    })),
    created_at: plot.createdAt.toISOString(),
    updated_at: plot.updatedAt.toISOString(),
  };
}

export async function getSpecialOfferListing() {
  return prisma.landPlot.findUnique({
    where: { slug: "земля-береговая" },
    include: {
      mediaFiles: { orderBy: { order: "asc" }, take: 1 },
    },
  });
}

export function getCompanyContact(): Contact {
  return COMPANY_CONTACT;
}
