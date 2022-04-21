import React, { useEffect } from 'react'
import {Table} from 'antd';
import Axios from 'axios';

function MyUpload(props) {

    const userId = props.match.params.userId
    console.log('userId=', userId)

    // const productId = props.match.params.productId
    // console.log('productId=', productId)

    // useEffect(() => {
    //   Axios.get(`/api/product/upload_by_id?id=${productId}`)
    //     .then(response => {
    //         if(response.data.success) {
    //             console.log('response=', response.data)
    //         } else {
    //             alert('상품 가져오기를 실패했습니다.')
    //         }
    //     })
    // }, [])

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