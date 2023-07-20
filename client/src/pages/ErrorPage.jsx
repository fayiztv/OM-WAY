import React from "react";
import { Link } from "react-router-dom";
import "./errorpage.css";

function ErrorPage() {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div  class="col-sm-12 div ">
            <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}} class="col-sm-10 col-sm-offset-1  text-center">
                {/* <div className="error-text">
                <h1 class="text-center ">404</h1>
                </div> */}
              <div  class="four_zero_four_bg">
              </div>

              <div class="contant_box_404">
                <h3 class="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>
                <p>please try again</p>

                <Link to="/" class="link_404">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
