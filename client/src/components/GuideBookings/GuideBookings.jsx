import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import GuideHeader from "../GuideHeader/GuideHeader";
import notFoundImg from '../../assets/images/notFound.png'
import InputLabel from "@mui/material/InputLabel";
import './guidebookings.css'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function GuideBookings() {
  const [bookingList,setBookingList]=useState([""])

  const guide = useSelector((state)=>{
    return state.guide.detials
  });

  const id=guide._id

  useEffect(()=>{
    (async function(){
        let {data}=await axios.get('/guide/bookings/'+id)
        if(!data.err){
          setBookingList(data.bookings)
      }
    })()
},[])


const handleFilterChange = (e) => {
  setFilterStatus(e);
};
  return (
    <div className="GUID-HOME">
      <GuideHeader/>
      <div style={{display:'flex',flexDirection:'column',width:'90%',marginLeft:'60px'}} className="overlap-4">
      <div className="bookings-head">     
          <h3>BOOKINGS</h3>

        </div>


            <div className="guide-packages-body">
              {bookingList.map((item,index)=>{
                return(
                  <div className="guide-packages">
                    {
                      item.packageId?.image&&
                      <div className="guide-package-img">
                      <img src={item.packageId.image.url} alt="" />
                      </div>
                    }
                  
                  <div className="guide-packages-details">
                      <h6>Destination : {item.packageId?.destionation}</h6>
                      <h5>Total Amount : ₹ {item.price}</h5>
                      <p>{item.packageId?.days} Days  , <span style={{marginLeft:'9px'}}> Starting date : <span style={{color:'#147E7D'}}>{new Date(item.bookedDate).toLocaleDateString()}</span></span></p>
                      <p>Activites : {item.packageId?.activites}</p>
                      <p>User Name : {item.userId?.name}</p>
                  </div>
                  {/* <div className="package-managment-icons">
                <Link to={`/guide/edit-package/${item._id}`}><FontAwesomeIcon  icon={faEdit} /></Link>
                  <FontAwesomeIcon onClick={()=>{deletePackage(item._id)}} style={{marginTop:'20px'}} icon={faTrashAlt} />
                  </div> */}
                  </div> 
                )
              })}
            </div>
        </div>
    </div>
  );
}

export default GuideBookings;
