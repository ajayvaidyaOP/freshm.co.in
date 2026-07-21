
import React from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const farmers = [
  {
    id: 1,
    code: "FAR001",
    name: "Ramesh Patil",
    mobile: "9876543210",
    village: "Nagpur",
    status: "Active",
  },
  {
    id: 2,
    code: "FAR002",
    name: "Suresh Kumar",
    mobile: "9876543211",
    village: "Wardha",
    status: "Active",
  },
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

export default function Farmers() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 4,
        background: palette.paperDim,
        minHeight: "100vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'Fraunces', serif",
              fontSize: 34,
              fontWeight: 600,
              color: palette.ink,
            }}
          >
            Farmers
          </Typography>

          <Typography
            sx={{
              color: palette.inkSoft,
              mt: 1,
            }}
          >
            Manage all ERP farmers from one place.
          </Typography>
        </Box>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/admin/farmers/add")}
          sx={{
            px: 3,
            height: 50,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(135deg,#0F2E20,#0B2F22)",
            "&:hover": {
              background: "linear-gradient(135deg,#081F16,#0B2F22)",
            },
          }}
        >
          Create Farmer
        </Button>
      </Box>

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
            Farmer Directory
          </Typography>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,.08)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: palette.paperDim,
                  }}
                >
                  <TableCell><b>Farmer Code</b></TableCell>
                  <TableCell><b>Farmer Name</b></TableCell>
                  <TableCell><b>Village</b></TableCell>
                  <TableCell><b>Mobile</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {farmers.map((farmer) => (
                  <TableRow
                    key={farmer.id}
                    hover
                    sx={{
                      "&:hover": {
                        background: "#FCFBF7",
                      },
                    }}
                  >
                    <TableCell>{farmer.code}</TableCell>
                    <TableCell>{farmer.name}</TableCell>
                    <TableCell>{farmer.village}</TableCell>
                    <TableCell>{farmer.mobile}</TableCell>
                    <TableCell>
                      <Chip
                        label={farmer.status}
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}