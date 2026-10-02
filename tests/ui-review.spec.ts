import {test,expect} from '@playwright/test';
test('navigation layout and browser errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001');
 await expect(page.getByRole('button',{name:'Open menu'})).toBeHidden();
 await page.screenshot({path:'/tmp/ankommen-refined-desktop.png'});
 await page.setViewportSize({width:900,height:900});
 await expect(page.getByRole('button',{name:'Open menu'})).toBeVisible();
 await page.setViewportSize({width:390,height:900});
 await page.screenshot({path:'/tmp/ankommen-refined-mobile.png'});
 expect(errors).toEqual([]);
});
test('featured topics carousel navigates on desktop and mobile',async({page})=>{
 await page.goto(process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001');
 const track=page.locator('.carousel-track');
 await expect(track.locator('.guide-card')).toHaveCount(4);
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  await track.evaluate(node=>node.scrollTo({left:0,behavior:'instant'}));
  await expect(page.getByRole('button',{name:'Previous topics',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Next topics',exact:true}).click();
  await expect.poll(()=>track.evaluate(node=>node.scrollLeft)).toBeGreaterThan(50);
  await track.focus();await page.keyboard.press('ArrowLeft');
  await expect.poll(()=>track.evaluate(node=>node.scrollLeft)).toBeLessThan(2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('.popular-section').screenshot({path:`/tmp/ankommen-carousel-${width}.png`});
 }
 await track.getByRole('link',{name:/The Opportunity Card/}).click();
 await expect(page).toHaveURL(/guides\/opportunity-card/);
});
test('directory carousel preserves filters and links',async({page})=>{
 await page.goto((process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001')+'/guides');
 const track=page.locator('#directory-topics');
 expect(await track.locator('.guide-card').count()).toBeGreaterThan(4);
 await page.getByRole('button',{name:'Next topics',exact:true}).click();
 await expect.poll(()=>track.evaluate(node=>node.scrollLeft)).toBeGreaterThan(50);
 await page.locator('.filter-row').getByRole('button',{name:'Work in Germany',exact:true}).click();
 await expect.poll(()=>track.evaluate(node=>node.scrollLeft)).toBeLessThan(2);
 await expect(track.locator('.guide-photo')).toHaveCount(0);
 await page.locator('.filter-row').getByRole('button',{name:'All',exact:true}).click();
 await track.scrollIntoViewIfNeeded();
 await page.screenshot({path:'/tmp/ankommen-directory-carousel.png'});
 await page.setViewportSize({width:390,height:900});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await track.getByRole('link',{name:/The Opportunity Card/}).click();
 await expect(page).toHaveURL(/guides\/opportunity-card/);
});
test('light mode persists across reloads and supports mobile controls',async({page})=>{
 await page.goto(process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001');
 await page.getByRole('button',{name:'Switch to light mode',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await expect(page.locator('body')).toHaveCSS('background-color','rgb(250, 249, 246)');
 await page.reload();
 await expect(page.getByRole('button',{name:'Switch to dark mode',exact:true})).toBeVisible();
 await page.screenshot({path:'/tmp/ankommen-light-desktop.png'});
 await expect(page.locator('.everyday-note')).toHaveCSS('background-color','rgb(255, 255, 255)');
 await page.locator('.everyday-note').screenshot({path:'/tmp/ankommen-already-here-light.png'});
 for(const width of [390,320]){
  await page.setViewportSize({width,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.getByRole('button',{name:'Switch to dark mode',exact:true})).toBeVisible();
 }
 await page.setViewportSize({width:390,height:900});
 await page.screenshot({path:'/tmp/ankommen-light-mobile.png'});
 await page.getByRole('button',{name:'Switch to dark mode',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
});
test('directory search appears only for a query and contact explains next steps',async({page})=>{
 const base=process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001';
 await page.goto(base+'/guides');
 const search=page.getByRole('textbox',{name:'What do you need help with?'});
 await expect(page.locator('.search-results')).toHaveCount(0);
 await search.fill('   ');await expect(page.locator('.search-results')).toHaveCount(0);
 await search.fill('Anmeldung');await expect(page.locator('.search-results').getByRole('link',{name:/Registering your address/})).toBeVisible();
 await search.fill('');await expect(page.locator('.search-results')).toHaveCount(0);
 await expect(page.locator('#directory-topics')).toBeVisible();
 await page.goto(base+'/contact');
 await expect(page.getByRole('heading',{name:'What happens next',exact:true})).toBeVisible();
 await expect(page.locator('.contact-steps li')).toHaveCount(3);
 await page.screenshot({path:'/tmp/ankommen-contact-steps-desktop.png'});
 await page.setViewportSize({width:390,height:900});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:'/tmp/ankommen-contact-steps-mobile.png',fullPage:true});
});
test('compact header and contact disclosure retain mobile functionality',async({page})=>{
 const base=process.env.PLAYWRIGHT_BASE_URL||'http://localhost:3001';
 await page.goto(base+'/contact');
 await page.screenshot({path:'/tmp/ankommen-contact-refined-desktop.png'});
 const form=await page.locator('.consultation-panel').boundingBox();
 const steps=await page.locator('.contact-expectations').boundingBox();
 expect(steps!.x).toBeGreaterThan(form!.x+form!.width);
 await page.setViewportSize({width:390,height:900});
 const toggle=page.getByRole('button',{name:'What happens next',exact:true});
 await expect(toggle).toHaveAttribute('aria-expanded','false');
 await expect(page.locator('#contact-process')).toBeHidden();
 await toggle.click();await expect(page.locator('#contact-process')).toBeVisible();
 await toggle.click();
 await page.screenshot({path:'/tmp/ankommen-contact-refined-mobile.png'});
 await page.getByRole('button',{name:'Open menu'}).click();
 await page.getByRole('dialog').getByRole('combobox',{name:'Language'}).selectOption('de');
 await page.getByRole('button',{name:'Close',exact:true}).click();
 await expect(page.getByRole('button',{name:'So geht es weiter',exact:true})).toBeVisible();
 await page.goto(base+'/guides?lang=en');
 const position=page.locator('.carousel-position');
 await expect(position).toContainText('1 of');
 await page.getByRole('button',{name:'Next topics',exact:true}).click();
 await expect(position).not.toContainText('1 of');
});
