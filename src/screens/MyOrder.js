// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

// export default function MyOrder() {
//   const [orderData, setOrderData] = useState({});

//   const fetchMyOrder = async () => {
//     try {
//       let response = await fetch("http://localhost:8000/user/myOrderData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: localStorage.getItem("userEmail"),
//         }),
//       });

//       if (response.ok) {
//         // If the response is OK (status code 200), parse the JSON response
//         const responseData = await response.json();
//         // const r_data = responseData[0].order_data;
//         console.log("my order data is:", responseData);
//         setOrderData(responseData);
//       } else {
//         // Handle non-successful responses (e.g., status codes other than 200)
//         console.log("Request failed with status: " + response.status);
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []); // Empty dependency array to run the effect only once when component mounts

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <div className="container h-100 bg-white">
//           <div className="row bg-blue">
//             {Object.keys(orderData).map((key) => {
//               const data = orderData[key];
//               return data.orderData
//                 ? data.orderData.order_data
//                     .slice(0)
//                     .reverse()
//                     .map((item) => {
//                       return item.map((arrayData, index) => (
//                         <div key={index} className="col-12 col-md-6 col-lg-3">
//                           {arrayData.order_date ? (
//                             <div className="m-auto mt-5">
//                               {arrayData.order_date}
//                               <hr />
//                             </div>
//                           ) : (
//                             <div
//                               className="card mt-3"
//                               style={{ width: "16rem", maxHeight: "360px" }}
//                             >
//                               <img
//                                 src={arrayData.img}
//                                 className="card-img-top"
//                                 alt="..."
//                                 style={{ height: "120px", objectFit: "fill" }}
//                               />
//                               <div className="card-body">
//                                 <h5 className="card-title">{arrayData.name}</h5>
//                                 <div
//                                   className="container w-100 p-0"
//                                   style={{ height: "38px" }}
//                                 >
//                                   <span className="m-1">{arrayData.qty}</span>
//                                   <span className="m-1">{arrayData.size}</span>
//                                   <span className="m-1">
//                                     {arrayData.order_date}
//                                   </span>
//                                   <div className=" d-inline ms-2 h-100 w-20 fs-5">
//                                     ₹{arrayData.price}/-
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ));
//                     })
//                 : "";
//             })}
//           </div>
//         </div>
//         my order fetched
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      let response = await fetch("http://localhost:8000/user/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("my order data is:", responseData);
        setOrderData(responseData.orderData.order_data);
      } else {
        console.log("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="container h-100 bg-white">
          <div className="row bg-blue">
            {orderData.map((orderArray, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3">
                {orderArray.map((arrayData, innerIndex) => (
                  <div key={innerIndex}>
                    {arrayData.order_date ? (
                      <div className="m-auto mt-5 bg-gray-200 text-black">
                        {arrayData.order_date}
                        <hr />
                      </div>
                    ) : (
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                        {/* <img
                          src={arrayData.img}
                          className="card-img-top"
                          alt="..."
                          style={{ height: "120px", objectFit: "fill" }}
                        /> */}
                        <div className="card-body">
                          <h5 className="card-title">{arrayData.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">{arrayData.qty}</span>
                            <span className="m-1">{arrayData.size}</span>
                            <span className="m-1">{arrayData.order_date}</span>
                            <div className=" d-inline ms-2 h-100 w-20 fs-5">
                              ₹{arrayData.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
