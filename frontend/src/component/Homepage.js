import React ,{useEffect,useState} from 'react'
import './Homepage.css'
import { useNavigate } from 'react-router-dom'
export default function Homepage() {
const navigate = useNavigate();


    const[movies , setMovies] = useState([])

    useEffect(()=>{
        getMovies();
    },[])

    const getMovies = async () => {
        try {
          let data = await fetch('/movielist')
          data = await data.json()
          setMovies(data) 
        } catch (err) {
          alert(err)
        }
      };


      const popup = (id)=>{
        navigate(`/seattype/${id}`)
      }
  return (
    <div>
        <div className="allmovies">
            {movies.map((show)=>
            <div key={show._id} id="movie" onClick={()=>popup(show._id)}>
                <h1>Movie : {show.movieName}</h1>
                <h2>Rating : {show.rating}</h2>
                <h2>Type : {show.type}</h2>
                <h2>Release Date : {show.date}</h2>
            </div>
            )}
        </div>
    </div>
  )
}
