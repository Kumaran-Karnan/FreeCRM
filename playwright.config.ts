import { defineConfig } from '@playwright/test';

export default defineConfig({

    testDir: './tests',
    timeout: 60000,

    use: {
        headless: false,
        actionTimeout: 5000,

        trace: 'on',
        video: "on",
        screenshot: "on"
    },
    reporter: [
        ['html'],
        ['list']
    ]

});