export const AVATAR_COLORS = [
	'FF004D', '00E756', 'FF004D', 'FF004D', '00E756', 'FF004D', 'AB5236', 'FFFF27', 'FFFF27', 'FF004D',
	'FF77A8', '7E2553', '008751', '29ADFF', '1D2B53', 'FF004D', 'FF004D', '83769C', '83769C', '7E2553',
]
export const TOTAL_AVATAR = AVATAR_COLORS.length
export let FINGERPRINT
new Fingerprint2().get(fp => FINGERPRINT = fp)