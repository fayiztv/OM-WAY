import axios from "axios";
import React, { useState } from "react";
import GuideHeader from '../GuideHeader/GuideHeader'
import './guidepackages.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { useSelector } from "react-redux";


function GuidePackages() {
  const [packages, setPackages] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  
  const guide=useSelector((state)=>{
    return state.guide.detials
  });

  const id = guide._id

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
        const { data } = await axios.get("/guide/packages/"+id);

        if (!data.err) {
          setPackages(data.packages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);
  return (
    <div className="GUID-HOME">
        <GuideHeader/>
        <div style={{display:'flex',flexDirection:'column',width:'90%',marginLeft:'60px'}} className="overlap-4">
          <div style={{display:'flex',justifyContent:'end',paddingRight:'40px'}} className="button-div">
            <Link to="/guide/add-package">
           <button>Add a Package</button>
            </Link>
          </div>
            <div className="guide-packages-body">
              {packages.map((item,index)=>{
                return(
                  <div className="guide-packages">
                    {
                      item.image&&
                      <div className="guide-package-img">
                      <img src={item.image.url} alt="" />
                      </div>
                    }
                  
                  <div className="guide-packages-details">
                      <h6>{item.destionation}</h6>
                      <h5> ₹ {item.price}</h5>
                      <p>{item.days} Days  , Destintaions : {item.places}</p>
                      <p>Activites : {item.activites}</p>
                      <p>{item.descrption}</p>
                  </div>
                  <div className="package-managment-icons">
                <Link to={`/guide/edit-package/${item._id}`}><FontAwesomeIcon  icon={faEdit} /></Link>
                  <FontAwesomeIcon onClick={()=>{deletePackage(item._id)}} style={{marginTop:'20px'}} icon={faTrashAlt} />
                  </div>
                  </div> 
                )
              })}
            </div>
        </div>
    </div>
  )
}

export default GuidePackages