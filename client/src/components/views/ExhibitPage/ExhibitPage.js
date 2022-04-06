import React, { useState } from 'react'
// import axios from "axios";
import SubscribeButton from '../MainPage/img/subscribeButton.png'
import {Pagination, Divider, Card, Col, Row} from 'antd';
import ExhibitionImage from './img/exhibitImg.jpg'

const {Meta} = Card;

function ExhibitPage() {

    const InitialState = {
        start: 0,
        end: 10,
        current: 1
    }

    // https://han7096.medium.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-eb4f0f4a1da0

    // export default function (state = InitialState, action) 

    return (
        <div
            style={{
                width: '60%',
                margin: '3rem auto'
            }}>
            <div style={{
                    textAlign: 'center'
                }}>
                <h2>EXHIBITION</h2>
                <div
                    style={{
                        width: '50%',
                        margin: '1rem auto'
                    }}>
                    <Divider/>
                </div>
                {/* search */}



                {/* filter */}



                {/* cards */}
                <div style={{ textAlign: 'left' }}>
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
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
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
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
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
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition4" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test4"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition5" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test5"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition6" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test6"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition7" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test7"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition8" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test8"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            {/* {ExhibitionImgCard} */}
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition9" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test9"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                        <Col lg={8} md={12} xs={22}>
                            <Card
                                hoverable="hoverable"
                                style={{
                                    width: '100%'
                                }}
                                cover={<img alt = "exhibition10" src = {
                                    ExhibitionImage
                                } />}>
                                <Meta title="Title." description="This is the Test10"/>
                                <p/>
                                <Meta title="Description." description="Jeong Yoona"/>
                            </Card>
                        </Col>
                    </Row>
                </div>


                {/* skip */}
                <br/>
                <br/>
                <div>
                    {/* <Pagination onChange={loadMoreHandler} total={50} /> */}
                    </div>



                <br />
                <br />
                <div>
                <img
                    src={SubscribeButton}
                    style={{
                        // display: 'flex',
                        textAlign: 'center',
                        // justifyContent: 'center',
                        width: '45%',
                        padding: '80px 0px 20px 0px'
                    }}></img>
                <h5
                    style={{
                        padding: '0px 0px 100px 0px'
                    }}>나만의 온라인 전시회 페이지를 직접 신청해보세요.</h5>
                </div>
            </div>
        </div>
    )
}

export default ExhibitPage