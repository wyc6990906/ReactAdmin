import React from "react";
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'

import App from './App'
//import storageUtils from "./utils/storageUtils";
//import memoryUtils from "./utils/memoryUtils";
import store from './redux/store'

// get user from local storage and save to memory
// const user = storageUtils.getUser()
// memoryUtils.user = user
ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))