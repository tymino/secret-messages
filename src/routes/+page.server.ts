import { generateUID } from '$lib/utils/generateUID.js'
import { pool } from '$lib/server/database'
import type { RequestEvent } from './$types'
import { fail } from '@sveltejs/kit'
import { encrypt } from '$lib/server/crypto'
import { hashPassword } from '$lib/server/hash'
import type { IError } from '$lib/types'

export const actions = {
	default: async ({ url, request }: RequestEvent) => {
		const formData = await request.formData()

		const message = formData.get('message') as string
		const password = formData.get('password') as string

		if (!message) {
			return fail(400, { status: false })
		}

		const messageCrypt = encrypt(message)
		const passwordHash = await hashPassword(password)

		let UID = generateUID()
		let saved = false
		let attempts = 0

		// макс 5 попыток для безопасности
		while (!saved && attempts < 5) {
			try {
				const query = 'INSERT INTO messages (url, message, password) VALUES ($1, $2, $3)'
				await pool.query(query, [UID, messageCrypt, passwordHash])

				saved = true
			} catch (err) {
				if (err instanceof Error && (err as IError).code === '23505') {
					UID = generateUID()
					attempts++
				} else {
					// Если ошибка другая не дубликат, прерываем
					return { success: false, error: 'База данных недоступна' }
				}
			}
		}

		if (!saved) return { success: false, error: 'База данных переполнена' }

		return {
			status: true,
			url: `${url.origin}/${UID}`
		}
	}
}
