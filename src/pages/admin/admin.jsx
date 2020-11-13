import React, {Component} from "react";
import {Redirect, Switch, Route} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from "react-redux";


//import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const {Footer, Sider, Content} = Layout;

class Admin extends Component {
  render() {
    const user = this.props.user
    if (!user || !user._id) {
      // automatically redirect to login
      return <Redirect to="/login"/>
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>
            <Header/>
          </Header>
          <Content style={{backgroundColor: '#fff',margin:20}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#ccc',fontSize:'20px'}}>Chrome is recommended</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {}
)(Admin)