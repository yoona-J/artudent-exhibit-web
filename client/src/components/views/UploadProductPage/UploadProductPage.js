import React, {useState} from 'react'
import {Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {TextArea} = Input;

const Continents = [
    {
        key: 1,
        value: "Africa"
    }, {
        key: 2,
        value: "Europe"
    }, {
        key: 3,
        value: "Asia"
    }, {
        key: 4,
        value: "North America"
    }, {
        key: 5,
        value: "South America"
    }, {
        key: 6,
        value: "Australia"
    }, {
        key: 7,
        value: "Antarctica"
    }
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    //입력 가능하게 진행
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }
    //FileUpload.js에서 이미지 정보를 가져온다
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const submitHandler = (event) => {
        //페이지 리프레시 방지
        event.preventDefault();
        //모든 state가 채워지지 않으면 리턴되지 않도록 함
        if (!Title || !Description || !Price || !Continent || !Images) {
            return alert ("모든 값을 넣어주세요.")
        }

        //서버에 채운 값들을 req로 보낸다.
        const body = {
            //writer -> 로그인한 사람의 id - auth.js에 있는 user 정보를 가져온다
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }
        
        console.log('body', body)

        Axios.post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공했습니다.')
                    //상품 업로드에 성공하면 바로 메인 페이지로 넘어가게 한다
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패했습니다.')
                }
            })
    }

    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '2rem auto'
            }}>
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>
                <h2>여행 상품 업로드</h2>
                <br/>
                <h4>사진을 클릭하면 삭제됩니다.</h4>
            </div>

            <Form onSubmitCapture={submitHandler}>

                <FileUpload refreshFunction={updateImages}/>

                <br/>
                <br/>
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/>
                <br/>
                <label>가격</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br/>
                <br/>
                <select onChange={continentChangeHandler} value={Continent}>
                    { Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value} </option>
                    )) }
                </select>
                <br/>
                <br/>
                <Button htmlType='submit'>
                    확인
                </Button>

            </Form>
        </div>
    )
}

export default UploadProductPage