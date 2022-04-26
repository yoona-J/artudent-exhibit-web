import React, {useState} from 'react'
import {Input} from 'antd';

const { Search } = Input;
// const onSearch = value => console.log(value);

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)

        // console.log('e', event.currentTarget.value)
    }

    return (
        <div>
            <br/>
            <div>
                <Search
                    placeholder="제목 또는 작가명을 검색하세요"
                    onChange={searchHandler}
                    value={SearchTerm}/>
            </div>
        </div>
    )
}


export default SearchFeature