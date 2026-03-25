/**
 * Telegram Bot notification helpers.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN        — bot token from @BotFather
 *   TELEGRAM_NOTIFY_CHAT_IDS  — comma-separated list of chat_ids to notify
 *                               e.g. "123456789,987654321"
 *
 * How to get your chat_id:
 *   1. Start a chat with your bot (or add it to a group)
 *   2. Send any message
 *   3. Open https://api.telegram.org/bot<TOKEN>/getUpdates
 *   4. Find "chat": { "id": XXXXXXX } in the response
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? '';
const CHAT_IDS = (process.env.TELEGRAM_NOTIFY_CHAT_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

/** Escapes special HTML chars so user input doesn't break Telegram HTML. */
function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendToChat(chatId: string, html: string): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: 'HTML' }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}

/**
 * Sends a message to all configured recipients.
 * Errors are logged but never propagated — TG failure must not block form submission.
 */
export async function notifyTelegram(html: string): Promise<void> {
  if (!BOT_TOKEN || CHAT_IDS.length === 0) {
    // Not configured — skip silently.
    return;
  }

  const results = await Promise.allSettled(CHAT_IDS.map((id) => sendToChat(id, html)));

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`[telegram] Failed to notify chat_id ${CHAT_IDS[i]}:`, r.reason);
    }
  });
}

// ── Message builders ──────────────────────────────────────────────────────────

export interface ListingNotificationParams {
  listingType: 'land_plot' | 'general';
  listingTitle: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function buildListingNotification(p: ListingNotificationParams): string {
  const icon      = p.listingType === 'land_plot' ? '🏔' : '🚁';
  const typeLabel = p.listingType === 'land_plot' ? 'Заявка на участок' : 'Заявка на объект';

  return [
    `${icon} <b>${typeLabel}</b>`,
    `<b>Объект:</b> ${esc(p.listingTitle)}`,
    '',
    `👤 <b>${esc(p.name)}</b>`,
    `📞 ${esc(p.phone)}`,
    `✉️ ${esc(p.email)}`,
    '',
    `💬 <i>${esc(p.message)}</i>`,
  ].join('\n');
}

export interface ContactNotificationParams {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export function buildContactNotification(p: ContactNotificationParams): string {
  return [
    `📩 <b>Контактная форма</b>`,
    '',
    `👤 <b>${esc(p.name)}</b>`,
    `📞 ${esc(p.phone)}`,
    `✉️ ${esc(p.email)}`,
    '',
    `💬 <i>${esc(p.message)}</i>`,
  ].join('\n');
}
