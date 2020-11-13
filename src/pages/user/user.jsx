import React, {Component} from "react";
import {Card, Button, Table, Modal, message} from "antd";


import {formateDate} from "../../utils/dateUtils";
import LinkButton from "../../components/link-button/link-button";
import {PAGE_SIZE} from "../../utils/constants";
import {reqDeleteUser, reqUserList, reqAddOrUpdateUser} from "../../api";
import UserForm from "./user-form";

export default class User extends Component {
  state = {
    users: [],
    roles: [],
    isShow: false
  }

  initColumns = () => {
    this.columns = [
      {
        title: 'Username',
        dataIndex: 'username'
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Phone',
        dataIndex: 'phone'
      },
      {
        title: 'Create Time',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: 'Role',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: 'Operation',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>Modify</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>Delete</LinkButton>
          </span>
        )
      }
    ]
  }
//Generates an object containing all of the role names based on the array of roles
// (the property name USES the value of the role ID)
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    this.roleNames = roleNames
  }

  addOrUpdateUser = () => {
    this.setState({isShow: false})
    this.form.validateFields(async (error, values) => {
      if (!error) {
        const user = values
        //console.log(values)
        this.form.resetFields()

        if (this.user) {
          user._id = this.user._id
        }
        const result = await reqAddOrUpdateUser(user)
        if (result.status === 0) {
          message.success(`${this.user ? 'Modify' : 'Add'} user success!`)
          this.getUserList()
        } else {
          message.error(`${this.user ? 'Modify' : 'Add'} user fail!`)
        }
      }
    })
  }
  getUserList = async () => {
    const result = await reqUserList()
    if (result.status === 0) {
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({users, roles})
    }
  }
  showUpdate = (user) => {
    this.user = user
    this.setState({isShow: true})
  }

  deleteUser = (user) => {
    Modal.confirm({
      title: `Do you want to delete ${user.username}?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success(`Delete ${user.username} success!`)
          this.getUserList()
        } else {
          message.error(`Delete ${user.username} fail!`)
        }
      }
    })
  }
  showAdd = () => {
    this.user = null
    this.setState({isShow: true})
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUserList()
  }

  render() {
    const {users, isShow, roles} = this.state
    const {user} = this
    const title = <Button type='primary' onClick={this.showAdd}>Create User</Button>
    return (
      <Card title={title}>
        <Table dataSource={users}
               columns={this.columns}
               bordered
               rowKey='_id'
               pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
        />
        <Modal
          title={user ? "Modify User" : "Create User"}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({isShow: false})
          }
          }
        >
          <UserForm
            user={user}
            setForm={form => this.form = form}
            roles={roles}
          />
        </Modal>
      </Card>
    )
  }
}