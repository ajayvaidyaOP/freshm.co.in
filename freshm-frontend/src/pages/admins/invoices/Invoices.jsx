

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

const invoices = [
  {
    id: 1,
    invoiceNo: "INV001",
    customer: "ABC Traders",
    amount: "₹50,000",
    date: "10-07-2026",
    status: "Paid",
  },
  {
    id: 2,
    invoiceNo: "INV002",
    customer: "XYZ Agro",
    amount: "₹35,000",
    date: "15-07-2026",
    status: "Pending",
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

export default function Invoices() {
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
            Invoices
          </Typography>

          <Typography
            sx={{
              color: palette.inkSoft,
              mt: 1,
            }}
          >
            Manage all ERP invoices from one place.
          </Typography>
        </Box>

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/admin/invoices/add")}
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
          Create Invoice
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
            Invoice Directory
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
                  <TableCell><b>Invoice No</b></TableCell>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Amount</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    hover
                    sx={{
                      "&:hover": {
                        background: "#FCFBF7",
                      },
                    }}
                  >
                    <TableCell>{invoice.invoiceNo}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        color={
                          invoice.status === "Paid"
                            ? "success"
                            : "warning"
                        }
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