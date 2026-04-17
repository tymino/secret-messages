import { pool } from '$lib/server/database'
import { redirect, type RequestEvent } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { verifyPassword } from '$lib/server/hash'
import { decrypt } from '$lib/server/crypto.js'

export const load: PageServerLoad = async ({ params }) => {
	const { url } = params // 6 символов из адреса

	if (url.length !== 6) {
		redirect(302, '/')
	}

	const query = 'SELECT message, password FROM messages WHERE url = $1'
	const result = await pool.query(query, [url])

	if (result.rows.length === 0) {
		redirect(302, '/')
	}

	const data = result.rows[0]

	// Если пароля нет в базе (null или пустая строка)
	if (!data.password) {
		return {
			status: true,
			message: data.message
		}
	}

	// Если пароль есть
	return {
		status: false
	}
}

export const actions = {
	default: async ({ request, params }: RequestEvent) => {
		const formData = await request.formData()
		const { url } = params

		const password = formData.get('password') as string

		const query = 'SELECT message, password FROM messages WHERE url = $1'
		const result = await pool.query(query, [url])

		const data = result.rows[0]

		const isVerify = await verifyPassword(data.password, password)

		if (isVerify) {
			const message = decrypt(data.message)

			return {
				status: true,
				message
			}
		}

		redirect(302, '/')
	}
}
