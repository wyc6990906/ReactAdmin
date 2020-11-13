import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import {Modal} from "antd";
import {connect} from "react-redux";

import './header.less'
import {formateDate} from '../../utils/dateUtils'
//import memoryUtils from '../../utils/memoryUtils'
//import storageUtils from "../../utils/storageUtils"
import {reqWeather, reqCityAdcode} from "../../api";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/link-button";
import {logout} from '../../redux/actions'

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
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
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
        // storageUtils.removeUser()
        //memoryUtils.user = {}
        this.props.logout()
        // this.props.history.replace('/login') no need Admin.jsx already control:
        /*        if (!user || !user._id) {
                 automatically redirect to login
                return <Redirect to="/login"/>
                }
        * */
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
    //const username = memoryUtils.user.username
    const username = this.props.user.username
    // const title = this.getTitle()
    const title = this.props.headTitle
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

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(withRouter(Header))