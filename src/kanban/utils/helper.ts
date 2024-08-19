export const generateId = () => {
  return Math.floor(Math.random() * 10001);
};

export function generateUniqueId(prefix: string = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now()}`;
}