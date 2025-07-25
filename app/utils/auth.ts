 export function isProtectedRoute(pathname: string) {
   // Define your protected routes here
  const protectedRoutes = ["/components", "api"];

   return protectedRoutes.includes(pathname);
 }


 // utils/auth.ts
export function getUserFromToken(): { id: string; email: string; role: string } | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // décode le payload
    return payload; // { id, email, role }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.error("Token invalide");
    return null;
  }
}




