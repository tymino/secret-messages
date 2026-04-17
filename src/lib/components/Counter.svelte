<script lang="ts">
	interface IProps {
		error?: string
		isLimitCounter: boolean
		counterLimitText: string
	}

	const { error = '', isLimitCounter, counterLimitText }: IProps = $props()
</script>

<div class="counter">
	<span class="info" class:error={!!error}>{error}</span>

	<span class:limit={isLimitCounter}>
		{counterLimitText}
	</span>
</div>

<style>
	.counter {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--c-label);
		margin-top: 5px;
	}

	.limit {
		color: var(--c-danger);
		font-weight: bold;
	}

	.info {
		opacity: 0;
	}

	.error {
		opacity: 1;
		color: var(--c-danger);
		flex-grow: 2;
	}
</style>
