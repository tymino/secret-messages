<script lang="ts">
	import type { Snippet } from 'svelte'

	interface IProps {
		children: Snippet
		forIdName: string
		labelText: string
	}

	const { children, forIdName, labelText }: IProps = $props()
</script>

<div class="field-group">
	<label for={forIdName}>{labelText}</label>

	{@render children()}
</div>

<style>
	.field-group {
		text-align: left;
		margin-bottom: 1.2rem;
	}

	label {
		display: block;
		margin-bottom: 0.4rem;
		font-weight: 600;
		color: var(--c-label);
		font-size: 0.9rem;
	}

	@media (max-width: 600px) {
		label {
			font-size: 1rem;
		}
	}
</style>
