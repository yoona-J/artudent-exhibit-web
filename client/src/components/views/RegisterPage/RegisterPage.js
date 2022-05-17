import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd';

const {TextArea} = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        // ID: '',
        name: '',
        password: '',
        confirmPassword: '',
        number: '',
        school: '',
        college: '',
        department: '',
        nickname: '',
        sns: '',
        career: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        number: Yup.string()
          .required('Number is required'),
        // ID: Yup.string()
        //   .required('ID is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            // ID: values.ID,
            number: values.number,
            school: values.school,
            college: values.college,
            department: values.department,
            nickname: values.nickname,
            sns: values.sns,
            career: values.career,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              alert("회원가입이 완료되었습니다.")
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="app" style={{ width: '60%', height: '100%', margin: '3rem auto', textAlign: 'center'}}>
            <h2>SIGN UP</h2>
            <div style={{ width: '375px' }}>
            <Divider />
            </div>
            <h5>필수 입력 항목</h5>
            <br />
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              {/* <Form.Item required label="아이디" hasFeedback validateStatus={errors.ID && touched.ID ? "error" : 'success'}>
                <Input
                  id="ID"
                  placeholder="Enter your ID"
                  type="text"
                  value={values.ID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.ID && touched.ID ? 'text-input error' : 'text-input'
                  }
                />
                {errors.ID && touched.ID && (
                  <div className="input-feedback">{errors.ID}</div>
                )}
              </Form.Item> */}

              <Form.Item required label="E-mail" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="연락처">
                <Input
                  id="number"
                  placeholder="Enter your call number"
                  type="text"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.number && touched.number ? 'text-input error' : 'text-input'
                  }
                />
                {errors.number && touched.number && (
                  <div className="input-feedback">{errors.number}</div>
                )}
              </Form.Item>

              <Divider />
              <h5 style={{textAlign: 'center'}}>선택 입력 항목</h5>
              <Form.Item label="학교">
                <Input
                  id="school"
                  placeholder="전체 학교명을 입력하세요"
                  type="text"
                  value={values.school}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item label="단과대">
                <Input
                  id="college"
                  placeholder="단과대를 입력하세요"
                  type="text"
                  value={values.college}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item label="학과">
                <Input
                  id="department"
                  placeholder="학과명을 입력하세요"
                  type="text"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item label="작가명">
                <Input
                  id="nickname"
                  placeholder="작가명을 입력하세요"
                  type="text"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item label="SNS 계정">
                <Input
                  id="sns"
                  placeholder="SNS 계정 주소를 입력하세요"
                  type="text"
                  value={values.sns}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item label="경력">
                <TextArea
                  id="career"
                  placeholder="경력을 입력하세요"
                  value={values.career}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
