import React from 'react'
import MyUpload from './MyUpload/MyUpload'

function Mypage() {
    return (
        <div
            style={{
                width: '60%',
                margin: '3rem auto'
            }}>
            <div style={{
                    textAlign: 'center'
                }}>
                <h2>MyPage</h2>

                <button>
                    <a href='/myupload/:userId'>MyUpload</a>
                </button>
            </div>
        </div>
    )
}

export default Mypage