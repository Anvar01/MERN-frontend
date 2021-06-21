import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import useStyles from '../../Form/styles';
import FileBase from 'react-file-base64'
import {createPost, updatePost, comment, getPosts} from '../../../actions/posts'
import {useDispatch, useSelector} from 'react-redux'

export const Form = ({post}) =>{

    const user = JSON.parse(localStorage.getItem('profile'))
    const [commentData, setCommentData] = useState({
        
        name: user?.result?.name,
        title:'',
        message:'',
        selectedfile:'',
    })




    const dispatch= useDispatch();
    const classes = useStyles();

    const clear=()=>{
        setCommentData(
            {
            name: user?.result?.name,
            title:'',
            message:'',
            selectedfile:''
            }
        )
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(post._id)
        dispatch(comment(post._id, {commentData}))
        clear()
    }



    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={commentData.title} onChange={(e)=>setCommentData({...commentData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={commentData.message} onChange={(e)=>setCommentData({...commentData, message: e.target.value})}/>
                <div className={classes.fileInput}>
                    <FileBase type ="file" multiple={false} onDone={({base64})=>setCommentData({...commentData, selectedFile: base64})} />
                </div>
                <Button className = {classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} >Clear</Button>
                
            </form>
        </Paper>
    );
}
