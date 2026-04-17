<script lang="ts">
	import type { Snippet } from 'svelte'

	interface IProps {
		children: Snippet
	}

	const { children }: IProps = $props()
</script>

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		padding: 20px 10px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
</style>
