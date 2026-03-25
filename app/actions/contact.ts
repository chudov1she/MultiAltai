'use server';

import { prisma } from '@/lib/prisma';
import { normalisePhone } from '@/lib/phone';
import { notifyTelegram, buildContactNotification } from '@/lib/telegram';
import { revalidatePath } from 'next/cache';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export async function submitContactApplication(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? '';
  const phone = formData.get('phone')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !phone) {
    return { status: 'error', message: 'Пожалуйста, заполните обязательные поля (Имя, Телефон).' };
  }

  if (!email) {
    return { status: 'error', message: 'Пожалуйста, укажите электронную почту.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Пожалуйста, введите корректный адрес электронной почты.' };
  }

  if (!message) {
    return { status: 'error', message: 'Пожалуйста, напишите сообщение.' };
  }

  const cleanPhone = normalisePhone(phone);
  if (!cleanPhone) {
    return { status: 'error', message: 'Пожалуйста, введите корректный номер телефона (минимум 11 цифр).' };
  }

  try {
    await prisma.application.create({
      data: {
        type: 'CONTACT',
        name,
        phone: cleanPhone,
        email,
        message,
      },
    });

    revalidatePath('/contacts');

    // Fire-and-forget
    notifyTelegram(buildContactNotification({ name, phone: cleanPhone, email, message }));

    return { status: 'success', message: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.' };
  } catch (err) {
    console.error('[submitContactApplication]', err);
    return { status: 'error', message: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.' };
  }
}
