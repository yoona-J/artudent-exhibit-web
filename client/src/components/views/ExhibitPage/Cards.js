import React from 'react'
import ExhibitionImage from './img/exhibitImg.jpg'
import {Card, Col, Row} from 'antd';

const {Meta} = Card;

function Cards() {
  return (
    <div>
        <Row gutter={[50, 50]}>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition1" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test1"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        </Row>
    </div>
  )
}

export default Cards