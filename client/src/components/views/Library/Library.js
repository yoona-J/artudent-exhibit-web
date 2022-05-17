import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLibItems, removeLibItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import LibraryImg from './img/library.png'

function Library(props) {

    const dispatch = useDispatch();

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
            })

    }
    
    console.log(props.user)
    console.log('props.user.libDetail', props.user.libDetail)



  return (
    <div>
        <img 
        src={LibraryImg}
        alt='img'
        style={{
            position: 'absolute',
            width: '100%',
            height: '560px',
            top: '50px',
            zIndex: 1
        }}
        >
        </img>
        <div style={{ position: 'relative', width: '70%', margin: '3rem auto', textAlign: 'center', zIndex: 10}}>
            <h1 style={{ color: '#fff', padding: '40px 0px 100px 0px'}}> Library </h1>
            <div>
                <UserCardBlock products={props.user.libDetail} removeItem={removeFromLib} />   
            </div>
        </div>
        
    </div>
  )
}

export default Library

