import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper, borders, Grid, CardMedia} from '@material-ui/core'
import useStyles from '../../Form/styles';
import FileBase from 'react-file-base64'
import {createPost, updatePost} from '../../../actions/posts'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'

export const Comment = ({comment}) =>{
    const classes = useStyles();

    return(
        <Paper className={classes.comment} border={1}>
            <Grid className={classes.commentHeader}display="flex">
                <p>{comment?.name}</p>
                <p>{moment(comment.createdAt).fromNow()}</p>
            </Grid>
                <p>{comment?.title}</p>
                <p>{comment?.message}</p>
                {
                comment.selectedFile &&
                <CardMedia className={classes.media} image={comment.selectedFile}/>
                }  
        </Paper>
    );
}
