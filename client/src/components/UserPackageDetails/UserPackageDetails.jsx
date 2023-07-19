import axios from "axios";
import React, { useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import { useNavigate, useParams } from "react-router-dom";
import "./packagedetails.css";
import profile from "../../assets/images/face1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AiFillRightCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

function UserPackageDetails() {
  const [packages, setPackages] = useState([]);
  const [guideId, setGuideId] = useState([]);
  const [guide, setGuide] = useState([]);
  const [flage, setFlage] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const [guestes, setGuestes] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const disabledDate = new Date();
  disabledDate.setDate(disabledDate.getDate() + -16);
  const [loading, setLoading] = useState({
    submit: false,
  });
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.detials;
  });

  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validForm()) {
      const {data:bookingAvailable}= await axios.post("/user/guide/available", {
        date:selectedDate, days:packages.days, id:guideId
      })
      if(bookingAvailable.booking){
        Swal.fire({
          icon: "error",
          title: "please change date",
          text: "Guide is not availbale on this date ",
        });
        return;
      }
      if (!loading.submit) {
        setLoading({ ...loading, submit: true });
        const { data } = await axios.post("user/book-package", {
          price: packages.price * guestes,
        });
        if (!data.error) {
          handleRazorPay(data.order);
        }
        setLoading({ ...loading, submit: false });
      }
    }
  };

  const handleRazorPay = (order) => {
    const options = {
      key: "rzp_test_O512t3FLY9WNji",
      amount: order.amount,
      currency: order.currency,
      name: "onmyway",
      description: "Package Amount",
      order_id: order.id,
      handler: async (response) => {
        const { data } = await axios.post("/user/payment/verify", {
          response,
          selectedDate,
          guideId,
          packageId: packages._id,
          userId,
          price: packages.price * guestes,
          guestes,
          days:packages.days
        });
        if (data.err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
        } else {
          Swal.fire("Success!", "Successfully Booked", "success");
          navigate("/bookings");
        }
        setRefresh(!refresh);
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", (response) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.error.description,
      });
      setRefresh(!refresh);
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectChange = (event) => {
    setGuestes(event.target.value);
  };

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/package-details/" + id);

        if (!data.err) {
          setPackages(data.packages);
          setGuideId(data.packages.guideId);
          setFlage(true);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);

  React.useEffect(() => {
    (async function () {
      try {
        if (flage === true) {
          const { data } = await axios.get(
            "/user/package-details-guide/" + guideId
          );
          if (!data.err) {
            setGuide(data.guide);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [guideId]);

  function validForm() {
    if (selectedDate === null) {
      return false;
    }
    return true;
  }

  return (
    <div className="user-main">
      <UserNavbar />
      <div className="package-details-main">
        <div className="package-img">
          <img src={packages.image && packages.image.url} alt="" />
        </div>
        <div className="package-details">
          <h3 style={{ marginRight: "100px" }}>{packages.destionation}</h3>
          <div className="price">
            <h3 style={{ marginRight: "10px" }}>
              ₹ {packages.price * guestes}
            </h3>
            <h5>{guestes === "1" ? "/- Per person" : "/- Total"} </h5>
          </div>
          <h6>
            <AiFillRightCircle style={{ marginRight: "10px" }} />{" "}
            {packages.days} Days , {packages.nights} Nights
          </h6>
          <h6>
            <AiFillRightCircle style={{ marginRight: "10px" }} /> Activites :{" "}
            {packages.activites}
          </h6>
          <h6>
            <AiFillRightCircle style={{ marginRight: "10px" }} /> Places :{" "}
            {packages.places}
          </h6>
          <h6 style={{ marginBottom: "10px" }}>
            <AiFillRightCircle style={{ marginRight: "10px" }} />{" "}
            {packages.descrption}
          </h6>

          <form onSubmit={handleSubmit} className="booking-form">
            <p>select guestes</p>
            <select
              className="dropdown"
              value={guestes}
              onChange={handleSelectChange}
            >
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5 Persons</option>
              <option value="6">6 Persons</option>
              <option value="7">7 Persons</option>
              <option value="8">8 Persons</option>
              <option value="9">9 Persons</option>
              <option value="10">10 Persons</option>
            </select>
            <span style={{ color: "#147E7D" }}>
              *note : kids under 10 years of age can enjoy free entry.
            </span>
            <p style={{ marginTop: "10px" }}>select your starting date</p>
            <DatePicker
              placeholderText="choose date"
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={disabledDate}
              className="date"
            />
            <div className="btnn">
              <button
                type="submit"
                disabled={!validForm()}
              >
                book now
                <ClipLoader size={20} color="white" loading={loading.submit} />
              </button>
            </div>
          </form>

          <Link style={{ height: "70%" }} to={"/guide-details/" + guide._id}>
            <div className="guides-card">
              <div className="guide-profile">
                <div className="guide-image">
                  <img src={guide.image ? guide.image : profile} alt="" />
                </div>
              </div>
              <div className="guide-detials" style={{ marginTop: "15px" }}>
                <p>
                  Name : {guide.firstName} <br />
                  Contact : {guide.contact} <br /> Ratings:
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <br />
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserPackageDetails;
