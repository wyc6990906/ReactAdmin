import React, {Component} from "react";
import {Form, Select, Input} from "antd";


const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {
  render() {

    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {getFieldDecorator('parentId',{
            initialValue:'0'
          })(
            <Select>
              <Option value='0'>Category</Option>
              <Option value='1'>Adult/Sex</Option>
              <Option value='2'>Shoes</Option>
            </Select>
          )}
        </Item>
        {getFieldDecorator('categoryName',{
          initialValue:''
        })(
          <Input placeholder='Enter Category Name...'/>
        )}
      </Form>
    )
  }
}

export default Form.create()(AddForm)