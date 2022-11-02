import React, { useEffect ,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineEventSeat , MdEventSeat } from "react-icons/md";
import './SeatBook.css'


export default function SeatBook({seat , cat}) {

  const[standardSeat,setStandardSeat]=useState([])
  const[premiumSeat,setPremiumSeat]=useState([]);
  const[selected , setSelected] =useState(0)
  const [seatState , setSeatState] = useState([])

  const navigate=useNavigate()
  
  let {id} =useParams();

    useEffect(()=>{
      api();
    },[])

    const api = async(e)=>{
        let data = await fetch(`/movie/${id}`)   // for fetching seats
        data=await data.json()
        setStandardSeat(data.standard)
        setPremiumSeat(data.premium)
    }


    const  bookSeats =async(e)=>{
      e.preventDefault();
      let data =await fetch(`/movie/${id}` ,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          seatState,cat
        })
      })
      if(data.ok){
        alert('done')
        navigate('/')
      }
    }

    const selection =(ids)=>{
       if(seatState.includes(ids)){                // to check if selected seat is already present in array
      setSeatState(seatState.filter(val=>val !== ids))   // if present then remove that value
      }
      else{
        setSeatState([...seatState , ids])              // if not present then add that value
      }
    } 

    const check =(e)=>{
     if(e.target.checked===true){
        setSelected(selected+1)
      }
      else{
      setSelected(selected-1)
      }   
    }  

    const emp =()=>{
      //to stop pushing id of another seat type in seatState
      alert('Please pick only those seat that you choose')
    }


  return (
    <div>
       <div className='home'>         
          <div className='seats'>
            <div className="status">
            <><MdEventSeat/> Booked</>
            <><MdOutlineEventSeat/> Available</>
            <><MdEventSeat style={{backgroundColor:"lightskyblue"}}/> Selected</>
            </div>
            
            <p>You select {cat} seat type</p>
            <br />
            <h4>Premium</h4>
           <form onSubmit={bookSeats}>
           <div className='premium'>
              {premiumSeat.map((item)=>
                <div key={item._id}>
                {item.booked === true ? <span><MdEventSeat/></span> :
                    <>
                    <input type="checkbox" id={item._id} className='light' onChange={check }/>
                  <label htmlFor={cat==="premium"  ? item._id :''} ><span onClick={cat==="premium" ? ()=>selection(item._id) : ()=>emp()} ><MdOutlineEventSeat/></span></label>
                  </>
                }
                </div>
              )}
              
            </div>
            <h4>Standard</h4>
            <div className='standard'>
              {standardSeat.map((ele)=>
                <div key={ele._id}>
                <div className="seat">
                {ele.booked === true ? <span><MdEventSeat/></span> :
                  <>
                    <input type="checkbox" id={ele._id} className='light' onChange={check}/>
                  <label htmlFor={cat==="standard" ? ele._id :''} ><span    onClick={cat==="standard" ? ()=>selection(ele._id) : ()=>emp()} ><MdOutlineEventSeat/></span></label>
                  </>
                }
                </div>
                </div>
              )}
            </div>
            <button type='submit'>Book {selected} seats & Pay, Rs {240*selected}</button>
            </form>
          </div>
          <div className="summery">

          </div>
       </div>
    </div>
  )
}
