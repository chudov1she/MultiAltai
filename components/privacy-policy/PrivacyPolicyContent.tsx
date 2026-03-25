import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Calendar,
  CheckCircle2,
  Phone,
  ArrowRight,
  Database,
  Bell,
} from 'lucide-react';

const sections = [
  {
    num: '01',
    icon: Shield,
    title: 'Общие положения',
    content: [
      'Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта МультиАлтай (multialtai.ru).',
      'Используя сайт, вы соглашаетесь с условиями настоящей политики. Если вы не согласны, пожалуйста, прекратите использование сайта.',
      'Мы действуем в соответствии с Федеральным законом №152-ФЗ «О персональных данных» и иными применимыми нормативными актами РФ.',
    ],
  },
  {
    num: '02',
    icon: Eye,
    title: 'Какие данные мы собираем',
    content: [
      'Контактные данные: имя, номер телефона, адрес электронной почты — при заполнении форм обратной связи.',
      'Данные о взаимодействии: предпочтения по объектам недвижимости, история просмотров на сайте, параметры поиска.',
      'Технические данные: IP-адрес, тип браузера, данные cookies — автоматически при посещении сайта.',
    ],
  },
  {
    num: '03',
    icon: Database,
    title: 'Цели обработки данных',
    content: [
      'Обработка заявок и запросов на подбор объектов недвижимости в Горном Алтае.',
      'Обратная связь: ответы на вопросы, уведомления о новых объектах по вашим критериям.',
      'Улучшение работы сайта и персонализация контента на основе ваших предпочтений.',
    ],
  },
  {
    num: '04',
    icon: Lock,
    title: 'Защита и хранение данных',
    content: [
      'Данные хранятся на защищённых серверах с многоуровневым шифрованием. Доступ к ним имеет строго ограниченный круг сотрудников.',
      'Мы регулярно проводим аудит систем безопасности и применяем актуальные меры защиты от несанкционированного доступа.',
      'Срок хранения данных — до момента достижения цели обработки или отзыва вашего согласия.',
    ],
  },
  {
    num: '05',
    icon: Users,
    title: 'Передача данных третьим лицам',
    content: [
      'Мы не продаём и не передаём ваши персональные данные третьим лицам в коммерческих целях.',
      'Передача возможна только в случаях, прямо предусмотренных законодательством РФ, по требованию уполномоченных органов.',
      'При привлечении подрядчиков (например, для технического обслуживания сайта) они обязаны соблюдать режим конфиденциальности.',
    ],
  },
  {
    num: '06',
    icon: FileText,
    title: 'Ваши права',
    content: [
      'Получить информацию о том, какие ваши данные обрабатываются, и запросить их копию.',
      'Потребовать исправления неточных данных или их удаления — мы обязаны выполнить запрос в течение 30 дней.',
      'Отозвать согласие на обработку в любой момент, направив письменный запрос на наш контактный адрес.',
    ],
  },
  {
    num: '07',
    icon: Bell,
    title: 'Cookies и аналитика',
    content: [
      'Сайт использует cookies для корректной работы и улучшения пользовательского опыта. Вы можете отключить cookies в настройках браузера.',
      'Мы можем использовать сервисы веб-аналитики (Яндекс.Метрика и др.) для сбора обезличенной статистики посещаемости.',
      'Данные аналитики не позволяют идентифицировать вас лично и используются исключительно в агрегированном виде.',
    ],
  },
  {
    num: '08',
    icon: Calendar,
    title: 'Изменения политики',
    content: [
      'Мы вправе обновлять настоящую политику. Актуальная версия всегда размещена на этой странице с датой последнего изменения.',
      'При существенных изменениях мы уведомим вас через сайт или по контактным данным, которые вы нам предоставили.',
      'Продолжение использования сайта после публикации изменений означает ваше согласие с новой редакцией политики.',
    ],
  },
];

const trustBadges = [
  { icon: Lock, label: 'Шифрование данных', sub: 'Современный стандарт TLS' },
  { icon: Shield, label: '152-ФЗ соответствие', sub: 'Работаем по закону РФ' },
  { icon: Users, label: 'Нет передачи третьим', sub: 'Ваши данные только у нас' },
  { icon: CheckCircle2, label: 'Право на удаление', sub: 'Запрос выполним за 30 дней' },
];

const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="relative bg-[#0A192F] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #00B4D8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0095c6 0%, transparent 40%)',
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#00B4D8]/15 border border-[#00B4D8]/30 rounded-full px-4 py-2 text-sm text-[#00B4D8] mb-8">
              <Calendar className="w-4 h-4" />
              Последнее обновление: Август 2025
            </div>
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Политика{' '}
              <span className="text-[#00B4D8]">конфиденциальности</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Мы уважаем ваше право на приватность. Здесь подробно описано, какие данные мы
              собираем, как используем и как защищаем.
            </p>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-[#0095c6]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-[#0095c6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A192F] leading-tight">{badge.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section) => (
              <div
                key={section.num}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex items-start gap-5 p-6 sm:p-8">
                  {/* Number + icon */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold text-[#0095c6] tracking-widest">
                      {section.num}
                    </span>
                    <div className="w-12 h-12 bg-[#0095c6]/10 rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-[#0095c6]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.content.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-[#0A192F] rounded-3xl p-8 sm:p-12 text-white text-center">
            <div className="w-16 h-16 bg-[#00B4D8]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-[#00B4D8]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Остались вопросы?
            </h3>
            <p className="text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
              Если у вас есть вопросы по обработке персональных данных или вы хотите воспользоваться
              своими правами — свяжитесь с нами.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2 bg-[#0095c6] hover:bg-[#007a9e] text-white font-semibold px-8 py-4 rounded-2xl transition-colors duration-200"
            >
              Связаться с нами
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicyContent;
