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

    const continentListData = () => {
        if (props.detail.continents !== undefined) {
            if (props.detail.continents === 1) {
                return <>일러스트</>
            } else if (props.detail.continents === 2) {
                return <>도예/조각</>
            } else if (props.detail.continents === 3) {
                return <>회화/판화</>
            } else if (props.detail.continents === 4) {
                return <>조형</>
            } else if (props.detail.continents === 5) {
                return <>가구디자인</>
            } else if (props.detail.continents === 6) {
                return <>미디어 아트</>
            } else if (props.detail.continents === 7) {
                return <>사진</>
            }
        }
    }

    // console.log('>>>>>', props)
    
    return (
        <div style={{ width: '100%' }}>
            <Descriptions title="" bordered="bordered">
                <Descriptions.Item label="Title">{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="Artist">{props.detail.artist}</Descriptions.Item>
                <Descriptions.Item label="Technique">{props.detail.tech}</Descriptions.Item>
                <Descriptions.Item label="Dimemsions">{props.detail.dimensions}</Descriptions.Item>
                <Descriptions.Item label="Year">{props.detail.year}年</Descriptions.Item>
                <Descriptions.Item label="Continent">{continentListData()}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    <div style={{ wordBreak: 'break-all', textAlign: 'left' }}>
                        {props.detail.description}
                    </div></Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size='large' shape='round' onClick={clickHandler} style={{borderColor: 'red', color: 'red'}}>
                    Add
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo