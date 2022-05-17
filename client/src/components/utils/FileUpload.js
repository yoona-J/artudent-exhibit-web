import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])
    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append("file", files[0])

        axios
            .post('/api/product/image', formData, config)
            .then(response => {
                //불러오는 사진 정보를 가져온다.
                if (response.data.success) {
                    console.log(response.data)

                    setImages([
                        ...Images,
                        response.data.filePath
                    ])
                    props.refreshFunction([
                        ...Images,
                        response.data.filePath
                    ])

                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })

    }

    const deleteHandler = (image) => {

        const currentIndex = Images.indexOf(image)

        let newImages = [...Images]
        // currentIndex 에서 하나의 index를 지운다 (currentIndex의 index 번호가 부여된 하나를 없앤다.) when we
        // click the image -> the image index have to splice
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)

        // console.log('currentIndex', currentIndex)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
            <Dropzone onDrop={dropHandler}>
                {
                    ({getRootProps, getInputProps}) => (
                        <div
                            style={{
                                width: 300,
                                height: 240,
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon
                                type="plus"
                                style={{
                                    fontSize: '3rem'
                                }}/>
                        </div>
                    )
                }
            </Dropzone>

            <div
                style={{
                    display: 'flex',
                    width: '350px',
                    height: '240px',
                    overflowX: 'scroll'
                }}>

                {
                    Images.map((image, index) => (
                        <div onClick={() => deleteHandler(image)} key={index}>
                            <img
                                style={{
                                    minWidth: '300px',
                                    width: '300px',
                                    height: '240px'
                                }}
                                alt='img'
                                src={`http://localhost:5000/${image}`}/>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default FileUpload