import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const packageJSON = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
		replace: [
			['__VERSION__', JSON.stringify(packageJSON.version)]
		]
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
			$assets: '/src/assets',
			$components: '/src/components'
		}
	}
};

export default config;
