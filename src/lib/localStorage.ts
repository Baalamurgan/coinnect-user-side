export const getLocal = (key?: string): string | null | undefined => {
  if (!key) return null;
  try {
    const value = localStorage.getItem(key);
    if (value === null || value === "undefined") return null;
    return value;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return undefined;
  }
};
