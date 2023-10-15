/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_PRESET_NAME: process.env.CLOUDINARY_PRESET_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
