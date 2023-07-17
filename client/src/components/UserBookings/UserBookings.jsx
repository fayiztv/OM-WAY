import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import "./userbookings.css";
import UserNavbar from "../UserNavBar/UserNavBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import notFoundImg from "../../assets/images/notFound.png";
import { Link } from "react-router-dom";

function UserBookings() {
  const [bookingList, setBookingList] = useState([""]);
  const [filterStatus, setFilterStatus] = useState("all");
  const user = useSelector((state) => {
    return state.user.detials;
  });

  const id = user._id;

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/bookings/" + id);
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
    <div className="user-main">
      <UserNavbar />
      {bookingList.length === 0 ? (
        <Row
          style={{ marginTop: "150px" }}
          className="d-flex justify-content-center flex-column align-items-center w-100 h-100 "
        >
          <img
            src={notFoundImg}
            style={{ maxHeight: "300px", width: "400px", maxWidth: "90%" }}
            alt=""
          />
          <h6 className="text-center">No data found</h6>
        </Row>
      ) : (
        <div className="bookings-main">
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
          <div className="bookings-body">
            {filteredBookings.map((item, index) => {
              return (
                <div className="user-bookings">
                  {item.packageId?.image.url && (
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
                    <Link to={"/guide-details/" + item.guideId?._id}>
                      <p>Guide : {item.guideId?.firstName}</p>
                    </Link>
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
                      <Link to={"/booking-details/" + item._id}>
                        view detials
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBookings;
