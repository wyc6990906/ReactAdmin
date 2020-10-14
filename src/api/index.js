/*
  * A module that contains all the interface request functions in an application
  * every fun returns promise
* */

import ajax from "./ajax";

//Login
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
//Add user
export const reqAddUser =(user) =>ajax('/manage/user/add',user,'POST')