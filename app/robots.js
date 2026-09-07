import { siteUrl } from "./(site)/data/seo";

export default function robots(){
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin-service", "/login", "/api"],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
