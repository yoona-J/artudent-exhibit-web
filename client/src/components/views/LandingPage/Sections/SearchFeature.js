import React, {useState} from 'react'
import {Input} from 'antd';

const { Search } = Input;
const onSearch = value => console.log(value);

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)

        console.log('e', event.currentTarget.value)
    }

    return (
        <div>
            <br/>
            <div>
                <Search
                    placeholder="input search text"
                    onChange={searchHandler}
                    value={SearchTerm}/>
            </div>
        </div>
    )
}


export default SearchFeature