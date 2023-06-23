import React from 'react'
import GuideHeader from '../GuideHeader/GuideHeader'
import image from '../../assets/images/tajmahal.jpg'
import './guidepackages.css'
import { Link } from 'react-router-dom'


function GuidePackages() {
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
                <div className="guide-packages">
                <div className="guide-package-img">
                    <img src={image} alt="" />
                </div>
                <div className="guide-packages-details">
                    <h6>DELHI</h6>
                    <h5>₹-5999</h5>
                    <p>4 Days , 6 Destintaions , 9+ Activites</p>
                    <p>package includes 3 nights accommodation on <br/> three star hotel in delhi</p>
                </div>
                </div>
                <div className="guide-packages">
                <div className="guide-package-img">
                    <img src={image} alt="" />
                </div>
                <div className="guide-packages-details">
                    <h6>DELHI</h6>
                    <h5>₹-5999</h5>
                    <p>4 Days , 6 Destintaions , 9+ Activites</p>
                    <p>package includes 3 nights accommodation on <br/> three star hotel in delhi</p>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GuidePackages