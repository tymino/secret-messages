<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */

	interface IProps {
		href?: string
		text?: string
	}

	const { href, text }: IProps = $props()
</script>

<a {href}>{text}</a>

<style>
	a {
		color: var(--c-text);
	}
</style>
