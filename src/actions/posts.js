import * as api from '../api'
import {FETCH_ALL, FETCH, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'


export const getPosts = () => async(dispatch)=>{
    console.log('actions')
    try{
        const {data} = await api.fetchPosts();
        console.log(data)
        dispatch({type: FETCH_ALL, payload: data});
    }
    catch(error){
        console.log(error.message)
    }
    
}


export const getPost = (id) => async(dispatch)=>{
    console.log(id)
    try{
        const {data} = await api.fetchPost(id);
        console.log(data)
        dispatch({type: FETCH, payload: data});
    }
    catch(error){
        console.log(error.message)
    }
    
}


export const createPost = (post) => async(dispatch)=>{
    try{
        const{data} = await api.createPost(post);

        dispatch({ type:CREATE, payload: data })
    }
    catch(error){
        console.log(error);
    }
}

export const updatePost =(id, post) => async(dispatch)=>{

    console.log(post)
    try{
        const{data} = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
    }
    catch(error){
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch)=>{
    try{
        await api.deletePost(id)

        dispatch({type: DELETE, payload: id})
    }
    catch(error){
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch)=>{
    try{
        console.log(id)
        const {data} = await api.likePost(id)
        dispatch({ type: LIKE, payload: data });
    }
    catch(error){
        console.log(error)
    }
}

export const comment = (id, comment) => async(dispatch)=>{
    try{
        console.log(id)
        await api.comment(id, comment)
        console.log(comment)
        dispatch({ type: 'COMMENT', payload: comment });
    }
    catch(error){
        console.log(error)
    }

}