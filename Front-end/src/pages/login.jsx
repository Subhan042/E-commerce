import React, { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser } from '../Slices/userSlice';


function login() {
    const [loginEmail,setLoginEmail]= useState('');
    const [loginPassword,setloginPassword] = useState('');

    const [regEmail,setRegEmail]= useState('');
    const [regPassword,setRegPassword] = useState('');
    const [regFname,setRegFname]= useState('');
    const [regLname,setRegLname] = useState('');
    const [regPhno,setRegPhno]= useState('');
    const [regCpassword,setRegCpassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [mode,setMode]=useState('login');
    const [message,SetMessage]=useState('');
    const [error,setError]=useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

   const validation = ()=>{
    const newError ={};

    if(mode === 'login'){
        if(loginEmail===''){
            newError.loginEmail="*Email is required";
        }else if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(loginEmail)){
            newError.loginEmail="*Invalid Email";
        }

        if(loginPassword===''){
            newError.loginPassword="*Password is required";
        }else if(loginPassword.length<8){
            newError.loginPassword="*password must atleast 8 characters"
        }
    }else{
        if (regFname === '') {
            newError.regFname = "*First name is required";
        }

        if (regLname === '') {
            newError.regLname = "*Last name is required";
        }

        if (regEmail === '') {
            newError.regEmail = "*Email is required";
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(regEmail)) {
            newError.regEmail = "*Invalid Email";
        }

        if (regPhno === '') {
            newError.regPhno = "*Phone number is required";
        } else if (!/^\d{10}$/.test(regPhno)) {
            newError.regPhno = "*Phone number must be 10 digits";
        }

        if (regPassword === '') {
            newError.regPassword = "*Password is required";
        } else if (regPassword.length < 8) {
            newError.regPassword = "*Password must be at least 8 characters";
        }

        if (regCpassword === '') {
            newError.regCpassword = "*Please confirm your password";
        } else if (regPassword !== regCpassword) {
            newError.regCpassword = "*Passwords do not match";
        }
        if (!termsAccepted) {
            newError.termsAccepted = "*You must agree to the terms and conditions";
        }


    }
    setError(newError);
    return Object.keys(newError).length === 0;
   }

    async function handleSubmit(e){
        e.preventDefault()
        SetMessage('');
        console.log('hi')
        if(!validation()) return;

        const endpoint = mode==='login'?'/login':'/register';
        const payload = mode === 'login'?
        {loginEmail,loginPassword}:
        {regFname,regLname,regEmail,regPhno,regPassword,regCpassword};

        try {
            console.log("the server has been intiiated")
            const response = await axios.post(`http://localhost:3000${endpoint}`,payload);

            if(response.status === 201 || response.status === 200){
                if(mode === 'register'){
                    setMode('login')
                }else{
                    SetMessage({ text: 'Login successful', type: 'success' });
                setTimeout(() => SetMessage(''), 3000); 
                console.log('received')
                dispatch(addUser(true))
                navigate('/productlist');
                }
            }
        } catch (error) {
           const errorMsg = error.response?.data?.errors?.[0]?.msg;
            SetMessage({ text: errorMsg, type: 'error' });
            setTimeout(() => SetMessage(''), 3000);
        }
    }

    function clearformdata(){
        setLoginEmail('');
        setloginPassword('');
        setRegEmail('');
        setRegPassword('');
        setRegFname('');
        setRegLname('');
        setRegPhno('');
        setRegCpassword('');
        setTermsAccepted(false);
        setError({});
        SetMessage('');
    }

  return (
    <div id='outer'>
        <div id ='container'>
            {mode === 'login'?(
            <div id='login-form'>
                <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input type='text' 
                name='login-email' 
                placeholder='Enter your email'
                value={loginEmail}
                onChange={(e)=>setLoginEmail(e.target.value)}/><br/>
                {error.loginEmail && <span className='error'>{error.loginEmail}</span>}<br/><br/>

                <input type='password' 
                name='login-password' 
                placeholder='Enter your password'
                value={loginPassword}
                onChange={(e)=>setloginPassword(e.target.value)}
                /><br/>{error.loginPassword && <span className='error'>{error.loginPassword}</span>}<br/><br/>

                <a>Forgot password?</a><br/><br/>
                
                <button type='submit'>Login</button>
                {message && (
                 <div className={`fade-message ${message.type}`}>
                 {message.text}
                </div>
                )}
                </form>
                <h3>Don't have an account? <a onClick={()=>{setMode('register'),clearformdata()}}>Signup now</a></h3>

            </div>
            ):(
            <div id='register-form'>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>

                <input type='text' 
                name='reg-fname'
                placeholder='First Name'
                value={regFname}
                onChange={(e)=>setRegFname(e.target.value)}/><br/>
                {error.regFname &&<><span className='error'>{error.regFname}</span><br/></> }<br/>

                <input type='text' 
                name='reg-lname' 
                placeholder='Last Name'
                value={regLname}
                onChange={(e)=>setRegLname(e.target.value)}/><br/>
                {error.regLname && <><span className='error'>{error.regLname}</span><br/></>}<br/>

                <input type='text' 
                name='reg-email' 
                placeholder='Enter your email'
                value={regEmail}
                onChange={(e)=>setRegEmail(e.target.value)}/><br/>
                {error.regEmail && <><span className='error'>{error.regEmail}</span><br/></>}<br/>

                <input type='text'
                 name='reg-phno' 
                 placeholder='Enter your phone number'
                 value={regPhno}
                onChange={(e)=>setRegPhno(e.target.value)}/><br/>
                {error.regPhno && <><span className='error'>{error.regPhno}</span><br/></>}<br/>

                <input type='password' 
                name='reg-password' 
                placeholder='Create Password'
                value={regPassword}
                onChange={(e)=>setRegPassword(e.target.value)}/><br/>
                {error.regPassword && <><span className='error'>{error.regPassword}</span><br/></>}<br/>

                <input type='password' 
                name='reg-cpassword' 
                placeholder='Confirm Password'
                value={regCpassword}
                onChange={(e)=>setRegCpassword(e.target.value)}/><br/>
                {error.regCpassword &&<> <span className='error'>{error.regCpassword}</span><br/></>}<br/>

                <input type='checkbox' 
                id='termsandcondition'
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="termsandcondition">I agree to the terms and conditions</label><br/>
                {error.termsAccepted && <span className='error'>{error.termsAccepted}</span>}
                <br/><br/>
                <button type='submit'>Register</button>
                </form>
                <h3>Already have an account? <a onClick={()=>{setMode('login'),clearformdata()}}>Login now</a></h3>
            </div>
            )}
        </div>
    </div>
  )
}

export default login