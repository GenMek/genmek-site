 import { MetadataRoute } from 'next' 
 
export default function sitemap(): MetadataRoute.Sitemap 
    { return [ { url: 'https://genmek.com.br', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }, 
            { url: 'https://genmek.com.br/#quem-somos', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
            { url: 'https://genmek.com.br/#solucoes', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 }, ] }