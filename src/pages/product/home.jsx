import React, {Component} from "react";
import {Card, Select, Input, Button, Icon, Table, message} from "antd";
import LinkButton from "../../components/link-button/link-button";

import {reqProducts, reqSearchProducts, reqUpdateStatus} from "../../api";
import {PAGE_SIZE} from '../../utils/constants'

const Option = Select.Option

export default class ProductHome extends Component {
  state = {
    products: [],
    total: 0, //number of products
    loading: false,
    searchName: '',
    searchType: 'productName',
  }

  initColumns = () => {
    this.columns = [
      {
        title: 'Product Name',
        dataIndex: 'name',
        width: 200
      },
      {
        title: 'Description',
        dataIndex: 'desc',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (price) => '$' + price

      },
      {
        width: 100,
        title: 'Status',
        //dataIndex: 'status',
        render: (product) => {
          const {status, _id} = product
          return (
            <span>
              <Button
                onClick={() => this.updateProductStatus(_id, status === 1 ? 2 : 1)}
                type='primary'>{status === 1 ? 'Sold Out' : 'On Sale'}</Button>
              <span>{status === 1 ? 'On Sale' : 'Sold Out'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: 'Operation',
        render: (product) => {
          return (
            <span>
              {/* send product obj to target router component use state*/}
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product} || null)}>Details
              </LinkButton>
              <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>Modify</LinkButton>
            </span>
          )
        }
      },
    ];
  }
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    this.setState({loading: true})
    const {searchName, searchType} = this.state
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else {
      result = await reqProducts({pageNum, pageSize: PAGE_SIZE})
    }
    this.setState({loading: false})
    if (result.status === 0) {
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
      console.log(list)
    }
  }
  updateProductStatus = async (productId, status) => {
    const result = await reqUpdateStatus({productId, status})
    if(result.status===0){
      message.success('update success!')
      this.getProducts(this.pageNum)
    }

  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const {products, total, loading, searchName, searchType} = this.state
    const title = (
      <span>
        <Select onChange={value => this.setState({searchType: value})}
                defaultValue={searchType}
                style={{width: 165}}>
          <Option value='productName'>Search by name</Option>
          <Option value='productDesc'>Search by description</Option>
        </Select>
        <Input
          onChange={event => this.setState({searchName: event.target.value})}
          value={searchName}
          placeholder='Keywords'
          style={{width: 150, margin: '0 15px'}}/>
        <Button type='primary' onClick={() => this.getProducts(1)}>
          Search
        </Button>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={()=>{this.props.history.push('/product/addupdate')}}>
        <Icon type='plus'/>
        Add Product
      </Button>
    )


    return (
      <Card extra={extra} title={title}>
        <Table
          dataSource={products}
          columns={this.columns}
          rowKey='_id'
          bordered
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: this.getProducts,
            loading: {loading}
          }}
        />
      </Card>
    )
  }
}
