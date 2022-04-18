import React, {useEffect, useState} from 'react'
import axios from "axios";
import {
    Icon,
    Col,
    Card,
    Row,
    Divider,
    Pagination,
} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import {continents} from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import SubscribeButton from '../MainPage/img/subscribeButton.png'
import Artwork from './img/artwork.png';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(9)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: []
    })

    const [SearchTerm, setSearchTerm] = useState("")

    //paginational
    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    //loadMore
    const getProducts = (body) => {
        axios
            .post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data) 
                    
                    console.log('loadmore=', body.loadMore)
                    // loadMoreHandler의 body를 가져온다. --> 값이 있으면 skip +
                    // Limit 값을 불러와 게시물을 나타낸다
                    if (body.loadMore) {
                        setProducts([
                            ...Products,
                            ...response.data.productInfo
                        ])
                    } 
                    else {
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
            loadMore: true
            // loadMore: false
        }

        getProducts(body)
        setSkip(skip)

    }

    const renderCards = Products.map((product, index) => {

        // console.log('product', product)

        return <Col lg={8} md={12} xs={24} key={index}>

            <Card
                cover={<ImageSlider images = {
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

        const newFilters = {
            ...Filters
        }

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
        <div>
            <img
                src={Artwork}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '560px',
                    top: '50px',
                    zIndex: 1
                }}></img>
            <div
                style={{
                    width: '60%',
                    margin: '3rem auto'
                }}>
                <div
                    style={{
                        textAlign: 'center'
                    }}>
                    <h1
                        style={{
                            position: 'relative',
                            padding: '100px 0px 0px 0px',
                            color: '#FFF',
                            zIndex: 10
                        }}>ARTWORK</h1>
                    <div
                        style={{
                            position: 'relative',
                            width: '50%',
                            margin: '1rem auto',
                            zIndex: 10
                        }}>
                        <Divider/>
                        <a
                            href="/product/upload"
                            style={{
                                color: 'white'
                            }}>
                            <Icon
                                type="upload"
                                style={{
                                    padding: '30px 0px 20px 0px',
                                    fontSize: '50px',
                                }}></Icon>
                        </a>
                    </div>
                </div>

                {/* Search */}

                <div
                    style={{
                        position: 'relative',
                        padding: '0px 0px 120px 0px',
                        zIndex: 10
                    }}>
                    <SearchFeature refreshFunction={updateSearchTerm}/>
                </div>

                {/* filter */}

                {/* checkbox */}
                {/* https://ant.design/components/tag/ */}
                <div
                    style={{
                        position: 'relative',
                        padding: '0px 0px 30px 0px',
                        zIndex: 10
                    }}>
                    <Checkbox
                        list={continents}
                        handleFilters={filters => handleFilters(filters, "continents")}/>
                </div>
                <br/>

                {/* Cards */}

                <Row gutter={[50, 50]}>
                    {renderCards}
                </Row>
                <br/>
                <br/> {PostSize >= Limit && (
                    <div
                            style={{
                                width: '100%',
                                textAlign: 'center'
                            }}>
                            <button onClick={loadMoreHandler}>더보기</button>
                        </div>
                        
                )}
                {/* backTop */}
                {/* https://ant.design/components/back-top/ */}
                <br/>
                <br/>
                <div
                    style={{
                        textAlign: 'center'
                    }}>
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
        </div>
    )
}

export default LandingPage
