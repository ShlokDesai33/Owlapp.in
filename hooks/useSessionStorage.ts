export default function useSessionStorage(id: string, booking?: any) {
  if (!booking) {
    // If no booking is passed, return the current booking from session storage
    const json = sessionStorage.getItem(id);
    return json ? JSON.parse(json) : null;
  }
  // If a booking is passed, save it to session storage
  sessionStorage.setItem(id, JSON.stringify(booking));
}