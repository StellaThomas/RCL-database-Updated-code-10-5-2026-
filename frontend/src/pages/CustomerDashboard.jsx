

import React from "react";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

function CustomerDashboard() {

  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3
      }}
    >

      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 5,
          overflow: "hidden"
        }}
      >



        
{/* BACK TO LOGIN BUTTON */}
<Box
  sx={{
    px: 3,
    pt: 2,
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  }}
>
  <Button
    variant="outlined"
    startIcon={<ArrowBackIcon />}
    onClick={() => navigate("/")}
    sx={{
      textTransform: "none",
      fontWeight: "bold",
      borderRadius: 2,
    }}
  >
    Back to Login
  </Button>
</Box>


        {/* Header */}

        <Box
          sx={{
            background:
              "linear-gradient(90deg,#1565c0,#42a5f5)",
            color: "#fff",
            p: 4
          }}
        >

          <Box
            display="flex"
            alignItems="center"
          >

            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#fff",
                color: "#1565c0",
                mr: 3
              }}
            >
              <PersonIcon sx={{ fontSize: 45 }} />
            </Avatar>

            <Box>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Welcome
              </Typography>

              <Typography
                variant="h5"
              >
                {customer?.Customer}
              </Typography>

            </Box>

          </Box>

        </Box>

        <Box p={4}>

          <Grid container spacing={4}>

            {/* Customer Details */}

            <Grid item xs={12} md={7}>

              <Card
                elevation={5}
                sx={{
                  borderRadius: 3
                }}
              >

                <CardContent>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    Customer Information
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={2}>

                    {/* <Grid item xs={6}>
                      <Typography><b>Customer ID</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.CustomerID}</Typography>
                    </Grid> */}

                    <Grid item xs={6}>
                      <Typography><b>Customer</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.Customer}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography><b>Address</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.Address || "-"}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography><b>City</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.City || "-"}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography><b>Phone</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.Phone || "-"}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography><b>Email</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.Email || "-"}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography><b>GST No</b></Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{customer?.GSTNo || "-"}</Typography>
                    </Grid>

                  </Grid>

                </CardContent>

              </Card>

            </Grid>

            {/* Buttons */}

            <Grid item xs={12} md={5}>

              <Card
                elevation={5}
                sx={{
                  borderRadius: 3
                }}
              >

                <CardContent>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    Reports
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  {/* History Card */}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<HistoryIcon />}
                    sx={{
                      mb: 2,
                      py: 2,
                      fontSize: 18,
                      fontWeight: "bold",
                      borderRadius: 2
                    }}
                    onClick={() => navigate("/history-card")}
                  >
                    HISTORY CARD
                  </Button>

                  {/* Master List */}

                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<ListAltIcon />}
                    sx={{
                      mb: 2,
                      py: 2,
                      fontSize: 18,
                      fontWeight: "bold",
                      borderRadius: 2
                    }}
                    onClick={() => navigate("/master-list")}
                  >
                    MASTER LIST
                  </Button>

                  {/* Logout */}

                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    size="large"
                    startIcon={<LogoutIcon />}
                    sx={{
                      py: 2,
                      fontSize: 18,
                      fontWeight: "bold",
                      borderRadius: 2
                    }}
                    onClick={logout}
                  >
                    LOGOUT
                  </Button>

                </CardContent>

              </Card>

            </Grid>

          </Grid>

        </Box>

      </Paper>

    </Box>

  );

}

export default CustomerDashboard;