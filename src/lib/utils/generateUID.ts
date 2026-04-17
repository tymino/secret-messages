export const generateUID = () => {
	const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const LENGTH = 6

	let result = ''
	for (let i = 0; i < LENGTH; i++) {
		result += CHARS.charAt(Math.floor(Math.random() * 62))
	}

	return result
}
