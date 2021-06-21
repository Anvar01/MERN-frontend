import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import useStyles from './styles';
import FileBase from 'react-file-base64'
import {createPost, updatePost} from '../../actions/posts'
import {useDispatch, useSelector} from 'react-redux'

const Form = ({currentId, setCurrentId}) =>{
const [postData, setPostData] = useState({
    title:'',
    message:'',
    price:'',
    tags:'',
    selectedfile:''
})
const post = useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null)
console.log(post)
const user = JSON.parse(localStorage.getItem('profile'))
const [priceIsNumber, setPriceIsNumber]= useState(true)
useEffect(()=>{
    if(post) 
        setPostData(post);
}, [post])

const dispatch= useDispatch();
const classes = useStyles();

const clear=()=>{
    setCurrentId(null)
    setPostData(
        {
        title:'',
        message:'',
        price:'',
        tags:'',
        selectedfile:''
        }
    )
}

const handleSubmit=(e)=>{
    e.preventDefault();
    if(isNaN(postData.price)){
        setPriceIsNumber(false)
        return
    }
    if(currentId){
        dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
    }
    else
        dispatch(createPost({...postData, name: user?.result?.name}))
    
    clear()
    }
    

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'}</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message: e.target.value})}/>
                <TextField name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e)=>setPostData({...postData, price: e.target.value})}/>
                {!priceIsNumber && <Typography>Price should be a number!</Typography>}
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type ="file" multiple={false} onDone={({base64})=>setPostData({...postData, selectedFile: base64})} />
                </div>
                <Button className = {classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                
            </form>
        </Paper>
    );
}

export default Form;