export const AVATAR_COLORS = [
	'FF004D', '00E756', 'FF004D', 'FF004D', '00E756', 'FF004D', 'AB5236', 'FFFF27', 'FFFF27', 'FF004D',
	'FF77A8', '7E2553', '008751', '29ADFF', '1D2B53', 'FF004D', 'FF004D', '83769C', '83769C', '7E2553',
	'29ADFF', 'FFA300', 'FF004D', 'AB5236', 'FFFF27', 'FFFF27', 'FF004D', '29ADFF', 'FFA300', 'FF77A8',
	//	'29ADFF', 'FF004D', 'FF77A8', 'FFA300', 'AB5236', 'AB5236', '83769C', '83769C', '83769C', '83769C',
	//	'29ADFF', '00E756', '29ADFF', 'FF004D', '29ADFF', 'FFA300', '5F574F', '00E756', '00E756', '00E756',
]
export const TOTAL_AVATAR = AVATAR_COLORS.length
export const PRESERVED_AVATAR_COLORS = [
	'6ACAAD'
]
export let FINGERPRINT = (new Fingerprint2()).getSync().fprint
let videoPlayer
export const setVideoPlayer = player => videoPlayer = player
export const getVideoTime = () => videoPlayer && videoPlayer.getCurrentTime ? videoPlayer.getCurrentTime() : -1
export const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
export const getWindowHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
export const VOTE_TIMEOUT = 27000
export const QUIZ_TIMEOUT = 20000
export const DISPLAY_TIMEOUT = 7000
export const preservedUsers = {
	system: {
		avatarSelected: 0,
		exp: 100,
		name: '系統',
		preserved: true
	}
}