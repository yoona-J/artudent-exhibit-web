import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import axios from "axios";


function MyUpload(props) {

    const userId = props.match.params.userId
    console.log('userId=', userId)
    const uploadData = props.user.userData
    console.log('upload=', uploadData)

    

    
  return (
    <div
            style={{
                width: '60%',
                margin: '3rem auto'
            }}>
            <div style={{
                    textAlign: 'center'
                }}>
                <h2>MyPage</h2>
            </div>
    </div>
  )
}

export default MyUpload