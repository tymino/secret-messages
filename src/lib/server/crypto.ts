import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { SECRET_KEY_MESSAGE } from '$env/static/private'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 12 // Для GCM стандарт 12 байт

export function encrypt(text: string): string {
	const iv = randomBytes(IV_LENGTH)
	const key = Buffer.from(SECRET_KEY_MESSAGE, 'hex')
	const cipher = createCipheriv(ALGORITHM, key, iv)

	let encrypted = cipher.update(text, 'utf8', 'hex')
	encrypted += cipher.final('hex')

	const authTag = cipher.getAuthTag().toString('hex')

	return `${iv.toString('hex')}:${authTag}:${encrypted}`
}

export function decrypt(hash: string): string {
	const [ivHex, authTagHex, encryptedHex] = hash.split(':')

	const iv = Buffer.from(ivHex, 'hex')
	const authTag = Buffer.from(authTagHex, 'hex')
	const key = Buffer.from(SECRET_KEY_MESSAGE, 'hex')

	const decipher = createDecipheriv(ALGORITHM, key, iv)
	decipher.setAuthTag(authTag)

	let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
	decrypted += decipher.final('utf8')

	return decrypted
}
