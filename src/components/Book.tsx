import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Book.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Book() {
  let navigate=useNavigate();
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(null);
  const [slot,setSlot]=useState(false);
  const [booked,setBooked]=useState(['0']);
  const [bookedslots,setBookedSlots]=useState(['0']);
  const [effect,setEffect]=useState(false);
  const [view,setView]=useState(false);
 //let booked : string[] = [];
  const s = [
    { id: '1', time: "10:00 AM-11:00 AM"},
    { id: '2', time: "11:00 AM-12:00 PM"},
    { id: '3', time: "12:00 PM-01:00 PM"},
    { id: '4', time: "02:00 PM-03:00 PM"},
    { id: '5', time: "03:00 PM-04:00 PM"},
    { id: '6', time: "04:00 PM-05:00 PM"}
  ];
  // if(!Array.isArray(value))console.log(value.getDate())
  console.log(value)
  console.log(typeof(value))

  var event = new Date(Number(value));
  let date = JSON.stringify(event)
  date = date.slice(1,11)
  console.log(date) 
  
  const Available=()=>{
    setSlot(true);
    const dateObj={
      date:date
    }
    axios.post('https://oneshot-2fjq.onrender.com/booked',dateObj)
    .then((res)=>{
      //setBooked(res.data.BookedSlots);
      setBooked(res.data.BookedSlots);
      console.log(booked);
    })
  }

  let email=localStorage.getItem('username')

  const handle=(e)=>{
    
    const obj={
      email:email,
      date:date,
      timeSlot:e,
      Boolean: true,
    } 
    let prompt1=prompt("Confirm","Are you sure you want to CONFIRM?");
    if(prompt1!=null)
    {
      axios.post('https://oneshot-2fjq.onrender.com/date',obj)
     .then((res)=>{
      console.log(res.data);
      })
    }
  }

  const Yourslots=()=>{
    setView(!view);
    setEffect(!effect);
    const slot={
      email:email
    }
    axios.post('https://oneshot-2fjq.onrender.com/yourslots',slot)
    .then((res)=>{
       console.log(res.data);
       setBookedSlots(res.data.slots);
    })
  }

  const cancel=(email,slot)=>{
    const del={
      email:email,
      slot:slot
    }
    let prompt1=prompt("Confirm","Are you sure you want to CANCEL the slot?");
    if(prompt1!=null){
    axios.post('https://oneshot-2fjq.onrender.com/delete',del)
    .then((res)=>{
      console.log(res.data.message);
    })
  }
  }

  useEffect(()=>{ 
   Available();
  },[value,effect]);

  return (
    <div className='calendar '>

      <Navbar bg="dark" variant="dark">
        <Container className='a '>
          <Navbar.Brand href=""><b>OneShot</b></Navbar.Brand>
          <Nav className="ml-auto">
            <Navbar.Brand href="/" className="custom-logout-link">Logout</Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>


      <div className='ml-auto calendar-container'>
        <Calendar onClickDay={onChange} value={value} />
      </div>

      <>
      <div className='text-white bg-dark w-50 mx-auto'>
        <h6>Available slots on selected date are</h6>
      </div>
      </>

      <>
      {
        slot &&(
          <div >
             {
                  s.map((i) => (
                    <Button className='allSlots'
                      variant={booked.includes(i.id) ? 'danger' : 'success'}
                      disabled={booked.includes(i.id) ? true : false}
                      onClick={() => {
                        handle(i.id);
                      }}
                    >
                     {i.time}
                    </Button>
                  ))
             }      
          </div>
        )
      }
      </>
      <div>
        <Button className='bookedSlots'  variant='warning' onClick={Yourslots}>View your Booked Slots</Button> 
      </div>

      <>
      <div>
      {
          view&&( 
           s.map(i=>(
            bookedslots.includes(i.id)&&
            <Button variant='danger' onClick={()=>cancel(email,i.id)} > {i.time} </Button>
           ))               
          )
      }
      </div>
      </>
      
    </div>
  );
}

export default Book;
