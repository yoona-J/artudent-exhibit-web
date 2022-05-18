import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import Comment from './Sections/Comment'
import { Row, Col } from 'antd'
import Favorite from './Sections/Favorite'

function DetailProductPage(props) {

    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})
    const [CommentLists, setCommentLists] = useState([])
    const Variable = {
      productId: productId,
    }
    const refreshFunction = (newComment) => {
      setCommentLists(CommentLists.concat(newComment))
    }

    useEffect(() => {
      Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
          setProduct(response.data[0])
          console.log(response.data)
        })
        .catch(err => alert(err))
    }, [])

    useEffect(() => {
      Axios.post('/api/comment/getComments', Variable)
        .then(response => {
            if(response.data.success){
                // console.log('comments', response.data.comments)
                setCommentLists(response.data.comments)
            }else{
                alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
            }
        })
    }, []);


  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>

      {/* Favorite */}
      <div style={{display: 'flex', justifyContent: 'right'}}>
          <Favorite productInfo={Product} productId={productId} userFrom={localStorage.getItem('userId')}/>
      </div>

      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          
          {/* product image */}

          <ProductImage detail={Product} />

        </Col>
        <Col lg={12} sm={24}>
      
          {/* productInfo */}

          <ProductInfo detail={Product}/>

        </Col>
      </Row>

      {/* Comment */}
      <Comment refreshFunction={refreshFunction} CommentLists={CommentLists} postId={productId}/>
    </div>
  )
}

export default DetailProductPage