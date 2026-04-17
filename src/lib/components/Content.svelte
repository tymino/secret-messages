<script lang="ts">
	import type { Snippet } from 'svelte'

	interface IProps {
		children: Snippet
	}

	const { children }: IProps = $props()
</script>

<div class="content">
	{@render children()}
</div>

<style>
	.content {
		background: var(--c-background);
		border: 1px solid var(--c-border);

		padding: 15px;
		border-radius: 8px;
		text-align: left;
		white-space: pre-wrap;
		margin: 20px 0;
	}
</style>
