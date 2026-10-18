/** @type {import('next').NextConfig} */
const nextConfig = {
  // Local dev: proxy Python endpoints to uvicorn. On Vercel, vercel.json handles routing.
  async rewrites() {
    if (process.env.NODE_ENV === "production") return [];
    const api = process.env.API_URL || "http://127.0.0.1:8000";
    return [
      { source: "/api/analyze", destination: `${api}/api/analyze` },
      { source: "/api/generate-report", destination: `${api}/api/generate-report` },
    ];
  },
};
export default nextConfig;
