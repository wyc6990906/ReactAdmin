import React from "react";
import ReactDOM from "react-dom"

import App from './App'
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

// get user from local storage and save to memory
const user = storageUtils.getUser()
memoryUtils.user = user
ReactDOM.render(<App/>, document.getElementById('root'))