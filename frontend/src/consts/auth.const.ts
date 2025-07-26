const clientId = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_PUBLIC_GOOGLE_REDIRECT_URI;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
