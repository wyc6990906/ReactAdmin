import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';

import menuList from '../../config/menuConfig'
import './left-nav.less'
import logo from '../../assets/images/cloud.png'

const {SubMenu} = Menu;

class LeftNav extends Component {

  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {

      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  getMenuNodes_reduce = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      //向pre中添加<menu.item> or <submenu>
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        //查找一个与当前请求路径匹配的子Item
        const selectItem = item.children.find(selectItem => selectItem.key === path)
        if (selectItem) {
          //逻辑：首先得是有子元素的元素，如果子元素与当前路径匹配，则自动展开父亲元素
          this.openKey = item.key
        }
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes_reduce(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }
//before first render execute once
  componentWillMount() {
    this.menuNodes = this.getMenuNodes_reduce(menuList)
  }

  render() {
    const path = this.props.location.pathname
    const openKey = this.openKey

    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-header">
            <img src={logo} alt="logo"/>
            <h1>Akatsuki 晓</h1>
          </Link>


          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
          >

            {
              this.getMenuNodes_reduce(menuList)
            }

          </Menu>
        </div>
      </div>
    )
  }
}

export default withRouter(LeftNav)