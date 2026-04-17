<script lang="ts">
	import { enhance } from '$app/forms'
	import { resolve } from '$app/paths'
	import Card from '$lib/components/Card.svelte'
	import Container from '$lib/components/Container.svelte'
	import Content from '$lib/components/Content.svelte'
	import Counter from '$lib/components/Counter.svelte'
	import CustomButton from '$lib/components/CustomButton.svelte'
	import CustomInput from '$lib/components/CustomInput.svelte'
	import CustomLabel from '$lib/components/CustomLabel.svelte'
	import Link from '$lib/components/Link.svelte'
	import type { PageProps } from './$types'

	const MAX_PASSWORD_LENGTH = 16

	let { data, form }: PageProps = $props()

	const status = $derived(form?.status ? form.status : data.status)
	const message = $derived(form?.status ? form.message : data.message)

	let password = $state('')
</script>

<Container>
	{#if status}
		<!-- Экран сообщения -->
		<Card>
			<h1>Текст сообщения:</h1>

			<Content>
				{message}
			</Content>

			<Link href={resolve('/')} text="← На главную" />
		</Card>
	{:else}
		<!-- Экрана ввода пароля -->
		<Card>
			<h1>🔒 Сообщение защищено</h1>
			<p>Для просмотра введите пароль</p>

			<form method="POST" use:enhance>
				<CustomLabel forIdName="password" labelText="Пароль">
					<CustomInput idName="password" {MAX_PASSWORD_LENGTH} bind:value={password} />

					<Counter
						isLimitCounter={password.length >= MAX_PASSWORD_LENGTH}
						counterLimitText={`${password.length} / ${MAX_PASSWORD_LENGTH}`}
					/>
				</CustomLabel>

				<CustomButton type="submit">Открыть сообщение</CustomButton>
			</form>
		</Card>
	{/if}
</Container>
