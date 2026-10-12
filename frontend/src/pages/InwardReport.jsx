


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";

// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Button,
// } from "@mui/material";

// function InwardReport() {

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [page, setPage] = useState(1);

//   const [totalRecords, setTotalRecords] =
 
//     useState(0);

// const PAGE_SIZE = 1000;

//   useEffect(() => {
//     loadData();
//   }, [page]);


//   const totalPages =
//   Math.ceil(
//     totalRecords / PAGE_SIZE
//   );


// const startRecord =
//   (page - 1) * PAGE_SIZE + 1;

// const endRecord =
//   Math.min(
//     page * PAGE_SIZE,
//     totalRecords
//   );



//   const loadData = async () => {

//     try {

//       setLoading(true);

//      const response = await axios.get(
//   `${process.env.REACT_APP_API_BASE_URL}/inward-full-report?page=${page}&limit=${PAGE_SIZE}`
// );

//       setData(
//         response.data.data || []
//       );

//       setTotalRecords(
//         response.data.totalRecords || 0
//       );

//     } catch (err) {

//       console.log(err);

//       setData([]);

//     } finally {

//       setLoading(false);
//     }
//   };

//   // =========================
//   // Dynamic Columns
//   // =========================

//   const columns = [];

//   if (data.length > 0) {

//     // TInwardDetails Columns

//     Object.keys(data[0])
//       .filter(
//         (key) =>
//           key !== "_id" &&
//           key !== "Master"
//       )
//       .forEach((key) => {

//         columns.push({
//           field: key,
//           headerName: key,
//           width: 180,
//         });

//       });

//     // Master Columns

//     if (data[0].Master) {

//       Object.keys(
//         data[0].Master
//       )
//         .filter(
//           (key) => key !== "_id"
//         )
//         .forEach((key) => {

//           columns.push({
//             field: `Master_${key}`,
//             headerName: `Master ${key}`,
//             width: 180,
//           });

//         });

//     }
//   }

//   // =========================
//   // Flatten Data
//   // =========================



// // =========================
// // Flatten Data
// // =========================

// console.log("Data Length =>", data.length);

// if (data.length > 0) {
//   console.log("First Record =>", data[0]);
// }

// console.log("Columns =>", columns);

// const rows = data.map(


//     (row, index) => ({

//       id:
//         row._id ||
//         `${page}-${index}`,

//       ...row,

//       Master_InwardNo:
//         row.Master?.InwardNo || "",

//       Master_InwardDate:
//         row.Master?.InwardDate || "",

//       Master_CustomerID:
//         row.Master?.CustomerID || "",

//       Master_CustomerDCNo:
//         row.Master?.CustomerDCNo || "",

//       Master_CustomerDCDate:
//         row.Master?.CustomerDCDate || "",

//       Master_CustomerPONo:
//         row.Master?.CustomerPONo || "",

//       Master_CustomerPODate:
//         row.Master?.CustomerPODate || "",
//     })
//   );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
//         p: 3,
//       }}
//     >
//       <Paper
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           height: "calc(100vh - 50px)",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           mb={2}
//         >
//           Full Inward Report
//         </Typography>

//         <Typography
//           variant="h6"
//           color="primary"
//           fontWeight="bold"
//           mb={2}
//         >
//           Total Records :
//           {" "}
//           {totalRecords}
//         </Typography>

//         <Typography
//   variant="h6"
//   fontWeight="bold"
//   color="success.main"
//   mb={2}
// >
//   Showing Records :
//   {startRecord} - {endRecord}
// </Typography>



//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent:
//                 "center",
//               mt: 10,
//             }}
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>

//           <Box
//   sx={{
//     height: "65vh",
//     width: "100%",
//   }}
// >
//             <DataGrid
//   rows={rows}
//   columns={columns}
//   columnHeaderHeight={50}
//   rowHeight={40}
//   disableRowSelectionOnClick
//   hideFooterPagination
//   hideFooterSelectedRowCount
//   sx={{
//     border: "1px solid #ddd",

//     "& .MuiDataGrid-columnHeaders": {
//       backgroundColor: "#1976d2 !important",
//     },

//     "& .MuiDataGrid-columnHeaderTitle": {
//       color: "#000",
//       fontWeight: "bold",
//       fontSize: "14px",
//     },

//     "& .MuiDataGrid-footerContainer": {
//       display: "none",
//     },
//   }}
// />
//             </Box>

//            <Box
//   sx={{
//     mt: 1,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     p: 1,
//     background: "#f5f5f5",
//     borderRadius: 2,
//   }}
// >



//               <Button
//                 variant="contained"
//                 disabled={page === 1}
//                 onClick={() =>
//                   setPage(page - 1)
//                 }
//               >
//                 Previous
//               </Button>

//               <Typography
//   fontWeight="bold"
// >
//   Page {page} of {totalPages}
// </Typography>

//               <Button
//                 variant="contained"
//                 disabled={
//   page >= totalPages
// }
//                 onClick={() =>
//                   setPage(page + 1)
//                 }
//               >
//                 Next
//               </Button>
//             </Box>
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default InwardReport;






































import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";

function InwardReport() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [totalRecords, setTotalRecords] =
 
    useState(0);


    const API_URL = process.env.REACT_APP_API_BASE_URL;

console.log("Inward Report API URL:", API_URL);



const PAGE_SIZE = 1000;

  useEffect(() => {
    loadData();
  }, [page]);


  const totalPages =
  Math.ceil(
    totalRecords / PAGE_SIZE
  );


const startRecord =
  (page - 1) * PAGE_SIZE + 1;

const endRecord =
  Math.min(
    page * PAGE_SIZE,
    totalRecords
  );



  const loadData = async () => {

    try {

      setLoading(true);

 const response = await axios.get(
  `${API_URL}/inward-full-report` +
    `?page=${page}&limit=${PAGE_SIZE}`
);

      setData(
        response.data.data || []
      );

      setTotalRecords(
        response.data.totalRecords || 0
      );

    } catch (err) {

      console.log(err);

      setData([]);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // Dynamic Columns
  // =========================

  const columns = [];

  if (data.length > 0) {

    // TInwardDetails Columns

    Object.keys(data[0])
      .filter(
        (key) =>
          key !== "_id" &&
          key !== "Master"
      )
      .forEach((key) => {

        columns.push({
          field: key,
          headerName: key,
          width: 180,
        });

      });

    // Master Columns

    if (data[0].Master) {

      Object.keys(
        data[0].Master
      )
        .filter(
          (key) => key !== "_id"
        )
        .forEach((key) => {

          columns.push({
            field: `Master_${key}`,
            headerName: `Master ${key}`,
            width: 180,
          });

        });

    }
  }

  // =========================
  // Flatten Data
  // =========================



// =========================
// Flatten Data
// =========================

console.log("Data Length =>", data.length);

if (data.length > 0) {
  console.log("First Record =>", data[0]);
}

console.log("Columns =>", columns);

const rows = data.map(


    (row, index) => ({

      id:
        row._id ||
        `${page}-${index}`,

      ...row,

      Master_InwardNo:
        row.Master?.InwardNo || "",

      Master_InwardDate:
        row.Master?.InwardDate || "",

      Master_CustomerID:
        row.Master?.CustomerID || "",

      Master_CustomerDCNo:
        row.Master?.CustomerDCNo || "",

      Master_CustomerDCDate:
        row.Master?.CustomerDCDate || "",

      Master_CustomerPONo:
        row.Master?.CustomerPONo || "",

      Master_CustomerPODate:
        row.Master?.CustomerPODate || "",
    })
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          height: "calc(100vh - 50px)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
        >
          Full Inward Report
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          fontWeight="bold"
          mb={2}
        >
          Total Records :
          {" "}
          {totalRecords}
        </Typography>

        <Typography
  variant="h6"
  fontWeight="bold"
  color="success.main"
  mb={2}
>
  Showing Records :
  {startRecord} - {endRecord}
</Typography>



        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent:
                "center",
              mt: 10,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>

          <Box
  sx={{
    height: "65vh",
    width: "100%",
  }}
>
            <DataGrid
  rows={rows}
  columns={columns}
  columnHeaderHeight={50}
  rowHeight={40}
  disableRowSelectionOnClick
  hideFooterPagination
  hideFooterSelectedRowCount
  sx={{
    border: "1px solid #ddd",

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#1976d2 !important",
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      color: "#000",
      fontWeight: "bold",
      fontSize: "14px",
    },

    "& .MuiDataGrid-footerContainer": {
      display: "none",
    },
  }}
/>
            </Box>

           <Box
  sx={{
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 1,
    background: "#f5f5f5",
    borderRadius: 2,
  }}
>



              <Button
                variant="contained"
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
              >
                Previous
              </Button>

              <Typography
  fontWeight="bold"
>
  Page {page} of {totalPages}
</Typography>

              <Button
                variant="contained"
                disabled={
  page >= totalPages
}
                onClick={() =>
                  setPage(page + 1)
                }
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default InwardReport;