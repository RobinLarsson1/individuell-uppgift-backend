import { atom } from "recoil"

export const isLoggedInState = atom({
	key: 'isLogin',
	default: false
})

export const addNewUserState = atom({
	key: 'addNewUserState',
	default: false
})