import type {NextConfig} from "next";

const SCORM_URL = "http://localhost:3001";

const nextConfig: NextConfig = {
    async rewrites() {
       return[
            {source: "/scorm", destination: `${SCORM_URL}/scorm`},
            {source: "/scorm/:path+", destination: `${SCORM_URL}/scorm:path+`}
       ];
    },
};

export default nextConfig;