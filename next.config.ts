/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  experimental: {
    // turbo: {}, // désactive Turbopack (option supprimée car false n'est pas valide)
  },
}

export const config = {
  matcher: ["/profil", "/dashboard/:path*"],
};

module.exports = nextConfig;