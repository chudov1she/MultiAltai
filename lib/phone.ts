/**
 * Normalises a raw phone input to E.164 (+7XXXXXXXXXX).
 * Returns null if the digits don't form a valid Russian number.
 */
export function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return null;

  // 8XXXXXXXXXX → 7XXXXXXXXXX
  if (digits.startsWith('8') && digits.length >= 11) digits = '7' + digits.slice(1);
  // 10-digit → prepend 7
  if (digits.length === 10) digits = '7' + digits;

  if (digits.length < 11) return null;

  return digits.startsWith('+') ? digits : `+${digits}`;
}

/**
 * Formats a digit string for display: +7 (XXX) XXX-XX-XX
 */
export function formatPhoneDisplay(value: string): string {
  const digits = value.replace(/\D/g, '');
  let d = digits;
  if (d.startsWith('8') && d.length >= 11) d = '7' + d.slice(1);
  if (d.startsWith('7') && d.length === 11)
    return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9, 11)}`;
  if (d.length === 10)
    return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
  return value;
}
