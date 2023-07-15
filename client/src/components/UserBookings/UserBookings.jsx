import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './userbookings.css'
import UserNavbar from '../UserNavBar/UserNavBar';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function UserBookings() {
    const [bookingList,setBookingList]=useState([""])
    const [filteringOption, setFilteringOption] = useState("");
    const user=useSelector((state)=>{
      return state.user.detials
  
    });

    const id=user._id

    useEffect(()=>{
      (async function(){
          let {data}=await axios.get('/user/bookings/'+id)
          if(!data.err){
            setBookingList(data.bookings)
        }
      })()
  },[])
  return (
    <div className="user-main">
    <UserNavbar />
    <div  className="bookings-main">
    <div className="bookings-head">
          <h3>BOOKINGS</h3>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="sort">
            <InputLabel id="demo-select-small-label">Filter bookings</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filteringOption}
              onChange={(e) => setFilteringOption(e.target.value)}
            >
              <MenuItem value={filteringOption}>
              </MenuItem>
              <MenuItem value="all">Default</MenuItem>
              <MenuItem value="highToLow">Hight to low</MenuItem>
              <MenuItem value="lowToHigh">Low to high</MenuItem>
            </Select>
          </FormControl>
        </div>
            <div className="bookings-body">
              {bookingList.map((item,index)=>{
                return(
                  <div className="user-bookings">
                    {
                     item.packageId?.image.url&&
                      <div className="guide-package-img">
                      <img src={item.packageId.image.url} alt="" />
                      </div>
                      }
                  
                  <div className="guide-packages-details">
                      <h6>{item.packageId?.destionation}</h6>
                      <h5>{item.price}</h5>
                      <p>{item.packageId?.days} Days  , Destintaions : {item.packageId?.places}</p>
                      <p>Activites : {item.packageId?.activites}</p>
                      <p>Guide : {item.guideId?.firstName}</p>
                  </div>
                  <div className="package-managment-icons">
                
                  </div>
                  </div> 
                )
              })}
            </div>
    </div>
  </div>
  )
}

export default UserBookings