import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

function FAQ() {
  return (
    <div style={{marginBottom: '30px', textAlign: 'left'}}>
      <Collapse onChange={callback}>
        <Panel header="Q1.아이디 또는 비밀번호를 잊어먹은 경우에는 어떻게 해야 하나요?" key="1">
          <p />A1. 아직 테스터 기간이기 때문에 아이디/비밀번호 찾기 기능이 없습니다.
          <p />테스트 기간까지는 master@artudent.co.kr 메일로 등록 시 입력하신 전화번호와 성함을 알려주시면 빠른 시일 내로 처리를 도와드리겠습니다.
          <p />감사합니다.
        </Panel>
        <Panel header="Q2.온라인 전시 신청을 하고 싶은데 어떻게 해야 하나요?" key="2">
          <p />A2. 온라인 전시 신청은 하단의 온라인 전시 신청 버튼을 눌러 입력 폼을 입력해주세요.
          <p />확인 후 빠른 시일 내로 입력하신 연락처로 연락 드리겠습니다.
          <p />감사합니다.
        </Panel>
        <Panel header="Q3.작품 및 댓글 삭제나 수정은 어떻게 해야 하나요?" key="3">
          <p />A3. 해당 기능은 아직 테스터 기간이기 때문에 수정/삭제 기능이 없습니다.
          <p />해당 기능은 구현 중에 있으며, 구현 전에 수정 또는 삭제가 필요하신 경우에는 
          <p />master@artudent.co.kr 로 해당 댓글 내용 또는 글 제목, 작성자 이름을 알려주시면 빠른 시일 내 처리를 도와드리겠습니다.
          <p />감사합니다.
        </Panel>
        <Panel header="Q4.회원 탈퇴를 하고 싶은데, 어떻게 해야 하나요?" key="4">
          <p />A4. 해당 기능은 아직 테스터 기간이기 때문에 탈퇴 기능이 없습니다.
          <p />해당 기능은 구현 중에 있으며, 탈퇴를 원하시는 분께서는
          <p />master@artudent.co.kr로 아이디와 성함 알려주시면 빠른 시일 내 처리를 도와드리겠습니다.
          <p />감사합니다.
        </Panel>
    </Collapse>
    </div>
  )
}

export default FAQ