
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
 
//   Button,
//   CircularProgress,
  
// } from "@mui/material";


// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { useNavigate } from "react-router-dom";

// function MasterList() {

//   const navigate = useNavigate();

//   const customer = JSON.parse(
//     localStorage.getItem("customer") || "{}"
//   );

//   const customerId = customer?.CustomerID;

//   const [loading, setLoading] = useState(false);

//   // Initialized with empty array to prevent undefined map errors
//   const [rows, setRows] = useState([]);

//  const loadMasterList = async () => {
//   try {
//     setLoading(true);

//     const res = await axios.get(
//       `http://localhost:5000/api/master-list?customerId=${customerId}`
//     );

//     console.log("========== Response ==========");
//     console.log(res);
//     console.log(res.data);

//     // API मधून आलेला data
//   const data = res.data?.data || [];

// console.log("Master Records :", data.length);

// console.log("========== First 20 Records ==========");
// console.table(
//   data.slice(0, 20).map((item, index) => ({
//     SrNo: index + 1,
//     InwardNo: item.InwardNo,
//     InwardDate: item.InwardDate,
//     LABIDNo: item.LABIDNo,
//     Description: item.Description,
//     GaugeIDNo: item.GaugeIDNo,

//     // Size / Range / L.C.
//     GIRangeFrom: item.GIRangeFrom,
//     GIRangeTo: item.GIRangeTo,
//     GIRangeUnit: item.GIRangeUnit,

//     GILC: item.GILC,
//     GILCUnit: item.GILCUnit,

//     STDSpecification: item.STDSpecification,

//     GoSize: item.GoSize,
//     NoGoSize: item.NoGoSize,
//     SizeUnit: item.SizeUnit,

//     // Dates
//     CalibratedOn: item.CalibratedOn,
//     NextDueOn: item.NextDueOn
//   }))
// );

// setRows(data);
   

   

//     // Table मध्ये data दाखवण्यासाठी
//     setRows(data);

//   } catch (err) {

//     console.error("Error loading master list:", err);

//   } finally {

//     setLoading(false);

//   }
// };

//   useEffect(()=>{
//     if(customerId){
//         loadMasterList();
//     }
//   }, [customerId]);

//   // Robust filter logic with optional chaining


// const filteredRows = rows;



//   const formatDate = (date) => {
//     if(!date) return "-";
//     return new Date(date).toLocaleDateString("en-GB");
//   };


//   const getSizeRange = (item) => {

//   const type = (item.Description || "").toUpperCase();

//   // -----------------------------
//   // 1. GO / NO GO Gauges
//   // -----------------------------
//   if (
//     type.includes("PLUG GAUGE") ||
//     type.includes("WIDTH GAUGE") ||
//     type.includes("SNAP GAUGE") ||
//     type.includes("PIN TYPE SNAP") ||
//     type.includes("FLUSH PIN") ||
//     type.includes("PADDLE") ||
//     type.includes("PLUG CUM DEPTH") ||
//     type.includes("PLUG CUM WIDTH") ||
//     type.includes("BALL PLUG")
//   ) {
//     return `Go : ${item.GoSize || "-"} mm
// No Go : ${item.NoGoSize || "-"} mm`;
//   }

//   // -----------------------------
//   // 2. Size Only
//   // -----------------------------
//   if (
//     type.includes("RING GAUGE") ||
//     type.includes("SETTING MASTER") ||
//     type.includes("SETTING MASTER (ID)") ||
//     type.includes("SETTING MASTER (OD)") ||
//     type.includes("SETTING MASTER (PLUG)") ||
//     type.includes("SETTING MASTER (SPECIAL") ||
//     type.includes("MICROMETER SETTING MASTER") ||
//     type.includes("CYLINDRICAL SETTING MASTER") ||
//     type.includes("HEIGHT BLOCK") ||
//     type.includes("HEIGHT MASTER") ||
//     type.includes("OD MASTER") ||
//     type.includes("O. D. MASTER") ||
//     type.includes("PIN GAUGE")
//   ) {
//     return `Size : ${item.STDSpecification || "-"}`;
//   }

//   // -----------------------------
//   // 3. Plunger / Lever Dial
//   // -----------------------------
//   if (
//     type.includes("PLUNGER DIAL") ||
//     type.includes("LEVER DIAL")
//   ) {
//     return `Range : ${item.STDSpecification || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
//   }

//   // -----------------------------
//   // 4. Bore / Dial Comparator
//   // -----------------------------
//   if (
//     type.includes("BORE GAUGE") ||
//     type.includes("SNAP DIAL") ||
//     type.includes("DIAL SNAP") ||
//     type.includes("INTERNAL DIAL") ||
//     type.includes("INT. DIAL") ||
//     type.includes("DIAL COMP")
//   ) {
//     return `Range : ${item.STDSpecification || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
//   }

//   // -----------------------------
//   // 5. Vernier / Micrometer
//   // -----------------------------
//   if (
//     type.includes("VERNIER") ||
//     type.includes("CALIPER") ||
//     type.includes("MICROMETER") ||
//     type.includes("DIGITAL") ||
//     type.includes("HEIGHT GAUGE") ||
//     type.includes("DEPTH GAUGE") ||
//     type.includes("INSIDE CALIPER")
//   ) {
//     return `Range : ${item.STDSpecification || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
//   }

//   // -----------------------------
//   // 6. Thread Gauges
//   // -----------------------------
//   if (
//     type.includes("THREAD PLUG") ||
//     type.includes("TAPER THREAD") ||
//     type.includes("THREAD CUM") ||
//     type.includes("THREAD")
//   ) {
//     return `Size : ${item.STDSpecification || "-"}`;
//   }

//   // -----------------------------
//   // Default
//   // -----------------------------
//   return `Range : ${item.GIRangeFrom || "-"} - ${item.GIRangeTo || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
// };


//   return (
// <Box
// sx={{
// background:"#edf3ff",
// minHeight:"100vh",
// p:2
// }}
// >

//       <Paper sx={{ p: 4, borderRadius: 4 }}>
       

//        <Box
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//     mt={3}
//     mb={3}
// >

//     <Button
//         variant="contained"
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate("/dashboard")}
//     >
//         Back
//     </Button>

//     <Typography
//         variant="h4"
//         fontWeight="bold"
//         color="#1565c0"
//     >
//         MASTER LIST OF INSTRUMENTS & GAUGES
//     </Typography>

//     <Box width={100}></Box>

// </Box>

// <Typography
//     sx={{
//         fontWeight:600,
//         fontSize:18,
//         mb:2
//     }}
// >
//     Customer : {customer?.Customer}
// </Typography>

//         {loading ? (
//           <Box display="flex" justifyContent="center" py={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//          <TableContainer
// component={Paper}
// variant="outlined"
// sx={{
// maxHeight:"75vh"
// }}
// >
//            <Table
// size="small"
// >
//              <TableHead>
//   <TableRow
//     sx={{
//       backgroundColor: "#ffffff",
//     }}
//   >
//     <TableCell
//       sx={{
//         width: "60px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Sr No</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "260px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Description</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "170px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Code No</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "240px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//         whiteSpace: "nowrap",
//       }}
//     >
//       <strong>Size / Range / L.C.</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "140px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Calibrated On</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "140px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Calibration Due</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "70px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//         textAlign: "center",
//       }}
//     >
//       <strong>Remark</strong>
//     </TableCell>
//   </TableRow>
// </TableHead>
//              <TableBody>
//   {filteredRows.length > 0 ? (
//     filteredRows.map((item, index) => (
//       <TableRow
// key={`${item.GaugeIDNo}-${item.InwardNo}-${item.InwardDate}`}
// sx={{
// height:34
// }}
// >

//         {/* Sr No */}
//         <TableCell
// sx={{
// py:0.5,
// px:1
// }}
// >{index + 1}</TableCell>

//         {/* Description */}
//         <TableCell
// sx={{
// py:0.5,
// px:1
// }}
// >{item.Description || "-"}</TableCell>

//         {/* Code No */}
//         <TableCell
// sx={{
// py:0.5,
// px:1
// }}
// >{item.GaugeIDNo || "-"}</TableCell>

//         {/* Size / Range / L.C */}

//      <TableCell
//   sx={{
//     padding: "6px",
//     whiteSpace: "pre-line"
//   }}
// >
//   {getSizeRange(item)}
// </TableCell>

//         {/* Calibrated On */}
//         <TableCell
// sx={{
// padding:"8px"
// }}
// >
//           {formatDate(item.CalibratedOn)}
//         </TableCell>

//         {/* Calibration Due */}
//         <TableCell>
//           {formatDate(item.NextDueOn)}
//         </TableCell>

//         {/* Remark */}
//         <TableCell></TableCell>

//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={7} align="center">
//         No Records Found
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default MasterList;











// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
 
//   Button,
//   CircularProgress,
  
// } from "@mui/material";


// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { useNavigate } from "react-router-dom";

// function MasterList() {

//   const navigate = useNavigate();

//   const API_URL = process.env.REACT_APP_API_BASE_URL;

//   const customer = JSON.parse(
//     localStorage.getItem("customer") || "{}"
//   );




//   console.log("========== LOGGED-IN CUSTOMER ==========");
// console.log("Customer Name:", customer?.Customer);
// console.log("Customer ID:", customerId);
// console.log("========================================");

//   const customerId = customer?.CustomerID;

//   const [loading, setLoading] = useState(false);

//   // Initialized with empty array to prevent undefined map errors
//   const [rows, setRows] = useState([]);

//  const loadMasterList = async () => {
//   try {
//     setLoading(true);

//    const res = await axios.get(
//   `${API_URL}/master-list`,
//   {
//     params: {
//       customerId: customerId,
//     },
//   }
// );

//     console.log("========== Response ==========");
//     console.log(res);
//     console.log(res.data);

//     // API मधून आलेला data
//   const data = res.data?.data || [];

// console.log("Master Records :", data.length);

// console.log("========== First 20 Records ==========");
// console.table(
//   data.slice(0, 20).map((item, index) => ({
//     SrNo: index + 1,
//     InwardNo: item.InwardNo,
//     InwardDate: item.InwardDate,
//     LABIDNo: item.LABIDNo,
//     Description: item.Description,
//     GaugeIDNo: item.GaugeIDNo,

//     // Size / Range / L.C.
//     GIRangeFrom: item.GIRangeFrom,
//     GIRangeTo: item.GIRangeTo,
//     GIRangeUnit: item.GIRangeUnit,

//     GILC: item.GILC,
//     GILCUnit: item.GILCUnit,

//     STDSpecification: item.STDSpecification,

//     GoSize: item.GoSize,
//     NoGoSize: item.NoGoSize,
//     SizeUnit: item.SizeUnit,

//     // Dates
//     CalibratedOn: item.CalibratedOn,
//     NextDueOn: item.NextDueOn
//   }))
// );

// setRows(data);
   

   

//     // Table मध्ये data दाखवण्यासाठी
//     setRows(data);

//   } catch (err) {

//     console.error("Error loading master list:", err);

//   } finally {

//     setLoading(false);

//   }
// };

//   useEffect(()=>{
//     if(customerId){
//         loadMasterList();
//     }
//   }, [customerId]);

//   // Robust filter logic with optional chaining


// const filteredRows = rows;



//   const formatDate = (date) => {
//     if(!date) return "-";
//     return new Date(date).toLocaleDateString("en-GB");
//   };


//   const getSizeRange = (item) => {

//   const type = (item.Description || "").toUpperCase();

//   // -----------------------------
//   // 1. GO / NO GO Gauges
//   // -----------------------------
//   if (
//     type.includes("PLUG GAUGE") ||
//     type.includes("WIDTH GAUGE") ||
//     type.includes("SNAP GAUGE") ||
//     type.includes("PIN TYPE SNAP") ||
//     type.includes("FLUSH PIN") ||
//     type.includes("PADDLE") ||
//     type.includes("PLUG CUM DEPTH") ||
//     type.includes("PLUG CUM WIDTH") ||
//     type.includes("BALL PLUG")
//   ) {
//     return `Go : ${item.GoSize || "-"} mm
// No Go : ${item.NoGoSize || "-"} mm`;
//   }

//   // -----------------------------
//   // 2. Size Only
//   // -----------------------------
//   if (
//     type.includes("RING GAUGE") ||
//     type.includes("SETTING MASTER") ||
//     type.includes("SETTING MASTER (ID)") ||
//     type.includes("SETTING MASTER (OD)") ||
//     type.includes("SETTING MASTER (PLUG)") ||
//     type.includes("SETTING MASTER (SPECIAL") ||
//     type.includes("MICROMETER SETTING MASTER") ||
//     type.includes("CYLINDRICAL SETTING MASTER") ||
//     type.includes("HEIGHT BLOCK") ||
//     type.includes("HEIGHT MASTER") ||
//     type.includes("OD MASTER") ||
//     type.includes("O. D. MASTER") ||
//     type.includes("PIN GAUGE")
//   ) {
//     return `Size : ${item.STDSpecification || "-"}`;
//   }

//   // -----------------------------
//   // 3. Plunger / Lever Dial
//   // -----------------------------
//   if (
//     type.includes("PLUNGER DIAL") ||
//     type.includes("LEVER DIAL")
//   ) {
//     return `Range : ${item.STDSpecification || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
//   }

//   // -----------------------------
//   // 4. Bore / Dial Comparator
//   // -----------------------------
//   if (
//     type.includes("BORE GAUGE") ||
//     type.includes("SNAP DIAL") ||
//     type.includes("DIAL SNAP") ||
//     type.includes("INTERNAL DIAL") ||
//     type.includes("INT. DIAL") ||
//     type.includes("DIAL COMP")
//   ) {
//     return `Range : ${item.STDSpecification || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
//   }

//   // -----------------------------
//   // 5. Vernier / Micrometer
//   // -----------------------------
//   if (
//     type.includes("VERNIER") ||
//     type.includes("CALIPER") ||
//     type.includes("MICROMETER") ||
//     type.includes("DIGITAL") ||
//     type.includes("HEIGHT GAUGE") ||
//     type.includes("DEPTH GAUGE") ||
//     type.includes("INSIDE CALIPER")
//   ) {
//     return `Range : ${item.STDSpecification || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
//   }

//   // -----------------------------
//   // 6. Thread Gauges
//   // -----------------------------
//   if (
//     type.includes("THREAD PLUG") ||
//     type.includes("TAPER THREAD") ||
//     type.includes("THREAD CUM") ||
//     type.includes("THREAD")
//   ) {
//     return `Size : ${item.STDSpecification || "-"}`;
//   }

//   // -----------------------------
//   // Default
//   // -----------------------------
//   return `Range : ${item.GIRangeFrom || "-"} - ${item.GIRangeTo || "-"} mm
// L.C : ${item.GILC || "-"} mm`;
// };


//   return (
// <Box
// sx={{
// background:"#edf3ff",
// minHeight:"100vh",
// p:2
// }}
// >

//       <Paper sx={{ p: 4, borderRadius: 4 }}>
       

//        <Box
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//     mt={3}
//     mb={3}
// >

//     <Button
//         variant="contained"
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate("/dashboard")}
//     >
//         Back
//     </Button>

//     <Typography
//         variant="h4"
//         fontWeight="bold"
//         color="#1565c0"
//     >
//         MASTER LIST OF INSTRUMENTS & GAUGES
//     </Typography>

//     <Box width={100}></Box>

// </Box>

// <Typography
//     sx={{
//         fontWeight:600,
//         fontSize:18,
//         mb:2
//     }}
// >
//     Customer : {customer?.Customer}
// </Typography>

//         {loading ? (
//           <Box display="flex" justifyContent="center" py={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//          <TableContainer
// component={Paper}
// variant="outlined"
// sx={{
// maxHeight:"75vh"
// }}
// >
//            <Table
// size="small"
// >
//              <TableHead>
//   <TableRow
//     sx={{
//       backgroundColor: "#ffffff",
//     }}
//   >
//     <TableCell
//       sx={{
//         width: "60px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Sr No</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "260px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Description</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "170px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Code No</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "240px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//         whiteSpace: "nowrap",
//       }}
//     >
//       <strong>Size / Range / L.C.</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "140px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Calibrated On</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "140px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//       }}
//     >
//       <strong>Calibration Due</strong>
//     </TableCell>

//     <TableCell
//       sx={{
//         width: "70px",
//         py: 1,
//         px: 1,
//         fontWeight: "bold",
//         fontSize: "15px",
//         textAlign: "center",
//       }}
//     >
//       <strong>Remark</strong>
//     </TableCell>
//   </TableRow>
// </TableHead>
//              <TableBody>
//   {filteredRows.length > 0 ? (
//     filteredRows.map((item, index) => (
//       <TableRow
// key={`${item.GaugeIDNo}-${item.InwardNo}-${item.InwardDate}`}
// sx={{
// height:34
// }}
// >

//         {/* Sr No */}
//         <TableCell
// sx={{
// py:0.5,
// px:1
// }}
// >{index + 1}</TableCell>

//         {/* Description */}
//         <TableCell
// sx={{
// py:0.5,
// px:1
// }}
// >{item.Description || "-"}</TableCell>

//         {/* Code No */}
//         <TableCell
// sx={{
// py:0.5,
// px:1
// }}
// >{item.GaugeIDNo || "-"}</TableCell>

//         {/* Size / Range / L.C */}

//      <TableCell
//   sx={{
//     padding: "6px",
//     whiteSpace: "pre-line"
//   }}
// >
//   {getSizeRange(item)}
// </TableCell>

//         {/* Calibrated On */}
//         <TableCell
// sx={{
// padding:"8px"
// }}
// >
//           {formatDate(item.CalibratedOn)}
//         </TableCell>

//         {/* Calibration Due */}
//         <TableCell>
//           {formatDate(item.NextDueOn)}
//         </TableCell>

//         {/* Remark */}
//         <TableCell></TableCell>

//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={7} align="center">
//         No Records Found
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default MasterList;












import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";

import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function MasterList() {
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const customer = JSON.parse(
    localStorage.getItem("customer") || "{}"
  );

  const customerId = customer?.CustomerID;

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  // LOAD MASTER LIST
  const loadMasterList = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/master-list`, {
        params: {
          customerId: customerId,
        },
      });

      const data = res.data?.data || [];

      console.log("Customer ID:", customerId);
      console.log("Master Records:", data.length);

      setRows(data);
    } catch (err) {
      console.error("Error loading master list:", err);
      alert("Master List load करताना error आला.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      loadMasterList();
    }
  }, [customerId]);

  const filteredRows = rows;

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB");
  };

  // SIZE / RANGE / L.C. LOGIC
  const getSizeRange = (item) => {
    const type = (item.Description || "").toUpperCase();

    // 1. GO / NO GO GAUGES
    if (
      type.includes("PLUG GAUGE") ||
      type.includes("WIDTH GAUGE") ||
      type.includes("SNAP GAUGE") ||
      type.includes("PIN TYPE SNAP") ||
      type.includes("FLUSH PIN") ||
      type.includes("PADDLE") ||
      type.includes("PLUG CUM DEPTH") ||
      type.includes("PLUG CUM WIDTH") ||
      type.includes("BALL PLUG")
    ) {
      return `Go : ${item.GoSize || "-"} mm
No Go : ${item.NoGoSize || "-"} mm`;
    }

    // 2. SIZE ONLY
    if (
      type.includes("RING GAUGE") ||
      type.includes("SETTING MASTER") ||
      type.includes("SETTING MASTER (ID)") ||
      type.includes("SETTING MASTER (OD)") ||
      type.includes("SETTING MASTER (PLUG)") ||
      type.includes("SETTING MASTER (SPECIAL") ||
      type.includes("MICROMETER SETTING MASTER") ||
      type.includes("CYLINDRICAL SETTING MASTER") ||
      type.includes("HEIGHT BLOCK") ||
      type.includes("HEIGHT MASTER") ||
      type.includes("OD MASTER") ||
      type.includes("O. D. MASTER") ||
      type.includes("PIN GAUGE")
    ) {
      return `Size : ${item.STDSpecification || "-"}`;
    }

    // 3. PLUNGER / LEVER DIAL
    if (
      type.includes("PLUNGER DIAL") ||
      type.includes("LEVER DIAL")
    ) {
      return `Range : ${item.STDSpecification || "-"} mm
L.C : ${item.GILC || "-"} mm`;
    }

    // 4. BORE / DIAL COMPARATOR
    if (
      type.includes("BORE GAUGE") ||
      type.includes("SNAP DIAL") ||
      type.includes("DIAL SNAP") ||
      type.includes("INTERNAL DIAL") ||
      type.includes("INT. DIAL") ||
      type.includes("DIAL COMP")
    ) {
      return `Range : ${item.STDSpecification || "-"} mm
L.C : ${item.GILC || "-"} mm`;
    }

    // 5. VERNIER / MICROMETER
    if (
      type.includes("VERNIER") ||
      type.includes("CALIPER") ||
      type.includes("MICROMETER") ||
      type.includes("DIGITAL") ||
      type.includes("HEIGHT GAUGE") ||
      type.includes("DEPTH GAUGE") ||
      type.includes("INSIDE CALIPER")
    ) {
      return `Range : ${item.STDSpecification || "-"} mm
L.C : ${item.GILC || "-"} mm`;
    }

    // 6. THREAD GAUGES
    if (
      type.includes("THREAD PLUG") ||
      type.includes("TAPER THREAD") ||
      type.includes("THREAD CUM") ||
      type.includes("THREAD")
    ) {
      return `Size : ${item.STDSpecification || "-"}`;
    }

    // DEFAULT
    return `Range : ${item.GIRangeFrom || "-"} - ${
      item.GIRangeTo || "-"
    } mm
L.C : ${item.GILC || "-"} mm`;
  };

  // ESCAPE HTML VALUES FOR PRINT
  const escapeHtml = (value) => {
    return String(value ?? "-")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  // PRINT MASTER LIST IN NEW TAB
  const handlePrint = () => {
    if (loading) {
      alert("Please wait until the Master List finishes loading.");
      return;
    }

    if (!filteredRows.length) {
      alert("Print करण्यासाठी records उपलब्ध नाहीत.");
      return;
    }

    // Open synchronously to reduce popup blocking
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert(
        "New tab open होत नाही. Browser settings मध्ये pop-ups allow करा."
      );
      return;
    }

    const tableRows = filteredRows
      .map(
        (item, index) => `
          <tr>
            <td class="sr">${index + 1}</td>
            <td>${escapeHtml(item.Description || "-")}</td>
            <td>${escapeHtml(item.GaugeIDNo || "-")}</td>
            <td class="size">${escapeHtml(getSizeRange(item))}</td>
            <td>${escapeHtml(formatDate(item.CalibratedOn))}</td>
            <td>${escapeHtml(formatDate(item.NextDueOn))}</td>
            <td>${escapeHtml(item.Remark || "-")}</td>
          </tr>
        `
      )
      .join("");

    const printHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <title>Master List - ${escapeHtml(
            customer?.Customer || "Customer"
          )}</title>

          <style>
            @page {
              size: A4 landscape;
              margin: 10mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              font-family: Arial, sans-serif;
              color: #111;
              margin: 0;
              padding: 15px;
            }

            h2 {
              text-align: center;
              font-size: 18px;
              margin: 0 0 16px;
            }

            .customer-info {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 8px 16px;
              font-size: 11px;
              margin-bottom: 14px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
            }

            th, td {
              border: 1px solid #555;
              padding: 5px;
              text-align: left;
              font-size: 10px;
              overflow-wrap: anywhere;
              vertical-align: top;
            }

            th {
              background-color: #e9ecef;
              font-weight: bold;
            }

            th:nth-child(1), td:nth-child(1) {
              width: 5%;
              text-align: center;
            }

            th:nth-child(2), td:nth-child(2) {
              width: 20%;
            }

            th:nth-child(3), td:nth-child(3) {
              width: 13%;
            }

            th:nth-child(4), td:nth-child(4) {
              width: 23%;
            }

            th:nth-child(5), td:nth-child(5),
            th:nth-child(6), td:nth-child(6) {
              width: 12%;
            }

            th:nth-child(7), td:nth-child(7) {
              width: 8%;
            }

            td.size {
              white-space: pre-line;
            }

            thead {
              display: table-header-group;
            }

            tr {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .print-button {
              display: block;
              margin: 0 auto 15px;
              padding: 9px 18px;
              border: none;
              border-radius: 4px;
              background: #1976d2;
              color: white;
              font-size: 14px;
              cursor: pointer;
            }

            @media print {
              body {
                padding: 0;
              }

              .print-button {
                display: none !important;
              }

              th {
                background: #e9ecef !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>

        <body>
          <button
            class="print-button"
            onclick="window.print()"
          >
            Print / Save as PDF
          </button>

          <h2>MASTER LIST OF INSTRUMENTS &amp; GAUGES</h2>

          <div class="customer-info">
            <div>
              <strong>Customer:</strong>
              ${escapeHtml(customer?.Customer || "-")}
            </div>

            <div>
              <strong>Customer ID:</strong>
              ${escapeHtml(customerId || "-")}
            </div>

            <div>
              <strong>Total Records:</strong>
              ${filteredRows.length}
            </div>

            <div>
              <strong>Print Date:</strong>
              ${escapeHtml(new Date().toLocaleDateString("en-GB"))}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Description</th>
                <th>Code No</th>
                <th>Size / Range / L.C.</th>
                <th>Calibrated On</th>
                <th>Calibration Due</th>
                <th>Remark</th>
              </tr>
            </thead>

            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <script>
            window.onload = function () {
              setTimeout(function () {
                window.focus();
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  // DIRECT DOWNLOAD PDF
  const handleDownloadPDF = () => {
    if (loading) {
      alert("Please wait until the Master List finishes loading.");
      return;
    }

    if (!filteredRows.length) {
      alert("Download करण्यासाठी records उपलब्ध नाहीत.");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "MASTER LIST OF INSTRUMENTS & GAUGES",
        pageWidth / 2,
        14,
        { align: "center" }
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      doc.text(
        `Customer: ${customer?.Customer || "-"}`,
        10,
        22
      );

      doc.text(
        `Customer ID: ${customerId || "-"}`,
        10,
        28
      );

      doc.text(
        `Total Records: ${filteredRows.length}`,
        pageWidth - 10,
        22,
        { align: "right" }
      );

      doc.text(
        `Print Date: ${new Date().toLocaleDateString("en-GB")}`,
        pageWidth - 10,
        28,
        { align: "right" }
      );

      const tableBody = filteredRows.map((item, index) => [
        index + 1,
        item.Description || "-",
        item.GaugeIDNo || "-",
        getSizeRange(item),
        formatDate(item.CalibratedOn),
        formatDate(item.NextDueOn),
        item.Remark || "-",
      ]);

      autoTable(doc, {
        startY: 34,

        head: [
          [
            "Sr No",
            "Description",
            "Code No",
            "Size / Range / L.C.",
            "Calibrated On",
            "Calibration Due",
            "Remark",
          ],
        ],

        body: tableBody,

        theme: "grid",

        styles: {
          font: "helvetica",
          fontSize: 7.5,
          cellPadding: 2,
          overflow: "linebreak",
          valign: "middle",
        },

        headStyles: {
          fillColor: [233, 236, 239],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          halign: "left",
        },

        columnStyles: {
          0: { cellWidth: 12 },
          1: { cellWidth: 43 },
          2: { cellWidth: 30 },
          3: { cellWidth: 55 },
          4: { cellWidth: 30 },
          5: { cellWidth: 30 },
          6: { cellWidth: 20 },
        },

        margin: {
          left: 10,
          right: 10,
          bottom: 12,
        },

        didDrawPage: () => {
          const pageHeight = doc.internal.pageSize.getHeight();
          const currentPage = doc.internal.getCurrentPageInfo().pageNumber;

          doc.setFontSize(8);
          doc.setFont("helvetica", "normal");

          doc.text(
            `Page ${currentPage}`,
            pageWidth - 10,
            pageHeight - 5,
            { align: "right" }
          );
        },
      });

      const safeCustomerName = String(
        customer?.Customer || "Customer"
      ).replace(/[^a-z0-9_-]/gi, "_");

      doc.save(`MasterList_${safeCustomerName}.pdf`);
    } catch (error) {
      console.error("PDF download error:", error);
      alert("PDF तयार करताना error आला.");
    }
  };

  return (
    <Box
      sx={{
        background: "#edf3ff",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          mt={3}
          mb={3}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard")}
          >
            Back
          </Button>

          <Typography
            variant="h4"
            fontWeight="bold"
            color="#1565c0"
          >
            MASTER LIST OF INSTRUMENTS &amp; GAUGES
          </Typography>

          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="contained"
              color="success"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              disabled={loading || filteredRows.length === 0}
            >
              Print
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPDF}
              disabled={loading || filteredRows.length === 0}
            >
              Download PDF
            </Button>
          </Box>
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            mb: 2,
          }}
        >
          Customer : {customer?.Customer || "-"}
        </Typography>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 16,
            mb: 2,
          }}
        >
          Customer ID: {customerId || "-"}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              maxHeight: "75vh",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "60px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Sr No</strong>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "260px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Description</strong>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "170px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Code No</strong>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "240px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Size / Range / L.C.</strong>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "140px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Calibrated On</strong>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "140px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Calibration Due</strong>
                  </TableCell>

                  <TableCell
                    sx={{
                      width: "70px",
                      py: 1,
                      px: 1,
                      fontWeight: "bold",
                      fontSize: "15px",
                      textAlign: "center",
                      backgroundColor: "#e9ecef",
                    }}
                  >
                    <strong>Remark</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((item, index) => (
                    <TableRow
                      key={`${item.GaugeIDNo}-${item.InwardNo}-${item.InwardDate}`}
                      sx={{ height: 34 }}
                    >
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {index + 1}
                      </TableCell>

                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {item.Description || "-"}
                      </TableCell>

                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {item.GaugeIDNo || "-"}
                      </TableCell>

                      <TableCell
                        sx={{
                          padding: "6px",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {getSizeRange(item)}
                      </TableCell>

                      <TableCell sx={{ padding: "8px" }}>
                        {formatDate(item.CalibratedOn)}
                      </TableCell>

                      <TableCell>
                        {formatDate(item.NextDueOn)}
                      </TableCell>

                      <TableCell>
                        {item.Remark || "-"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No Records Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}

export default MasterList;