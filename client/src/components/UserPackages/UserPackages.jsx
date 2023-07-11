import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNavbar from "../UserNavBar/UserNavBar";
import "./userpackages.css";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function UserPackages() {
  const [packages, setPackages] = useState([""]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(4);
  const [name, setName] = useState("");
  const [sortingOption, setSortingOption] = useState("");

  
  

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/user/packages?name=" + name);

        if (!data.err) {
          setPackages(data.packages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh, name]);

  const sortPackagesLowToHigh = () => {
    const sortedPackages = [...packages].sort((a, b) => parseInt(a.price) - parseInt(b.price));
    setPackages(sortedPackages);
  };

  const sortPackagesHighToLow = () => {
    const sortedPackages = [...packages].sort((a, b) => parseInt(b.price) - parseInt(a.price));
    setPackages(sortedPackages);
  };

  useEffect(() => {
    if (sortingOption === 'lowToHigh') {
      sortPackagesLowToHigh();
    } else if (sortingOption === 'highToLow') {
      sortPackagesHighToLow();
    }
    else  if (sortingOption === 'all') {
      const sortedPackages= packages.slice().sort(() => Math.random() - 0.5);
      setPackages(sortedPackages)
    }
  }, [sortingOption]);

  const count = packages.length;

  const indexOfLastpackage = currentPage * packagesPerPage;
  const indexOfFirstpackage = indexOfLastpackage - packagesPerPage;
  const currentPackage = packages.slice(
    indexOfFirstpackage,
    indexOfLastpackage
  );
  const startingNumber = (currentPage - 1) * packagesPerPage;
  const calculateSiNo = (index) => startingNumber + index;

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="user-main">
      <UserNavbar />
      <div className="packages-main">
        <div className="packages-head">
          <h3>PACKAGES</h3>
          <TextField
            className="searchbar"
            variant="outlined"
            placeholder="Search....."
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="sort">
            <InputLabel id="demo-select-small-label">Sort price</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
            >
              <MenuItem value={sortingOption}>
              </MenuItem>
              <MenuItem value="all">None</MenuItem>
              <MenuItem value="highToLow">Hight to low</MenuItem>
              <MenuItem value="lowToHigh">Low to high</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="pkgs-body">
          <Row style={{ marginRight: "170px" }}>
            {/* <Col sm={6} md={6} > */}
            {currentPackage.map((item, index) => {
              return (
                <Link to={"/package-details/" + item._id}>
                  <div className="pkg-details">
                    <div className="pkg-image">
                      <img src={item.image && item.image.url} alt="" />
                    </div>
                    <div className="pkg-textes">
                      <h5>{item.destionation}</h5>
                      <h4>{item.price}</h4>
                      <p>
                        {item.days} Days , {item.nights} Nights
                      </p>
                      <p>{item.descrption}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* </Col> */}
          </Row>
        </div>
      </div>
      {packages && (
        <div className="pagination">
          {Array.from(Array(Math.ceil(count / packagesPerPage)).keys()).map(
            (pageNumber) => (
              <button
                style={{
                  width: "50px",
                  height: "40px",
                  paddingBottom: "35px",
                  marginRight: "10px",
                  backgroundColor: "#147E7D",
                }}
                key={pageNumber}
                onClick={() => handlePaginationClick(pageNumber + 1)}
                disabled={currentPage === pageNumber + 1}
              >
                {pageNumber + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default UserPackages;
