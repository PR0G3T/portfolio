import { defineConfig, devices } from '@playwright/test';

const PORT = 5202;

export default defineConfig({
	timeout: 60_000,
	testDir: 'test/e2e-build',
	fullyParallel: true,
	workers: process.env.CI ? 4 : undefined,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'production-build',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	webServer: {
		command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
		url: `http://localhost:${PORT}`,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000
	}
});
