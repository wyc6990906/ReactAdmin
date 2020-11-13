import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import {connect} from "react-redux";
import {setHeadTitle} from "../../redux/actions";

import menuList from '../../config/menuConfig'
import './left-nav.less'
import logo from '../../assets/images/cloud.png'
//import memoryUtils from "../../utils/memoryUtils";

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
      // if current user has permission of item ,show the menu
      if (this.hasAuth(item)) {
        //向pre中添加<menu.item> or <submenu>
        if (!item.children) {
          if(item.key === path || path.indexOf(item.key)===0){
            this.props.setHeadTitle(item.title)
          }
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          //查找一个与当前请求路径匹配的子Item
          const selectItem = item.children.find(selectItem => path.indexOf(selectItem.key) === 0)
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
      }
      return pre
    }, [])
  }

  //judge current user has auth for item or not
  hasAuth = (item) => {
    const key = item.key
    const menus = this.props.user.role.menus
    const username = this.props.user.username
    //1. admin return true
    //2. if item is public return true
    //3. check key in menus or not
    if (username === 'admin' || item.isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      // 4. if current user has permission of item's child need show
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }
    return false
  }

//before first render execute once
  componentWillMount() {
    this.menuNodes = this.getMenuNodes_reduce(menuList)
  }

  render() {
    let path = this.props.location.pathname
    //console.log("path:",path)
    // fix bug : not select when path is product/detail
    if (path.indexOf('/product') === 0) {
      path = '/product'
      //console.log('newPath:',path)
    }
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

export default connect(
  state => ({user:state.user}),
  {setHeadTitle}
)(withRouter(LeftNav))