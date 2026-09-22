/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/teste-gratis", destination: "/demo", permanent: false },
      { source: "/cadastro", destination: "/demo", permanent: false },
      { source: "/planos", destination: "/demo", permanent: false },
    ];
  },
};

export default nextConfig;
