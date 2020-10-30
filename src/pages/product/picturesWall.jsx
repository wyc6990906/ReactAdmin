import React from "react";
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types'

import {reqDeleteImg} from "../../api";
import {BASE_IMG_URL} from "../../utils/constants";

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }
  state = {
    previewVisible: false,
    previewImage: '', //big pic url
    fileList: [],
  }

  constructor(props) {
    super(props);
    let fileList = []
    const {imgs} = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img.name,
        status: 'done',
        url: BASE_IMG_URL + img
      }))
    }
    this.state = {
      previewVisible: false,
      previewImage: '', //big pic url
      fileList
    }
  }


  handleCancel = () => this.setState({previewVisible: false});

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = async ({file, fileList}) => {
    // correct file's information
    console.log('first:', file) // without name , url
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('Upload image success!')
        const {name, url} = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
        console.log('corrected:', file)
      } else {
        message.error('Upload image fail!')
      }
    } else if (file.status === 'removed') {
      //Delete img backend
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('Delete image success!')
      } else {
        message.error('Delete image fail!')
      }
    }
    this.setState({fileList})
  }
// get uploaded images file name  []
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          accept="image/*"/* only accept image*/
          action="/manage/img/upload" /* interface address for uploading images*/
          name="image" /* request param name*/
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}
/*
*
* 1.子组件调用父组件的方法： 将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
* 2.父组件调用子组件的方法： 在父组件中通过ref得到子组件的标签对象，调用其方法*/
