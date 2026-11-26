// Bản rút gọn của app/src/lib/i18n.tsx trên web: khoá đã là tiếng Việt nên trả nguyên.
export function useI18n() {
  return { t: (s: string) => s };
}
