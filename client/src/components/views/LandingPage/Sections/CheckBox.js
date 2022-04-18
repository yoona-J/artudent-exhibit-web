import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    //체크한 체크박스 정보를 받아온다
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        //누른 것의 index를 구하고
        const currentIndex = Checked.indexOf(value)

        //전체 checked된 state에서 현재 누른 Checkbox가 이미 있다면
        const newChecked = [...Checked]

        //state에 넣어준다
        if (currentIndex === -1) {
            newChecked.push(value)
        }
        //빼주고 
        else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox style={{margin: '10px'}} onChange={() => handleToggle(value._id)} 
                checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{ value.name }</span>
        </React.Fragment>
    ))


    return (
        <div>
            <br />
            <Collapse defaultActiveKey={['1']}>
                <Panel header="art filter" key="1">
                    { renderCheckboxLists() }
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox