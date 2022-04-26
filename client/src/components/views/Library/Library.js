import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getLibItems, removeLibItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import { Empty } from 'antd'

function Library(props) {

    const dispatch = useDispatch();
    const [IsEmpty, setIsEmpty] = useState(false)

    useEffect(() => {

        let libItems = []

        //redux user state 안 library 안에 게시물이 들어있는지 확인
        if (props.user.userData && props.user.userData.library) {
            if (props.user.userData.library.length > 0) {
                props.user.userData.library.forEach(item => {
                    libItems.push(item.id)
                })

                dispatch(getLibItems(libItems, props.user.userData.library))
            }
        }
    }, [props.user.userData])

    let removeFromLib = (productId) => {
        console.log('productId', productId)

        dispatch(removeLibItem(productId))
            .then(response => {
                if(response.payload.productInfo.length <= 0) {
                    setIsEmpty(false)
                }
            })

    }
    
    console.log(props.user)
    console.log('props.user.libDetail', props.user.libDetail)



  return (
    <div style={{ width: '70%', margin: '3rem auto'}}>
        <h1> Library </h1>

        <div>
           <UserCardBlock products={props.user.libDetail} removeItem={removeFromLib} />   
        </div>

        {IsEmpty ? <h2></h2> : <Empty description={false} image={Empty.PRESENTED_IMAGE_SIMPLE}><h4>좋아요한 게시물이 없습니다.</h4></Empty>}
    </div>
  )
}

export default Library

