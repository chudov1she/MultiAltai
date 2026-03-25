import React from 'react';
import { Phone, Mail, Clock, MessageCircle, ExternalLink, MapPin, Send } from 'lucide-react';
import type { Contact } from '@/types/site';

interface ContactInfoProps {
  contactData: Contact | null;
}

function formatWorkingHours(workingHours: Contact['working_hours']): string {
  if (!workingHours || workingHours.length === 0) return 'Режим работы не указан';

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const hoursMap = new Map<string, number[]>();

  for (const wh of workingHours) {
    if (wh.is_active && wh.start_time && wh.end_time) {
      const key = `${wh.start_time.substring(0, 5)}-${wh.end_time.substring(0, 5)}`;
      if (!hoursMap.has(key)) hoursMap.set(key, []);
      hoursMap.get(key)!.push(wh.day_of_week);
    } else if (!wh.is_active) {
      if (!hoursMap.has('Выходной')) hoursMap.set('Выходной', []);
      hoursMap.get('Выходной')!.push(wh.day_of_week);
    }
  }

  const formatDays = (days: number[]): string => {
    if (days.length === 0) return '';
    if (days.length === 1) return weekdays[days[0]];
    const sorted = [...days].sort((a, b) => a - b);
    const isConsecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
    return isConsecutive
      ? `${weekdays[sorted[0]]}-${weekdays[sorted[sorted.length - 1]]}`
      : sorted.map((d) => weekdays[d]).join(', ');
  };

  const lines: string[] = [];
  hoursMap.forEach((days, time) => {
    const formattedDays = formatDays(days);
    lines.push(time === 'Выходной' ? `${formattedDays}: Выходной` : `${formattedDays}: ${time}`);
  });

  return lines.join('\n');
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactData }) => {
  if (!contactData) return null;

  type ContactItem = {
    icon: React.ReactNode;
    title: string;
    content: string;
    link: string | null;
  };

  const contactItems: ContactItem[] = (
    [
      contactData.phone
        ? {
            icon: <Phone className="w-6 h-6" />,
            title: 'Телефон',
            content: contactData.phone,
            link: `tel:${contactData.phone.replace(/[^\d+]/g, '')}`,
          }
        : null,
      contactData.whatsapp
        ? {
            icon: <MessageCircle className="w-6 h-6" />,
            title: 'WhatsApp',
            content: contactData.whatsapp,
            link: `https://wa.me/${contactData.whatsapp.replace(/[^\d]/g, '')}`,
          }
        : null,
      contactData.telegram
        ? {
            icon: <Send className="w-6 h-6" />,
            title: 'Telegram',
            content: contactData.telegram,
            link: contactData.telegram.startsWith('http')
              ? contactData.telegram
              : `https://t.me/${contactData.telegram.replace(/^@/, '')}`,
          }
        : null,
      contactData.email
        ? {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email',
            content: contactData.email,
            link: `mailto:${contactData.email}`,
          }
        : null,
      contactData.office_address
        ? {
            icon: <MapPin className="w-6 h-6" />,
            title: 'Адрес офиса',
            content: contactData.office_address,
            link: null,
          }
        : null,
      contactData.working_hours && contactData.working_hours.length > 0
        ? {
            icon: <Clock className="w-6 h-6" />,
            title: 'Режим работы',
            content: formatWorkingHours(contactData.working_hours),
            link: null,
          }
        : null,
    ] as (ContactItem | null)[]
  ).filter((item): item is ContactItem => item !== null);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-[#011315] mb-6 text-center">
        Свяжитесь для приобретения VIP-объектов
      </h2>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-[#0095c6]/10 rounded-xl flex items-center justify-center text-[#0095c6] flex-shrink-0">
              {item.icon}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-[#011315] mb-1">{item.title}</h3>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-medium text-[#0095c6] hover:text-[#007a9e] transition-colors"
                >
                  {item.content}
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              ) : (
                <p
                  className={`text-lg font-medium text-gray-700 ${
                    item.title === 'Режим работы' ? 'whitespace-pre-line' : ''
                  }`}
                >
                  {item.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
