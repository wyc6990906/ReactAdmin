import React, {Component} from "react";
import {Form, Icon, Input, Button, message} from "antd";
import {Redirect} from 'react-router-dom'

import './login.less'
import logo from '../../assets/images/cloud.png'
import {reqLogin} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

const Item = Form.Item

class Login extends Component {
  handleSubmit = (event) => {
    const {form} = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        //console.log('Received values of form:', values)
        const {username, password} = values
        const result = await reqLogin(username, password)
        if (result.status === 0) { //{status:0,data:user}  {status:1,msg:'xxx}
          message.success('login success~')
          //save user in memory
          const user = result.data
          memoryUtils.user = user
          //save user in localstorage
          storageUtils.saveUser(user)
          //redirect to /admin
          this.props.history.replace('/')
        } else {
          message.error(result.msg)
        }
      }
    })
    event.preventDefault()
  }
  validatePwd = (rule, value, callback) => {
    // Custom Validator
    if (!value) {
      callback('Please input your password!')
    } else if (value.length < 4) {
      callback('Password should be at least 4 letters!')
    } else if (value.length > 12) {
      callback('Password should be no more than 12 letters!')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('Password must be letters,number or _!')
    } else {
      callback()
    }
  }

  render() {
    //if user already login redirect to admin
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/'/>
    }
    //得到具有强大功能的form对象
    const {form} = this.props
    const {getFieldDecorator} = form
    //getFieldDecorator 是一个高阶函数 需要接收组件标签
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React:Backstage Management System</h1>
        </header>
        <section className="login-content">
          <h2>User Login</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', { //config obj
                rules: [
                  {required: true, whitespace: true, message: 'Please input your username!'},
                  {min: 4, message: 'Username should be at least 4 letters!'},
                  {max: 12, message: 'Username should be no more than 12 letters!'},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be letters,number or _!'},
                ],initialValue:'admin'
              })(<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Username"/>)}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validatePwd
                    //  Custom Validator
                  }
                ],
              })(<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        type="password"
                        placeholder="Password"/>)}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Login)
// antd website show Hot to create form prop
export default WrapLogin