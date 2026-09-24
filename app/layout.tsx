import type {Metadata} from 'next';
import {Shell} from '@/components/platform';
import './globals.css';
export const metadata:Metadata={title:{default:'Ankommen — Let’s talk about Germany.',template:'%s | Ankommen'},description:'Explore professional support for your move to Germany, from work and study to family and everyday life.',openGraph:{title:'Ankommen — Let’s talk about Germany.',description:'Questions about moving to Germany? Tell us what you have in mind.',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell></body></html>}
