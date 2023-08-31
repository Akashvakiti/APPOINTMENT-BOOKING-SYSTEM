import React, { useState } from 'react';
import {IoMdLogIn} from 'react-icons/io';
import  Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login() {
    let navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [otp,setOtp]=useState(1)
    const [randomotp,setRandomotp]=useState(0)
    const [otpsent,setOtpsent]=useState(false)
    const [nav,setNav]=useState(false)
    const [log,setLog]=useState(true)
    const [invalid,setInvalid]=useState(0);

    const submit=async(userobject)=>{
        userobject.preventDefault();
        var userobj=
        {
          username:email,
        } 
        localStorage.setItem('username',email);
        setOtpsent(true);
        if(!nav)
        {
            setNav(!nav);
            setLog(!log)
            await axios.post('https://oneshot-2fjq.onrender.com',userobj)
            .then((response)=>{
                console.log(response.data.otp);
                setRandomotp(Number(response.data.otp));
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
                    setInvalid(1);
                }
        }
    }

  return (
    <div className='login w-50 mx-auto' >
     <div className='row justify-content-center'>
      <form onSubmit={submit}>
        <h1>Login</h1>
        <input type='email' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} /> 
        {
            log&&<Button variant='success' type='submit'>Login</Button>
        }
        {
            otpsent&&(<div>
                <input type='text' placeholder='*Enter otp' onChange={(e)=>setOtp(Number(e.target.value))}/>
                <Button variant='success' type='submit' onClick={submit}>Submit <IoMdLogIn/></Button>
                </div>)
                
        }
        {
          invalid===1&&<h6 className='text-danger'>Invalid OTP</h6>
        }
      </form>
     </div>
    </div>
  );
}

export default Login;
