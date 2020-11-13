import React, {Component} from "react";
import {Card, Button, Table, Modal, message} from "antd";
import {connect} from "react-redux";

import {PAGE_SIZE} from "../../utils/constants";
import {reqRoles, reqAddRole, reqUpdateRole} from "../../api";
import AddForm from "./add-form";
import AuthForm from "./auth-form";
// import memoryUtils from "../../utils/memoryUtils";
import {formateDate} from "../../utils/dateUtils";
import storageUtils from "../../utils/storageUtils";
import {logout} from "../../redux/actions";

class Role extends Component {

  state = {
    roles: [],// role list
    role: {}, //selected role
    isShowAdd: false,
    isShowAuth: false,
  }

  constructor(props) {
    super(props);
    this.auth = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: 'Role Name',
        dataIndex: 'name'
      },
      {
        title: 'Create Time',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: 'Authorization Time',
        dataIndex: 'auth_time',
        render: (auth_time) => formateDate(auth_time)
      },
      {
        title: 'Authorizer',
        dataIndex: 'auth_name'
      },
    ]
  }
  onRow = (role) => {
    return {
      onClick: event => {
        this.setState({
          role
        })
        // console.log(role._id)
      }
    }
  }
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({roles})
    }
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        const {roleName} = values
        this.form.resetFields()
        const result = await reqAddRole(roleName)
        if (result.status === 0) {
          message.success('Add role success!')
          //this.getRoles() method used before
          // new method
          const role = result.data
          // const roles = this.state.roles   not suggested by react
          //  roles.push(role)
          this.setState(state => ({
            roles: [...state.roles, role]
          }))
          this.setState({isShowAdd: false})
        } else {
          message.error('Add role fail!')
        }
      }
    })
  }

  handleCancelAdd = () => {
    this.setState({isShowAdd: false})
  }

  updateRole = async () => {
    const role = this.state.role
    //get the newest menus from auth-form component
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = this.props.user.username
    role.auth_time = Date.now()
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      // if update self 's auth force to quit login
      if (role._id === this.props.user.role_id) {
        // memoryUtils.user = {}
        // storageUtils.removeUser()
        // this.props.history.replace('/login')
        this.props.logout()
        message.info('The current user\'s permissions have changed. Please log in again')
      } else {
        message.success('Set authorities success!')
        this.setState({
          roles: [...this.state.roles]
        })
      }
    } else {
      message.error('Set authorities fail!')
    }
    this.setState({
      isShowAuth: false
    })
  }
  handleCancelUpdate = () => {
    this.setState({isShowAuth: false})
  }


  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const {roles, role, isShowAdd, isShowAuth} = this.state

    const title = (
      <span>
         <Button onClick={() => {
           this.setState({isShowAdd: true})
         }} type='primary' style={{margin: '0 15px'}}>Create Role</Button>
        <Button onClick={() => {
          this.setState({isShowAuth: true})
        }} type='primary' disabled={!role._id}>Set Authorities</Button>
      </span>

    )

    return (
      (
        <Card title={title}>
          <Table dataSource={roles}
                 columns={this.columns}
                 bordered
                 rowKey='_id'
                 pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
                 rowSelection={{
                   type: "radio",
                   selectedRowKeys: [role._id],
                   //when user click radio
                   onSelect: (role) => {
                     this.setState({role})
                   }
                 }}

                 onRow={this.onRow}
          />
          <Modal
            title="Add Role"
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={this.handleCancelAdd}
          >
            <AddForm
              setForm={(form) => {
                this.form = form
              }}
            />
          </Modal>

          <Modal
            title="Setting role authorities"
            visible={isShowAuth}
            onOk={this.updateRole}
            onCancel={this.handleCancelUpdate}
          >
            <AuthForm role={role} ref={this.auth}/>
          </Modal>
        </Card>
      )
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {logout}
)(Role)