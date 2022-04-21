import React, { useEffect } from 'react'
import Axios from 'axios'

function DetailProductPage(props) {

    const productId = props.match.params.productId

    useEffect(() => {
      Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if(response.data.success) {
                console.log('response=', response.data)
            } else {
                alert('상품 가져오기를 실패했습니다.')
            }
        })
    }, [])
    


  return (
    <div>DetailProductPage</div>
  )
}

export default DetailProductPage