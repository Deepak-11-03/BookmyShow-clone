import React, { useState } from 'react'
// import { useNavigate ,useParams} from 'react-router-dom'
import SeatBook from './SeatBook';
import './SeatType.css'

export default function SeatType() {

    const[category ,setCategory] = useState('premium')
    const[seats ,setSeats] = useState(1);
    const [toggle ,setToggle] =useState(false)


    const submit =(e)=>{
        e.preventDefault()
        if(category === undefined){
            alert("please select seat type")
        }
        else if(seats === undefined){
            alert("please select number of seat")
        }
        else{
            setToggle(true)
        }
    }


  return (
    <div>
        {toggle ? <SeatBook seat={seats} cat={category}/> : 

        <div className="seatselection">
            <h3>Please choose seat type and no. of seats</h3>
            <form onSubmit={submit}>
                <select name="category" id="cat" value={category} onChange={e=>setCategory(e.target.value)}>
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                </select>
                <select name="number" id="number" value={seats} onChange={e=>setSeats(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <button type='submit'>Next</button>
            </form>
        </div>
        }
    </div>
  )
}
