<script>
	import Header from './Header.svelte';
	import "carbon-components-svelte/css/g100.css";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>