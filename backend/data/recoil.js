import { atom } from "recoil"

export const isLoggedInState = atom({
	key: 'isLogin',
	default: { isLoggedIn: false, username: '' },
})

export const addNewUserState = atom({
	key: 'addUserState',
	default: false
})

