import React, {Component} from "react";
import {List, Card, Icon} from "antd";

import LinkButton from "../../components/link-button/link-button";
import {BASE_IMG_URL} from "../../utils/constants";
import {reqCategory} from '../../api/index'

const Item = List.Item
export default class ProductDetail extends Component {
  state = {
    categoryName: '',
    subcategoryName: ''
  }

  async componentDidMount() {
    const {pCategoryId, categoryId} = this.props.location.state.product
    if (pCategoryId === '0') {
      const result = await reqCategory(categoryId)
      if (result.status === 0) {
        const categoryName = result.data.name
        this.setState({categoryName})
      }
    } else {
      /* The efficiency is low !!! send request one by one
       const result1 = await reqCategory(pCategoryId)
       const result2 = await reqCategory(categoryId)
       if (result1.status === 0 && result2.status === 0) {
         const categoryName = result1.data.name
         const subcategoryName = result1.data.name
         }*/
      // send request together
      const results = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const categoryName = results[0].data.name
      const subcategoryName = results[1].data.name
      this.setState({categoryName, subcategoryName})
    }
  }

  render() {
    // read/load state
    // <LinkButton onClick={() => this.props.history.push('/product/detail', {product} || null)}>Details
    const {name, desc, price, detail, imgs} = this.props.location.state.product
    const {categoryName, subcategoryName} = this.state
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{marginRight: 10, fontSize: 20}} onClick={() => this.props.history.goBack()}/>
        </LinkButton>
        <span>Product Detail</span>
      </span>
    )

    return (
      <Card title={title} className='product-detail'>
        <List itemLayout='vertical'>
          <Item>
            <span className='left'>Product Name:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>Product Description:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>Product Price:</span>
            <span>${price}</span>
          </Item>
          <Item>
            <span className='left'>The Category:</span>
            <span>{categoryName} {subcategoryName ? '-->' + subcategoryName : null}</span>
          </Item>
          <Item>
            <span className='left'>Product Picture:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={BASE_IMG_URL + img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className='left'>Product Detail:</span>
            <span dangerouslySetInnerHTML={{__html: detail}}/>
          </Item>
        </List>
      </Card>
    )
  }
}