import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});
export const fetchPosts = () => API.get('/posts');
export const createPost= (newPost) =>API.post('/posts', newPost)
export const updatePost=(currentId, updatedPost)=>API.patch(`${'/posts'}/${currentId}`, updatedPost);
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`)
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);
export const signIn=(formData)=>API.post('/users/signin', formData)
export const signUp=(formData)=>API.post('/users/signup', formData)
export const fetchPost=(id)=>{
  console.log(id)
  API.get(`/posts/${id}`, id)
}
export const comment=(id, comment)=>{
  console.log(id)
  API.patch(`posts/comment/${id}`, comment)
}