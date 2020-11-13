import React, {PureComponent} from "react";
import {Form, Input, Tree} from "antd";
import PropTypes from 'prop-types'

import menuList from "../../config/menuConfig";

const Item = Form.Item
const {TreeNode} = Tree

export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  getMenus = () => {
    return this.state.checkedKeys
  }

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  onCheck = (checkedKeys) => {
    console.log('OnCheck',checkedKeys)
    this.setState({checkedKeys})
  }



  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  //fix display bug!!
  componentWillReceiveProps(nextProps, nextContext) {
   const menus  =  nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    //console.log('Auth-form render!!!') use PureComponent not render when data not change
    const {checkedKeys} = this.state
    const {role} = this.props
   // console.log('role=', role)
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 15},
    }
    return (
      <div>
        <Item label='Role Name:' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>

        <Tree checkable defaultExpandAll={true} checkedKeys={checkedKeys} onCheck={this.onCheck}>
          <TreeNode title='Platform Authorities' key='all'>
            {this.treeNodes}

          </TreeNode>
        </Tree>

      </div>

    )
  }
}

