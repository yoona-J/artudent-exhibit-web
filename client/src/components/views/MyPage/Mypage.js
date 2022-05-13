import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'antd'

function Mypage() {

    // console.log('userId', userId)
    const users = useSelector(state => state.user.userData)
    console.log('users', users)

    console.log('ii=', users)

    const MyUploadPage = () => {
        window.location.href = `/mypage/${users._id}`
    }

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
                
                
            <Button onClick={MyUploadPage}>button</Button>
                    
            </div>
        </div>
    )
}

export default Mypage