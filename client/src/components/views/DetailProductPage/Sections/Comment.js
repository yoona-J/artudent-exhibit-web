import React, { useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comments(props) {
    // console.log('2nd>>>>', props)
    const [commentValue, setcommentValue] = useState("")
    const user = useSelector(state => state.user)

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('>>>>>>>>', props);
        const variables = {
            content: commentValue,
            writer: user.userData._id ,
            postId: props.postId,
        }
        //console.log(variables)
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                }else {
                    alert( '커멘트를 저장하지 못했습니다.')
                }
            })
    }
    // console.log('>>>>>', props.CommentLists)
  return (
    <div>
        <br />
        <p> Replies </p>
        <hr />
        
        {/* Comment Lists */}
        
        {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                <SingleComment key={index} postId={props.postId} comment={comment} />
            )))}
        {/* {
            props.CommentLists.filter(cmt => !(cmt.responseTo)).map((cmt, idx) => {
                // console.log(`>>`, cmt)
                return <SingleComment key={idx} postId={props.productId} comment={cmt} />
            })
        } */}

        {/* Root Comment Form */}

        <form style= {{ display: 'flex '}} onSubmit={onSubmit} >
            <textarea
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleClick}
                value={commentValue}
                placeholder="코멘트를 작성해 주세요"
            />
            <br/>
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
        </form>

    </div>
  )
}

export default Comments
