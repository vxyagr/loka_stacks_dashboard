/** @type {import('next').NextConfig} */

require("dotenv").config({
  path: process.env.NODE_ENV === ".env.local",
});

const nextConfig = {
  reactStrictMode: true,
  env: {
    LOKA_CANISTER: process.env.LOKA_CANISTER,
    // Define other environment variables here
  },
};

module.exports = nextConfig;
