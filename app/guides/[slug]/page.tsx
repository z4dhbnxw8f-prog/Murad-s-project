import {notFound} from 'next/navigation';
import {guides} from '@/data/content';
import {GuidePage} from '@/components/platform';
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=guides.find(g=>g.slug===slug);return {title:guide?.title[0],description:guide?.description[0]}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const guide=guides.find(g=>g.slug===slug);if(!guide)notFound();return <GuidePage guide={guide}/>}
