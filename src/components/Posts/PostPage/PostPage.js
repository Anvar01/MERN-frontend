import React, {useEffect} from 'react';
import './styles.css';
import useStyles from '../Post/styles';
import {getPosts} from '../../../actions/posts'
import {Card, CardActions, CardContent, CardMedia, Button, Typography, CircularProgress} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {Form} from './commentForm'
import {Comment} from './comment'

const PostPage = (props, setCurrentId) =>{
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
}, [ dispatch]);

    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'));
    const posts = useSelector((state)=>state.posts);
    //console.log(posts)
    const post = posts.filter((item)=>item._id===props.match.params.id)
    console.log(post)
    return(
        <div>
          <div className="app">
          {
            post.map(item =>(
              <div className="details" key={item._id}>
                <div className="big-img">
                <img src={item.selectedFile}/>
                </div>
                <div className="box">
                  <div className="row">
                    <h2>{item.title}</h2>
                    <span>{item.price?`$${item.price}`:`free`}</span>
                  </div>
                  <div>
                    {Array.from(item.tags).map((tag)=>`#${tag}`)}
                    </div>
                  <p>{item.message}</p>
                  <p>{item.content}</p>
  
                  <button className="cart">Add to cart</button>
  
                </div>
              </div>
            ))
          }
          </div>
          <div className="app">
            <h1>Questions:</h1>
          </div>
          {user &&
          <div>
            <Form post={post[0]}/>
          </div>
          }
          <div>
            {console.log(post)}
          {
          
          !post.length?<CircularProgress/>:(
            post[0] &&
            
            post[0]?.questions?.map(item =>(
              <Comment comment = {item}/>
            ))
          )
          }
          </div>
        </div>
        
      );
}

export default PostPage;