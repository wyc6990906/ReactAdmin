import React, {Component} from "react";
import {Form, Input} from "antd";
import PropTypes from 'prop-types'


class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount() {
    // send form to father component by setForm()
    this.props.setForm(this.props.form)
  }

  render() {
    const {categoryName} = this.props
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        {getFieldDecorator('categoryName', {
          initialValue: categoryName
        })(
          <Input placeholder='Enter Category Name...'/>
        )}
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)