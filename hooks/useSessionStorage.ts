export default function useSessionStorage(booking?: any) {
  if (!booking) {
    // If no booking is passed, return the current booking from session storage
    const json = sessionStorage.getItem('booking');
    return json ? JSON.parse(json) : null;
  }
  // If a booking is passed, save it to session storage
  sessionStorage.setItem('booking', JSON.stringify(booking));
}