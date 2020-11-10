/*Local data storage management*/
import store from 'store'

const USER_KEY = 'user_key'
export default {
  saveUser(user) {
    // localStorage 很多老浏览器不兼容 所以引用的github上的store库 cross-browser
    //localStorage.setItem('user_key', JSON.stringify(user))
    store.set(USER_KEY, user)
  },
  getUser() {
    //return JSON.parse(localStorage.getItem('user_key') || '{}')
    return store.get(USER_KEY) || {}
  },
  removeUser() {
    //localStorage.removeItem('user_key')
    store.remove(USER_KEY)
  }
}