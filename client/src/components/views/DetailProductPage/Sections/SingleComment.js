import React, {useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
// import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function SingleComment(props) {
    // console.log('>>>>>>>>', props.postId);
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickOpenReply = () => {
        setOpenReply(!OpenReply)
    }

    // const onDeleteComment = (targetedCommentId) => {
    //     let confirmRes = window.confirm('정말 이 댓글을 삭제하시겠습니까?')

    //     if (confirmRes) {
    //         const variables = {
    //             commentId: targetedCommentId
    //         }

    //         Axios.post('', variables)
    //             .then(response => {
    //                 if (response.data.success) {
    //                     props.refreshDeleteFunction(response.data.deleteCommentId)
    //                 } else {
    //                     alert('댓글 지우기를 실패했습니다.')
    //                 }
    //             })
    //     }
    // }

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        //새로 고침이 되지 않게 함
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
                setCommentValue("")
            } else {
                alert('로그인 후 댓글 작성이 가능합니다.')
            }
        })

    }

    // 대댓글 나오게 하는 기능
    const actions = [
        <>
            <span onClick={onClickOpenReply} key="comment-basic-reply-to">Reply to</span>
            {/* <span onClick={ () => onDeleteComment (props.comment._id) }><DeleteOutlined /></span> */}
        </>
    ]
    // console.log('>>>>', props)
    

     return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
        
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
                </form>
            }
        </div>
  )
}

export default SingleComment