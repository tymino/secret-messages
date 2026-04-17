<script lang="ts">
	import favicon from '$lib/assets/favicon.ico'
	import Container from '$lib/components/Container.svelte'
	import Disclaimer from '$lib/components/Disclaimer.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<Container>
	<Disclaimer />
</Container>

<style>
	:global(body) {
		--c-text: rgba(255, 255, 255);
		--c-label: #d1d1d1;
		--c-background: rgba(255, 255, 255, 0.1);
		--c-border: rgba(255, 255, 255, 0.2);
		--c-shadow: rgba(255, 255, 255, 0.1);
		--c-danger: #f54343;
		--c-grad-from: #1e293b;
		--c-grad-to: #0f172a;

		background: radial-gradient(circle at top left, var(--c-grad-from), var(--c-grad-to));
		margin: 0;
		min-height: 100vh;
	}
</style>
