import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import storage from '~/src/utils/storage'

// reducers
import userInfo from './userInfo/reducer'

// actions
import { saveUserInfo } from '~/src/redux/userInfo/actions'

const getStorageState = async (store) => {
  const accessToken = await storage.get('token')
  const user = await storage.get('user')
  saveUserInfo({ accessToken, user: JSON.parse(user) })(store.dispatch)
}

const redurcers = combineReducers({ userInfo })

export const store = createStore(redurcers, {}, applyMiddleware(thunk))

getStorageState(store)