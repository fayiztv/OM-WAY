import axios from "axios";
import React, { useState } from "react";
import GuideHeader from "../GuideHeader/GuideHeader";
import "./guidepackages.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";

function GuidePackages() {
  const [packages, setPackages] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  const [image, setImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [packageId,setPackageId] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const guide = useSelector((state) => {
    return state.guide.detials;
  });

  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleImage = (e) => {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0]);
      ImageTOBase(e.target.files[0]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid File type",
      });
    }
  };

  const ImageTOBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result);
    };
  };

  const id = guide._id;

  async function deletePackage(id) {
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
        await axios.patch("/guide/packages/delete", { id });
        setRefresh(!refresh);
      }
    });
  }

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/guide/packages/" + id);

        if (!data.err) {
          setPackages(data.packages);
        }
      } catch (err) {
        navigate("/*");
      }
    })();
  }, [refresh]);

  React.useEffect(() => {
    if (finalImage&&packageId) {
      (async function () {
        let { data } = await axios.patch("/guide/update-image", {
          image: finalImage,
          packageId
        });
        if (!data.err) {
          setRefresh(!refresh)
          Swal.fire({
            icon: "success",
            title: "yaayy..",
            text: "image updated",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "somthing went wrong",
          });
        }
      })();
    }
  }, [finalImage]);
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
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "40px",
          }}
          className="button-div"
        >
          <Link to="/guide/add-package">
            <button>Add a Package</button>
          </Link>
        </div>
        <div className="guide-packages-body">
          {packages.map((item, index) => {
            return (
              <div className="guide-packages">
                {item.image && (
                  <div className="guide-package-img">
                    <img src={item.image.url} alt="img" />
                  </div>
                )}
                <div style={{ width: "67px" }} className="btn-div">
                  <input
                    style={{ opacity: "0" }}
                    type="file"
                    name="photo"
                    className="guide-edit-btn"
                    placeholder="edit"
                    onChange={handleImage}
                    onClick={() => setPackageId(item._id)}
                  />
                  <h1 style={{ marginLeft: "10px" }} className="guide-edit">
                    {<FiEdit2 size={20} />}
                  </h1>
                </div>

                <div className="guide-packages-details">
                  <h6>{item.destionation}</h6>
                  <h5> ₹ {item.price}</h5>
                  <p>
                    {item.days} Days , Destintaions : {item.places}
                  </p>
                  <p>Activites : {item.activites}</p>
                  <p>{item.descrption}</p>
                </div>
                <div className="package-managment-icons">
                  <Link to={`/guide/edit-package/${item._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <FontAwesomeIcon
                    onClick={() => {
                      deletePackage(item._id);
                    }}
                    style={{ marginTop: "20px" }}
                    icon={faTrashAlt}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GuidePackages;
