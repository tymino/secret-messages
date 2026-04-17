<script lang="ts">
	interface IProps {
		idName: string
		MAX_PASSWORD_LENGTH: number
		value: string
		isRequired?: boolean
	}

	let { idName, MAX_PASSWORD_LENGTH, value = $bindable(''), isRequired = false }: IProps = $props()
</script>

<input
	id={idName}
	name={idName}
	type="text"
	bind:value
	maxlength={MAX_PASSWORD_LENGTH}
	required={isRequired}
/>

<style>
	input {
		width: 100%;
		padding: 12px;
		background: var(--c-background);
		border: 1px solid var(--c-border);
		color: var(--c-text);

		border-radius: 8px;
		font-size: 1rem;
		box-sizing: border-box;
		transition: all 0.2s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--c-border);
		background: var(--c-background);
		box-shadow: 0 0 8px 2px var(--c-shadow);
	}

	@media (max-width: 600px) {
		input {
			font-size: 16px;
			padding: 14px;
		}
	}
</style>
