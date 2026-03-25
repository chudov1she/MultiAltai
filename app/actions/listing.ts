'use server';

import { prisma } from '@/lib/prisma';
import { normalisePhone } from '@/lib/phone';
import { notifyTelegram, buildListingNotification } from '@/lib/telegram';
import { revalidatePath } from 'next/cache';

export type ListingType = 'land_plot' | 'general';

export type ListingFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Bound params: listingId, listingTitle, listingType
 * Then useActionState passes: prevState, formData
 */
export async function submitListingApplication(
  listingId: string,
  listingTitle: string,
  listingType: ListingType,
  _prev: ListingFormState,
  formData: FormData,
): Promise<ListingFormState> {
  const name    = formData.get('name')?.toString().trim()    ?? '';
  const phone   = formData.get('phone')?.toString().trim()   ?? '';
  const email   = formData.get('email')?.toString().trim()   ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  // ── Validation ───────────────────────────────────────────────────
  if (!name)  return { status: 'error', message: 'Пожалуйста, укажите ваше имя.' };
  if (!phone) return { status: 'error', message: 'Пожалуйста, укажите номер телефона.' };

  const cleanPhone = normalisePhone(phone);
  if (!cleanPhone) {
    return { status: 'error', message: 'Введите корректный номер телефона (минимум 11 цифр).' };
  }

  if (!email) return { status: 'error', message: 'Пожалуйста, укажите электронную почту.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Введите корректный адрес электронной почты.' };
  }

  if (!message) return { status: 'error', message: 'Пожалуйста, напишите сообщение.' };

  // ── Persist ───────────────────────────────────────────────────────
  try {
    const isRealLandPlot = listingType === 'land_plot' && UUID_RE.test(listingId);

    await prisma.application.create({
      data: {
        type:       isRealLandPlot ? 'LAND_PLOT' : 'CONTACT',
        name,
        phone:      cleanPhone,
        email,
        // Prepend listing title to message for non-land-plot inquiries so
        // managers see what object the client is interested in.
        message:    isRealLandPlot ? message : `[${listingTitle}]\n${message}`,
        landPlotId: isRealLandPlot ? listingId : null,
      },
    });

    if (isRealLandPlot) revalidatePath('/catalog/land-plots');

    // Fire-and-forget — TG failure must not block the user response.
    notifyTelegram(buildListingNotification({
      listingType: isRealLandPlot ? 'land_plot' : 'general',
      listingTitle,
      name,
      phone:   cleanPhone,
      email,
      message: isRealLandPlot ? message : `[${listingTitle}]\n${message}`,
    }));

    return {
      status: 'success',
      message: 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
    };
  } catch (err) {
    console.error('[submitListingApplication]', err);
    return { status: 'error', message: 'Произошла ошибка при отправке. Попробуйте позже.' };
  }
}
