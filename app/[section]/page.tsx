import {notFound} from 'next/navigation';
import {Directory,PathwayPage,InfoPage} from '@/components/platform';
import {paths} from '@/data/content';
const extras=['about','contact','privacy','cookies','impressum','accessibility','disclaimer','sources'];
export function generateStaticParams(){return [...paths.map(p=>p.id),'life-in-germany','guides',...extras].map(section=>({section}))}
export async function generateMetadata({params}:{params:Promise<{section:string}>}){const {section}=await params;return {title:paths.find(p=>p.id===section)?.title[0]||section.replaceAll('-',' ').replace(/^./,c=>c.toUpperCase())}}
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;if(section==='guides')return <Directory/>;if(paths.some(p=>p.id===section)||section==='life-in-germany')return <PathwayPage section={section}/>;if(extras.includes(section))return <InfoPage section={section}/>;notFound()}
