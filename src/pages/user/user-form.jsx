import React, {PureComponent} from "react";
import {Form, Input, Select} from "antd";
import PropTypes from 'prop-types'


const Item = Form.Item
const Option = Select.Option

class UserForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object,
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {roles} = this.props
    const user = this.props.user || {}
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 15},
    }
    return (
      <Form {...formItemLayout}>
        <Item label='Username:'>
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [
              {required: true, message: 'Username must be entered!'}
            ]
          })(
            <Input placeholder='Enter Username...'/>
          )}
        </Item>
        {
          user._id ? null : (
            <Item label='Password:'>
              {getFieldDecorator('password', {
                initialValue: user.password,
                rules: [
                  {required: true, message: 'Username must be entered!'}
                ]
              })(
                <Input type='password' placeholder='Enter Password...'/>
              )}
            </Item>
          )
        }
        <Item label='Phone:'>
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [
              {required: true, message: 'Phone number must be entered!'}
            ]
          })(
            <Input placeholder='Enter Phone number...'/>
          )}
        </Item>
        <Item label='Email:'>
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [
              {required: true, message: 'Email must be entered!'}
            ]
          })(
            <Input placeholder='Enter Email...'/>
          )}
        </Item>
        <Item label='Role:'>
          {getFieldDecorator('role_id', {
            initialValue: user.role_id,
            rules: [
              {required: true, message: 'Role must be selected!'}
            ]
          })(
            <Select placeholder="Select a role...">
              {/*don't know why placeholder is not working*/}
              {roles.map(role => <Option
                value={role._id}
                key={role._id}
              >{role.name}
              </Option>)}
            </Select>
          )}
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)