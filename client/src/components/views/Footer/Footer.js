import React from 'react'
import {Icon} from 'antd';
import Logo from './img/AA.png';

function Footer() {
    return (
        <div
            style={{
                width: '100%',
                height: '160px',
                display: 'block',
                background: '#7A8095'
            }}>

            <img
                style={{
                    height: '70px',
                    display: 'flex',
                    float: 'left',
                    margin: '45px'
                }}
                src={Logo}
                alt='img'></img>

            <div
                style={{
                    textAlign: 'right',
                    fontSize: '14px',
                    float: 'right',
                    margin: '30px'
                }}>
                <p>고객 문의</p>
                <a href='https://artudent.creatorlink.net/ABOUT' style={{color: 'black'}}>
                    <p>About Artudent</p>
                </a>
                <Icon type="copyright"></Icon>
                COPYRIGHT ALL RIGHT RESERVED
            </div>
        </div>
    )
}

export default Footer
