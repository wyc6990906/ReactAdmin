/*
*A function module that can send asynchronous Ajax requests
Wrap axios library
The return value of the function is the promise object
1. Optimization 1: Handle request exceptions uniformly?
In the outer package is a self-created promise object
Do not reject(error) when the request is wrong, but instead display an error message
2. Optimization 2: Instead of reponse, the asynchronous output is response.data
When the request is successfully resolved: Resolve (response.data)
*
* */
import axios from 'axios'
import {message} from "antd";

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise(((resolve, reject) => {
    let promise
    //1.Perform asynchronous Ajax requests
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    //2.success
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      //3.fail
      message.error(error.message)
    })
  }))

}
