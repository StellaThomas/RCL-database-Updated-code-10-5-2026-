

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Divider,
//   TableContainer,
// } from "@mui/material";

// function HistoryCard() {
//   const navigate = useNavigate();

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [gaugeNo, setGaugeNo] = useState("");
//   const [header, setHeader] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // =====================================================
//   // CUSTOMER
//   // =====================================================

//   const customerData = localStorage.getItem("customer");
//   const customer = customerData
//     ? JSON.parse(customerData)
//     : {};

//   const customerId = customer.CustomerID;

//   // =====================================================
//   // LOGIN CHECK
//   // =====================================================

//   if (!customer.CustomerID) {
//     navigate("/");
//     return null;
//   }

//   // =====================================================
//   // LOAD HISTORY
//   // =====================================================

//   const loadHistory = async () => {
//     console.log("=================================");
//     console.log("Search Button Clicked");
//     console.log("Gauge =", gaugeNo);
//     console.log("Customer =", customerId);

//     if (!gaugeNo.trim()) {
//       alert("Please Enter Gauge Code");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("Calling API...");

//       const res = await axios.get(
//         `http://localhost:5000/api/history-card?customerId=${customerId}&gaugeNo=${encodeURIComponent(
//           gaugeNo.trim()
//         )}`
//       );

//       console.log("API Response =", res);
//       console.log("Success =", res.data.success);
//       console.log("Header =", res.data.header);
//       console.log("History =", res.data.history);
//       console.log(
//         "History Count =",
//         res.data.history?.length
//       );

//       if (!res.data.success) {
//         setHeader(null);
//         setHistory([]);

//         alert("No History Found");
//         return;
//       }

//       setHeader(res.data.header || null);
//       setHistory(res.data.history || []);


//       console.log(
//   "FINAL HEADER FORMAT5 =",
//   res.data.header?.Format5Info
// );

// console.log(
//   "FINAL HISTORY FORMAT5 =",
//   res.data.history?.[0]?.Format5Info
// );

//       console.log("=================================");
//     } catch (err) {
//       console.log("========== ERROR ==========");
//       console.log(err);

//       if (err.response) {
//         console.log(
//           "Status =",
//           err.response.status
//         );

//         console.log(
//           "Response =",
//           err.response.data
//         );
//       } else {
//         console.log(
//           "Message =",
//           err.message
//         );
//       }

//       setHeader(null);
//       setHistory([]);

//       alert(
//         err.response?.data?.message ||
//           "Unable to Load History"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // GI TYPE
//   // =====================================================

//   const giType =
//     header?.GITypeInfo?.GIType
//       ?.trim()
//       .toUpperCase() || "";

//   // =====================================================
//   // SELECTED FORMAT
//   //
//   // Backend sends:
//   //
//   // FORMAT1
//   // FORMAT5
//   // FORMAT10
//   // =====================================================

//   const selectedFormat =
//     header?.SelectedFormat || "";

//   // =====================================================
//   // FORMAT NO.5 GAUGES
//   // =====================================================

//   const isFormat5Gauge =
//     selectedFormat === "FORMAT5" ||
//     giType.includes("PLUG GAUGE") ||
//     giType.includes("WIDTH GAUGE") ||
//     giType.includes("SNAP GAUGE") ||
//     giType.includes("FLUSH PIN GAUGE") ||
//     giType.includes("PADDLE GAUGE");

//   // =====================================================
//   // FORMAT NO.10 GAUGES
//   // =====================================================

//   const isFormat10Gauge =
//     selectedFormat === "FORMAT10" ||
//     giType.includes("THREAD PLUG GAUGE") ||
//     giType.includes("TAPER THREAD GAUGE");

//   // =====================================================
//   // RING GAUGE
//   //
//   // ONLY RING GAUGE
//   //
//   // Format No.1
//   // =====================================================

//   const isRingGauge =
//     selectedFormat === "FORMAT1" ||
//     giType.includes("RING GAUGE");

//   // =====================================================
//   // PLUNGER DIAL
//   // =====================================================

//   const isPlungerDial =
//     giType.includes("PLUNGER DIAL") ||
//     giType.includes("LEVER DIAL");

//   // =====================================================
//   // BORE GAUGE
//   // =====================================================

//   const isBoreGauge =
//     giType.includes("BORE GAUGE") ||
//     giType.includes("DIAL SNAP GAUGE") ||
//     giType.includes(
//       "INTERNAL DIAL COMPARATOR"
//     ) ||
//     giType.includes(
//       "INTERNAL DIAL COMPARATOR GAUGE"
//     );

//   // =====================================================
//   // VERNIER
//   // =====================================================

//   const isVernier =
//     giType.includes("VERNIER CALLIPER") ||
//     giType.includes("MICROMETER") ||
//     giType.includes("MICROMETERS") ||
//     giType.includes("DIGITAL CALIPER") ||
//     giType.includes("DIGITAL DEPTH GAUGE") ||
//     giType.includes("DIGITAL HEIGHT GAUGE") ||
//     giType.includes("VERNIER HEIGHT GAUGE") ||
//     giType.includes("VERNIER DEPTH GAUGE");

//   // =====================================================
//   // FORMAT VALUE HELPER
//   // =====================================================

//   const showValue = (value) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === ""
//     ) {
//       return "-";
//     }

//     return value;
//   };

//   // =====================================================
//   // DATE FORMAT
//   // =====================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (
//       Number.isNaN(parsedDate.getTime())
//     ) {
//       return "-";
//     }

//     return parsedDate.toLocaleDateString(
//       "en-GB"
//     );
//   };

//   // =====================================================
//   // PDF
//   // =====================================================

//   const openPdf = (item) => {
//     if (!item?.CalCertificateNo) {
//       alert("PDF Not Available");
//       return;
//     }

//     const certificateNo =
//       item.CalCertificateNo.trim();

//     const fileName =
//       certificateNo.replace(/\//g, "-");

//     const pdfUrl = `http://localhost:5000/certificates/${encodeURIComponent(
//       fileName
//     )}.pdf`;

//     console.log(
//       "Certificate No:",
//       certificateNo
//     );

//     console.log(
//       "PDF File Name:",
//       `${fileName}.pdf`
//     );

//     console.log(
//       "PDF URL:",
//       pdfUrl
//     );

//     window.open(pdfUrl, "_blank");
//   };

//   // =====================================================
//   // FORMAT NO.5 ACCEPTANCE CRITERIA
//   // =====================================================


// const renderFormat5AcceptanceCriteria = () => {
//   // First try header Format5Info
//   // If not available, take it from latest history record
//   const format5 =
//     header?.Format5Info ||
//     history?.[0]?.Format5Info ||
//     null;

//   console.log("========== FORMAT 5 UI ==========");
//   console.log("Header Format5Info =", header?.Format5Info);
//   console.log("History[0] Format5Info =", history?.[0]?.Format5Info);
//   console.log("Final Format5Info =", format5);

//   if (!format5) {
//     return (
//       <Typography
//         sx={{
//           fontSize: 15,
//           color: "red",
//         }}
//       >
//         Format 5 data not found
//       </Typography>
//     );
//   }

//   return (
//     <Box>

//       {/* ==============================
//           GO
//       ============================== */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go Size:</b>{" "}
//         {showValue(format5.GoSizeNew)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go Mfg Tol:</b>{" "}
//         {showValue(format5.GoSizeMfgTol)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go Wear Limit:</b>{" "}
//         {showValue(format5.GoSizeWearLimit)}
//       </Typography>

//       <Divider sx={{ my: 1 }} />

//       {/* ==============================
//           NO GO
//       ============================== */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go Size:</b>{" "}
//         {showValue(format5.NoGoSizeNew)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go Mfg Tol:</b>{" "}
//         {showValue(format5.NoGoSizeMfgTol)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go Wear Limit:</b>{" "}
//         {showValue(format5.NoGoSizeWearLimit)}
//       </Typography>

//     </Box>
//   );
// };

//   // =====================================================
//   // FORMAT NO.10 ACCEPTANCE CRITERIA
//   // =====================================================

//   const renderFormat10AcceptanceCriteria =
//     () => {
//       return (
//         <Typography
//           sx={{
//             fontSize: 16,
//             fontWeight: 500,
//             lineHeight: 2,
//           }}
//         >
//           {showValue(
//             header?.Format10Info
//               ?.SpecifiedSize
//           )}
//         </Typography>
//       );
//     };

//   // =====================================================
//   // ACCEPTANCE CRITERIA
//   // =====================================================

//   const renderAcceptanceCriteria =
//     () => {
//       if (isFormat5Gauge) {
//         return renderFormat5AcceptanceCriteria();
//       }

//       if (isFormat10Gauge) {
//         return renderFormat10AcceptanceCriteria();
//       }

//       return "-";
//     };

  
// // =====================================================
// // OBSERVATION
// // =====================================================

// const renderObservation = (item) => {
//   const itemFormat =
//     item?.SelectedFormat || "";

//   const itemGiType =
//     item?.GITypeInfo?.GIType
//       ?.trim()
//       .toUpperCase() || "";

//   // ===================================================
//   // FORMAT NO.1
//   // RING GAUGE
//   // ActualSize -> Observation
//   // ===================================================

//   if (
//     itemFormat === "FORMAT1" ||
//     itemGiType.includes("RING GAUGE")
//   ) {
//     return (
//       <Typography
//         sx={{
//           fontSize: 15,
//           fontWeight: 500,
//         }}
//       >
//         {showValue(
//           item?.Format1Info?.ActualSize
//         )}
//       </Typography>
//     );
//   }

//   // ===================================================
//   // FORMAT NO.10
//   // ActualSize -> Observation
//   // ===================================================

//   if (
//     itemFormat === "FORMAT10" ||
//     itemGiType.includes("THREAD PLUG GAUGE") ||
//     itemGiType.includes("TAPER THREAD GAUGE")
//   ) {
//     return (
//       <Typography
//         sx={{
//           fontSize: 15,
//           fontWeight: 500,
//         }}
//       >
//         {showValue(
//           item?.Format10Info?.ActualSize
//         )}
//       </Typography>
//     );
//   }

//   // ===================================================
//   // FORMAT NO.5
//   // PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH
//   //
//   // IMPORTANT:
//   // GoSize  -> Observation
//   // NoGoSize -> Observation
//   // ===================================================

//  // ===================================================
// // FORMAT NO.5
// // PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH
// //
// // Observation comes from:
// // TCalibrationDetailsFormatNo5
// //
// // Go:
// // GoSizeActual1 / GoSizeActual2
// //
// // No Go:
// // NoGoSizeActual1 / NoGoSizeActual2
// // ===================================================

// if (
//   itemFormat === "FORMAT5" ||
//   itemGiType.includes("PLUG GAUGE") ||
//   itemGiType.includes("WIDTH GAUGE") ||
//   itemGiType.includes("SNAP GAUGE") ||
//   itemGiType.includes("FLUSH PIN GAUGE") ||
//   itemGiType.includes("PADDLE GAUGE")
// ) {
//   const format5 = item?.Format5Info;

//   if (!format5) {
//     return "-";
//   }

//   return (
//     <Box>
//       {/* GO */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go:</b>{" "}
//         {showValue(
//           format5.GoSizeActual1
//         )}
//         {" / "}
//         {showValue(
//           format5.GoSizeActual2
//         )}
//       </Typography>

//       {/* NO GO */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go:</b>{" "}
//         {showValue(
//           format5.NoGoSizeActual1
//         )}
//         {" / "}
//         {showValue(
//           format5.NoGoSizeActual2
//         )}
//       </Typography>
//     </Box>
//   );
// }

//   return "-";
// };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b)",
//         p: 4,
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 4,
//           borderRadius: 3,
//         }}
//       >
//         {/* =================================================
//             CUSTOMER + SEARCH
//         ================================================= */}

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//             mb: 4,
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "22px",
//                 fontWeight: "bold",
//                 color: "#000",
//               }}
//             >
//               {header?.CustomerInfo?.Customer ||
//                 customer.Customer}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: "15px",
//                 color: "#444",
//                 mt: 0.5,
//               }}
//             >
//               {header?.CustomerInfo?.Address ||
//                 ""}

//               {header?.CustomerInfo?.City
//                 ? `, ${header.CustomerInfo.City}`
//                 : ""}
//             </Typography>
//           </Box>
//         </Box>

//         {/* =================================================
//             SEARCH
//         ================================================= */}

//         <Grid
//           container
//           spacing={2}
//           mb={4}
//         >
//           <Grid
//             item
//             xs={12}
//             md={8}
//           >
//             <TextField
//               fullWidth
//               label="Gauge Code No"
//               placeholder="Enter Gauge Code"
//               value={gaugeNo}
//               onChange={(e) =>
//                 setGaugeNo(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             md={4}
//           >
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 height: 56,
//                 fontSize: 18,
//                 fontWeight: "bold",
//               }}
//               onClick={loadHistory}
//               disabled={loading}
//             >
//               {loading
//                 ? "Searching..."
//                 : "SEARCH"}
//             </Button>
//           </Grid>
//         </Grid>

//         {/* =================================================
//             HISTORY CARD
//         ================================================= */}

//         {header && (
//           <Paper
//             elevation={6}
//             sx={{
//               p: 4,
//               borderRadius: 4,
//               border:
//                 "1px solid #d0d7de",
//               background: "#fff",
//             }}
//           >
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             <Grid
//               container
//               spacing={3}
//             >
//               {/* ===========================================
//                   LEFT COLUMN
//               =========================================== */}

//               <Grid
//                 item
//                 xs={12}
//                 md={4}
//               >
//                 <Typography sx={{ mb: 2 }}>
//                   <b>Description :</b>{" "}
//                   {header?.GITypeInfo
//                     ?.GIType || "-"}
//                 </Typography>

//                 <Typography sx={{ mb: 2 }}>
//                   <b>MFG Sr No :</b>{" "}
//                   {header.MFGSrNo || "-"}
//                 </Typography>

//                 <Typography sx={{ mb: 2 }}>
//                   <b>
//                     Calibration Frequency :
//                   </b>{" "}
//                   {header.Frequency != null &&
//                   header.Frequency !== ""
//                     ? `${header.Frequency} Months`
//                     : "-"}
//                 </Typography>
//               </Grid>

//               {/* ===========================================
//                   CENTER COLUMN
//               =========================================== */}

//               <Grid
//                 item
//                 xs={12}
//                 md={4}
//               >
//                 {/* CODE NO */}

//                 <Typography sx={{ mb: 2 }}>
//                   <b>Code No :</b>{" "}
//                   {header.GaugeIDNo || "-"}
//                 </Typography>

//                 {/* MAKE */}

//                 <Typography sx={{ mb: 2 }}>
//                   <b>Make :</b>{" "}
//                   {header.Make || "-"}
//                 </Typography>

//                 {/* =========================================
//                     FORMAT 5
//                 ========================================= */}

//                 {isFormat5Gauge && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>Go Size :</b>{" "}
//                       {header.GoSize != null
//                         ? `${header.GoSize} mm`
//                         : "-"}
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>No Go Size :</b>{" "}
//                       {header.NoGoSize != null
//                         ? `${header.NoGoSize} mm`
//                         : "-"}
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     RING GAUGE
//                     FORMAT NO.1
//                 ========================================= */}

//                 {isRingGauge && (
//                   <Typography
//                     sx={{ mb: 2 }}
//                   >
//                     <b>Size :</b>{" "}
//                     {header?.Format1Info
//                       ?.GaugeSize != null
//                       ? `${header.Format1Info.GaugeSize} mm`
//                       : header?.STDSpecification
//                       ? header.STDSpecification
//                       : "-"}
//                   </Typography>
//                 )}

//                 {/* =========================================
//                     PLUNGER
//                 ========================================= */}

//                 {isPlungerDial && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>Range :</b>{" "}
//                       {header.GIRangeFrom} -{" "}
//                       {header.GIRangeTo} mm
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>L.C :</b>{" "}
//                       {header.GILC} mm
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     BORE
//                 ========================================= */}

//                 {isBoreGauge && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>
//                         STD Specification :
//                       </b>{" "}
//                       {header.STDSpecification ||
//                         "-"}
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>L.C :</b>{" "}
//                       {header.GILC} mm
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     VERNIER
//                 ========================================= */}

//                 {isVernier && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>Range :</b>{" "}
//                       {header.GIRangeFrom} -{" "}
//                       {header.GIRangeTo} mm
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>L.C :</b>{" "}
//                       {header.GILC} mm
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     THREAD / FORMAT 10
//                 ========================================= */}

//                 {isFormat10Gauge && (
//                   <Typography
//                     sx={{ mb: 2 }}
//                   >
//                     <b>
//                       STD Specification :
//                     </b>{" "}
//                     {header.STDSpecification ||
//                       "-"}
//                   </Typography>
//                 )}
//               </Grid>

//               {/* ===========================================
//                   RIGHT COLUMN
//                   ACCEPTANCE CRITERIA
//               =========================================== */}

//               <Grid
//                 item
//                 xs={12}
//                 md={4}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "#f8fbff",
//                     border:
//                       "1px solid #1976d2",
//                     minHeight: 180,
//                   }}
//                 >
//                   <Typography
//                     fontWeight="bold"
//                     color="primary"
//                     sx={{ mb: 3 }}
//                   >
//                     Acceptance Criteria
//                   </Typography>

//                   {renderAcceptanceCriteria()}
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             {/* =================================================
//                 CALIBRATION HISTORY
//             ================================================= */}

//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               color="#1565c0"
//               mb={3}
//             >
//               Calibration History
//             </Typography>

//             <TableContainer
//               sx={{
//                 border:
//                   "1px solid #d0d7de",
//                 borderRadius: 2,
//                 overflow: "hidden",
//               }}
//             >
//               <Table
//                 size="small"
//                 sx={{
//                   "& td": {
//                     textAlign: "center",
//                     verticalAlign:
//                       "middle",
//                   },
//                   "& th": {
//                     textAlign: "center",
//                   },
//                 }}
//               >
//                 <TableHead>
//                   <TableRow
//                     sx={{
//                       backgroundColor:
//                         "#1565c0",
//                     }}
//                   >
//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Calibration Date
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Calibrated By
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Certificate No
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Observation
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Remark
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Next Due Date
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {history.length > 0 ? (
//                     history.map(
//                       (item, index) => (
//                         <TableRow
//                           key={index}
//                           hover
//                           sx={{
//                             backgroundColor:
//                               index %
//                                 2 ===
//                               0
//                                 ? "#ffffff"
//                                 : "#f8f9fa",

//                             "&:hover": {
//                               backgroundColor:
//                                 "#e3f2fd",
//                             },
//                           }}
//                         >
//                           {/* =================================
//                               CALIBRATION DATE
//                           ================================= */}

//                           <TableCell>
//                             {formatDate(
//                               item.CalibratedOn
//                             )}
//                           </TableCell>

//                           {/* =================================
//                               CALIBRATION AGENCY
//                           ================================= */}

//                           <TableCell>
//                             Ravikiran
//                             Calibration Lab
//                           </TableCell>

//                           {/* =================================
//                               CERTIFICATE
//                           ================================= */}

//                           <TableCell>
//                             <Box
//                               sx={{
//                                 display:
//                                   "flex",
//                                 justifyContent:
//                                   "space-between",
//                                 alignItems:
//                                   "center",
//                                 gap: 1,
//                               }}
//                             >
//                               <span>
//                                 {item.CalCertificateNo ||
//                                   "-"}
//                               </span>

//                               <Button
//                                 variant="contained"
//                                 size="small"
//                                 sx={{
//                                   borderRadius:
//                                     "8px",
//                                   textTransform:
//                                     "none",
//                                   fontWeight:
//                                     "bold",
//                                   minWidth:
//                                     75,
//                                 }}
//                                 disabled={
//                                   !item.CalCertificateNo
//                                 }
//                                 onClick={() =>
//                                   openPdf(
//                                     item
//                                   )
//                                 }
//                               >
//                                 PDF
//                               </Button>
//                             </Box>
//                           </TableCell>

//                           {/* =================================
//                               OBSERVATION
//                           ================================= */}

//                           <TableCell>
//                             {renderObservation(
//                               item
//                             )}
//                           </TableCell>

//                           {/* =================================
//                               REMARK
//                           ================================= */}

//                          <TableCell>
//   -
// </TableCell>

//                           {/* =================================
//                               NEXT DUE DATE
//                           ================================= */}

//                           <TableCell>
//                             {formatDate(
//                               item.NextDueOn
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       )
//                     )
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={6}
//                         align="center"
//                       >
//                         No Calibration
//                         History Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default HistoryCard;








































// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Divider,
//   TableContainer,
// } from "@mui/material";

// function HistoryCard() {
//   const navigate = useNavigate();

//   // =====================================================
//   // STATES
//   // =====================================================

//   const [gaugeNo, setGaugeNo] = useState("");
//   const [header, setHeader] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);



//   // =====================================================
//   // CUSTOMER
//   // =====================================================

//   const customerData = localStorage.getItem("customer");
//   const customer = customerData
//     ? JSON.parse(customerData)
//     : {};

//   const customerId = customer.CustomerID;




  
// const API_URL = process.env.REACT_APP_API_BASE_URL;

// console.log("History API URL:", API_URL);


//   // =====================================================
//   // LOGIN CHECK
//   // =====================================================

//   if (!customer.CustomerID) {
//     navigate("/");
//     return null;
//   }

//   // =====================================================
//   // LOAD HISTORY
//   // =====================================================

//   const loadHistory = async () => {
//     console.log("=================================");
//     console.log("Search Button Clicked");
//     console.log("Gauge =", gaugeNo);
//     console.log("Customer =", customerId);

//     if (!gaugeNo.trim()) {
//       alert("Please Enter Gauge Code");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("Calling API...");

//      const res = await axios.get(
//   `${API_URL}/history-card?customerId=${customerId}&gaugeNo=${encodeURIComponent(
//     gaugeNo.trim()
//   )}`
// );

//       console.log("API Response =", res);
//       console.log("Success =", res.data.success);
//       console.log("Header =", res.data.header);
//       console.log("History =", res.data.history);
//       console.log(
//         "History Count =",
//         res.data.history?.length
//       );

//       if (!res.data.success) {
//         setHeader(null);
//         setHistory([]);

//         alert("No History Found");
//         return;
//       }

//       setHeader(res.data.header || null);
//       setHistory(res.data.history || []);


//       console.log(
//   "FINAL HEADER FORMAT5 =",
//   res.data.header?.Format5Info
// );

// console.log(
//   "FINAL HISTORY FORMAT5 =",
//   res.data.history?.[0]?.Format5Info
// );

//       console.log("=================================");
//     } catch (err) {
//       console.log("========== ERROR ==========");
//       console.log(err);

//       if (err.response) {
//         console.log(
//           "Status =",
//           err.response.status
//         );

//         console.log(
//           "Response =",
//           err.response.data
//         );
//       } else {
//         console.log(
//           "Message =",
//           err.message
//         );
//       }

//       setHeader(null);
//       setHistory([]);

//       alert(
//         err.response?.data?.message ||
//           "Unable to Load History"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // GI TYPE
//   // =====================================================

//   const giType =
//     header?.GITypeInfo?.GIType
//       ?.trim()
//       .toUpperCase() || "";

//   // =====================================================
//   // SELECTED FORMAT
//   //
//   // Backend sends:
//   //
//   // FORMAT1
//   // FORMAT5
//   // FORMAT10
//   // =====================================================

//   const selectedFormat =
//     header?.SelectedFormat || "";

//   // =====================================================
//   // FORMAT NO.5 GAUGES
//   // =====================================================

//   const isFormat5Gauge =
//     selectedFormat === "FORMAT5" ||
//     giType.includes("PLUG GAUGE") ||
//     giType.includes("WIDTH GAUGE") ||
//     giType.includes("SNAP GAUGE") ||
//     giType.includes("FLUSH PIN GAUGE") ||
//     giType.includes("PADDLE GAUGE");

//   // =====================================================
//   // FORMAT NO.10 GAUGES
//   // =====================================================

//   const isFormat10Gauge =
//     selectedFormat === "FORMAT10" ||
//     giType.includes("THREAD PLUG GAUGE") ||
//     giType.includes("TAPER THREAD GAUGE");

//   // =====================================================
//   // RING GAUGE
//   //
//   // ONLY RING GAUGE
//   //
//   // Format No.1
//   // =====================================================

//   const isRingGauge =
//     selectedFormat === "FORMAT1" ||
//     giType.includes("RING GAUGE");

//   // =====================================================
//   // PLUNGER DIAL
//   // =====================================================

//   const isPlungerDial =
//     giType.includes("PLUNGER DIAL") ||
//     giType.includes("LEVER DIAL");

//   // =====================================================
//   // BORE GAUGE
//   // =====================================================

//   const isBoreGauge =
//     giType.includes("BORE GAUGE") ||
//     giType.includes("DIAL SNAP GAUGE") ||
//     giType.includes(
//       "INTERNAL DIAL COMPARATOR"
//     ) ||
//     giType.includes(
//       "INTERNAL DIAL COMPARATOR GAUGE"
//     );

//   // =====================================================
//   // VERNIER
//   // =====================================================

//   const isVernier =
//     giType.includes("VERNIER CALLIPER") ||
//     giType.includes("MICROMETER") ||
//     giType.includes("MICROMETERS") ||
//     giType.includes("DIGITAL CALIPER") ||
//     giType.includes("DIGITAL DEPTH GAUGE") ||
//     giType.includes("DIGITAL HEIGHT GAUGE") ||
//     giType.includes("VERNIER HEIGHT GAUGE") ||
//     giType.includes("VERNIER DEPTH GAUGE");

//   // =====================================================
//   // FORMAT VALUE HELPER
//   // =====================================================

//   const showValue = (value) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === ""
//     ) {
//       return "-";
//     }

//     return value;
//   };

//   // =====================================================
//   // DATE FORMAT
//   // =====================================================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (
//       Number.isNaN(parsedDate.getTime())
//     ) {
//       return "-";
//     }

//     return parsedDate.toLocaleDateString(
//       "en-GB"
//     );
//   };

//   // =====================================================
//   // PDF
//   // =====================================================

//   const openPdf = (item) => {
//     if (!item?.CalCertificateNo) {
//       alert("PDF Not Available");
//       return;
//     }

//     const certificateNo =
//       item.CalCertificateNo.trim();

//     const fileName =
//       certificateNo.replace(/\//g, "-");

//     const pdfUrl = `${API_URL.replace(
//   "/api",
//   ""
// )}/certificates/${encodeURIComponent(fileName)}.pdf`;

//     console.log(
//       "Certificate No:",
//       certificateNo
//     );

//     console.log(
//       "PDF File Name:",
//       `${fileName}.pdf`
//     );

//     console.log(
//       "PDF URL:",
//       pdfUrl
//     );

//     window.open(pdfUrl, "_blank");
//   };

//   // =====================================================
//   // FORMAT NO.5 ACCEPTANCE CRITERIA
//   // =====================================================


// const renderFormat5AcceptanceCriteria = () => {
//   // First try header Format5Info
//   // If not available, take it from latest history record
//   const format5 =
//     header?.Format5Info ||
//     history?.[0]?.Format5Info ||
//     null;

//   console.log("========== FORMAT 5 UI ==========");
//   console.log("Header Format5Info =", header?.Format5Info);
//   console.log("History[0] Format5Info =", history?.[0]?.Format5Info);
//   console.log("Final Format5Info =", format5);

//   if (!format5) {
//     return (
//       <Typography
//         sx={{
//           fontSize: 15,
//           color: "red",
//         }}
//       >
//         Format 5 data not found
//       </Typography>
//     );
//   }

//   return (
//     <Box>

//       {/* ==============================
//           GO
//       ============================== */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go Size:</b>{" "}
//         {showValue(format5.GoSizeNew)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go Mfg Tol:</b>{" "}
//         {showValue(format5.GoSizeMfgTol)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go Wear Limit:</b>{" "}
//         {showValue(format5.GoSizeWearLimit)}
//       </Typography>

//       <Divider sx={{ my: 1 }} />

//       {/* ==============================
//           NO GO
//       ============================== */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go Size:</b>{" "}
//         {showValue(format5.NoGoSizeNew)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go Mfg Tol:</b>{" "}
//         {showValue(format5.NoGoSizeMfgTol)}
//       </Typography>

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go Wear Limit:</b>{" "}
//         {showValue(format5.NoGoSizeWearLimit)}
//       </Typography>

//     </Box>
//   );
// };

//   // =====================================================
//   // FORMAT NO.10 ACCEPTANCE CRITERIA
//   // =====================================================

//   const renderFormat10AcceptanceCriteria =
//     () => {
//       return (
//         <Typography
//           sx={{
//             fontSize: 16,
//             fontWeight: 500,
//             lineHeight: 2,
//           }}
//         >
//           {showValue(
//             header?.Format10Info
//               ?.SpecifiedSize
//           )}
//         </Typography>
//       );
//     };

//   // =====================================================
//   // ACCEPTANCE CRITERIA
//   // =====================================================

//   const renderAcceptanceCriteria =
//     () => {
//       if (isFormat5Gauge) {
//         return renderFormat5AcceptanceCriteria();
//       }

//       if (isFormat10Gauge) {
//         return renderFormat10AcceptanceCriteria();
//       }

//       return "-";
//     };

  
// // =====================================================
// // OBSERVATION
// // =====================================================

// const renderObservation = (item) => {
//   const itemFormat =
//     item?.SelectedFormat || "";

//   const itemGiType =
//     item?.GITypeInfo?.GIType
//       ?.trim()
//       .toUpperCase() || "";

//   // ===================================================
//   // FORMAT NO.1
//   // RING GAUGE
//   // ActualSize -> Observation
//   // ===================================================

//   if (
//     itemFormat === "FORMAT1" ||
//     itemGiType.includes("RING GAUGE")
//   ) {
//     return (
//       <Typography
//         sx={{
//           fontSize: 15,
//           fontWeight: 500,
//         }}
//       >
//         {showValue(
//           item?.Format1Info?.ActualSize
//         )}
//       </Typography>
//     );
//   }

//   // ===================================================
//   // FORMAT NO.10
//   // ActualSize -> Observation
//   // ===================================================

//   if (
//     itemFormat === "FORMAT10" ||
//     itemGiType.includes("THREAD PLUG GAUGE") ||
//     itemGiType.includes("TAPER THREAD GAUGE")
//   ) {
//     return (
//       <Typography
//         sx={{
//           fontSize: 15,
//           fontWeight: 500,
//         }}
//       >
//         {showValue(
//           item?.Format10Info?.ActualSize
//         )}
//       </Typography>
//     );
//   }

//   // ===================================================
//   // FORMAT NO.5
//   // PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH
//   //
//   // IMPORTANT:
//   // GoSize  -> Observation
//   // NoGoSize -> Observation
//   // ===================================================

//  // ===================================================
// // FORMAT NO.5
// // PLUG / SNAP / PADDLE / FLUSH PIN / WIDTH
// //
// // Observation comes from:
// // TCalibrationDetailsFormatNo5
// //
// // Go:
// // GoSizeActual1 / GoSizeActual2
// //
// // No Go:
// // NoGoSizeActual1 / NoGoSizeActual2
// // ===================================================

// if (
//   itemFormat === "FORMAT5" ||
//   itemGiType.includes("PLUG GAUGE") ||
//   itemGiType.includes("WIDTH GAUGE") ||
//   itemGiType.includes("SNAP GAUGE") ||
//   itemGiType.includes("FLUSH PIN GAUGE") ||
//   itemGiType.includes("PADDLE GAUGE")
// ) {
//   const format5 = item?.Format5Info;

//   if (!format5) {
//     return "-";
//   }

//   return (
//     <Box>
//       {/* GO */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>Go:</b>{" "}
//         {showValue(
//           format5.GoSizeActual1
//         )}
//         {" / "}
//         {showValue(
//           format5.GoSizeActual2
//         )}
//       </Typography>

//       {/* NO GO */}

//       <Typography
//         sx={{
//           fontSize: 15,
//           lineHeight: 1.8,
//         }}
//       >
//         <b>No Go:</b>{" "}
//         {showValue(
//           format5.NoGoSizeActual1
//         )}
//         {" / "}
//         {showValue(
//           format5.NoGoSizeActual2
//         )}
//       </Typography>
//     </Box>
//   );
// }

//   return "-";
// };

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b)",
//         p: 4,
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{
//           p: 4,
//           borderRadius: 3,
//         }}
//       >
//         {/* =================================================
//             CUSTOMER + SEARCH
//         ================================================= */}

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "space-between",
//             mb: 4,
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "22px",
//                 fontWeight: "bold",
//                 color: "#000",
//               }}
//             >
//               {header?.CustomerInfo?.Customer ||
//                 customer.Customer}
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: "15px",
//                 color: "#444",
//                 mt: 0.5,
//               }}
//             >
//               {header?.CustomerInfo?.Address ||
//                 ""}

//               {header?.CustomerInfo?.City
//                 ? `, ${header.CustomerInfo.City}`
//                 : ""}
//             </Typography>
//           </Box>
//         </Box>

//         {/* =================================================
//             SEARCH
//         ================================================= */}

//         <Grid
//           container
//           spacing={2}
//           mb={4}
//         >
//           <Grid
//             item
//             xs={12}
//             md={8}
//           >
//             <TextField
//               fullWidth
//               label="Gauge Code No"
//               placeholder="Enter Gauge Code"
//               value={gaugeNo}
//               onChange={(e) =>
//                 setGaugeNo(e.target.value)
//               }
//             />
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             md={4}
//           >
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 height: 56,
//                 fontSize: 18,
//                 fontWeight: "bold",
//               }}
//               onClick={loadHistory}
//               disabled={loading}
//             >
//               {loading
//                 ? "Searching..."
//                 : "SEARCH"}
//             </Button>
//           </Grid>
//         </Grid>

//         {/* =================================================
//             HISTORY CARD
//         ================================================= */}

//         {header && (
//           <Paper
//             elevation={6}
//             sx={{
//               p: 4,
//               borderRadius: 4,
//               border:
//                 "1px solid #d0d7de",
//               background: "#fff",
//             }}
//           >
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             <Grid
//               container
//               spacing={3}
//             >
//               {/* ===========================================
//                   LEFT COLUMN
//               =========================================== */}

//               <Grid
//                 item
//                 xs={12}
//                 md={4}
//               >
//                 <Typography sx={{ mb: 2 }}>
//                   <b>Description :</b>{" "}
//                   {header?.GITypeInfo
//                     ?.GIType || "-"}
//                 </Typography>

//                 <Typography sx={{ mb: 2 }}>
//                   <b>MFG Sr No :</b>{" "}
//                   {header.MFGSrNo || "-"}
//                 </Typography>

//                 <Typography sx={{ mb: 2 }}>
//                   <b>
//                     Calibration Frequency :
//                   </b>{" "}
//                   {header.Frequency != null &&
//                   header.Frequency !== ""
//                     ? `${header.Frequency} Months`
//                     : "-"}
//                 </Typography>
//               </Grid>

//               {/* ===========================================
//                   CENTER COLUMN
//               =========================================== */}

//               <Grid
//                 item
//                 xs={12}
//                 md={4}
//               >
//                 {/* CODE NO */}

//                 <Typography sx={{ mb: 2 }}>
//                   <b>Code No :</b>{" "}
//                   {header.GaugeIDNo || "-"}
//                 </Typography>

//                 {/* MAKE */}

//                 <Typography sx={{ mb: 2 }}>
//                   <b>Make :</b>{" "}
//                   {header.Make || "-"}
//                 </Typography>

//                 {/* =========================================
//                     FORMAT 5
//                 ========================================= */}

//                 {isFormat5Gauge && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>Go Size :</b>{" "}
//                       {header.GoSize != null
//                         ? `${header.GoSize} mm`
//                         : "-"}
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>No Go Size :</b>{" "}
//                       {header.NoGoSize != null
//                         ? `${header.NoGoSize} mm`
//                         : "-"}
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     RING GAUGE
//                     FORMAT NO.1
//                 ========================================= */}

//                 {isRingGauge && (
//                   <Typography
//                     sx={{ mb: 2 }}
//                   >
//                     <b>Size :</b>{" "}
//                     {header?.Format1Info
//                       ?.GaugeSize != null
//                       ? `${header.Format1Info.GaugeSize} mm`
//                       : header?.STDSpecification
//                       ? header.STDSpecification
//                       : "-"}
//                   </Typography>
//                 )}

//                 {/* =========================================
//                     PLUNGER
//                 ========================================= */}

//                 {isPlungerDial && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>Range :</b>{" "}
//                       {header.GIRangeFrom} -{" "}
//                       {header.GIRangeTo} mm
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>L.C :</b>{" "}
//                       {header.GILC} mm
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     BORE
//                 ========================================= */}

//                 {isBoreGauge && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>
//                         STD Specification :
//                       </b>{" "}
//                       {header.STDSpecification ||
//                         "-"}
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>L.C :</b>{" "}
//                       {header.GILC} mm
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     VERNIER
//                 ========================================= */}

//                 {isVernier && (
//                   <>
//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>Range :</b>{" "}
//                       {header.GIRangeFrom} -{" "}
//                       {header.GIRangeTo} mm
//                     </Typography>

//                     <Typography
//                       sx={{ mb: 2 }}
//                     >
//                       <b>L.C :</b>{" "}
//                       {header.GILC} mm
//                     </Typography>
//                   </>
//                 )}

//                 {/* =========================================
//                     THREAD / FORMAT 10
//                 ========================================= */}

//                 {isFormat10Gauge && (
//                   <Typography
//                     sx={{ mb: 2 }}
//                   >
//                     <b>
//                       STD Specification :
//                     </b>{" "}
//                     {header.STDSpecification ||
//                       "-"}
//                   </Typography>
//                 )}
//               </Grid>

//               {/* ===========================================
//                   RIGHT COLUMN
//                   ACCEPTANCE CRITERIA
//               =========================================== */}

//               <Grid
//                 item
//                 xs={12}
//                 md={4}
//               >
//                 <Paper
//                   elevation={2}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "#f8fbff",
//                     border:
//                       "1px solid #1976d2",
//                     minHeight: 180,
//                   }}
//                 >
//                   <Typography
//                     fontWeight="bold"
//                     color="primary"
//                     sx={{ mb: 3 }}
//                   >
//                     Acceptance Criteria
//                   </Typography>

//                   {renderAcceptanceCriteria()}
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             {/* =================================================
//                 CALIBRATION HISTORY
//             ================================================= */}

//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               color="#1565c0"
//               mb={3}
//             >
//               Calibration History
//             </Typography>

//             <TableContainer
//               sx={{
//                 border:
//                   "1px solid #d0d7de",
//                 borderRadius: 2,
//                 overflow: "hidden",
//               }}
//             >
//               <Table
//                 size="small"
//                 sx={{
//                   "& td": {
//                     textAlign: "center",
//                     verticalAlign:
//                       "middle",
//                   },
//                   "& th": {
//                     textAlign: "center",
//                   },
//                 }}
//               >
//                 <TableHead>
//                   <TableRow
//                     sx={{
//                       backgroundColor:
//                         "#1565c0",
//                     }}
//                   >
//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Calibration Date
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Calibrated By
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Certificate No
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Observation
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Remark
//                     </TableCell>

//                     <TableCell
//                       sx={{
//                         color: "#fff",
//                         fontWeight:
//                           "bold",
//                         fontSize: 15,
//                       }}
//                     >
//                       Next Due Date
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {history.length > 0 ? (
//                     history.map(
//                       (item, index) => (
//                         <TableRow
//                           key={index}
//                           hover
//                           sx={{
//                             backgroundColor:
//                               index %
//                                 2 ===
//                               0
//                                 ? "#ffffff"
//                                 : "#f8f9fa",

//                             "&:hover": {
//                               backgroundColor:
//                                 "#e3f2fd",
//                             },
//                           }}
//                         >
//                           {/* =================================
//                               CALIBRATION DATE
//                           ================================= */}

//                           <TableCell>
//                             {formatDate(
//                               item.CalibratedOn
//                             )}
//                           </TableCell>

//                           {/* =================================
//                               CALIBRATION AGENCY
//                           ================================= */}

//                           <TableCell>
//                             Ravikiran
//                             Calibration Lab
//                           </TableCell>

//                           {/* =================================
//                               CERTIFICATE
//                           ================================= */}

//                           <TableCell>
//                             <Box
//                               sx={{
//                                 display:
//                                   "flex",
//                                 justifyContent:
//                                   "space-between",
//                                 alignItems:
//                                   "center",
//                                 gap: 1,
//                               }}
//                             >
//                               <span>
//                                 {item.CalCertificateNo ||
//                                   "-"}
//                               </span>

//                               <Button
//                                 variant="contained"
//                                 size="small"
//                                 sx={{
//                                   borderRadius:
//                                     "8px",
//                                   textTransform:
//                                     "none",
//                                   fontWeight:
//                                     "bold",
//                                   minWidth:
//                                     75,
//                                 }}
//                                 disabled={
//                                   !item.CalCertificateNo
//                                 }
//                                 onClick={() =>
//                                   openPdf(
//                                     item
//                                   )
//                                 }
//                               >
//                                 PDF
//                               </Button>
//                             </Box>
//                           </TableCell>

//                           {/* =================================
//                               OBSERVATION
//                           ================================= */}

//                           <TableCell>
//                             {renderObservation(
//                               item
//                             )}
//                           </TableCell>

//                           {/* =================================
//                               REMARK
//                           ================================= */}

//                          <TableCell>
//   -
// </TableCell>

//                           {/* =================================
//                               NEXT DUE DATE
//                           ================================= */}

//                           <TableCell>
//                             {formatDate(
//                               item.NextDueOn
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       )
//                     )
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={6}
//                         align="center"
//                       >
//                         No Calibration
//                         History Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default HistoryCard;















































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Divider,
//   TableContainer,
//   CircularProgress,
//   Alert,
//   Autocomplete,
// } from "@mui/material";

// function HistoryCard() {
//   const navigate = useNavigate();

//   const [gaugeNo, setGaugeNo] = useState("");
//   const [gaugeInput, setGaugeInput] = useState("");
//   const [header, setHeader] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [gauges, setGauges] = useState([]);

//   const [selectedGauge, setSelectedGauge] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [loadingGauges, setLoadingGauges] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // CUSTOMER SESSION
//   let customer = {};

//   try {
//     customer = JSON.parse(
//       localStorage.getItem("customer") || "{}"
//     );
//   } catch (error) {
//     console.error("Customer session error:", error);
//   }

//   const customerId = customer.CustomerID;
//   const API_URL = process.env.REACT_APP_API_BASE_URL;

//   // LOGIN CHECK
//   useEffect(() => {
//     if (!customerId) {
//       navigate("/");
//     }
//   }, [customerId, navigate]);

//   // LOAD LOGGED-IN CUSTOMER'S GAUGES



//   // LOAD LOGGED-IN CUSTOMER'S GAUGES
//   useEffect(() => {
//     let active = true;

//     const fetchGauges = async () => {
//       setLoadingGauges(true);
//       setGauges([]);
//       setErrorMessage("");

//       try {
//         if (!customerId) {
//           throw new Error(
//             "CustomerID not found in localStorage."
//           );
//         }

//         if (!API_URL) {
//           throw new Error(
//             "REACT_APP_API_BASE_URL is missing in .env."
//           );
//         }

//         console.log("Customer ID:", customerId);
//         console.log("API URL:", API_URL);

//        const response = await axios.get(
//   `${API_URL}/history-gauges`,
//   {
//     params: { customerId },
//     timeout: 15000,
//   }
// );

//         console.log(
//           "Gauge API Response:",
//           response.status,
//           response.data
//         );

//         if (!active) return;

//         const list =
//           response.data?.gauges ??
//           response.data?.data ??
//           response.data?.records ??
//           [];

//         if (!Array.isArray(list)) {
//           throw new Error(
//             "Invalid API response: gauges must be an array."
//           );
//         }

//         setGauges(list);

//         if (list.length === 0) {
//           setErrorMessage(
//             "No Gauges returned by the API for this customer."
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Gauge API Error:",
//           error.response?.data || error.message
//         );

//         if (!active) return;

//         setGauges([]);

//         setErrorMessage(
//           error.code === "ECONNABORTED"
//             ? "Gauge API timed out after 15 seconds."
//             : error.response?.data?.message ||
//               error.message ||
//               "Unable to load Gauges."
//         );
//       } finally {
//         if (active) {
//           setLoadingGauges(false);
//         }
//       }
//     };

//     fetchGauges();

//     return () => {
//       active = false;
//     };
//   }, [customerId, API_URL]);


//   // LOAD SELECTED GAUGE HISTORY
//   const loadHistory = async (selectedGaugeNo = gaugeNo) => {
//     const code = String(selectedGaugeNo || "").trim();

//     if (!code) {
//       alert("Please select or enter Gauge Code No.");
//       return;
//     }

//     if (!customerId || !API_URL) {
//       alert("Customer session or API URL is missing.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");
//     setHeader(null);
//     setHistory([]);

//     try {
//       const response = await axios.get(
//         `${API_URL}/history-card`,
//         {
//           params: {
//             customerId,
//             gaugeNo: code,
//           },
//         }
//       );

//       if (!response.data?.success || !response.data?.header) {
//         setErrorMessage("No History Found for this Gauge.");
//         return;
//       }

//       setGaugeNo(code);
//       setHeader(response.data.header);
//       setHistory(
//         Array.isArray(response.data.history)
//           ? response.data.history
//           : []
//       );
//       setShowHistory(true);
//     } catch (error) {
//       console.error(
//         "History API error:",
//         error.response?.data || error.message
//       );

//       setErrorMessage(
//         error.response?.data?.message ||
//           "Unable to load History Card."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // BACK TO GAUGE LIST


// const handleBack = () => {
//   navigate("/dashboard");
// };



//   // PRINT
//   const handlePrint = () => {
//     if (!header) {
//       alert("Please select a Gauge first.");
//       return;
//     }

//     window.print();
//   };


// const handleDownloadPDF = async () => {
//   if (!header) {
//     alert("Please select a Gauge first.");
//     return;
//   }

//   const element = document.querySelector(".history-card-paper");

//   if (!element) {
//     alert("History Card content not found.");
//     return;
//   }

//   const hiddenElements = element.querySelectorAll(".no-print");
//   const previousDisplays = Array.from(hiddenElements).map(
//     (item) => item.style.display
//   );

//   try {
//     hiddenElements.forEach((item) => {
//       item.style.display = "none";
//     });

//     const html2pdf = (await import("html2pdf.js")).default;

//     await html2pdf()
//       .set({
//         margin: 8,
//         filename: `HistoryCard_${header.GaugeIDNo || "Gauge"}.pdf`,
//         image: {
//           type: "jpeg",
//           quality: 0.98,
//         },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           backgroundColor: "#ffffff",
//         },
//         jsPDF: {
//           unit: "mm",
//           format: "a4",
//           orientation: "landscape",
//         },
//         pagebreak: {
//           mode: ["css", "legacy"],
//         },
//       })
//       .from(element)
//       .save();
//   } catch (error) {
//     console.error("PDF download error:", error);
//     alert("Unable to download PDF. Please try again.");
//   } finally {
//     hiddenElements.forEach((item, index) => {
//       item.style.display = previousDisplays[index];
//     });
//   }
// };


//   // FORMAT HELPERS
//   const showValue = (value) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === ""
//     ) {
//       return "-";
//     }

//     return value;
//   };


// const formatTolerance = (value) => {
//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "-";
//   }

//   const number = Number(value);

//   if (!Number.isFinite(number)) {
//     return value;
//   }

//   // No rounding: keep only 3 digits after decimal
//   return (Math.trunc(number * 1000) / 1000).toFixed(3);
// };


//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "-";
//     }

//     return parsedDate.toLocaleDateString("en-GB");
//   };

//   const giType = (
//     header?.GITypeInfo?.GIType || ""
//   )
//     .trim()
//     .toUpperCase();

//   const selectedFormat = (
//     header?.SelectedFormat || ""
//   ).toUpperCase();

//   const isFormat5Gauge =
//     selectedFormat === "FORMAT5" ||
//     giType.includes("PLUG GAUGE") ||
//     giType.includes("WIDTH GAUGE") ||
//     giType.includes("SNAP GAUGE") ||
//     giType.includes("FLUSH PIN GAUGE") ||
//     giType.includes("PADDLE GAUGE");

//   const isFormat10Gauge =
//     selectedFormat === "FORMAT10" ||
//     giType.includes("THREAD PLUG GAUGE") ||
//     giType.includes("TAPER THREAD GAUGE");

//   const isRingGauge =
//     selectedFormat === "FORMAT1" ||
//     giType.includes("RING GAUGE");

//   const isPlungerDial =
//     giType.includes("PLUNGER DIAL") ||
//     giType.includes("LEVER DIAL");

//   const isBoreGauge =
//     giType.includes("BORE GAUGE") ||
//     giType.includes("DIAL SNAP GAUGE") ||
//     giType.includes("INTERNAL DIAL COMPARATOR");

//   const isVernier =
//     giType.includes("VERNIER CALLIPER") ||
//     giType.includes("MICROMETER") ||
//     giType.includes("DIGITAL CALIPER") ||
//     giType.includes("DIGITAL DEPTH GAUGE") ||
//     giType.includes("DIGITAL HEIGHT GAUGE") ||
//     giType.includes("VERNIER HEIGHT GAUGE") ||
//     giType.includes("VERNIER DEPTH GAUGE");

//   // FORMAT 5 ACCEPTANCE CRITERIA
//   const renderFormat5AcceptanceCriteria = () => {
//     const info =
//       header?.Format5Info ||
//       history?.[0]?.Format5Info;

//     if (!info) {
//       return <Typography color="text.secondary">-</Typography>;
//     }

//     return (
//       <Box>
//         <Typography>
//           <b>Go Size:</b> {showValue(info.GoSizeNew)}
//         </Typography>
//         <Typography>
//           <b>Go Mfg Tol:</b> {formatTolerance(info.GoSizeMfgTol)}
//         </Typography>
//         <Typography>
//           <b>Go Wear Limit:</b>{" "}
//           {showValue(info.GoSizeWearLimit)}
//         </Typography>

//         <Divider sx={{ my: 1 }} />

//         <Typography>
//           <b>No Go Size:</b>{" "}
//           {showValue(info.NoGoSizeNew)}
//         </Typography>
//         <Typography>
//           <b>No Go Mfg Tol:</b>{" "}
//           {formatTolerance(info.NoGoSizeMfgTol)}
//         </Typography>
//         <Typography>
//           <b>No Go Wear Limit:</b>{" "}
//           {showValue(info.NoGoSizeWearLimit)}
//         </Typography>
//       </Box>
//     );
//   };

//   // ACCEPTANCE CRITERIA
//   const renderAcceptanceCriteria = () => {
//     if (isFormat5Gauge) {
//       return renderFormat5AcceptanceCriteria();
//     }

//     if (isFormat10Gauge) {
//       return (
//         <Typography>
//           {showValue(
//             header?.Format10Info?.SpecifiedSize
//           )}
//         </Typography>
//       );
//     }

//     if (isRingGauge) {
//       return (
//         <Typography>
//           {showValue(header?.Format1Info?.GaugeSize)}
//         </Typography>
//       );
//     }

//     return (
//       <Typography>
//         {showValue(header?.STDSpecification)}
//       </Typography>
//     );
//   };

//   // CALIBRATION OBSERVATION
//   const renderObservation = (item) => {
//     const format = (
//       item?.SelectedFormat || ""
//     ).toUpperCase();

//     const type = (
//       item?.GITypeInfo?.GIType || ""
//     ).trim().toUpperCase();

//     if (
//       format === "FORMAT1" ||
//       type.includes("RING GAUGE")
//     ) {
//       return showValue(item?.Format1Info?.ActualSize);
//     }

//     if (
//       format === "FORMAT10" ||
//       type.includes("THREAD PLUG GAUGE") ||
//       type.includes("TAPER THREAD GAUGE")
//     ) {
//       return showValue(item?.Format10Info?.ActualSize);
//     }

//     if (
//       format === "FORMAT5" ||
//       type.includes("PLUG GAUGE") ||
//       type.includes("WIDTH GAUGE") ||
//       type.includes("SNAP GAUGE") ||
//       type.includes("FLUSH PIN GAUGE") ||
//       type.includes("PADDLE GAUGE")
//     ) {
//       const info = item?.Format5Info;

//       if (!info) return "-";

//       return (
//         <Box>
//           <Typography>
//             <b>Go:</b>{" "}
//             {showValue(info.GoSizeActual1)}
//             {" / "}
//             {showValue(info.GoSizeActual2)}
//           </Typography>
//           <Typography>
//             <b>No Go:</b>{" "}
//             {showValue(info.NoGoSizeActual1)}
//             {" / "}
//             {showValue(info.NoGoSizeActual2)}
//           </Typography>
//         </Box>
//       );
//     }

//     return "-";
//   };

//   // OPEN CERTIFICATE PDF
//   const openPdf = (item) => {
//     if (!item?.CalCertificateNo) {
//       alert("PDF Not Available");
//       return;
//     }

//     if (!API_URL) {
//       alert("API URL is missing.");
//       return;
//     }

//     const certificateNo = item.CalCertificateNo.trim();
//     const fileName = certificateNo.replace(/\//g, "-");

//     const baseURL = API_URL.replace(/\/api\/?$/, "");

//     const pdfURL =
//       `${baseURL}/certificates/` +
//       `${encodeURIComponent(fileName)}.pdf`;

//     window.open(pdfURL, "_blank", "noopener,noreferrer");
//   };

//   // GAUGE LIST FIELD MAPPING
//   const getGaugeCode = (gauge) =>
//     gauge?.GaugeIDNo ||
//     gauge?.GaugeCodeNo ||
//     gauge?.gaugeNo ||
//     gauge?.CodeNo ||
//     "";

//   const getGaugeDescription = (gauge) =>
//     gauge?.Description ||
//     gauge?.GITypeInfo?.GIType ||
//     gauge?.GIType ||
//     gauge?.GaugeDescription ||
//     "-";

//   if (!customerId) return null;

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#1e293b)",
//         p: { xs: 1.5, md: 4 },

//         "@media print": {
//           background: "#fff",
//           padding: "0 !important",
//           minHeight: "auto",

//           "& .no-print": {
//             display: "none !important",
//           },

//           "& .history-card-paper": {
//             boxShadow: "none !important",
//             border: "1px solid #ddd",
//             padding: "12px !important",
//           },

//           "& .MuiPaper-root": {
//             boxShadow: "none !important",
//           },

//           "@page": {
//             size: "landscape",
//             margin: "10mm",
//           },
//         },
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
//       >
//         {/* CUSTOMER HEADER */}
//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h5" fontWeight="bold">
//             {header?.CustomerInfo?.Customer ||
//               customer.Customer ||
//               "Customer"}
//           </Typography>

//           <Typography color="text.secondary">
//             {header?.CustomerInfo?.Address ||
//               customer.Address ||
//               ""}
//             {header?.CustomerInfo?.City
//               ? `, ${header.CustomerInfo.City}`
//               : ""}
//           </Typography>
//         </Box>

//         {errorMessage && (
//           <Alert
//             severity="warning"
//             sx={{ mb: 2 }}
//             onClose={() => setErrorMessage("")}
//           >
//             {errorMessage}
//           </Alert>
//         )}

       
// {/* SEARCH GAUGE ONLY */}


// {!showHistory && (
//   <>
//     {/* BACK BUTTON */}
//     <Box sx={{ mb: 2 }}>
//       <Button
//         variant="outlined"
//         onClick={handleBack}
//         sx={{
//           textTransform: "none",
//           fontWeight: "bold",
//           borderRadius: 2,
//           px: 2,
//           py: 1,
//         }}
//       >
//         ← Back
//       </Button>
//     </Box>

//     <Divider sx={{ my: 3 }} />

//     <Typography fontWeight="bold" mb={2}>
//       Search Gauge
//     </Typography>

//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={12} md={8}>
//         <Autocomplete
//           fullWidth
//           freeSolo
//           options={gauges}
//           loading={loadingGauges}
//           value={selectedGauge}
//           inputValue={gaugeInput}
//           getOptionLabel={(option) => {
//             if (typeof option === "string") {
//               return option;
//             }

//             return `${getGaugeCode(option)} - ${getGaugeDescription(option)}`;
//           }}
//           isOptionEqualToValue={(option, value) =>
//             typeof value !== "string" &&
//             getGaugeCode(option) === getGaugeCode(value)
//           }
//           onChange={(event, newValue) => {
//             if (typeof newValue === "string") {
//               const code = newValue.trim();

//               setSelectedGauge(null);
//               setGaugeNo(code);
//               setGaugeInput(newValue);
//             } else {
//               setSelectedGauge(newValue);

//               const code = newValue
//                 ? String(getGaugeCode(newValue) || "").trim()
//                 : "";

//               setGaugeNo(code);
//               setGaugeInput(
//                 newValue
//                   ? `${code} - ${getGaugeDescription(newValue)}`
//                   : ""
//               );
//             }

//             setErrorMessage("");
//           }}
//           onInputChange={(event, newInputValue, reason) => {
//             setGaugeInput(newInputValue);

//             if (reason === "input") {
//               setSelectedGauge(null);
//               setGaugeNo(newInputValue.trim());
//               setErrorMessage("");
//             }

//             if (reason === "clear") {
//               setSelectedGauge(null);
//               setGaugeNo("");
//               setGaugeInput("");
//             }
//           }}
//           noOptionsText={
//             gaugeInput.trim()
//               ? "Gauge not in list? You can still search this ID."
//               : "No Gauges Found"
//           }
//           loadingText="Loading Gauges..."
//           renderOption={(props, option) => (
//             <li {...props} key={getGaugeCode(option)}>
//               <Box sx={{ py: 0.5 }}>
//                 <Typography fontWeight="bold">
//                   {getGaugeCode(option)}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                 >
//                   {getGaugeDescription(option)}
//                 </Typography>
//               </Box>
//             </li>
//           )}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Gauge Code No / Description"
//               placeholder="Type Gauge ID or Description..."
//               InputProps={{
//                 ...params.InputProps,
//                 endAdornment: (
//                   <>
//                     {loadingGauges && (
//                       <CircularProgress size={20} />
//                     )}
//                     {params.InputProps.endAdornment}
//                   </>
//                 ),
//               }}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") {
//                   event.preventDefault();
//                   event.stopPropagation();
//                 }
//               }}
//             />
//           )}
//         />
//       </Grid>

//       <Grid item xs={12} md={4}>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             height: 56,
//             fontWeight: "bold",
//           }}
//           onClick={() => {
//             if (!gaugeNo) {
//               setErrorMessage(
//                 "Please select a Gauge from the dropdown."
//               );
//               return;
//             }

//             loadHistory(gaugeNo);
//           }}
//           disabled={loading || loadingGauges}
//         >
//           {loading ? "Searching..." : "SEARCH"}
//         </Button>
//       </Grid>
//     </Grid>
//   </>
// )}



//         {/* LOADING HISTORY */}
//         {loading && (
//           <Box sx={{ textAlign: "center", p: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>
//               Loading History Card...
//             </Typography>
//           </Box>
//         )}

//         {/* HISTORY CARD */}
//         {header && showHistory && (
//           <Paper
//             className="history-card-paper"
//             elevation={6}
//             sx={{
//               p: { xs: 2, md: 4 },
//               borderRadius: 3,
//               border: "1px solid #d0d7de",
//             }}
//           >
//             {/* ACTION BUTTONS */}
//             <Box
//               className="no-print"
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 1,
//                 flexWrap: "wrap",
//                 mb: 3,
//               }}
//             >
//               <Button variant="outlined" onClick={handleBack}>
//                 ← Back to Gauges
//               </Button>

//               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Button variant="contained" onClick={handlePrint}>
//                   Print
//                 </Button>

//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={handleDownloadPDF}
//                 >
//                   Download PDF
//                 </Button>
//               </Box>
//             </Box>

//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             {/* GAUGE DETAILS */}
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={4}>
//                 <Typography mb={2}>
//                   <b>Description:</b> {giType || "-"}
//                 </Typography>

//                 <Typography mb={2}>
//                   <b>MFG Sr No:</b> {showValue(header.MFGSrNo)}
//                 </Typography>

//                 <Typography mb={2}>
//                   <b>Calibration Frequency:</b>{" "}
//                   {header.Frequency !== "" &&
//                   header.Frequency != null
//                     ? `${header.Frequency} Months`
//                     : "-"}
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Typography mb={2}>
//                   <b>Code No:</b> {showValue(header.GaugeIDNo)}
//                 </Typography>

//                 <Typography mb={2}>
//                   <b>Make:</b> {showValue(header.Make)}
//                 </Typography>

//                 {isFormat5Gauge && (
//                   <>
//                     <Typography mb={2}>
//                       <b>Go Size:</b>{" "}
//                       {showValue(header.GoSize)} mm
//                     </Typography>

//                     <Typography mb={2}>
//                       <b>No Go Size:</b>{" "}
//                       {showValue(header.NoGoSize)} mm
//                     </Typography>
//                   </>
//                 )}

//                 {isRingGauge && (
//                   <Typography mb={2}>
//                     <b>Size:</b>{" "}
//                     {showValue(
//                       header?.Format1Info?.GaugeSize ??
//                         header?.STDSpecification
//                     )}
//                   </Typography>
//                 )}

//                 {(isPlungerDial || isVernier) && (
//                   <>
//                     <Typography mb={2}>
//                       <b>Range:</b>{" "}
//                       {showValue(header.GIRangeFrom)} -{" "}
//                       {showValue(header.GIRangeTo)} mm
//                     </Typography>

//                     <Typography mb={2}>
//                       <b>L.C:</b> {showValue(header.GILC)} mm
//                     </Typography>
//                   </>
//                 )}

//                 {(isBoreGauge || isFormat10Gauge) && (
//                   <Typography mb={2}>
//                     <b>STD Specification:</b>{" "}
//                     {showValue(header.STDSpecification)}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "#f8fbff",
//                     border: "1px solid #1976d2",
//                     minHeight: 150,
//                   }}
//                 >
//                   <Typography
//                     fontWeight="bold"
//                     color="primary"
//                     mb={2}
//                   >
//                     Acceptance Criteria
//                   </Typography>

//                   {renderAcceptanceCriteria()}
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             {/* CALIBRATION HISTORY */}
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               color="#1565c0"
//               mb={3}
//             >
//               Calibration History
//             </Typography>

//             <TableContainer
//               sx={{
//                 border: "1px solid #d0d7de",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table size="small">
//                 <TableHead>
//                   <TableRow
//                     sx={{
//                       backgroundColor: "#1565c0",
//                       "& th": {
//                         color: "#fff",
//                         fontWeight: "bold",
//                         textAlign: "center",
//                       },
//                     }}
//                   >
//                     <TableCell>Calibration Date</TableCell>
//                     <TableCell>Calibrated By</TableCell>
//                     <TableCell>Certificate No</TableCell>
//                     <TableCell>Observation</TableCell>
//                     <TableCell>Remark</TableCell>
//                     <TableCell>Next Due Date</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {history.length > 0 ? (
//                     history.map((item, index) => (
//                       <TableRow
//                         key={
//                           item.CalCertificateNo ||
//                           `${item.CalibratedOn}-${index}`
//                         }
//                         sx={{
//                           "&:nth-of-type(even)": {
//                             backgroundColor: "#f8f9fa",
//                           },
//                         }}
//                       >
//                         <TableCell align="center">
//                           {formatDate(item.CalibratedOn)}
//                         </TableCell>

//                         <TableCell align="center">
//                           Ravikiran Calibration Lab
//                         </TableCell>

//                         <TableCell align="center">
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: 1,
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <span>
//                               {item.CalCertificateNo || "-"}
//                             </span>

//                             <Button
//                               className="no-print"
//                               variant="contained"
//                               size="small"
//                               disabled={!item.CalCertificateNo}
//                               onClick={() => openPdf(item)}
//                             >
//                               PDF
//                             </Button>
//                           </Box>
//                         </TableCell>

//                         <TableCell align="center">
//                           {renderObservation(item)}
//                         </TableCell>

//                         <TableCell align="center">
//                           {showValue(item.Remark)}
//                         </TableCell>

//                         <TableCell align="center">
//                           {formatDate(item.NextDueOn)}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">
//                         No Calibration History Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default HistoryCard;


































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Divider,
//   TableContainer,
//   CircularProgress,
//   Alert,
//   Autocomplete,
// } from "@mui/material";

// function HistoryCard() {
//   const navigate = useNavigate();

//   const [gaugeNo, setGaugeNo] = useState("");
//   const [gaugeInput, setGaugeInput] = useState("");
//   const [header, setHeader] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [gauges, setGauges] = useState([]);

//   const [selectedGauge, setSelectedGauge] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [loadingGauges, setLoadingGauges] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // CUSTOMER SESSION
//   let customer = {};

//   try {
//     customer = JSON.parse(
//       localStorage.getItem("customer") || "{}"
//     );
//   } catch (error) {
//     console.error("Customer session error:", error);
//   }


// const customerId = customer.CustomerID;
// const API_URL = "http://localhost:5000/api";


//   // LOGIN CHECK
//   useEffect(() => {
//     if (!customerId) {
//       navigate("/");
//     }
//   }, [customerId, navigate]);

//   // LOAD LOGGED-IN CUSTOMER'S GAUGES



//   // LOAD LOGGED-IN CUSTOMER'S GAUGES
//   useEffect(() => {
//     let active = true;

//     const fetchGauges = async () => {
//       setLoadingGauges(true);
//       setGauges([]);
//       setErrorMessage("");

//       try {
//         if (!customerId) {
//           throw new Error(
//             "CustomerID not found in localStorage."
//           );
//         }

//         if (!API_URL) {
//           throw new Error(
//             "REACT_APP_API_BASE_URL is missing in .env."
//           );
//         }

//         console.log("Customer ID:", customerId);
//         console.log("API URL:", API_URL);

 
// const response = await axios.get(
//   `${API_URL}/history-gauges-optimized`,
//   {
//     params: { customerId },
//     timeout: 60000,
//   }
// );


//         console.log(
//           "Gauge API Response:",
//           response.status,
//           response.data
//         );

//         if (!active) return;

//         const list =
//           response.data?.gauges ??
//           response.data?.data ??
//           response.data?.records ??
//           [];

//         if (!Array.isArray(list)) {
//           throw new Error(
//             "Invalid API response: gauges must be an array."
//           );
//         }

//         setGauges(list);

//         if (list.length === 0) {
//           setErrorMessage(
//             "No Gauges returned by the API for this customer."
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Gauge API Error:",
//           error.response?.data || error.message
//         );

//         if (!active) return;

//         setGauges([]);

//         setErrorMessage(
         
// error.code === "ECONNABORTED"
//   ? "Gauge API timed out after 60 seconds."
//   : error.response?.data?.message ||
//     error.message ||
//     "Unable to load Gauges."

//         );
//       } finally {
//         if (active) {
//           setLoadingGauges(false);
//         }
//       }
//     };

//     fetchGauges();

//     return () => {
//       active = false;
//     };
//   }, [customerId, API_URL]);


//   // LOAD SELECTED GAUGE HISTORY
//   const loadHistory = async (selectedGaugeNo = gaugeNo) => {
//     const code = String(selectedGaugeNo || "").trim();

//     if (!code) {
//       alert("Please select or enter Gauge Code No.");
//       return;
//     }

//     if (!customerId || !API_URL) {
//       alert("Customer session or API URL is missing.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");
//     setHeader(null);
//     setHistory([]);

//     try {
//       const response = await axios.get(
//         `${API_URL}/history-card`,
//         {
//           params: {
//             customerId,
//             gaugeNo: code,
//           },
//         }
//       );

//       if (!response.data?.success || !response.data?.header) {
//         setErrorMessage("No History Found for this Gauge.");
//         return;
//       }

//       setGaugeNo(code);
//       setHeader(response.data.header);
//       setHistory(
//         Array.isArray(response.data.history)
//           ? response.data.history
//           : []
//       );
//       setShowHistory(true);
//     } catch (error) {
//       console.error(
//         "History API error:",
//         error.response?.data || error.message
//       );

//       setErrorMessage(
//         error.response?.data?.message ||
//           "Unable to load History Card."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // BACK TO GAUGE LIST


// const handleBack = () => {
//   navigate("/dashboard");
// };



//   // PRINT
//   const handlePrint = () => {
//     if (!header) {
//       alert("Please select a Gauge first.");
//       return;
//     }

//     window.print();
//   };


// const handleDownloadPDF = async () => {
//   if (!header) {
//     alert("Please select a Gauge first.");
//     return;
//   }

//   const element = document.querySelector(".history-card-paper");

//   if (!element) {
//     alert("History Card content not found.");
//     return;
//   }

//   const hiddenElements = element.querySelectorAll(".no-print");
//   const previousDisplays = Array.from(hiddenElements).map(
//     (item) => item.style.display
//   );

//   try {
//     hiddenElements.forEach((item) => {
//       item.style.display = "none";
//     });

//     const html2pdf = (await import("html2pdf.js")).default;

//     await html2pdf()
//       .set({
//         margin: 8,
//         filename: `HistoryCard_${header.GaugeIDNo || "Gauge"}.pdf`,
//         image: {
//           type: "jpeg",
//           quality: 0.98,
//         },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           backgroundColor: "#ffffff",
//         },
//         jsPDF: {
//           unit: "mm",
//           format: "a4",
//           orientation: "landscape",
//         },
//         pagebreak: {
//           mode: ["css", "legacy"],
//         },
//       })
//       .from(element)
//       .save();
//   } catch (error) {
//     console.error("PDF download error:", error);
//     alert("Unable to download PDF. Please try again.");
//   } finally {
//     hiddenElements.forEach((item, index) => {
//       item.style.display = previousDisplays[index];
//     });
//   }
// };


//   // FORMAT HELPERS
//   const showValue = (value) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === ""
//     ) {
//       return "-";
//     }

//     return value;
//   };


// const formatTolerance = (value) => {
//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "-";
//   }

//   const number = Number(value);

//   if (!Number.isFinite(number)) {
//     return value;
//   }

//   // No rounding: keep only 3 digits after decimal
//   return (Math.trunc(number * 1000) / 1000).toFixed(3);
// };


//   const formatDate = (date) => {
//     if (!date) return "-";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "-";
//     }

//     return parsedDate.toLocaleDateString("en-GB");
//   };

//   const giType = (
//     header?.GITypeInfo?.GIType || ""
//   )
//     .trim()
//     .toUpperCase();

//   const selectedFormat = (
//     header?.SelectedFormat || ""
//   ).toUpperCase();

//   const isFormat5Gauge =
//     selectedFormat === "FORMAT5" ||
//     giType.includes("PLUG GAUGE") ||
//     giType.includes("WIDTH GAUGE") ||
//     giType.includes("SNAP GAUGE") ||
//     giType.includes("FLUSH PIN GAUGE") ||
//     giType.includes("PADDLE GAUGE");

//   const isFormat10Gauge =
//     selectedFormat === "FORMAT10" ||
//     giType.includes("THREAD PLUG GAUGE") ||
//     giType.includes("TAPER THREAD GAUGE");

//   const isRingGauge =
//     selectedFormat === "FORMAT1" ||
//     giType.includes("RING GAUGE");

//   const isPlungerDial =
//     giType.includes("PLUNGER DIAL") ||
//     giType.includes("LEVER DIAL");

//   const isBoreGauge =
//     giType.includes("BORE GAUGE") ||
//     giType.includes("DIAL SNAP GAUGE") ||
//     giType.includes("INTERNAL DIAL COMPARATOR");

//   const isVernier =
//     giType.includes("VERNIER CALLIPER") ||
//     giType.includes("MICROMETER") ||
//     giType.includes("DIGITAL CALIPER") ||
//     giType.includes("DIGITAL DEPTH GAUGE") ||
//     giType.includes("DIGITAL HEIGHT GAUGE") ||
//     giType.includes("VERNIER HEIGHT GAUGE") ||
//     giType.includes("VERNIER DEPTH GAUGE");

//   // FORMAT 5 ACCEPTANCE CRITERIA
//   const renderFormat5AcceptanceCriteria = () => {
//     const info =
//       header?.Format5Info ||
//       history?.[0]?.Format5Info;

//     if (!info) {
//       return <Typography color="text.secondary">-</Typography>;
//     }

//     return (
//       <Box>
//         <Typography>
//           <b>Go Size:</b> {showValue(info.GoSizeNew)}
//         </Typography>
//         <Typography>
//           <b>Go Mfg Tol:</b> {formatTolerance(info.GoSizeMfgTol)}
//         </Typography>
//         <Typography>
//           <b>Go Wear Limit:</b>{" "}
//           {showValue(info.GoSizeWearLimit)}
//         </Typography>

//         <Divider sx={{ my: 1 }} />

//         <Typography>
//           <b>No Go Size:</b>{" "}
//           {showValue(info.NoGoSizeNew)}
//         </Typography>
//         <Typography>
//           <b>No Go Mfg Tol:</b>{" "}
//           {formatTolerance(info.NoGoSizeMfgTol)}
//         </Typography>
//         <Typography>
//           <b>No Go Wear Limit:</b>{" "}
//           {showValue(info.NoGoSizeWearLimit)}
//         </Typography>
//       </Box>
//     );
//   };

//   // ACCEPTANCE CRITERIA
//   const renderAcceptanceCriteria = () => {
//     if (isFormat5Gauge) {
//       return renderFormat5AcceptanceCriteria();
//     }

//     if (isFormat10Gauge) {
//       return (
//         <Typography>
//           {showValue(
//             header?.Format10Info?.SpecifiedSize
//           )}
//         </Typography>
//       );
//     }

//     if (isRingGauge) {
//       return (
//         <Typography>
//           {showValue(header?.Format1Info?.GaugeSize)}
//         </Typography>
//       );
//     }

//     return (
//       <Typography>
//         {showValue(header?.STDSpecification)}
//       </Typography>
//     );
//   };

//   // CALIBRATION OBSERVATION
//   const renderObservation = (item) => {
//     const format = (
//       item?.SelectedFormat || ""
//     ).toUpperCase();

//     const type = (
//       item?.GITypeInfo?.GIType || ""
//     ).trim().toUpperCase();

//     if (
//       format === "FORMAT1" ||
//       type.includes("RING GAUGE")
//     ) {
//       return showValue(item?.Format1Info?.ActualSize);
//     }

//     if (
//       format === "FORMAT10" ||
//       type.includes("THREAD PLUG GAUGE") ||
//       type.includes("TAPER THREAD GAUGE")
//     ) {
//       return showValue(item?.Format10Info?.ActualSize);
//     }

//     if (
//       format === "FORMAT5" ||
//       type.includes("PLUG GAUGE") ||
//       type.includes("WIDTH GAUGE") ||
//       type.includes("SNAP GAUGE") ||
//       type.includes("FLUSH PIN GAUGE") ||
//       type.includes("PADDLE GAUGE")
//     ) {
//       const info = item?.Format5Info;

//       if (!info) return "-";

//       return (
//         <Box>
//           <Typography>
//             <b>Go:</b>{" "}
//             {showValue(info.GoSizeActual1)}
//             {" / "}
//             {showValue(info.GoSizeActual2)}
//           </Typography>
//           <Typography>
//             <b>No Go:</b>{" "}
//             {showValue(info.NoGoSizeActual1)}
//             {" / "}
//             {showValue(info.NoGoSizeActual2)}
//           </Typography>
//         </Box>
//       );
//     }

//     return "-";
//   };

//   // OPEN CERTIFICATE PDF
//   const openPdf = (item) => {
//     if (!item?.CalCertificateNo) {
//       alert("PDF Not Available");
//       return;
//     }

//     if (!API_URL) {
//       alert("API URL is missing.");
//       return;
//     }

//     const certificateNo = item.CalCertificateNo.trim();
//     const fileName = certificateNo.replace(/\//g, "-");

//     const baseURL = API_URL.replace(/\/api\/?$/, "");

//     const pdfURL =
//       `${baseURL}/certificates/` +
//       `${encodeURIComponent(fileName)}.pdf`;

//     window.open(pdfURL, "_blank", "noopener,noreferrer");
//   };

//   // GAUGE LIST FIELD MAPPING
//   const getGaugeCode = (gauge) =>
//     gauge?.GaugeIDNo ||
//     gauge?.GaugeCodeNo ||
//     gauge?.gaugeNo ||
//     gauge?.CodeNo ||
//     "";

//   const getGaugeDescription = (gauge) =>
//     gauge?.Description ||
//     gauge?.GITypeInfo?.GIType ||
//     gauge?.GIType ||
//     gauge?.GaugeDescription ||
//     "-";

//   if (!customerId) return null;

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#1e293b)",
//         p: { xs: 1.5, md: 4 },

//         "@media print": {
//           background: "#fff",
//           padding: "0 !important",
//           minHeight: "auto",

//           "& .no-print": {
//             display: "none !important",
//           },

//           "& .history-card-paper": {
//             boxShadow: "none !important",
//             border: "1px solid #ddd",
//             padding: "12px !important",
//           },

//           "& .MuiPaper-root": {
//             boxShadow: "none !important",
//           },

//           "@page": {
//             size: "landscape",
//             margin: "10mm",
//           },
//         },
//       }}
//     >
//       <Paper
//         elevation={8}
//         sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
//       >
//         {/* CUSTOMER HEADER */}
//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h5" fontWeight="bold">
//             {header?.CustomerInfo?.Customer ||
//               customer.Customer ||
//               "Customer"}
//           </Typography>

//           <Typography color="text.secondary">
//             {header?.CustomerInfo?.Address ||
//               customer.Address ||
//               ""}
//             {header?.CustomerInfo?.City
//               ? `, ${header.CustomerInfo.City}`
//               : ""}
//           </Typography>
//         </Box>

//         {errorMessage && (
//           <Alert
//             severity="warning"
//             sx={{ mb: 2 }}
//             onClose={() => setErrorMessage("")}
//           >
//             {errorMessage}
//           </Alert>
//         )}

       
// {/* SEARCH GAUGE ONLY */}


// {!showHistory && (
//   <>
//     {/* BACK BUTTON */}
//     <Box sx={{ mb: 2 }}>
//       <Button
//         variant="outlined"
//         onClick={handleBack}
//         sx={{
//           textTransform: "none",
//           fontWeight: "bold",
//           borderRadius: 2,
//           px: 2,
//           py: 1,
//         }}
//       >
//         ← Back
//       </Button>
//     </Box>

//     <Divider sx={{ my: 3 }} />

//     <Typography fontWeight="bold" mb={2}>
//       Search Gauge
//     </Typography>

//     <Grid container spacing={2} alignItems="center">
//       <Grid item xs={12} md={8}>
//         <Autocomplete
//           fullWidth
//           freeSolo
          
// options={gauges}

//           loading={loadingGauges}
//           value={selectedGauge}
//           inputValue={gaugeInput}
//           getOptionLabel={(option) => {
//             if (typeof option === "string") {
//               return option;
//             }

//             return `${getGaugeCode(option)} - ${getGaugeDescription(option)}`;
//           }}
//           isOptionEqualToValue={(option, value) =>
//             typeof value !== "string" &&
//             getGaugeCode(option) === getGaugeCode(value)
//           }
//           onChange={(event, newValue) => {
//             if (typeof newValue === "string") {
//               const code = newValue.trim();

//               setSelectedGauge(null);
//               setGaugeNo(code);
//               setGaugeInput(newValue);
//             } else {
//               setSelectedGauge(newValue);

//               const code = newValue
//                 ? String(getGaugeCode(newValue) || "").trim()
//                 : "";

//               setGaugeNo(code);
//               setGaugeInput(
//                 newValue
//                   ? `${code} - ${getGaugeDescription(newValue)}`
//                   : ""
//               );
//             }

//             setErrorMessage("");
//           }}
//           onInputChange={(event, newInputValue, reason) => {
//             setGaugeInput(newInputValue);

//             if (reason === "input") {
//               setSelectedGauge(null);
//               setGaugeNo(newInputValue.trim());
//               setErrorMessage("");
//             }

//             if (reason === "clear") {
//               setSelectedGauge(null);
//               setGaugeNo("");
//               setGaugeInput("");
//             }
//           }}
//           noOptionsText={
//             gaugeInput.trim()
//               ? "Gauge not in list? You can still search this ID."
//               : "No Gauges Found"
//           }
//           loadingText="Loading Gauges..."
//           renderOption={(props, option) => (
//             <li {...props} key={getGaugeCode(option)}>
//               <Box sx={{ py: 0.5 }}>
//                 <Typography fontWeight="bold">
//                   {getGaugeCode(option)}
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                 >
//                   {getGaugeDescription(option)}
//                 </Typography>
//               </Box>
//             </li>
//           )}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Gauge Code No / Description"
//               placeholder="Type Gauge ID or Description..."
//               InputProps={{
//                 ...params.InputProps,
//                 endAdornment: (
//                   <>
//                     {loadingGauges && (
//                       <CircularProgress size={20} />
//                     )}
//                     {params.InputProps.endAdornment}
//                   </>
//                 ),
//               }}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") {
//                   event.preventDefault();
//                   event.stopPropagation();
//                 }
//               }}
//             />
//           )}
//         />
//       </Grid>

//       <Grid item xs={12} md={4}>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             height: 56,
//             fontWeight: "bold",
//           }}
//           onClick={() => {
//             if (!gaugeNo) {
//               setErrorMessage(
//                 "Please select a Gauge from the dropdown."
//               );
//               return;
//             }

//             loadHistory(gaugeNo);
//           }}
//           disabled={loading || loadingGauges}
//         >
//           {loading ? "Searching..." : "SEARCH"}
//         </Button>
//       </Grid>
//     </Grid>
//   </>
// )}



//         {/* LOADING HISTORY */}
//         {loading && (
//           <Box sx={{ textAlign: "center", p: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>
//               Loading History Card...
//             </Typography>
//           </Box>
//         )}

//         {/* HISTORY CARD */}
//         {header && showHistory && (
//           <Paper
//             className="history-card-paper"
//             elevation={6}
//             sx={{
//               p: { xs: 2, md: 4 },
//               borderRadius: 3,
//               border: "1px solid #d0d7de",
//             }}
//           >
//             {/* ACTION BUTTONS */}
//             <Box
//               className="no-print"
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 1,
//                 flexWrap: "wrap",
//                 mb: 3,
//               }}
//             >
//               <Button variant="outlined" onClick={handleBack}>
//                 ← Back to Gauges
//               </Button>

//               <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                 <Button variant="contained" onClick={handlePrint}>
//                   Print
//                 </Button>

//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={handleDownloadPDF}
//                 >
//                   Download PDF
//                 </Button>
//               </Box>
//             </Box>

//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               mb={4}
//             >
//               HISTORY CARD
//             </Typography>

//             {/* GAUGE DETAILS */}
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={4}>
//                 <Typography mb={2}>
//                   <b>Description:</b> {giType || "-"}
//                 </Typography>

//                 <Typography mb={2}>
//                   <b>MFG Sr No:</b> {showValue(header.MFGSrNo)}
//                 </Typography>

//                 <Typography mb={2}>
//                   <b>Calibration Frequency:</b>{" "}
//                   {header.Frequency !== "" &&
//                   header.Frequency != null
//                     ? `${header.Frequency} Months`
//                     : "-"}
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Typography mb={2}>
//                   <b>Code No:</b> {showValue(header.GaugeIDNo)}
//                 </Typography>

//                 <Typography mb={2}>
//                   <b>Make:</b> {showValue(header.Make)}
//                 </Typography>

//                 {isFormat5Gauge && (
//                   <>
//                     <Typography mb={2}>
//                       <b>Go Size:</b>{" "}
//                       {showValue(header.GoSize)} mm
//                     </Typography>

//                     <Typography mb={2}>
//                       <b>No Go Size:</b>{" "}
//                       {showValue(header.NoGoSize)} mm
//                     </Typography>
//                   </>
//                 )}

//                 {isRingGauge && (
//                   <Typography mb={2}>
//                     <b>Size:</b>{" "}
//                     {showValue(
//                       header?.Format1Info?.GaugeSize ??
//                         header?.STDSpecification
//                     )}
//                   </Typography>
//                 )}

//                 {(isPlungerDial || isVernier) && (
//                   <>
//                     <Typography mb={2}>
//                       <b>Range:</b>{" "}
//                       {showValue(header.GIRangeFrom)} -{" "}
//                       {showValue(header.GIRangeTo)} mm
//                     </Typography>

//                     <Typography mb={2}>
//                       <b>L.C:</b> {showValue(header.GILC)} mm
//                     </Typography>
//                   </>
//                 )}

//                 {(isBoreGauge || isFormat10Gauge) && (
//                   <Typography mb={2}>
//                     <b>STD Specification:</b>{" "}
//                     {showValue(header.STDSpecification)}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Paper
//                   elevation={1}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "#f8fbff",
//                     border: "1px solid #1976d2",
//                     minHeight: 150,
//                   }}
//                 >
//                   <Typography
//                     fontWeight="bold"
//                     color="primary"
//                     mb={2}
//                   >
//                     Acceptance Criteria
//                   </Typography>

//                   {renderAcceptanceCriteria()}
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             {/* CALIBRATION HISTORY */}
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               color="#1565c0"
//               mb={3}
//             >
//               Calibration History
//             </Typography>

//             <TableContainer
//               sx={{
//                 border: "1px solid #d0d7de",
//                 borderRadius: 2,
//                 overflowX: "auto",
//               }}
//             >
//               <Table size="small">
//                 <TableHead>
//                   <TableRow
//                     sx={{
//                       backgroundColor: "#1565c0",
//                       "& th": {
//                         color: "#fff",
//                         fontWeight: "bold",
//                         textAlign: "center",
//                       },
//                     }}
//                   >
//                     <TableCell>Calibration Date</TableCell>
//                     <TableCell>Calibrated By</TableCell>
//                     <TableCell>Certificate No</TableCell>
//                     <TableCell>Observation</TableCell>
//                     <TableCell>Remark</TableCell>
//                     <TableCell>Next Due Date</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {history.length > 0 ? (
//                     history.map((item, index) => (
//                       <TableRow
//                         key={
//                           item.CalCertificateNo ||
//                           `${item.CalibratedOn}-${index}`
//                         }
//                         sx={{
//                           "&:nth-of-type(even)": {
//                             backgroundColor: "#f8f9fa",
//                           },
//                         }}
//                       >
//                         <TableCell align="center">
//                           {formatDate(item.CalibratedOn)}
//                         </TableCell>

//                         <TableCell align="center">
//                           Ravikiran Calibration Lab
//                         </TableCell>

//                         <TableCell align="center">
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               gap: 1,
//                               flexWrap: "wrap",
//                             }}
//                           >
//                             <span>
//                               {item.CalCertificateNo || "-"}
//                             </span>

//                             <Button
//                               className="no-print"
//                               variant="contained"
//                               size="small"
//                               disabled={!item.CalCertificateNo}
//                               onClick={() => openPdf(item)}
//                             >
//                               PDF
//                             </Button>
//                           </Box>
//                         </TableCell>

//                         <TableCell align="center">
//                           {renderObservation(item)}
//                         </TableCell>

//                         <TableCell align="center">
//                           {showValue(item.Remark)}
//                         </TableCell>

//                         <TableCell align="center">
//                           {formatDate(item.NextDueOn)}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">
//                         No Calibration History Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}
//       </Paper>
//     </Box>
//   );
// }

// export default HistoryCard;





































import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  TableContainer,
  CircularProgress,
  Alert,
  Autocomplete,
} from "@mui/material";

function HistoryCard() {
  const navigate = useNavigate();

  const [gaugeNo, setGaugeNo] = useState("");
  const [gaugeInput, setGaugeInput] = useState("");
  const [header, setHeader] = useState(null);
  const [history, setHistory] = useState([]);
  const [gauges, setGauges] = useState([]);

  const [selectedGauge, setSelectedGauge] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingGauges, setLoadingGauges] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // CUSTOMER SESSION
  let customer = {};

  try {
    customer = JSON.parse(
      localStorage.getItem("customer") || "{}"
    );
  } catch (error) {
    console.error("Customer session error:", error);
  }


const customerId = customer.CustomerID;
const API_URL = "http://localhost:5000/api";


  // LOGIN CHECK
  useEffect(() => {
    if (!customerId) {
      navigate("/");
    }
  }, [customerId, navigate]);

  // LOAD LOGGED-IN CUSTOMER'S GAUGES



  // LOAD LOGGED-IN CUSTOMER'S GAUGES
  useEffect(() => {
    let active = true;

    const fetchGauges = async () => {
      setLoadingGauges(true);
      setGauges([]);
      setErrorMessage("");

      try {
        if (!customerId) {
          throw new Error(
            "CustomerID not found in localStorage."
          );
        }

        if (!API_URL) {
          throw new Error(
            "REACT_APP_API_BASE_URL is missing in .env."
          );
        }

        console.log("Customer ID:", customerId);
        console.log("API URL:", API_URL);

 
const response = await axios.get(
  `${API_URL}/history-gauges-optimized`,
  {
    params: { customerId },
    timeout: 60000,
  }
);


        console.log(
          "Gauge API Response:",
          response.status,
          response.data
        );

        if (!active) return;

        const list =
          response.data?.gauges ??
          response.data?.data ??
          response.data?.records ??
          [];

        if (!Array.isArray(list)) {
          throw new Error(
            "Invalid API response: gauges must be an array."
          );
        }

        setGauges(list);

        if (list.length === 0) {
          setErrorMessage(
            "No Gauges returned by the API for this customer."
          );
        }
      } catch (error) {
        console.error(
          "Gauge API Error:",
          error.response?.data || error.message
        );

        if (!active) return;

        setGauges([]);

        setErrorMessage(
         
error.code === "ECONNABORTED"
  ? "Gauge API timed out after 60 seconds."
  : error.response?.data?.message ||
    error.message ||
    "Unable to load Gauges."

        );
      } finally {
        if (active) {
          setLoadingGauges(false);
        }
      }
    };

    fetchGauges();

    return () => {
      active = false;
    };
  }, [customerId, API_URL]);


  // LOAD SELECTED GAUGE HISTORY
  const loadHistory = async (selectedGaugeNo = gaugeNo) => {
    const code = String(selectedGaugeNo || "").trim();

    if (!code) {
      alert("Please select or enter Gauge Code No.");
      return;
    }

    if (!customerId || !API_URL) {
      alert("Customer session or API URL is missing.");
      return;
    }

   
setLoading(true);
setShowHistory(false);
setErrorMessage("");
setHeader(null);
setHistory([]);


    try {
      const response = await axios.get(
        `${API_URL}/history-card`,
        {
          params: {
            customerId,
            gaugeNo: code,
          },
        }
      );

      if (!response.data?.success || !response.data?.header) {
        setErrorMessage("No History Found for this Gauge.");
        return;
      }

      setGaugeNo(code);
      setHeader(response.data.header);
      setHistory(
        Array.isArray(response.data.history)
          ? response.data.history
          : []
      );
      setShowHistory(true);
    } catch (error) {
      console.error(
        "History API error:",
        error.response?.data || error.message
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to load History Card."
      );
    } finally {
      setLoading(false);
    }
  };

  // BACK TO GAUGE LIST


const handleBack = () => {
  navigate("/dashboard");
};



  // PRINT
  const handlePrint = () => {
    if (!header) {
      alert("Please select a Gauge first.");
      return;
    }

    window.print();
  };


const handleDownloadPDF = async () => {
  if (!header) {
    alert("Please select a Gauge first.");
    return;
  }

  const element = document.querySelector(".history-card-paper");

  if (!element) {
    alert("History Card content not found.");
    return;
  }

  const hiddenElements = element.querySelectorAll(".no-print");
  const previousDisplays = Array.from(hiddenElements).map(
    (item) => item.style.display
  );

  try {
    hiddenElements.forEach((item) => {
      item.style.display = "none";
    });

    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        margin: 8,
        filename: `HistoryCard_${header.GaugeIDNo || "Gauge"}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "landscape",
        },
        pagebreak: {
          mode: ["css", "legacy"],
        },
      })
      .from(element)
      .save();
  } catch (error) {
    console.error("PDF download error:", error);
    alert("Unable to download PDF. Please try again.");
  } finally {
    hiddenElements.forEach((item, index) => {
      item.style.display = previousDisplays[index];
    });
  }
};


  // FORMAT HELPERS
  const showValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    return value;
  };


const formatTolerance = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return value;
  }

  // No rounding: keep only 3 digits after decimal
  return (Math.trunc(number * 1000) / 1000).toFixed(3);
};


  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB");
  };

  const giType = (
    header?.GITypeInfo?.GIType || ""
  )
    .trim()
    .toUpperCase();

  const selectedFormat = (
    header?.SelectedFormat || ""
  ).toUpperCase();

  const isFormat5Gauge =
    selectedFormat === "FORMAT5" ||
    giType.includes("PLUG GAUGE") ||
    giType.includes("WIDTH GAUGE") ||
    giType.includes("SNAP GAUGE") ||
    giType.includes("FLUSH PIN GAUGE") ||
    giType.includes("PADDLE GAUGE");

  const isFormat10Gauge =
    selectedFormat === "FORMAT10" ||
    giType.includes("THREAD PLUG GAUGE") ||
    giType.includes("TAPER THREAD GAUGE");

  const isRingGauge =
    selectedFormat === "FORMAT1" ||
    giType.includes("RING GAUGE");

  const isPlungerDial =
    giType.includes("PLUNGER DIAL") ||
    giType.includes("LEVER DIAL");

  const isBoreGauge =
    giType.includes("BORE GAUGE") ||
    giType.includes("DIAL SNAP GAUGE") ||
    giType.includes("INTERNAL DIAL COMPARATOR");

  const isVernier =
    giType.includes("VERNIER CALLIPER") ||
    giType.includes("MICROMETER") ||
    giType.includes("DIGITAL CALIPER") ||
    giType.includes("DIGITAL DEPTH GAUGE") ||
    giType.includes("DIGITAL HEIGHT GAUGE") ||
    giType.includes("VERNIER HEIGHT GAUGE") ||
    giType.includes("VERNIER DEPTH GAUGE");

  // FORMAT 5 ACCEPTANCE CRITERIA
  const renderFormat5AcceptanceCriteria = () => {
    
const info =
  header?.Format5Info ||
  history.find((item) => item?.Format5Info)?.Format5Info;


    if (!info) {
      return <Typography color="text.secondary">-</Typography>;
    }

    return (
      <Box>
        <Typography>
          <b>Go Size:</b> {showValue(info.GoSizeNew)}
        </Typography>
        <Typography>
          <b>Go Mfg Tol:</b> {formatTolerance(info.GoSizeMfgTol)}
        </Typography>
        <Typography>
          <b>Go Wear Limit:</b>{" "}
          {showValue(info.GoSizeWearLimit)}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography>
          <b>No Go Size:</b>{" "}
          {showValue(info.NoGoSizeNew)}
        </Typography>
        <Typography>
          <b>No Go Mfg Tol:</b>{" "}
          {formatTolerance(info.NoGoSizeMfgTol)}
        </Typography>
        <Typography>
          <b>No Go Wear Limit:</b>{" "}
          {showValue(info.NoGoSizeWearLimit)}
        </Typography>
      </Box>
    );
  };

  // ACCEPTANCE CRITERIA
  const renderAcceptanceCriteria = () => {
    if (isFormat5Gauge) {
      return renderFormat5AcceptanceCriteria();
    }

    if (isFormat10Gauge) {
      return (
        <Typography>
          {showValue(
            header?.Format10Info?.SpecifiedSize
          )}
        </Typography>
      );
    }

    if (isRingGauge) {
      return (
        <Typography>
          {showValue(header?.Format1Info?.GaugeSize)}
        </Typography>
      );
    }

    return (
      <Typography>
        {showValue(header?.STDSpecification)}
      </Typography>
    );
  };

  // CALIBRATION OBSERVATION
  const renderObservation = (item) => {
    const format = (
      item?.SelectedFormat || ""
    ).toUpperCase();

    const type = (
      item?.GITypeInfo?.GIType || ""
    ).trim().toUpperCase();

    if (
      format === "FORMAT1" ||
      type.includes("RING GAUGE")
    ) {
      return showValue(item?.Format1Info?.ActualSize);
    }

    if (
      format === "FORMAT10" ||
      type.includes("THREAD PLUG GAUGE") ||
      type.includes("TAPER THREAD GAUGE")
    ) {
      return showValue(item?.Format10Info?.ActualSize);
    }

    if (
      format === "FORMAT5" ||
      type.includes("PLUG GAUGE") ||
      type.includes("WIDTH GAUGE") ||
      type.includes("SNAP GAUGE") ||
      type.includes("FLUSH PIN GAUGE") ||
      type.includes("PADDLE GAUGE")
    ) {
      const info = item?.Format5Info;

      if (!info) return "-";

      console.log("OBSERVATION ITEM:", item);
console.log("FORMAT5 INFO:", item?.Format5Info);

      return (
        <Box>
          <Typography>
            <b>Go:</b>{" "}
            {showValue(info.GoSizeActual1)}
            {" / "}
            {showValue(info.GoSizeActual2)}
          </Typography>
          <Typography>
            <b>No Go:</b>{" "}
            {showValue(info.NoGoSizeActual1)}
            {" / "}
            {showValue(info.NoGoSizeActual2)}
          </Typography>
        </Box>
      );
    }

    return "-";
  };

  // OPEN CERTIFICATE PDF
  const openPdf = (item) => {
    if (!item?.CalCertificateNo) {
      alert("PDF Not Available");
      return;
    }

    if (!API_URL) {
      alert("API URL is missing.");
      return;
    }

    const certificateNo = item.CalCertificateNo.trim();
    const fileName = certificateNo.replace(/\//g, "-");

    const baseURL = API_URL.replace(/\/api\/?$/, "");

    const pdfURL =
      `${baseURL}/certificates/` +
      `${encodeURIComponent(fileName)}.pdf`;

    window.open(pdfURL, "_blank", "noopener,noreferrer");
  };

  // GAUGE LIST FIELD MAPPING
  const getGaugeCode = (gauge) =>
    gauge?.GaugeIDNo ||
    gauge?.GaugeCodeNo ||
    gauge?.gaugeNo ||
    gauge?.CodeNo ||
    "";

  const getGaugeDescription = (gauge) =>
    gauge?.Description ||
    gauge?.GITypeInfo?.GIType ||
    gauge?.GIType ||
    gauge?.GaugeDescription ||
    "-";

  if (!customerId) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        p: { xs: 1.5, md: 4 },

        "@media print": {
          background: "#fff",
          padding: "0 !important",
          minHeight: "auto",

          "& .no-print": {
            display: "none !important",
          },

          "& .history-card-paper": {
            boxShadow: "none !important",
            border: "1px solid #ddd",
            padding: "12px !important",
          },

          "& .MuiPaper-root": {
            boxShadow: "none !important",
          },

          "@page": {
            size: "landscape",
            margin: "10mm",
          },
        },
      }}
    >
      <Paper
        elevation={8}
        sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
      >
        {/* CUSTOMER HEADER */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            {header?.CustomerInfo?.Customer ||
              customer.Customer ||
              "Customer"}
          </Typography>

          <Typography color="text.secondary">
            {header?.CustomerInfo?.Address ||
              customer.Address ||
              ""}
            {header?.CustomerInfo?.City
              ? `, ${header.CustomerInfo.City}`
              : ""}
          </Typography>
        </Box>

        {errorMessage && (
          <Alert
            severity="warning"
            sx={{ mb: 2 }}
            onClose={() => setErrorMessage("")}
          >
            {errorMessage}
          </Alert>
        )}

       
{/* SEARCH GAUGE ONLY */}


{!showHistory && (
  <>
    {/* BACK BUTTON */}
    <Box sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 2,
          px: 2,
          py: 1,
        }}
      >
        ← Back
      </Button>
    </Box>

    <Divider sx={{ my: 3 }} />

    <Typography fontWeight="bold" mb={2}>
      Search Gauge
    </Typography>

    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={8}>
        <Autocomplete
          fullWidth
          freeSolo
          
options={gauges}

          loading={loadingGauges}
          value={selectedGauge}
          inputValue={gaugeInput}
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return option;
            }

            return `${getGaugeCode(option)} - ${getGaugeDescription(option)}`;
          }}
          isOptionEqualToValue={(option, value) =>
            typeof value !== "string" &&
            getGaugeCode(option) === getGaugeCode(value)
          }
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              const code = newValue.trim();

              setSelectedGauge(null);
              setGaugeNo(code);
              setGaugeInput(newValue);
            } else {
              setSelectedGauge(newValue);

              const code = newValue
                ? String(getGaugeCode(newValue) || "").trim()
                : "";

              setGaugeNo(code);
              setGaugeInput(
                newValue
                  ? `${code} - ${getGaugeDescription(newValue)}`
                  : ""
              );
            }

            setErrorMessage("");
          }}
          onInputChange={(event, newInputValue, reason) => {
            setGaugeInput(newInputValue);

            if (reason === "input") {
              setSelectedGauge(null);
              setGaugeNo(newInputValue.trim());
              setErrorMessage("");
            }

            if (reason === "clear") {
              setSelectedGauge(null);
              setGaugeNo("");
              setGaugeInput("");
            }
          }}
          noOptionsText={
            gaugeInput.trim()
              ? "Gauge not in list? You can still search this ID."
              : "No Gauges Found"
          }
          loadingText="Loading Gauges..."
          renderOption={(props, option) => (
            <li {...props} key={getGaugeCode(option)}>
              <Box sx={{ py: 0.5 }}>
                <Typography fontWeight="bold">
                  {getGaugeCode(option)}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {getGaugeDescription(option)}
                </Typography>
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Gauge Code No / Description"
              placeholder="Type Gauge ID or Description..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingGauges && (
                      <CircularProgress size={20} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            height: 56,
            fontWeight: "bold",
          }}
          onClick={() => {
            if (!gaugeNo) {
              setErrorMessage(
                "Please select a Gauge from the dropdown."
              );
              return;
            }

            loadHistory(gaugeNo);
          }}
          disabled={loading || loadingGauges}
        >
          {loading ? "Searching..." : "SEARCH"}
        </Button>
      </Grid>
    </Grid>
  </>
)}



        {/* LOADING HISTORY */}
        {loading && (
          <Box sx={{ textAlign: "center", p: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>
              Loading History Card...
            </Typography>
          </Box>
        )}

        {/* HISTORY CARD */}
        {header && showHistory && (
          <Paper
            className="history-card-paper"
            elevation={6}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              border: "1px solid #d0d7de",
            }}
          >
            {/* ACTION BUTTONS */}
            <Box
              className="no-print"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                mb: 3,
              }}
            >
              <Button variant="outlined" onClick={handleBack}>
                ← Back to Gauges
              </Button>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button variant="contained" onClick={handlePrint}>
                  Print
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </Button>
              </Box>
            </Box>

            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              mb={4}
            >
              HISTORY CARD
            </Typography>

            {/* GAUGE DETAILS */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography mb={2}>
                  <b>Description:</b> {giType || "-"}
                </Typography>

                <Typography mb={2}>
                  <b>MFG Sr No:</b> {showValue(header.MFGSrNo)}
                </Typography>

                <Typography mb={2}>
                  <b>Calibration Frequency:</b>{" "}
                  {header.Frequency !== "" &&
                  header.Frequency != null
                    ? `${header.Frequency} Months`
                    : "-"}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography mb={2}>
                  <b>Code No:</b> {showValue(header.GaugeIDNo)}
                </Typography>

                <Typography mb={2}>
                  <b>Make:</b> {showValue(header.Make)}
                </Typography>

                {isFormat5Gauge && (
                  <>
                    <Typography mb={2}>
                      <b>Go Size:</b>{" "}
                      {showValue(header.GoSize)} mm
                    </Typography>

                    <Typography mb={2}>
                      <b>No Go Size:</b>{" "}
                      {showValue(header.NoGoSize)} mm
                    </Typography>
                  </>
                )}

                {isRingGauge && (
                  <Typography mb={2}>
                    <b>Size:</b>{" "}
                    {showValue(
                      header?.Format1Info?.GaugeSize ??
                        header?.STDSpecification
                    )}
                  </Typography>
                )}

                {(isPlungerDial || isVernier) && (
                  <>
                    <Typography mb={2}>
                      <b>Range:</b>{" "}
                      {showValue(header.GIRangeFrom)} -{" "}
                      {showValue(header.GIRangeTo)} mm
                    </Typography>

                    <Typography mb={2}>
                      <b>L.C:</b> {showValue(header.GILC)} mm
                    </Typography>
                  </>
                )}

                {(isBoreGauge || isFormat10Gauge) && (
                  <Typography mb={2}>
                    <b>STD Specification:</b>{" "}
                    {showValue(header.STDSpecification)}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#f8fbff",
                    border: "1px solid #1976d2",
                    minHeight: 150,
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    color="primary"
                    mb={2}
                  >
                    Acceptance Criteria
                  </Typography>

                  {renderAcceptanceCriteria()}
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* CALIBRATION HISTORY */}
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#1565c0"
              mb={3}
            >
              Calibration History
            </Typography>

            <TableContainer
              sx={{
                border: "1px solid #d0d7de",
                borderRadius: 2,
                overflowX: "auto",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#1565c0",
                      "& th": {
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell>Calibration Date</TableCell>
                    <TableCell>Calibrated By</TableCell>
                    <TableCell>Certificate No</TableCell>
                    <TableCell>Observation</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Next Due Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {history.length > 0 ? (
                    history.map((item, index) => (
                      <TableRow
                        key={
                          item.CalCertificateNo ||
                          `${item.CalibratedOn}-${index}`
                        }
                        sx={{
                          "&:nth-of-type(even)": {
                            backgroundColor: "#f8f9fa",
                          },
                        }}
                      >
                        <TableCell align="center">
                          {formatDate(item.CalibratedOn)}
                        </TableCell>

                        <TableCell align="center">
                          Ravikiran Calibration Lab
                        </TableCell>

                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <span>
                              {item.CalCertificateNo || "-"}
                            </span>

                            <Button
                              className="no-print"
                              variant="contained"
                              size="small"
                              disabled={!item.CalCertificateNo}
                              onClick={() => openPdf(item)}
                            >
                              PDF
                            </Button>
                          </Box>
                        </TableCell>

                        <TableCell align="center">
                          {renderObservation(item)}
                        </TableCell>

                        <TableCell align="center">
                          {showValue(item.Remark)}
                        </TableCell>

                        <TableCell align="center">
                          {formatDate(item.NextDueOn)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No Calibration History Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}

export default HistoryCard;
