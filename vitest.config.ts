import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['test/unit/**/*.test.ts'],
		environment: 'node',
		coverage: {
			provider: 'v8',
			include: [
				'src/lib/cv/brand.ts',
				'src/lib/cv/density.ts',
				'src/lib/cv/fit.ts',
				'src/lib/cv/format.ts',
				'src/lib/cv/model.ts',
				'src/lib/cv/period.ts',
				'src/lib/i18n/cv-fr.ts',
				'src/lib/i18n/localize.ts',
				'src/lib/i18n/ui.ts'
			],
			thresholds: {
				statements: 100,
				branches: 100,
				functions: 100,
				lines: 100
			}
		}
	}
});
