import type {MetadataRoute} from 'next';
import {paths,guides} from '@/data/content';
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL;if(!base)return [];return ['',...paths.map(p=>'/'+p.id),'/life-in-germany','/guides',...guides.map(g=>'/guides/'+g.slug)].map(path=>({url:base+path,lastModified:new Date('2026-09-24'),changeFrequency:'monthly',priority:path===''?1:.7}))}
