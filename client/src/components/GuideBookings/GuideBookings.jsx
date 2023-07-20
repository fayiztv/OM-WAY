import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GuideHeader from "../GuideHeader/GuideHeader";
import notFoundImg from "../../assets/images/notFound.png";
import InputLabel from "@mui/material/InputLabel";
import "./guidebookings.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function GuideBookings() {
  const [bookingList, setBookingList] = useState([""]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const guide = useSelector((state) => {
    return state.guide.detials;
  });

  const id = guide._id;

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/guide/bookings/" + id);
      if (!data.err) {
        setBookingList(data.bookings);
      }else{
        navigate("/*");
      }
    })();
  }, [refresh]);

  const filteredBookings = bookingList.filter((booking) => {
    if (filterStatus === "all") {
      return true;
    }
    return booking.status === filterStatus;
  });

  const handleFilterChange = (e) => {
    setFilterStatus(e);
  };

  async function setUpcoming(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "set status as upcoming",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/guide/booking/upcoming", { id });
        setRefresh(!refresh);
      }
    });
  }

  async function setCompleted(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Set status as completed",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/guide/booking/completed", { id });
        setRefresh(!refresh);
      }
    });
  }

  async function deleteBooking(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this package",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2C457E",
      cancelButtonColor: " #9BA4B5",
      confirmButtonText: "Yes, Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch("/guide/booking/delete", { id });
        setRefresh(!refresh);
      }
    });
  }

  return (
    <div className="GUID-HOME">
      <GuideHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          marginLeft: "60px",
        }}
        className="overlap-4"
      >
        <div className="bookings-head">
          <h3>BOOKINGS</h3>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size="small"
            className="sort"
          >
            <InputLabel id="demo-select-small-label"></InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <MenuItem value={filterStatus}></MenuItem>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="guide-packages-body">
          {filteredBookings.map((item, index) => {
            return (
              <div className="guide-packages">
                {item.packageId?.image && (
                  <div className="guide-package-img">
                    <img src={item.packageId.image.url} alt="" />
                  </div>
                )}

                <div className="guide-packages-details">
                  <h6>Destination : {item.packageId?.destionation}</h6>
                  <h5>Total Amount : ₹ {item.price}</h5>
                  <p>
                    {item.packageId?.days} Days ,{" "}
                    <span style={{ marginLeft: "9px" }}>
                      {" "}
                      {item.status == "completed"
                        ? "Started date : "
                        : "Starting date : "}
                      <span style={{ color: "#147E7D" }}>
                        {new Date(item.bookedDate).toLocaleDateString()}
                      </span>
                    </span>
                  </p>
                  <p>Activites : {item.packageId?.activites}</p>
                  <p>
                    User Name : {item.userId?.name}{" "}
                    <span style={{ marginLeft: "10px" }}>
                      status :{" "}
                      <span
                        className={
                          item.status == "completed" ? "completed" : "upcoming"
                        }
                      >
                        {item.status}
                      </span>
                    </span>
                  </p>
                </div>
                <div className="status">

                  {
                    item.status !== "cancelled" ?
                     <FormControl
                     sx={{ m: 1, minWidth: 120 }}
                     size="small"
                     className="sort"
                   >
                     <InputLabel id="demo-select-small-label"></InputLabel>
                     <Select
                       labelId="demo-select-small-label"
                       id="demo-select-small"
                       value={item.status}
                     >
                       <MenuItem
                         onClick={() => setUpcoming(item._id)}
                         value="upcoming"
                       >
                         Upcoming
                       </MenuItem>
                       <MenuItem
                         onClick={() => setCompleted(item._id)}
                         value="completed"
                       >
                         Completed
                       </MenuItem>
                     </Select>
                   </FormControl>
                   : 
                   <button><FontAwesomeIcon onClick={()=>{deleteBooking(item._id)}} icon={faTrashAlt} /></button>  
                  }
                 
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GuideBookings;
