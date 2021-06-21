import React,{useState} from 'react'
import {Avatar, Button, Paper,Grid, Typography, Container, TextField} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login'
import Icon from './icon'
import useStyles from './styles'
import Input from './input'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {signin, signup} from '../../actions/auth'
const initialState = {
    firstName: '',
    lastName: '',
    email:'',
    password:'',
    confirmPassword:'',
}
const Auth =()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const[showPassword, setShowPassword]= useState(false)
    const [formData, setFormData] = useState(initialState)
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(isSignup){
            if(formData.password!==formData.confirmPassword){
                setPasswordsMatch(false)
                return
            }

            dispatch(signup(formData, history))
        }
        else{
            dispatch(signin(formData, history))
        }
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup)
        setShowPassword(false)
    }
    const GoogleSuccess=async(res)=>{
        const result = res?.profileObj
        const token = res?.tokenId;
        try{
            dispatch({type: 'AUTH', data: {result, token}})
            history.push('/')
        }
        catch(error){
            console.log(error)
        }
    }
    const GoogleFailure=()=>{
        console.log("Google sing in unsuccessful")
    }
    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant ="h5">{isSignup? 'Sign Up': 'Sign in'}</Typography>
                <form className ={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>


                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>

                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text": "password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                            {!passwordsMatch && <Typography>Passwords must match!</Typography>}

                    </Grid>
                    
                    <Button type="submit" fullWidth variant ="contained" color="primary" className={classes.submit}>
                        {isSignup?'Sing up':'Sign in'}
                    </Button>
                    <GoogleLogin
                        clientId=""
                        render={(renderProps)=>(
                            <Button 
                            className={classes.googleButton} 
                            color='primary' fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained">
                                Google Sing In
                            </Button>
                        )}
                        onSuccess={GoogleSuccess}
                        onFailure={GoogleFailure}
                        CookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                                {isSignup? 'Maybe login?': "Wanna Sign Up?"}
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth