import type {NextConfig} from "next";

const SCORM_URL = "http://localhost:3001";
const PODCAST_URL = "http://localhost:3002";

const nextConfig: NextConfig = {
    async rewrites() {
       return[
            {source: "/scorm", destination: `${SCORM_URL}/scorm`},
            {source: "/scorm/:path+", destination: `${SCORM_URL}/scorm/:path+`},
            {source: "/podcast", destination: `${PODCAST_URL}/podcast`},
            {source: "/podcast/:path+", destination: `${PODCAST_URL}/podcast/:path+`}
       ];
    },
};

export default nextConfig;