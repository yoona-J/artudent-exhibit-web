import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'antd'

function Mypage(props) {

    // console.log('userId', userId)
    const users = props.user.userData
    const [Users, setUsers] = useState({})

    const MyUploadPage = () => {
        window.location.href = `/mypage/${users._id}`
    }
    console.log('users', users)
    console.log(Users)
  

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