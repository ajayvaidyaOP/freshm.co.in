
import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
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

export default function LetterHeadSettings() {
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
          Letter Head Settings
        </Typography>

        <Typography
          sx={{
            color: palette.inkSoft,
            mt: 1,
          }}
        >
          Manage your company letter head and preview.
        </Typography>
      </Box>

      {/* Settings Card */}
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
            Company Header
          </Typography>

          <TextField
            fullWidth
            label="Company Logo URL"
            sx={{ ...fieldSx, mb: 3 }}
          />

          <TextField
            fullWidth
            label="Header Title"
            sx={{ ...fieldSx, mb: 3 }}
          />

          <TextField
            fullWidth
            label="Footer Text"
            sx={fieldSx}
          />

          <Button
            variant="contained"
            sx={{
              mt: 3,
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
            Save Letter Head
          </Button>
        </CardContent>
      </Card>

      {/* Preview Card */}
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
              mb: 2,
            }}
          >
            Preview
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 700,
              color: palette.forest,
            }}
          >
            GREEN AGRO PVT LTD
          </Typography>

          <Typography sx={{ mt: 2 }}>
            GST : XXXXXXXX
          </Typography>

          <Typography>
            Nagpur, Maharashtra
          </Typography>

          <Typography
            sx={{
              mt: 4,
              color: palette.inkSoft,
            }}
          >
            Thank you for doing business with us.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}