import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {Modal} from "antd";

import './header.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather, reqCityAdcode} from "../../api";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils"
import LinkButton from "../link-button/link-button";

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    province: '',
    city: '',
    weather: '',
  }
  getTime = () => {
    this.intevalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }


  getWeather = async () => {
    const adcode = await reqCityAdcode()
    const {province, city, weather} = await reqWeather(adcode)
    this.setState({province, city, weather})
  }
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem =>path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout = (event) => {
    Modal.confirm({
      title: 'Do you want to logout?',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      }
    })
  }

  componentDidMount() {
    this.getTime()
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const {currentTime, province, city, weather} = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className="header">
        <div className='header-top'>
          <span>Welcome,{username}</span>
          <LinkButton onClick={this.logout}>Quit</LinkButton>
        </div>
        <div className='header-bot'>
          <div className='header-bot-left'>{title}</div>
          <div className='header-bot-right'>
            <span>{currentTime}</span>
            <span className='middle'>{province + city} </span>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)