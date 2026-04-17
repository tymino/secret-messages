<script lang="ts">
	interface IProps {
		idName: string
		MAX_MESSAGE_LENGTH: number
		value?: string
		handleInput: () => void
		error: string
		isRequired?: boolean
	}

	let {
		idName,
		MAX_MESSAGE_LENGTH,
		value = $bindable(''),
		handleInput,
		error = '',
		isRequired = false
	}: IProps = $props()
</script>

<textarea
	id={idName}
	class:error-border={error.length}
	name={idName}
	bind:value
	oninput={handleInput}
	maxlength={MAX_MESSAGE_LENGTH}
	required={isRequired}
></textarea>

<style>
	textarea {
		width: 100%;
		padding: 12px;
		background: var(--c-background);
		border: 1px solid var(--c-border);
		color: var(--c-white);

		border-radius: 8px;
		font-size: 1rem;
		box-sizing: border-box;
		transition: all 0.2s ease;
	}

	textarea {
		height: 140px;
		resize: none;
		scrollbar-gutter: stable;
	}

	textarea:focus {
		outline: none;
		background: var(--c-background);
		border-color: var(--c-border);
		box-shadow: 0 0 8px 2px var(--c-shadow);
	}

	.error-border {
		border: 1px solid var(--c-danger);
	}

	@media (max-width: 600px) {
		textarea {
			font-size: 16px;
			padding: 14px;
		}
	}
</style>
