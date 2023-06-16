import { atom } from "recoil"

export const isLoggedInState = atom({
	key: 'isLoggedInState',
	default: false,
  });

export const addNewUserState = atom({
	key: 'addUserState',
	default: false
})

export const selectChannelState = atom({
	key: 'selectChannelState',
	default: null
})
