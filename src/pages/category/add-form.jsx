import React, {Component} from "react";
import {Form, Select, Input} from "antd";
import PropTypes from 'prop-types'


const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categories, parentId} = this.props
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {getFieldDecorator('parentId', {
            initialValue: parentId
          })(
            <Select>
              <Option value='0'>Category</Option>
              {
                categories.map(category => <Option value={category._id}>{category.name}</Option>)
              }
            </Select>
          )}
        </Item>
        <Item>
          {getFieldDecorator('categoryName', {
            initialValue: '',
            rules: [
              {required: true, message: 'Category name must be entered!'}
            ]
          })(
            <Input placeholder='Enter Category Name...'/>
          )}
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)