<script lang="ts">
	import type { Snippet } from 'svelte'

	interface IProps {
		children: Snippet
	}

	const { children }: IProps = $props()
</script>

<div class="card">
	{@render children()}
</div>

<style>
	.card {
		background: var(--c-background);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid var(--c-border);
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
		width: 100%;
		max-width: 500px;
		text-align: center;
		color: var(--c-text);
	}

	@media (max-width: 600px) {
		.card {
			padding: 1.5rem;
			max-width: 90%;
			border-radius: 16px;
		}
	}
</style>
