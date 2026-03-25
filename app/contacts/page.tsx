import React from 'react';
import type { Metadata } from 'next';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import { getCompanyContact } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с нами для получения информации о проекте МультиАлтай',
};

export default async function ContactsPage() {
  const contactData = await getCompanyContact();

  return (
    <div className="min-h-screen bg-gray-50 pt-4 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactInfo contactData={contactData} />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
