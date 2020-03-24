// userInfo
import { SAVE_USERINFO, CLEAR } from './actions'

const initialState = {
  accessToken: '',
  user: ''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USERINFO:
      return { ...state, ...payload.userInfo }
    case CLEAR:
      return { ...initialState }
    default:
      return state
  }
}