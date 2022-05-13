import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from "axios";


function MyUpload(props) {

    const userId = props.match.params.userId
    console.log('userId=', userId)
    const uploadId = props
    console.log('upload=', uploadId)

    useEffect(() => {
      axios.get(`/api/product/products_by_id?id=${userId}&type=array`)
        .then(response => {
          console.log('res=', response)
        })
    })

    // if (props.user.userData.userId === ) {

    // }
    
  return (
    <div>
        hi
    </div>
  )
}

export default MyUpload