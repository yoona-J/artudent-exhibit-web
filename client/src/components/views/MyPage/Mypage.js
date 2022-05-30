import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button, Tabs } from 'antd'
import Axios from 'axios'
import MyUpload from './MyUpload/MyUpload'
import FAQ from './FAQ';
import MyPageImg from './img/MyPage.png'
// import { removeProItem } from '../../../_actions/user_actions'; 

const { TabPane } = Tabs;

function Mypage(props) {

    const dispatch = useDispatch();

    const [UserId, setUserId] = useState([])
    const [UserDatas, setUserDatas] = useState([])
    const [Products, setProducts] = useState([])

    function callback(key) {
        console.log(key);
      }

    useEffect(() => {
        if (props.user.userData && props.user.userData._id) {
            // console.log('props', props.user.userData._id)
            const users = props.user.userData._id
            const userDatas = props.user.userData
            // console.log(userDatas)

            Axios.get(`/api/product/products_by_user?id=${users}`)
              .then(response => {
                // console.log('>>', response.data)
                setUserId(users)
                setUserDatas(userDatas)
                setProducts(response.data)
              })
              .catch(err => alert(err))
        }
      }, [props.user])

    //   let removeFromPro = (productId) => {
    //     console.log('productId', productId._id)
    
    //     dispatch(removeProItem(productId._id))
    //         .then(response => {
    //         })
    //   }

    //   console.log('UserId', UserId)
      console.log('UserDatas', UserDatas)
    //   console.log('Products', Products)

    return (
        <div>
            <img
                src={MyPageImg}
                alt='img'
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: '50px',
                    zIndex: 1
                }}></img>
            <div
                style={{
                    position: 'relative',
                    width: '60%',
                    margin: '3rem auto',
                    zIndex: 10
                }}>
                <div style={{
                        textAlign: 'center',
                        paddingTop: '50px'
                    }}>
                    <h2 style={{ color: '#fff', paddingTop: '30px' }}>MyPage</h2>
                    <hr style={{ width: '130px' }} />
                    <Avatar
                            src={UserDatas.image}
                            alt="image"
                            style={{width: '200px', height: '200px', margin: '30px'}}
                    />
                    <h3 style={{ color: '#fff' }}>{UserDatas.name} ({UserDatas.nickname})</h3>
                    <h5 style={{ color: '#fff', padding: '10px 0px 10px 0px' }}>
                        {UserDatas.school} {UserDatas.college} {UserDatas.department}
                    </h5>
                    <hr style={{ width: '300px' }}/>
                    <h5 style={{ color: '#fff', padding: '10px 0px 100px 0px' }}>{UserDatas.sns}</h5>
                    <br />
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="자주 묻는 질문" key="1">
                            <FAQ />
                        </TabPane>
                        <TabPane tab="내가 올린 게시물" key="2">
                            <MyUpload product={Products} 
                            // removeItem={removeFromPro} 
                            />
                        </TabPane>
                    </Tabs>
                    <br />
                    <Button>
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLSfFiOe9JIQNa3T70rDAB0herC2U88NSmGJ7I_NHc1XP24iXag/viewform'>
                            온라인 전시페이지 신청하기    
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Mypage