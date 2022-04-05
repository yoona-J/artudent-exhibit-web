import React, {useState} from 'react'
import {Button, Divider, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import {Select} from 'antd';

const {Option} = Select;
const {TextArea} = Input;

const Continents = [
    {
        key: 1,
        value: "일러스트"
    }, {
        key: 2,
        value: "도예/조각"
    }, {
        key: 3,
        value: "회화/판화"
    }, {
        key: 4,
        value: "조형"
    }, {
        key: 5,
        value: "가구 디자인"
    }, {
        key: 6,
        value: "미디어 아트"
    }, {
        key: 7,
        value: "사진"
    }
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Artist, setArtist] = useState("")
    const [Tech, setTech] = useState("")
    const [Dimensions, setDimensions] = useState("")
    const [Year, setYear] = useState("")
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    //입력 가능하게 진행
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const artistChangeHandler = (event) => {
        setArtist(event.currentTarget.value)
    }
    const techChangeHandler = (event) => {
        setTech(event.currentTarget.value)
    }
    const dimensionsChangeHandler = (event) => {
        setDimensions(event.currentTarget.value)
    }
    const yearChangeHandler = (event) => {
        setYear(event.currentTarget.value)
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
        if (!Title || !Description || !Artist || !Continent || !Images || !Tech || !Dimensions) {
            return alert("모든 값을 넣어주세요.")
        }

        //서버에 채운 값들을 req로 보낸다.
        const body = {
            //writer -> 로그인한 사람의 id - auth.js에 있는 user 정보를 가져온다
            writer: props.user.userData._id,
            title: Title,
            artist: Artist,
            tech: Tech,
            dimensions: Dimensions,
            year: Year,
            description: Description,
            images: Images,
            continents: Continent
        }

        console.log('body', body)

        Axios
            .post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공했습니다.')
                    //상품 업로드에 성공하면 바로 메인 페이지로 넘어가게 한다
                    props
                        .history
                        .push('/artwork')
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
                <h2>Upload Your Artwork</h2>
                <div
                    style={{
                        width: '50%',
                        margin: '1rem auto'
                    }}>
                    <Divider/>
                </div>
                <h5>반드시 자신이 제작한 작품을 등록해주세요.</h5>
                <h5>타인의 저작권 및 인권을 침해하는 사진을 업로드 시, 불이익을 당할 수 있습니다.</h5>
                <Divider/>
                <h4>사진을 클릭하면 삭제됩니다.</h4>
            </div>

            <Form onSubmitCapture={submitHandler}>

                <FileUpload refreshFunction={updateImages}/>

                <br/>
                <br/>
                <label>Title</label>
                <Input
                    placeholder="작품의 제목을 입력해주세요."
                    onChange={titleChangeHandler}
                    value={Title}/>
                <br/>
                <br/>
                <label>Artist</label>
                <Input
                    placeholder="작가명을 입력해주세요."
                    onChange={artistChangeHandler}
                    value={Artist}/>
                <br/>
                <br/>
                <label>Technique</label>
                <Input
                    placeholder="작품의 소재 또는 기법을 입력해주세요."
                    onChange={techChangeHandler}
                    value={Tech}/>
                <h6>예시) 붓, 물감 / 합성 소재 위 붓 그림.</h6>
                <br/>
                <label>Dimensions</label>
                <Input
                    placeholder="작품 사이즈를 입력해주세요."
                    onChange={dimensionsChangeHandler}
                    value={Dimensions}/>
                <br/>
                <br/>
                <label>Year (숫자만 입력 가능)</label>
                <Input
                    placeholder="작품 제작 년도를 입력해주세요"
                    type="number"
                    onChange={yearChangeHandler}
                    value={Year}/>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    placeholder="작품 설명을 입력해주세요."
                    onChange={descriptionChangeHandler}
                    value={Description}/>
                <br/>
                <br/>
                <label>#Tag
                </label>
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {
                        Continents.map(item => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))
                    }
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