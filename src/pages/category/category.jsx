import React, {Component} from "react";
import {Card, Table, Button, Icon, message, Modal} from "antd";

import LinkButton from "../../components/link-button/link-button";
import './category.less'
import {reqCategories, reqAddCategory, reqUpdateCategory} from '../../api/index'
import AddForm from "./add-form";
import UpdateForm from "./update-form";

export default class Category extends Component {

  state = {
    categories: [],
    loading: false,
    parentId: '0',
    parentName: '',
    subCategories: [],
    showStatus: 0, //modal add/update 0: both hide, 1:show add 2:show update
  }

  initColumns = () => {
    this.columns = [
      {
        title: 'Categories',
        dataIndex: 'name',
      },
      {
        width: 300,
        title: 'Action',
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdateCategory(category)}>Modify Category</LinkButton>
            {/*really special:this is how to pass params in a cb fn,outside is a anonymous function */}
            {this.state.parentId === '0' ? <LinkButton
              onClick={() => this.showSubCategories(category)}>View Subcategories
            </LinkButton> : null}
          </span>
        )
      }
    ]
  }

//both cate. and subcate.
  getCategories = async (parentId) => {
    //display loading
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
    //First class Category
    const result = await reqCategories(parentId)
    // hide loading
    this.setState({loading: false})
    if (result.status === 0) {
      // Maybe is Categories or SubCategory
      const categories = result.data
      if (parentId === '0') {
        this.setState({categories})
      } else {
        //Subcategory
        this.setState({subCategories: categories})
      }
    } else {
      message.error('Get categories failed1')
    }
  }
  //display Subcategory of assign Category
  showSubCategories = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // execute when state update and after re render
      //console.log('parentId', this.state.parentId) // right parent id
      //get subcategory
      this.getCategories()
    })
    //console.log(this.state.parentId) // 0 because setState() is synchronised
  }

  showCategories = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories: []
    })
  }

  handleCancel = () => {
    this.form.resetFields()
    this.setState({showStatus: 0})
  }
  showAddCategory = () => {
    this.setState({showStatus: 1})
  }
  addCategory = () => {
    console.log('addCategory()')
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({showStatus: 0})
        const {parentId, categoryName} = values
        this.form.resetFields()
        const result = await reqAddCategory({categoryName, parentId})
        if (result.status === 0) {
          if (parentId === this.state.parentId) {
            await this.getCategories()
          } else if (parentId === '0') { //in subCategories add Category,re get category list but don;t show
            await this.getCategories('0')
          }
        }
      }
    })
  }
  showUpdateCategory = (category) => {
    this.category = category
    this.setState({showStatus: 2})
  }
  updateCategory = () => {
    console.log('updateCategory()')
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({showStatus: 0})
        //  send reqUpdate to renew Category
        const categoryId = this.category._id
        const {categoryName} = values
        // must to reset input fields not use cache value
        this.form.resetFields()
        const result = await reqUpdateCategory({categoryId, categoryName})
        if (result.status === 0) {
          //display new Category list
          await this.getCategories()
        }
      }

    })

  }


  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    //Only for Category not sub
    this.getCategories()
  }

  render() {
    const {categories, loading, subCategories, parentId, parentName, showStatus} = this.state
    const category = this.category
    const title = parentId === '0' ? "Category List" : (
      <span>
        <LinkButton onClick={this.showCategories}>Category List</LinkButton>
        &nbsp;&nbsp;
        <Icon type='arrow-right'></Icon>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>{parentName}</span>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={this.showAddCategory}>
        <Icon type='plus'/>
        Add
      </Button>
    )
    return (
      <Card title={title}
            extra={extra}>
        <Table dataSource={parentId === '0' ? categories : subCategories}
               columns={this.columns}
               bordered
               rowKey='_id'
               pagination={{defaultPageSize: 5, showQuickJumper: true}}
               loading={loading}/>
        <Modal
          title="Add Category"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categories={categories}
            parentId={parentId}
            setForm={(form) => {
              this.form = form
            }}
          />
        </Modal>

        <Modal
          title="Modify Category"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={category ? category.name : null}
                      setForm={(form) => {
                        this.form = form
                      }}
          />
        </Modal>
      </Card>
    )
  }
}
