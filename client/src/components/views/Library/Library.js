import React from 'react'
import LibraryImg from './img/library.png';

function Library() {
    return (
        <div>
            <img
                src={LibraryImg}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '560px',
                    zIndex: 1
                }}></img>
            <div
                style={{
                    position: 'relative',
                    width: '60%',
                    margin: '3rem auto',
                    zIndex: 10
                }}>
                <div
                    style={{
                        textAlign: 'center'
                    }}>
                    <h1 
                        style={{
                            position: 'relative',
                            padding: '100px 0px 0px 0px',
                            color: '#fff',
                            zIndex: 10}}>
                                LIBRARY</h1>
                </div>
            </div>
        </div>
    )
}

export default Library