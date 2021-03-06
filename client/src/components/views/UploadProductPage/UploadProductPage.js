import React, {useState} from 'react'
import {
    Button,
    Divider,
    Form,
    Input,
    Radio,
    Modal
} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import {Select} from 'antd';
import Upload from './img/upload.png'

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
    const [Continent, setContinent] = useState([])
    const [Images, setImages] = useState([])
    const [SNS, setSNS] = useState(true)
    const [IsModal, setIsModal] = useState(false)
    const [PersonalInfo, setPersonalInfo] = useState(true)

    //모두 다 모달창
    const showModal = () => {
        setIsModal(true);
    };

    const handleOk = () => {
        setIsModal(false);
    };

    const handleCancel = () => {
        setIsModal(false);
    };

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
    const continentChangeHandler = (value) => {
        setContinent(value)

        // console.log(`selected ${value}`);
    }
    const snsCheckedHandler = (event) => {
        // console.log(event.target.checked, event.target.value)
        setSNS(event.target.value)
    }
    const modalCheckedHandler = (event) => {
        setPersonalInfo(event.target.value)
    }
    //FileUpload.js에서 이미지 정보를 가져온다
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const submitHandler = (event) => {
        //페이지 리프레시 방지
        event.preventDefault();
        //모든 state가 채워지지 않으면 리턴되지 않도록 함
        if (!Title || !Description || !Artist || !Images || !Tech || !Dimensions || !Continent) {
            return alert("모든 값을 넣어주세요.")
        }
        if (PersonalInfo === false) {
            return alert("개인정보이용에 동의하지 않으시면 게시물을 업로드하실 수 없습니다.")
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
            continents: Continent,
            snsCheck: SNS,
            personalInfo: PersonalInfo
        }

        // console.log('body', body)

        Axios
            .post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert('작품 업로드에 성공했습니다.')
                    //상품 업로드에 성공하면 바로 메인 페이지로 넘어가게 한다
                    props
                        .history
                        .push('/artwork')
                } else {
                    alert('작품 업로드에 실패했습니다.')
                }
            })
    }

    console.log('checked=', SNS)
    console.log('checked=', PersonalInfo)

    return (
        <div>
            <img
                src={Upload}
                alt='img'
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: '50px',
                    zIndex: 1
                }}></img>
            <div
                style={{
                    position: 'relative',
                    maxWidth: '700px',
                    margin: '2rem auto',
                    zIndex: 10
                }}>
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                    <h1
                        style={{
                            position: 'relative',
                            padding: '180px 0px 0px 0px',
                            color: '#fff',
                            zIndex: 10
                        }}>Upload Your Artwork</h1>
                    <div
                        style={{
                            position: 'relative',
                            width: '50%',
                            margin: '1rem auto'
                        }}>
                        <Divider/>
                    </div>
                    <h5
                        style={{
                            color: '#fff'
                        }}>반드시 자신이 제작한 작품을 등록해주세요.</h5>
                    <h5
                        style={{
                            color: '#fff'
                        }}>타인의 저작권 및 인권을 침해하는 사진을 업로드 시, 불이익을 당할 수 있습니다.</h5>
                    <h4
                        style={{
                            padding: '180px 0px 0px 0px'
                        }}>사진을 클릭하면 삭제됩니다.</h4>
                </div>

                <Form onSubmitCapture={submitHandler}>

                    <FileUpload refreshFunction={updateImages}/>

                    <div
                        style={{
                            padding: '50px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>Title</h3>
                    </div>
                    <Input
                        placeholder="작품의 제목을 입력해주세요."
                        onChange={titleChangeHandler}
                        value={Title}
                        style={{
                            height: '50px',
                            boxShadow: '5px 5px 5px #e5e5e5'
                        }}/>

                    <div
                        style={{
                            padding: '50px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>Artist</h3>
                    </div>
                    <Input
                        placeholder="작가명을 입력해주세요."
                        onChange={artistChangeHandler}
                        value={Artist}
                        style={{
                            height: '50px',
                            boxShadow: '5px 5px 5px #e5e5e5'
                        }}/>

                    <div
                        style={{
                            padding: '50px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>Technique</h3>
                    </div>
                    <Input
                        placeholder="작품의 소재 또는 기법을 입력해주세요."
                        onChange={techChangeHandler}
                        value={Tech}
                        style={{
                            height: '50px',
                            boxShadow: '5px 5px 5px #e5e5e5'
                        }}/>
                    <h5
                        style={{
                            padding: '15px 0px 0px 0px',
                            color: '#c4c4c4'
                        }}>예시) 붓, 물감 / 합성 소재 위 붓 그림.</h5>

                    <div
                        style={{
                            padding: '30px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>Dimensions</h3>
                    </div>
                    <Input
                        placeholder="작품 사이즈를 입력해주세요."
                        onChange={dimensionsChangeHandler}
                        value={Dimensions}
                        style={{
                            height: '50px',
                            boxShadow: '5px 5px 5px #e5e5e5'
                        }}/>

                    <div
                        style={{
                            padding: '50px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>Year</h3>
                    </div>
                    <Input
                        placeholder="작품 제작 년도를 입력해주세요"
                        type="number"
                        onChange={yearChangeHandler}
                        value={Year}
                        style={{
                            height: '50px',
                            boxShadow: '5px 5px 5px #e5e5e5'
                        }}/>

                    <div
                        style={{
                            padding: '50px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>Description</h3>
                    </div>
                    <TextArea
                        placeholder="작품 설명을 입력해주세요."
                        onChange={descriptionChangeHandler}
                        value={Description}
                        style={{
                            height: '200px',
                            boxShadow: '5px 5px 5px #e5e5e5'
                        }}/>

                    <div
                        style={{
                            padding: '50px 0px 0px 0px'
                        }}>
                        <h3
                            style={{
                                textDecoration: 'underline',
                                textUnderlinePosition: 'under'
                            }}>#Tag</h3>
                    </div>

                    <Select onChange={continentChangeHandler} value={Continent}>
                        {
                            Continents.map(item => (
                                <Option key={item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))
                        }
                    </Select>

                    <h3
                        style={{
                            padding: '50px 0px 0px 0px',
                            textDecoration: 'underline',
                            textUnderlinePosition: 'under'
                        }}>SNS 홍보 동의</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '100px',
                            boxShadow: '5px 5px 25px 10px #e5e5e5',
                            textAlign: 'center'
                        }}>
                        <h4
                            style={{
                                padding: '22px 0px 0px 0px',
                                color: 'gray'
                            }}>동의할 시, 해당 작품의 이미지 및 정보, 작가 정보가</h4>
                        <h4
                            style={{
                                color: 'gray'
                            }}>Artudent 인스타그램 계정에 홍보용으로 업로드 될 수 있습니다.</h4>
                    </div>
                    <div
                        style={{
                            padding: '30px 0px 0px 0px',
                            textAlign: 'center'
                        }}>
                        <Radio.Group onChange={snsCheckedHandler} value={SNS}>
                            <Radio value={true}>동의</Radio>
                            <Radio value={false}>비동의</Radio>
                        </Radio.Group>
                    </div>

                    <br/>
                    <br/>

                    <h3
                        style={{
                            padding: '20px 0px 0px 0px',
                            textDecoration: 'underline',
                            textUnderlinePosition: 'under'
                        }}>개인정보 수집 및 이용 동의</h3>
                    <div
                        style={{
                            width: '100%',
                            height: '100px',
                            boxShadow: '5px 5px 25px 10px #e5e5e5',
                            textAlign: 'center'
                        }}>
                        <h4
                            style={{
                                padding: '22px 0px 0px 0px',
                                color: 'gray'
                            }}>개인정보 처리방침</h4>
                        <Button type="ghost" onClick={showModal}>
                            더보기
                        </Button>
                        <Modal
                            title="Artudent 개인정보처리방침"
                            visible={IsModal}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1000}>
                            <div>
                                <p>&lt; ARTUDENT &gt; (&#39;www.artudent.co.kr&#39;이하 &#39;ARTUDENT&#39;)은(는)
                                    「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과
                                    같이 개인정보 처리방침을 수립·공개합니다.</p>
                                <p>○ 이 개인정보처리방침은 2021년 7월 01일부터 적용됩니다.</p>
                                <p>제1조(개인정보의 처리 목적)</p>
                                <p>&lt; ARTUDENT &gt; (&#39;www.artudent.co.kr&#39;이하 &#39;ARTUDENT&#39;)은(는)
                                    다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는
                                    「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                                <ol>
                                    <li>홈페이지 회원가입 및 관리</li>
                                </ol>
                                <p>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 목적으로
                                    개인정보를 처리합니다.</p>
                                <ol>
                                    <li>민원사무 처리</li>
                                </ol>
                                <p>민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.</p>
                                <ol>
                                    <li>재화 또는 서비스 제공</li>
                                </ol>
                                <p>서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산을 목적으로 개인정보를 처리합니다.</p>
                                <ol>
                                    <li>마케팅 및 광고에의 활용</li>
                                </ol>
                                <p>신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및
                                    광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.</p>
                                <p>제2조(개인정보의 처리 및 보유 기간) ① &lt; ARTUDENT &gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
                                    개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. ② 각각의 개인정보 처리 및 보유 기간은 다음과
                                    같습니다.</p>
                                <p>1.&lt;홈페이지 회원가입 및 관리&gt; &lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터
                                    3년 까지 위 이용목적을 위하여 보유.이용됩니다. 보유근거 : 기간 내 회원정보에 대한 관리 및 신원확인을 하기 위함 관련법령 : 1)신용정보의
                                    수집/처리 및 이용 등에 관한 기록 : 3년 2) 계약 또는 청약철회 등에 관한 기록 : 5년 예외사유 : 회사가 망할 시 즉시폐기, 회원탈퇴
                                    시 6개월 후 폐기 2.&lt;민원사무 처리&gt; &lt;민원사무 처리&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터 3년 까지 위
                                    이용목적을 위하여 보유.이용됩니다. 보유근거 : 기간 내 소비자의 불만 또는 분쟁처리를 하기 위함 관련법령 : 소비자의 불만 또는 분쟁처리에
                                    관한 기록 : 3년 예외사유 : 없음 3.&lt;재화 또는 서비스 제공&gt; &lt;재화 또는 서비스 제공&gt;와 관련한 개인정보는
                                    수집.이용에 관한 동의일로부터 3년 까지 위 이용목적을 위하여 보유.이용됩니다. 보유근거 : 계약 이후 서비스 집행에 따른 기록보유 관련법령 :
                                    1)신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년 2) 계약 또는 청약철회 등에 관한 기록 : 5년 1)대금결제 및 재화 등의 공급에
                                    관한 기록 : 5년 2) 계약 또는 청약철회 등에 관한 기록 : 5년 예외사유 : 없음 4.&lt;마케팅 및 광고에의 활용&gt; &lt;마케팅
                                    및 광고에의 활용&gt;와 관련한 개인정보는 수집.이용에 관한 동의일로부터 1년 까지 위 이용목적을 위하여 보유.이용됩니다. 보유근거 : 마케팅
                                    및 서비스 참여 정보 제공 관련법령 : 표시/광고에 관한 기록 : 6개월 예외사유 : 없음</p>
                                <p>제3조(개인정보의 제3자 제공) ① &lt; ARTUDENT &gt;은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위
                                    내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
                                    제공합니다. ② ARTUDENT 은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
                                <ol>
                                    <li>&lt;전시회 참가 시 전시회 운영 주체 및 담당자&gt; 개인정보를 제공받는 자 : 전시회 참가 시 전시회 운영 주체 및 담당자
                                        제공받는 자의 개인정보 이용목적 : 성별, 이름, 직업, 학교, 학과, 작품사진, 재료 등 작품정보 제공받는 자의 보유.이용기간: 전시회 진행
                                        기간</li>
                                    <li>&lt;시장조사 용역업체&gt; 개인정보를 제공받는 자 : 시장조사 용역업체 제공받는 자의 개인정보 이용목적 : 성별, 직업, 서비스
                                        이용 기록, 접속 로그, 쿠키, 결제기록, , 작품종류, 학교, 학과 제공받는 자의 보유.이용기간: 회원 탈퇴 후 1년</li>
                                </ol>
                                <p>제4조(개인정보처리 위탁)</p>
                                <p>① &lt; ARTUDENT &gt;은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                                <ol>
                                    <li>&lt;없음&gt; 위탁받는 자 (수탁자) : 없음 위탁하는 업무의 내용 : 위탁기간 : ② 은(는) 위탁계약 체결시 「개인정보 보호법」
                                        제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에
                                        관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</li>
                                </ol>
                                <p>③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
                                <p>제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)</p>
                                <p>① 정보주체는 ARTUDENT에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                                <p>② 제1항에 따른 권리 행사는ARTUDENT에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX)
                                    등을 통하여 하실 수 있으며 ARTUDENT은(는) 이에 대해 지체 없이 조치하겠습니다.</p>
                                <p>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리
                                    방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
                                <p>④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</p>
                                <p>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p>
                                <p>⑥ ARTUDENT은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나
                                    정당한 대리인인지를 확인합니다.</p>
                                <p>제6조(처리하는 개인정보의 항목 작성)</p>
                                <p>① &lt; ARTUDENT &gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p>
                                <p>1&lt; 홈페이지 회원가입 및 관리 &gt; 필수항목 : 이메일, 휴대전화번호, 성별, 이름, 서비스 이용 기록, 접속 로그, 쿠키,
                                    결제기록, 학교정보, 작가정보 선택항목 : 2&lt; 민원사무 처리 &gt; 필수항목 : 이메일, 휴대전화번호, 성별, 이름, 서비스 이용 기록
                                    선택항목 : 3&lt; 재화 또는 서비스 제공 &gt; 필수항목 : 성별, 이름, 서비스 이용 기록, 접속 로그, 쿠키, 결제기록 선택항목 :
                                    4&lt; 마케팅 및 광고에의 활용 &gt; 필수항목 : 이메일, 휴대전화번호, 성별, 생년월일, 이름, 서비스 이용 기록, 접속 로그 선택항목
                                    :</p>
                                <p>제7조(개인정보의 파기)</p>
                                <p>① &lt; ARTUDENT &gt; 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이
                                    해당 개인정보를 파기합니다.</p>
                                <p>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야
                                    하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
                                <ol>
                                    <li>법령 근거 :</li>
                                    <li>보존하는 개인정보 항목 : 계좌정보, 거래날짜</li>
                                </ol>
                                <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
                                <ol>
                                    <li>
                                        <p>파기절차 &lt; ARTUDENT &gt; 은(는) 파기 사유가 발생한 개인정보를 선정하고, &lt; ARTUDENT &gt; 의 개인정보
                                            보호책임자의 승인을 받아 개인정보를 파기합니다.</p>
                                    </li>
                                    <li>
                                        <p>파기방법</p>
                                    </li>
                                </ol>
                                <p>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다</p>
                                <p>제8조(개인정보의 안전성 확보 조치)</p>
                                <p>&lt; ARTUDENT &gt;은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                                <ol>
                                    <li>
                                        <p>개인정보 취급 직원의 최소화 및 교육 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고
                                            있습니다.</p>
                                    </li>
                                    <li>
                                        <p>내부관리계획의 수립 및 시행 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</p>
                                    </li>
                                    <li>
                                        <p>접속기록의 보관 및 위변조 방지 개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난,
                                            분실되지 않도록 보안기능 사용하고 있습니다.</p>
                                    </li>
                                    <li>
                                        <p>개인정보에 대한 접근 제한 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를
                                            위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p>
                                    </li>
                                    <li>
                                        <p>문서보안을 위한 잠금장치 사용 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</p>
                                    </li>
                                    <li>
                                        <p>비인가자에 대한 출입 통제 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</p>
                                    </li>
                                </ol>
                                <p>제9조(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)</p>
                                <p>ARTUDENT 은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.</p>
                                <p>제10조 (개인정보 보호책임자)</p>
                                <p>① ARTUDENT 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                                    위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                                <ul>
                                    <li>
                                        <p>개인정보 보호책임자 성명 :허지민 직책 :팀장 직급 :팀장 연락이메일 : jmking0428@naver.com ※ 개인정보 보호 담당부서로
                                            연결됩니다.</p>
                                    </li>
                                    <li>
                                        <p>개인정보 보호 담당부서 부서명 :기획팀 담당자 :허지민 연락이메일 : jmking0428@naver.com ② 정보주체께서는
                                            ARTUDENT 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
                                            보호책임자 및 담당부서로 문의하실 수 있습니다. ARTUDENT 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>
                                    </li>
                                </ul>
                                <p>제11조(개인정보 열람청구) 정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 은(는)
                                    정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>
                                <ul>
                                    <li>개인정보 열람청구 접수·처리 부서 부서명 : 기획팀 담당자 : 허지민 연락처 : 010-4704-1074,
                                        jmking0428@naver.com,</li>
                                </ul>
                                <p>제12조(권익침해 구제방법)</p>
                                <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을
                                    신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</p>
                                <ol>
                                    <li>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                                    <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
                                    <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
                                    <li>경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)</li>
                                </ol>
                                <p>「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대
                                    하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수
                                    있습니다.</p>
                                <p>※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</p>
                                <p>제13조(개인정보 처리방침 변경)</p>
                                <p>① 이 개인정보처리방침은 2021년 7월 17일부터 적용됩니다.
                                </p>
                            </div>
                        </Modal>
                    </div>
                    <div
                        style={{
                            padding: '30px 0px 0px 0px',
                            textAlign: 'center'
                        }}>
                        <Radio.Group onChange={modalCheckedHandler} value={PersonalInfo}>
                            <Radio value={true}>동의</Radio>
                            <Radio value={false}>비동의</Radio>
                        </Radio.Group>
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '50px 0px 100px 0px'
                        }}>
                        <div
                            style={{
                                float: 'left',
                                marginLeft: '250px'
                            }}>
                            <Button type="ghost" htmlType='submit'>
                                등록
                            </Button>
                        </div>
                        <div
                            style={{
                                float: 'right',
                                marginRight: '250px'
                            }}>
                            <Button type="ghost">
                                <a href={`/artwork`}>
                                    취소
                                </a>
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default UploadProductPage
