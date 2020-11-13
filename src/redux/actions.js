import {SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER} from "./actions-types";
import {reqLogin} from "../api";
import storageUtils from "../utils/storageUtils";
import {message} from 'antd'

// sync action
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, data: errorMsg})
export const logout = () => {
  // delete user from localstorage
  storageUtils.removeUser()
  //return action obj
  return {type: RESET_USER}
}


// async login action
export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      const user = result.data
      storageUtils.saveUser(user)
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      message.error(msg)
      dispatch(showErrorMsg(msg))
    }
  }
}