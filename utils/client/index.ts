import { SearchParams } from "@/types";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?!.*\s).{12,}$/;

export function generateRandomPassword() {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  let password = "";

  for (let i = 0; i < 12; i++) {
    const randomChar = charset[Math.floor(Math.random() * charset.length)];
    password += randomChar;
  }

  if (!password.match(PASSWORD_REGEX)) {
    // If the generated password doesn't match the regex, recursively generate a new one.
    return generateRandomPassword();
  }

  return password;
}

export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

export function convertSearchParamsToURL(
  url: string,
  searchParams: SearchParams
) {
  let baseUrl = url;
  let isFirst = true;
  for (const key in searchParams) {
    if (searchParams[key]) {
      if (isFirst) {
        baseUrl += `?${key}=${searchParams[key]}`;
        isFirst = false;
      } else {
        baseUrl += `&${key}=${searchParams[key]}`;
      }
    }
  }
  return baseUrl;
}
