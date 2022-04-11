import React from 'react'
import LibraryImg from './img/library.jpg';

function Library() {
    return (
        <div>
            <img
                src={LibraryImg}
                style={{
                    width: '100%',
                    height: '560px'
                }}></img>
            <div
                style={{
                    width: '60%',
                    margin: '3rem auto'
                }}>
                <div
                    style={{
                        textAlign: 'center'
                    }}>
                    <h1>LIBRARY</h1>
                </div>
            </div>
        </div>
    )
}

export default Library