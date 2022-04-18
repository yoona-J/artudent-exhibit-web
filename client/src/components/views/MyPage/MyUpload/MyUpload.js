import React, {useState, useEffect} from 'react'
import {Table} from 'antd';
import Axios from 'axios';

function MyUpload() {
    
    // const [Product, setProduct] = useState([])
    // const userId = props.match.params.userId
    // console.log('userId=', userId)

    useEffect(() => {

        //body로 유저 id만 가져오게 만들기
      
        Axios.post('/api/users/user')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert("상품을 가져오는 데 실패했습니다.")
                }
            })
    }, [])
    

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>
        }, {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist'
        }, {
            title: 'Year',
            dataIndex: 'year',
            key: 'year'
        }, {
            title: 'Tag',
            key: 'tag',
            dataIndex: 'tag'
        }, {
            title: 'Delete',
            key: 'Delete',
            render: () => (<a>Delete</a>)
        }
    ];

    const data = [
        {
            key: '1',
            title: 'test1',
            artist: 'yoona Jeong',
            year: '2022',
            tag: '일러스트'
        }, {
            key: '2',
            title: 'test2',
            artist: 'yoona Jeong',
            year: '2021',
            tag: '사진'
        }, {
            key: '3',
            title: 'test3',
            artist: 'yoona Jeong',
            year: '2020',
            tag: '미디어 아트'
        }
    ];

    return (
        <div
            style={{
                width: '60%',
                margin: '3rem auto'
            }}>
            <div style={{
                    textAlign: 'center'
                }}>
                <h2>MyUpload</h2>

                <Table
                    columns={columns}
                    dataSource={data}
                    //pagination delete
                    pagination={{
                        total: 1000,
                        pageSize: 1000,
                        hideOnSinglePage: true
                    }}/>
            </div>
        </div>
    )
}

export default MyUpload