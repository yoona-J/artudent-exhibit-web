import React, { useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comments(props) {
    // console.log('2nd>>>>', props)
    const [commentValue, setcommentValue] = useState("")
    const user = useSelector(state => state.user)

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.postId,
        }
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                    console.log(response.data.result)
                }else {
                    alert('커멘트를 저장하지 못했습니다.')
                }
            })
        }

  return (
    <div>
        <br />
        <p> Replies </p>
        <hr />
        
        {/* Comment Lists */}
        
        {props.CommentLists && props.CommentLists.map((comment, index) => (
            (!comment.responseTo &&
                <React.Fragment key={index}>
                    <SingleComment refreshFunction={props.refreshFunction} postId={props.postId} comment={comment} />
                    <ReplyComment parentCommentId={comment._id} postId={props.postId} CommentLists={props.CommentLists} refreshFunction={props.refreshFunction} />
                </React.Fragment>
        )))}
        {/* {
            props.CommentLists.filter(cmt => !(cmt.responseTo)).map((cmt, idx) => {
                // console.log(`>>`, cmt)
                return <SingleComment key={idx} postId={props.productId} comment={cmt} />
            })
        } */}

        {/* Root Comment Form */}
        <hr />
        <form style= {{ display: 'flex', padding: '20px 0px 0px 0px' }} onSubmit={onSubmit} >
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
