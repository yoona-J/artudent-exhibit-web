import React from 'react'
import { Button, Descriptions } from 'antd'
import { useDispatch } from 'react-redux'
import { AddToLib } from '../../../../_actions/user_actions';

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {

        //필요한 정보를 라이브러리에 넣어준다
        dispatch(AddToLib(props.detail._id))
        console.log('click=', props.detail._id)
        
        if (props.detail._id.length >= 1) {
            alert('라이브러리에 저장되었습니다.')
        }
    }
    
    return (
        <div style={{ width: '100%' }}>
            <Descriptions title="Work Info." bordered="bordered">
                <Descriptions.Item label="Title">{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="Artist">{props.detail.artist}</Descriptions.Item>
                <Descriptions.Item label="Technique">{props.detail.tech}</Descriptions.Item>
                <Descriptions.Item label="Dimemsions">{props.detail.dimensions}</Descriptions.Item>
                <Descriptions.Item label="Year">{props.detail.year}年</Descriptions.Item>
                <Descriptions.Item label="Continent">{props.detail.continents}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    <div style={{ wordBreak: 'break-all', textAlign: 'left' }}>
                        {props.detail.description}
                    </div></Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size='large' shape='round' type='danger' onClick={clickHandler}>
                    ♡
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo