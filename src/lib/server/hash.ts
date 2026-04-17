import argon2 from 'argon2'
import { SECRET_KEY_PASSWORD } from '$env/static/private'

export async function hashPassword(password: string) {
	return await argon2.hash(password, {
		secret: Buffer.from(SECRET_KEY_PASSWORD)
	})
}

export async function verifyPassword(hash: string, password: string) {
	return await argon2.verify(hash, password, {
		secret: Buffer.from(SECRET_KEY_PASSWORD)
	})
}
