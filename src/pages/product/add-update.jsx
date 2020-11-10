import React, {Component} from "react";
import {Card, Form, Input, Cascader, Button, Icon, message} from "antd";

import LinkButton from "../../components/link-button/link-button";
import {reqCategories, reqAddOrUpdateProduct} from "../../api";
import PicturesWall from "./picturesWall"
import RichTextEditor from "./rich-editor";

const Item = Form.Item
const TextArea = Input.TextArea

class ProductAddUpdate extends Component {
  state = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.pictureWall = React.createRef()
    this.editor = React.createRef()
  }

  initOptions = async (categories) => {
    const options = categories.map(category => ({
      value: category._id,
      label: category.name,
      isLeaf: false
    }))
    // if update subcategory product
    const {isUpdate, product} = this
    const {pCategoryId} = product
    if (isUpdate && pCategoryId !== '0') {
      const subCategories = await this.getCategories(pCategoryId)
      const childOptions = subCategories.map(category => ({
        value: category._id,
        label: category.name,
        isLeaf: true
      }))
      const targetOption = options.find(option => option.value === pCategoryId)
      //Associated to the first level option obj
      targetOption.children = childOptions

    }

    this.setState({options})
  }

  getCategories = async (parentId) => {
    const result = await reqCategories(parentId)
    if (result.status === 0) {
      const categories = result.data
      if (parentId === '0') {
        //Category
        this.initOptions(categories)
      } else {
        //Subcategory
        return categories
      }
    }
  }

  submit = () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        //1.collect form data to product{}
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pictureWall.current.getImgs()
        const detail = this.editor.current.getDetail()
        const product = {
          name, desc, price, imgs, detail,pCategoryId,categoryId
        }
        // if update ,add _id param
        if (this.isUpdate) {
          product._id = this.product._id
        }
        const result = await reqAddOrUpdateProduct(product)
        if (result.status === 0) {
          message.success(`${this.isUpdate ? 'Update' : 'Add'}product success!`)
          this.props.history.goBack()
        } else {
          message.error(`${this.isUpdate ? 'Update' : 'Add'}product fail!`)
        }
      }
    })
  }

  validatePrice = (rule, value, callback) => {
    // console.log(value,typeof value) //string
    if (value * 1 > 0) {
      callback()
    } else {
      callback('Price must greater than 0')
    }
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    // display loading
    targetOption.loading = true;
    // send req to get Subcategories by selected Category  (parentId = targetOption.value) !important
    const subCategories = await this.getCategories(targetOption.value)
    targetOption.loading = false;
    if (subCategories && subCategories.length > 0) {
      const childOptions = subCategories.map(category => ({
        value: category._id,
        label: category.name,
        isLeaf: true
      }))
      targetOption.children = childOptions
    } else {
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options],
    });
  };

  componentDidMount() {
    this.getCategories('0')
  }

  componentWillMount() {
    // collect product from <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>Modify</LinkButton>
    const product = this.props.location.state
    //Save an id whether it is updated or not
    this.isUpdate = !!product
    this.product = product || {}
  }

  render() {
    const {isUpdate, product} = this
    const {pCategoryId, categoryId, imgs, detail} = product
    //console.log("imgs:",imgs)
    const categoryIds = []
    if (isUpdate) {
      //product is Category
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        //product is a SubCategory
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
    const {options} = this.state
    const {getFieldDecorator} = this.props.form
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{marginRight: 10, fontSize: 20}}/>
          <span>{isUpdate ? 'Modify Product' : 'Add Product'}</span>
        </LinkButton>
      </span>
    )
    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 8},
    };

    return (
      <Card title={title}>
        <Form {...formItemLayout} >
          <Item label='Product Name:'>
            {getFieldDecorator('name', {
              initialValue: product.name,
              rules: [
                {required: true, message: 'Product name must be entered!'}
              ]
            })(<Input/>)}
          </Item>
          <Item label='Description:'>
            {getFieldDecorator('desc', {
              initialValue: product.desc,
              rules: [
                {required: true, message: 'Product description must be entered!'}
              ]
            })(<TextArea autoSize={{minRows: 2}}/>)}

          </Item>
          <Item label='Price:'>
            {getFieldDecorator('price', {
              initialValue: product.price,
              rules: [
                {required: true, message: 'Product price must be entered!'},
                {validator: this.validatePrice}
              ]
            })(<Input type='number' addonAfter='$'/>)}

          </Item>
          <Item label='Category:'>
            {getFieldDecorator('categoryIds', {
              initialValue: categoryIds,
              rules: [
                {required: true, message: 'Product Category must be specified!'},
              ]
            })(<Cascader
              options={options}
              loadData={this.loadData}
            />)}

          </Item>
          <Item label='Picture:'>
            <PicturesWall ref={this.pictureWall} imgs={imgs}/>
          </Item>
          <Item label='Category:' labelCol={{span: 2}} wrapperCol={{span: 14}}>
            <RichTextEditor ref={this.editor} detail={detail}/>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>Submit</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)