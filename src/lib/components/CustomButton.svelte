<!-- <script lang="ts">
	import type { Snippet } from 'svelte'

	interface IProps {
		children: Snippet
		type: 'button' | 'submit' | 'reset' | null | undefined
		text?: string
	}

	const { children, type }: IProps = $props()
</script>

<button {type}>
	{@render children()}
</button>

<style>
	button {
		width: 100%;
		padding: 14px;
		background: var(--c-text);
		color: var(--c-grad-to);

		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition:
			transform 0.1s,
			opacity 0.2s;
		margin-top: 0.5rem;
	}

	button:hover {
		opacity: 0.9;
	}

	button:active {
		transform: scale(0.98);
	}

	@media (max-width: 600px) {
		button {
			padding: 16px;
			font-size: 1.1rem;
		}
	}
</style> -->

<script lang="ts">
	import type { Snippet } from 'svelte'

	interface IProps {
		children: Snippet
		type: 'button' | 'submit' | 'reset' | null | undefined
		isLoading?: boolean
	}

	const { children, type, isLoading = false }: IProps = $props()
</script>

<button {type} disabled={isLoading} class="btn">
	{#if isLoading}
		<span class="spinner"></span>
	{/if}
	<span class="label" class:loading={isLoading}>
		{@render children()}
	</span>
</button>

<style>
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 100%;
		padding: 14px;
		background: var(--c-text);
		color: var(--c-grad-to);
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition:
			transform 0.1s,
			opacity 0.2s;
		margin-top: 0.5rem;
	}

	.btn:hover {
		opacity: 0.9;
	}

	.btn:active {
		transform: scale(0.98);
	}

	.spinner {
		width: 12px;
		height: 12px;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.75s linear infinite;
	}

	.loading {
		opacity: 0.7;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 600px) {
		.btn {
			padding: 16px;
			font-size: 1.1rem;
		}
	}
</style>
