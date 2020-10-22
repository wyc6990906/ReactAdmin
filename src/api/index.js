/*
  * A module that contains all the interface request functions in an application
  * every fun returns promise
  * called index.js cuz of just need to import folder not file
* */

import ajax from "./ajax";
import jsonp from "jsonp"
import {message} from "antd";

//Login
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
//Add user
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

/*
* jsonp The requested interface requests the function
* */
export const reqWeather = (cityCid) => {
  return new Promise(((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCid}&key=9a474edea3f6e948bdee316c01298f88`
    jsonp(url, {}, (err, data) => {
      if (!err && data.lives !== []) {
        const {province, city, weather, adcode} = data.lives[0]
        resolve({province, city, weather, adcode})
      } else {
        message.error('Get weather information failed!')
      }
    })
  }))
}
//reqWeather('140100')

export const reqCityAdcode = () => {
  return new Promise(((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/ip?&key=9a474edea3f6e948bdee316c01298f88`
    jsonp(url, {}, (err, data) => {
      if (!err && data.lives !== []) {
        const adcode = data.adcode
        //console.log(adcode)
        resolve(adcode)
      } else {
        message.error('Get adcode information failed!')
      }
    })
  }))
}

// reqCategories both Category and Subcategory
export const reqCategories = (parentId) => ajax('/manage/category/list', {parentId})
// Add Category
export const reqAddCategory = ({categoryName, parentId}) => ajax('/manage/category/add ',
  {categoryName, parentId}, 'POST')
// Update Categoty
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update',
  {categoryId, categoryName}, 'POST')


