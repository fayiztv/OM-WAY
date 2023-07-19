import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import GuideHeader from "../GuideHeader/GuideHeader.jsx";
import Chart from "react-apexcharts";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  FcMoneyTransfer,
  FcPaid,
  FcPortraitMode,
  FcTodoList,
} from "react-icons/fc";
import { FcAdvance } from "react-icons/fc";
function GuideDashboard() {
  const guide = useSelector((state) => {
    return state.guide.detials;
  });

  const id = guide._id;

  const [dashboardData, setDashboardData] = useState({
    totalBooking: 0,
    totalRevenue: 0,
    totalPackages: 0,
    monthlyData: [],
  });

  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: dashboardData.monthlyData,
      },
    ],
  };
  const state = {
    series: [
      {
        name: "series-1",
        data: dashboardData.monthlyData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/guide/dashboard/" + id);
        if (!data.err) {
          setDashboardData({
            ...data.booking,
            totalPackages: data.totalPackages,
            monthlyData: data.monthlyData,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="GUID-HOME">
      <GuideHeader />
      <div className="div">
        <div className="overlap-4">
          <div className="details">

            <div className="dash">
              <div className="dash-desc">
                <b>Total Booking</b>
                <h3 >{dashboardData.totalBooking}</h3>
              </div>
              <div className="dash-icon">
                <div className="icon-div">
                  <FcTodoList className="icon" />
                </div>
              </div>
            </div>
            <div className="dash">
              <div className="dash-desc">
                <b>Total Revenue</b>
                <h3>{dashboardData.totalRevenue}</h3>
              </div>
              <div className="dash-icon">
                <div className="icon-div">
                  <FcMoneyTransfer className="icon" />
                </div>
              </div>
            </div>

            <div className="dash">
              <div className="dash-desc">
                <b>Total Packages</b>
                <h3>{dashboardData.totalPackages}</h3>
              </div>
              <div className="dash-icon">
                <div className="icon-div">
                  <FcAdvance className="icon" />
                </div>
              </div>
            </div>
          </div>
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            className={"w-90 h-80 chart"}
            height={300}
            />
        </div>
      </div>
    </div>
  );
}

export default GuideDashboard;
