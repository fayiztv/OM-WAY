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
import { Link } from "react-router-dom";

function GuideBookings() {
  const [bookingList, setBookingList] = useState([""]);
  const [filterStatus, setFilterStatus] = useState("all");

  const guide = useSelector((state) => {
    return state.guide.detials;
  });

  const id = guide._id;

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/guide/bookings/" + id);
      if (!data.err) {
        setBookingList(data.bookings);
      }
    })();
  }, []);

  const filteredBookings = bookingList.filter((booking) => {
    if (filterStatus === "all") {
      return true;
    }
    return booking.status === filterStatus;
  });

  const handleFilterChange = (e) => {
    setFilterStatus(e);
  };
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
                      Starting date :{" "}
                      <span style={{ color: "#147E7D" }}>
                        {new Date(item.bookedDate).toLocaleDateString()}
                      </span>
                    </span>
                  </p>
                  <p>Activites : {item.packageId?.activites}</p>
                  <p>User Name : {item.userId?.name}</p>
                </div>
                <div className="status">
                  <p
                    className={
                      item.status == "completed"
                        ? "completed"
                        : "upcoming"
                    }
                  >
                    {item.status}
                  </p>

                  {item.status == "completed" && (
                    <Link to={"/servicehistory/" + item._id}>view detials</Link>
                  )}
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
