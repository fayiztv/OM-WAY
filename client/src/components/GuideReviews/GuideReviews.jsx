import axios from "axios";
import React, { useState } from "react";
import GuideHeader from "../GuideHeader/GuideHeader";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

function GuideReviews() {
  const [reviews, setReviews] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const guide = useSelector((state) => {
    return state.guide.detials;
  });
  const id = guide._id;

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/guide/reviews/"+id)
        if (!data.err) {
          setReviews(data.reviews);
        }
      } catch (err) {
        navigate("/*");
      }
    })();
  }, [refresh]);

  return (
    <div className="GUID-HOME">
      <GuideHeader />
      <div className="div">
        <div className="overlap-4">
          <div className="reviews-main-panel">
          <div className="reviews-content-wrapper">
            <div
              style={{ width: "80vw"}}
              className="col-lg-6 grid-margin stretch-card"
            >
              <div
                className="table-responsive"
              >
                <table className="table table-hover mt-5">
                  <thead className="thead-dark">
                    <tr className="table-head">
                      <th scope="col">SI No</th>
                      <th scope="col">User name</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.userId?.name}</td>
                          {
                            item.rating&&  <td>{< Rating name="read-only" value={item.rating} readOnly size='small' />}</td>
                          }
                          <td>{item.review}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default GuideReviews;
