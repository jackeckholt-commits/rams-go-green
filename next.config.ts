import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  basePath: isGitHubPages ? "/rams-go-green" : "",
  assetPrefix: isGitHubPages ? "/rams-go-green" : "",
  env: {
    NEXT_PUBLIC_SITE_BASE_PATH: isGitHubPages ? "/rams-go-green" : "",
  },
};

export default nextConfig;
