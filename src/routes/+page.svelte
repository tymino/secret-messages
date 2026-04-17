<script lang="ts">
	import type { PageProps, SubmitFunction } from './$types'
	import { enhance } from '$app/forms'
	import CustomTextarea from '$lib/components/CustomTextarea.svelte'
	import CustomInput from '$lib/components/CustomInput.svelte'
	import CustomLabel from '$lib/components/CustomLabel.svelte'
	import Link from '$lib/components/Link.svelte'
	import CustomButton from '$lib/components/CustomButton.svelte'
	import Counter from '$lib/components/Counter.svelte'
	import Card from '$lib/components/Card.svelte'
	import Content from '$lib/components/Content.svelte'
	import Container from '$lib/components/Container.svelte'

	const MAX_MESSAGE_LENGTH = 300
	const MAX_PASSWORD_LENGTH = 16

	const { form }: PageProps = $props()

	const status = $derived(form?.status ? form.status : false)

	let message = $state('')
	let error = $state('')
	let password = $state('')
	let isLoading = $state(false)

	const handleInput = () => {
		if (error) {
			error = ''
		}
	}

	const handleSubmit: SubmitFunction = () => {
		isLoading = true

		return async ({ result, update }) => {
			if (result.type === 'success' || result.type === 'failure') {
				const data = result.data

				if (data && 'error' in data) {
					error = data.error as string
				}
			}

			await update()
			isLoading = false
		}
	}
</script>

<Container>
	{#if status}
		<!-- Экран ссылки -->
		<Card>
			<h1>Текст сообщения:</h1>

			<Content>
				<Link href={form?.url} text={form?.url} />
			</Content>
		</Card>
	{:else}
		<!-- Экрана ввода сообщения -->
		<Card>
			<form method="POST" use:enhance={handleSubmit}>
				<CustomLabel forIdName="message" labelText="Сообщение">
					<CustomTextarea
						idName="message"
						{MAX_MESSAGE_LENGTH}
						bind:value={message}
						{handleInput}
						{error}
						isRequired={true}
					/>

					<Counter
						{error}
						isLimitCounter={message.length >= MAX_MESSAGE_LENGTH}
						counterLimitText={`${message.length} / ${MAX_MESSAGE_LENGTH}`}
					/>
				</CustomLabel>

				<CustomLabel forIdName="password" labelText="Пароль">
					<CustomInput idName="password" {MAX_PASSWORD_LENGTH} bind:value={password} />

					<Counter
						error="Поле может быть пустым"
						isLimitCounter={password.length >= MAX_PASSWORD_LENGTH}
						counterLimitText={`${password.length} / ${MAX_PASSWORD_LENGTH}`}
					/>
				</CustomLabel>

				<CustomButton type="submit" {isLoading}>Отправить</CustomButton>
			</form>
		</Card>
	{/if}
</Container>
