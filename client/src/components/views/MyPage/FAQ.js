import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `hi`

function FAQ() {
  return (
    <div style={{marginBottom: '30px', textAlign: 'left'}}>
      <Collapse onChange={callback}>
        <Panel header="Q1.0000000000" key="1">
          {text}
        </Panel>
        <Panel header="Q2.0000000000" key="2">
          {text}
        </Panel>
        <Panel header="Q3.0000000000" key="3">
          {text}
        </Panel>
    </Collapse>
    </div>
  )
}

export default FAQ