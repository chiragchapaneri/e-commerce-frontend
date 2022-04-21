import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { OrderApi } from "../services/Order";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../style/index.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

// import Carousel from "carousel-react-rcdev";
// import { Carousel } from "carousel-react-rcdev";
// import Carousel from "carousel-react-rcdev";
// import Stack from "@mui/material/Stack";
// import Pagination from "@mui/material/Pagination";
// import { Carousel } from "@sefailyasoz/react-carousel";

export function OrderList({}) {
  const CarouselData = [
    {
      headerText: null,
      subText: "Sub Text One",
      image: "https://picsum.photos/300/300",
    },
    {
      headerText: "Header Text Two",
      subText: null,
      image: "https://picsum.photos/1200/800",
    },
    {
      headerText: null,
      subText: null,
      image: "https://picsum.photos/720/720",
    },
    {
      headerText: "Header Text Four",
      subText: "Sub Text Four",
      image: "https://picsum.photos/1920/1080",
    },
    {
      headerText: "Header Text Five",
      subText: "Sub Text Five",
      image: "https://picsum.photos/480/360",
    },
  ];
  const history = useHistory();
  const [apidata, setApiData] = useState([]);
  const [length, setLength] = useState();
  const [startpage, setStartpage] = useState(1);
  //use for get query string params data
  const page = new URLSearchParams(useLocation().search).get("page");
  // const { page } = useParams();
  //

  const handlePageClick = (data) => {
    console.log(data.selected);
    setStartpage(data.selected);
  };

  // function Items({ currentItems }) {
  //   return (
  //     <>
  //       {currentItems &&
  //         currentItems.map((item) => (
  //           <div>
  //             <h3>Item #{item}</h3>
  //           </div>
  //         ))}
  //     </>
  //   );
  // }

  useEffect(async () => {
    try {
      const apicall = new OrderApi();
      const { data } = await apicall.orderList(localStorage.token, startpage);
      if (data) {
        console.log(data);
        setApiData(data.data);
        setLength(data.length);
      }
    } catch (err) {
      console.log(err);
    }
  }, [startpage, setLength, setStartpage]);

  return (
    <>
      <div className="container mt-5">
        <div className="table-wrapper">
          <div className="table-filter"></div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>product</th>
                <th>Location</th>
                <th>Order Date</th>
                <th>quantity</th>
                <th>price</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {apidata?.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a>
                      <img
                        src={data.productid.image1}
                        className="avatar"
                        alt="Avatar"
                        height={50}
                      />{" "}
                    </a>{" "}
                    {data.productid.productname}
                  </td>
                  <td>{data.city}</td>

                  <td>{data.date}</td>

                  <td>{data.quantity}</td>
                  <td>₹{data.productid.price}</td>
                  <td>₹{data.productid.price * data.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <ReactPaginate
            // className="homw"
            breakLabel="..."
            nextLabel={"next >"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={7}
            pageCount={24}
            containerClassName={"pagination"}
            previousLabel="< previous"
            marginPagesDisplayed={0}
            renderOnZeroPageCount={null}
          /> */}
        </div>
      </div>
      <div className="col -12">
        {/* <div className="nams"> */}
        {/* <Pagination count={10} variant="outlined" /> */}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={12}
          pageRangeDisplayed={7}
          // marginPagesDisplayed={20}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          // variant="outlined"
          // count={10}
          variant="outlined"
          // />
        />
        {/* </div> */}
        {/* <Items currentItems={apidata} /> */}
      </div>
    </>
  );
}
