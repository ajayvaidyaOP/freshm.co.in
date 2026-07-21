// import React from "react";

// import {
// Box,
// Grid,
// Card,
// CardContent,
// Typography
// } from "@mui/material";


// import {
// BarChart,
// Bar,
// XAxis,
// YAxis,
// Tooltip,
// ResponsiveContainer
// } from "recharts";


// const data=[

// {
// month:"Jan",
// purchase:40000,
// payment:30000
// },

// {
// month:"Feb",
// purchase:65000,
// payment:50000
// },

// {
// month:"Mar",
// purchase:85000,
// payment:60000
// },

// {
// month:"Apr",
// purchase:45000,
// payment:40000
// }

// ];


// export default function Reports(){


// return(

// <Box>


// <Typography

// variant="h4"

// fontWeight={700}

// mb={3}

// >

// Reports Dashboard

// </Typography>



// <Grid container spacing={3}>


// <Grid item xs={12} md={4}>


// <Card>

// <CardContent>


// <Typography color="text.secondary">

// Total Purchase

// </Typography>


// <Typography

// variant="h4"

// fontWeight={700}

// >

// ₹2,50,000

// </Typography>


// </CardContent>

// </Card>


// </Grid>




// <Grid item xs={12} md={4}>


// <Card>

// <CardContent>


// <Typography color="text.secondary">

// Total Payments

// </Typography>


// <Typography

// variant="h4"

// fontWeight={700}

// >

// ₹1,80,000

// </Typography>


// </CardContent>

// </Card>


// </Grid>




// <Grid item xs={12} md={4}>


// <Card>

// <CardContent>


// <Typography color="text.secondary">

// Pending Amount

// </Typography>


// <Typography

// variant="h4"

// fontWeight={700}

// >

// ₹70,000

// </Typography>


// </CardContent>

// </Card>


// </Grid>


// </Grid>





// <Box mt={5}>


// <Card>


// <CardContent>


// <Typography

// variant="h6"

// mb={3}

// >

// Purchase vs Payment Report

// </Typography>



// <ResponsiveContainer

// height={300}

// width="100%"

// >


// <BarChart data={data}>


// <XAxis dataKey="month"/>


// <YAxis/>


// <Tooltip/>


// <Bar

// dataKey="purchase"

// fill="#0B8F4D"

// />



// <Bar

// dataKey="payment"

// fill="#D62828"

// />


// </BarChart>


// </ResponsiveContainer>


// </CardContent>


// </Card>


// </Box>



// </Box>


// )

// }
import React from "react";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", purchase: 40000, payment: 30000 },
  { month: "Feb", purchase: 65000, payment: 50000 },
  { month: "Mar", purchase: 85000, payment: 60000 },
  { month: "Apr", purchase: 45000, payment: 40000 },
];

const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  goldLight: "#E7CD8B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  line: "rgba(201,162,75,0.35)",
};

const cardStyle = {
  elevation: 0,
  sx: {
    borderRadius: 4,
    background: palette.paper,
    border: `1px solid ${palette.line}`,
    boxShadow: "0 25px 50px rgba(0,0,0,.08)",
    height: "100%",
  },
};

export default function Reports() {
  return (
    <Box
      sx={{
        p: 4,
        background: palette.paperDim,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box mb={4}>
        <Typography
          sx={{
            fontFamily: "'Fraunces', serif",
            fontSize: 34,
            fontWeight: 600,
            color: palette.ink,
          }}
        >
          Reports
        </Typography>

        <Typography
          sx={{
            color: palette.inkSoft,
            mt: 1,
          }}
        >
          View ERP reports and business analytics.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card {...cardStyle}>
            <CardContent sx={{ p: 4 }}>
              <Typography color={palette.inkSoft}>
                Total Purchase
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 30,
                  fontWeight: 700,
                  color: palette.forest,
                }}
              >
                ₹2,50,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card {...cardStyle}>
            <CardContent sx={{ p: 4 }}>
              <Typography color={palette.inkSoft}>
                Total Payments
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 30,
                  fontWeight: 700,
                  color: palette.forest,
                }}
              >
                ₹1,80,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card {...cardStyle}>
            <CardContent sx={{ p: 4 }}>
              <Typography color={palette.inkSoft}>
                Pending Amount
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#C97A00",
                }}
              >
                ₹70,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Card
        elevation={0}
        sx={{
          mt: 4,
          borderRadius: 4,
          background: palette.paper,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 25px 50px rgba(0,0,0,.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontSize: 24,
              mb: 3,
              color: palette.ink,
            }}
          >
            Purchase vs Payment Report
          </Typography>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="purchase" fill="#0F2E20" radius={[5, 5, 0, 0]} />
              <Bar dataKey="payment" fill="#C9A24B" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}