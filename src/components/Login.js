import React, { useState } from 'react'
import {IoMdLogIn} from 'react-icons/io';
import  Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login() {
    let navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState(0)
    const [randomotp,setRandomotp]=useState(0)
    const [otpsent,setOtpsent]=useState(false)
    const [nav,setNav]=useState(false)
    const [log,setLog]=useState(true)

    const submit=async(userobject)=>{
        userobject.preventDefault();
        var userobj=
        {
          username:email,
        } 
        setOtpsent(true);
        if(!nav)
        {
            setNav(!nav);
            setLog(!log)
            await axios.post('http://localhost:3000',userobj)
            .then((response)=>{
                console.log(response.data.otp);
                setRandomotp(response.data.otp);
                })
            .catch(err=>alert(`${err.message}`));
        }
        else
        {
                if(otp===randomotp)
                {
                    navigate('/Book')
                }
                else
                {
                    console.log("invalid otp");
                }
        }
    }

  return (
    <div className='login w-50 mx-auto' >

      <form onSubmit={submit}>
        <h1>Login</h1>
        <input type='email' placeholder='*Enter email' onChange={(e)=>setEmail(e.target.value)} /> 
        {
            log&&<Button variant='primary' type='submit'>Login</Button>
        }
        {
            otpsent&&(<div>
                <input type='text' placeholder='*Enter otp' onChange={(e)=>setOtp(e.target.value)}/>
                <Button variant='primary' type='submit' onClick={submit}>Submit <IoMdLogIn/></Button>
                </div>)
                
        }
      </form>

    </div>
  );
}

export default Login;
