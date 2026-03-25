# MultiAltai

Веб-приложение каталога объектов недвижимости и эксклюзивной техники в Горном Алтае.

## Стек

- **Next.js 16** (App Router, Server Actions)
- **Prisma 7** + SQLite (`better-sqlite3`)
- **Tailwind CSS 4**
- **Framer Motion**, **Swiper**
- **Telegram Bot** уведомления о заявках

## Запуск локально

```bash
yarn install
yarn dev
```

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни:

```env
DATABASE_URL="file:./prisma/dev.db"

TELEGRAM_BOT_TOKEN=""
TELEGRAM_NOTIFY_CHAT_IDS=""
```

## Docker (Timeweb Apps)

```bash
docker build -t multialtai .
```

База данных монтируется как volume; все секреты передаются через env-переменные при деплое.
