export const SAVE_USERINFO = 'USERINFO/SAVE'
export const CLEAR = 'USERINFO/CLEAR'

export const saveUserInfo = userInfo => dispatch => dispatch({ type: SAVE_USERINFO, payload: { userInfo } })

export const clearUserInfo = () => dispatch => dispatch({ type: CLEAR })