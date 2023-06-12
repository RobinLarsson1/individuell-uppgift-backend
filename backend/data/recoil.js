import { atom } from "recoil"

export const isLoggedInState = atom({
	key: 'isLogin',
	default: false
})