import {test,expect} from '@playwright/test';
test('runtime errors and guide navigation',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const base=process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001';
 await page.goto(base);
 const favicon=await page.request.get(base+'/favicon.ico');
 expect(favicon.status()).toBe(200);
 expect(favicon.headers()['content-type']).toContain('image/');
 await page.getByRole('link',{name:/The Opportunity Card/}).click();
 await expect(page).toHaveURL(/guides\/opportunity-card/);
 await page.goto(base+'/contact');
 expect(errors).toEqual([]);
});
