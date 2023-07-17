import axios from "axios";
import React, { useEffect, useState } from "react";
import "./userbookingdetails.css";
import UserNavbar from "../UserNavBar/UserNavBar";
import { useNavigate, useParams } from "react-router-dom";
import { Rating,TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function UserBookingDetails() {
  const [booking, setBooking] = useState();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  const user=useSelector((state)=>{
    return state.user.detials

  });

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/booking-details/" + id);
      if (!data.err) {
        setBooking(data.booking[0]);
      }
    })();
  }, [refresh]);

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/guide-rating/" + user._id);
      if (!data.err) {
        setRating(data.rating.rating);
        setReview(data.rating.review);
      }
    })();
  }, [refresh]);

  const guideId = booking?.guideId;
  const userId = booking?.userId;
  const handleSubmitReview = async () => {
    if (rating !== "" && review !== "") {
      const data = await axios.post("/user/guide-rating", {
        review,
        rating,
        guideId,
        userId,
      });
      if (!data.err) {
        Swal.fire("Success!", "Review Added Successfull", "success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message,
        });
      }
      setRefresh(!refresh);
    }
  };

  return (
    <div className="user-main">
      <UserNavbar />
      <div className="booking-main">
        <div className="booking-head">
          <h3>BOOKING DETAILS</h3>
        </div>
        <div className="booking-body">
          <div className="booking-user-guide">
            <div className="booking-user">
              <h5 className="text-center">User Details</h5>
              <p>
                Name : <span>{booking?.userId?.name}</span>
              </p>
              <p>
                Mobail : <span>{booking?.userId?.contact}</span>
              </p>
              <p>
                Email : <span>{booking?.userId?.email}</span>
              </p>
              <p>
                Member since :{" "}
                <span>
                  {new Date(booking?.userId?.createdAt).toString().slice(0, 16)}
                </span>{" "}
              </p>
            </div>
            <div className="booking-status">
              <h5 className="text-center">Booking Details</h5>
              <p>
                Status : <span>{booking?.status}</span>
              </p>
              <p>
                Booked Date :{" "}
                <span>
                  {new Date(booking?.bookedDate).toLocaleDateString()}
                </span>
              </p>
              <p>
                Duration : <span>{booking?.packageId?.days} Days</span>
              </p>
              <p>
                Amount payed : <span> ₹ {booking?.price}</span>
              </p>
            </div>
            <div className="booking-guide">
              <h5 className="text-center">Guide Details</h5>
              <p>
                Name : <span>{booking?.guideId?.firstName}</span>
              </p>
              <p>
                Mobail : <span>{booking?.guideId?.contact}</span>
              </p>
              <p>
                Email : <span>{booking?.guideId?.email}</span>
              </p>
              <p>
                Rating : <span>{}</span>{" "}
              </p>
            </div>
          </div>
          <div className="package-and-rating">
            <div className="p-details">
              <h5 className="text-center">Package Details</h5>
              <div className="pkg-main">
                {booking?.packageId?.image.url && (
                  <div
                    style={{ paddingTop: "20px" }}
                    className="guide-package-img"
                  >
                    <img src={booking.packageId.image.url} alt="" />
                  </div>
                )}
                <div
                  className="guide-packages-details"
                  style={{ marginLeft: "30px", marginTop: "20px" }}
                >
                  <h6>{booking?.packageId?.destionation}</h6>
                  <h5> ₹ {booking?.packageId?.price}</h5>
                  <p>
                    {booking?.packageId?.days} Days , Destintaions :{" "}
                    {booking?.packageId?.places}
                  </p>
                  <p>Activites : {booking?.packageId?.activites}</p>
                  <p>{booking?.packageId?.descrption}</p>
                </div>
              </div>
            </div>
            <div className="rating-review">
              <TextField
                id="outlined-multiline-flexible"
                label="Add Review"
                multiline
                fullwidth
                maxRows={4}
                minRows={2}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <div className="rating-star">
                <Rating
                  name="read-only"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  size="large"
                />
                <button
                  className="rating-btn"
                  style={{ marginTop: "20px" }}
                  disabled={rating === "" || review === ""}
                  onClick={handleSubmitReview}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookingDetails;
