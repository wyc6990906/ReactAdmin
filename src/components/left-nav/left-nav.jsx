import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';

import './left-nav.less'
import logo from '../../assets/images/logo.png'

const {SubMenu} = Menu;

export default class LeftNav extends Component {
  render() {
    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-header">
            <img src={logo} alt=""/>
            <h1>Dylan Admin</h1>
          </Link>
          <Menu
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="1">
              <Icon type="pie-chart"/>
              <span>Home</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                <Icon type="mail"/>
                <span>Product</span>
              </span>
              }
            >
              <Menu.Item key="5">
                <Icon type="mail"/>
                <span>Category Manage</span>
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="mail"/>
                <span>Product Manage</span>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>

      </div>

    )
  }
}