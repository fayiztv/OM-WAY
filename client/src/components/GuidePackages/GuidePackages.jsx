import axios from "axios";
import React, { useState } from "react";
import GuideHeader from '../GuideHeader/GuideHeader'
import image from '../../assets/images/tajmahal.jpg'
import './guidepackages.css'
import { Link } from 'react-router-dom';


function GuidePackages() {
  const [packages, setPackages] = useState([""]);
  const [refresh, setRefresh] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/guide/packages");

        if (!data.err) {
          setPackages(data.packages);
          console.log(packages);
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
                  <div className="guide-package-img">
                      <img src={item.image.secure_url} alt='img' />
                  </div>
                  <div className="guide-packages-details">
                      <h6>{item.destionation}</h6>
                      <h5>{item.price}</h5>
                      <p>{item.days} Days  , Destintaions : {item.places}</p> 
                      <p>Activites : {item.activites}</p>
                      <p>{item.descrption}</p>
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