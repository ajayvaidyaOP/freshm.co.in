// import React from "react";

// import {

// Box,
// Card,
// CardContent,
// Typography,
// TextField,
// Button,
// Grid

// } from "@mui/material";


// export default function CompanyProfile(){


// return(

// <Box>


// <Typography

// variant="h4"

// fontWeight={700}

// mb={3}

// >

// Company Profile

// </Typography>



// <Card>


// <CardContent>


// <Grid container spacing={3}>


// <Grid item xs={12} md={6}>


// <TextField

// fullWidth

// label="Company Name"

// />


// </Grid>


// <Grid item xs={12} md={6}>


// <TextField

// fullWidth

// label="GST Number"

// />


// </Grid>



// <Grid item xs={12} md={6}>


// <TextField

// fullWidth

// label="PAN Number"

// />


// </Grid>




// <Grid item xs={12} md={6}>


// <TextField

// fullWidth

// label="Mobile Number"

// />


// </Grid>



// <Grid item xs={12}>


// <TextField

// fullWidth

// multiline

// rows={3}

// label="Company Address"

// />


// </Grid>



// <Grid item xs={12}>


// <Button

// variant="contained"

// >

// Save Company Details

// </Button>


// </Grid>


// </Grid>


// </CardContent>


// </Card>


// </Box>


// )

// }

import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const palette = {
  forestDeep: "#0B2F22",
  forest: "#0F2E20",
  gold: "#C9A24B",
  paper: "#FAF6EC",
  paperDim: "#F3EDDF",
  ink: "#17231C",
  inkSoft: "#4B5A50",
  line: "rgba(201,162,75,0.35)",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fff",
    "&.Mui-focused fieldset": {
      borderColor: palette.forest,
    },
  },
};

export default function CompanyProfile() {
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
          Company Profile
        </Typography>

        <Typography
          sx={{
            color: palette.inkSoft,
            mt: 1,
          }}
        >
          Manage company information and business details.
        </Typography>
      </Box>

      {/* Card */}
      <Card
        elevation={0}
        sx={{
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
            }}
          >
            Company Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GST Number"
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PAN Number"
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Company Address"
                sx={fieldSx}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  px: 5,
                  height: 50,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg,#0F2E20,#0B2F22)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#081F16,#0B2F22)",
                  },
                }}
              >
                Save Company Details
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}