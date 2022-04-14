import React from 'react'
import MainImage from './img/mainImg.png';
import ExhibitionImage from './img/ExhibitionImg.jpg'
import SubscribeButton from './img/subscribeButton.png'
import {Divider, Card, Col, Row} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';

const {Meta} = Card;

function MainPage() {

    // const ExhibitionImgCard = () => {     return <Col lg={8} md={12} xs={24}>
    // <Card             hoverable="hoverable"             style={{ width: 240 }}
    // cover={<img alt = "exhibition3" src = { ExhibitionImage } />}> <Meta
    // title="this is the test3" description="Jeong Yoona"/>         </Card> </Col>
    // }

    return (
        <div
            style={{
                width: '60%',
                margin: '3rem auto'
            }}>
            <div style={{
                    textAlign: 'center'
                }}>
                <img
                    src={MainImage}
                    style={{
                        width: '100%',
                        padding: '80px 0px 80px 0px'
                    }}></img>
                <h2>EXHIBITION</h2>
                <div
                    style={{
                        width: '50%',
                        margin: '1rem auto'
                    }}>
                    <Divider/>
                </div>
                {/* cards */}
                <br/>
                <div style={{
                        textAlign: 'left'
                    }}>
                    <Row gutter={[50, 50]}>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <div><a href={`/exhibition/1`}>
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
                            </a></div>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <div><a href={`/exhibition/2`}>
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition2" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test2"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                            </a></div>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <div><a href={`/exhibition/3`}>
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition3" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test3"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                            </a></div>
                        </Col>
                    </Row>
                </div>
                {/* button */}
                <a href="/exhibition">
                    <h5
                        style={{
                            textAlign: 'right'
                        }}>More Exhibition
                        <CaretRightOutlined/></h5>
                </a>
                <img
                    src={SubscribeButton}
                    style={{
                        width: '45%',
                        padding: '100px 0px 20px 0px'
                    }}></img>
                <h5
                    style={{
                        padding: '0px 0px 100px 0px'
                    }}>나만의 온라인 전시회 페이지를 직접 신청해보세요.</h5>
                {/* <hr style={{width: '100%', padding: '0px', textAlign: 'left'}}></hr> */}
            </div>
        </div>
    )
}

export default MainPage