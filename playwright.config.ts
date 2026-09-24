import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',use:{browserName:'chromium',viewport:{width:1440,height:1000},launchOptions:{...(process.env.PLAYWRIGHT_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH}:{channel:'chromium'})}},reporter:'list'});
