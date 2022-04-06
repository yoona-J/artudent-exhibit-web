import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Icon, Col, Card, Row, Divider, Pagination} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import { continents } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import SubscribeButton from '../MainPage/img/subscribeButton.png'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(9)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        //나중에는 price 부분이 필요 없음 -> 검색 기능이니까
        continents: [],
        price: []
    })

    const [SearchTerm, setSearchTerm] = useState("")

    //더보기 버튼
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])


    const getProducts = (body) => {
        axios
            .post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    //loadMoreHandler의 body를 가져온다. --> 값이 있으면 skip + Limit 값을 불러와 게시물을 나타낸다
                    if (body.loadMore) {
                        setProducts([
                            ...Products,
                            ...response.data.productInfo
                        ])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품을 가져오는데 실패했습니다.")
                }
            })
    }

    //더보기 버튼 res
    const loadMoreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            // loadMore: true
            loadMore: false
        }

        getProducts(body)
        setSkip(skip)

    }

    const renderCards = Products.map((product, index) => {

        // console.log('product', product)

        return <Col lg={8} md={12} xs={24} key={index}>

            <Card cover={<ImageSlider images = {
                    product.images
                } />}>
                <Meta title={product.title} description={`${product.artist}`}/>
            </Card>

        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    //id의 array가 filters에 담겨 있음.
    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        //checkbox에서 check된 것들을 filters로 가져와 continent에 넣어준다
        newFilters[category] = filters
        showFilteredResults(newFilters)
    }

    //SearchFeaure.js에서 (event.currentTarget.value) <- 이 값을 가져온다
    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
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
                <h1>ARTWORK</h1>
                <Divider />
                <a href="/product/upload">
                    <Icon type="upload" style={{ fontSize: '50px' }}></Icon>
                </a>
            </div>

            {/* Search */}

            <div>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>
            
            {/* filter */}

            {/* checkbox */}
                <Checkbox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
                <br />

            {/* radiobox */}

            {/* Cards */}

            <Row gutter={[50, 50]}>
                {renderCards}
            </Row>

            {/* db에 있는 게시물이 모두 나타나면 더보기 버튼을 삭제 - PostSize >= Limit &&  */}
            <br/> 
            <br/>
            {
                <div style={{
                            // display: 'flex',
                            // justifyContent: 'center',
                            width: '100%',
                            textAlign: 'center'
                        }}
                        >
                        {/* <button onClick={loadMoreHandler}>더보기</button> */}
                        {/* 1페이지로 다시 돌아가는 경우도 설정해야 함 */}
                        <Pagination onChange={loadMoreHandler} total={50} />
                    </div>
            }
            <br />
            <br />
            <div style={{textAlign: 'center'}}>
            <img
                    src={SubscribeButton}
                    style={{
                        width: '45%',
                        padding: '80px 0px 20px 0px'
                    }}></img>
                <h5
                    style={{
                        padding: '0px 0px 100px 0px'
                    }}>나만의 온라인 전시회 페이지를 직접 신청해보세요.</h5>
            </div>

        </div>
    )
}

export default LandingPage
