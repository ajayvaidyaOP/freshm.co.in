import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import api from "../../services/api";

// ============================================================
// DESIGN TOKENS — same palette used across the app.
// ============================================================
const palette = {
  forest: "#0F2E20",
  gold: "#C9A24B",
  rust: "#B5533C",
  ink: "#17231C",
  inkSoft: "#5C6B61",
  line: "rgba(15,46,32,0.08)",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    fontSize: 14,
    "&:hover fieldset": { borderColor: "#7E9A88" },
    "&.Mui-focused fieldset": { borderColor: palette.forest, borderWidth: "1.5px" },
  },
};

const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

export default function ReceivedMaterial() {
  // ---- reference data ----
  const [vendors, setVendors] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);

  // ---- source (vendor or farmer) ----
  const [sourceType, setSourceType] = useState("VENDOR"); // VENDOR | FARMER
  const [sourceId, setSourceId] = useState("");

  // ---- product / pricing ----
  const [productId, setProductId] = useState("");
  const [rate, setRate] = useState("");
  const [remarks, setRemarks] = useState("");

  // ---- crate mode ----
  const [usesCrates, setUsesCrates] = useState(true);

  // manual (non-crate) weight
  const [manualQuantity, setManualQuantity] = useState("");

  // crate-by-crate entry
  const [batchCrateCount, setBatchCrateCount] = useState("");
  const [batchWeight, setBatchWeight] = useState("");
  const [batches, setBatches] = useState([]); // [{ id, crateCount, weight }]

  // optional tare deduction
  const [unitTareWeight, setUnitTareWeight] = useState("");

  // ---- submit state ----
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null); // { purchaseNumber, totalAmount }

  useEffect(() => {
    const loadReferenceData = async () => {
      try {
        const [vendorsRes, farmersRes, productsRes] = await Promise.all([
          api.get("/vendors"),
          api.get("/farmers"),
          api.get("/products"),
        ]);

        setVendors(vendorsRes.data || []);
        setFarmers(farmersRes.data || []);
        setProducts(productsRes.data || []);
      } catch (err) {
        console.log(err);
        setError("Could not load vendors/farmers/products. Please refresh.");
      } finally {
        setLoadingRefs(false);
      }
    };

    loadReferenceData();
  }, []);

  // ---- crate totals (live, client-side preview) ----
  const totalCrateCount = useMemo(
    () => batches.reduce((sum, b) => sum + b.crateCount, 0),
    [batches]
  );

  const totalGrossWeight = useMemo(
    () => round2(batches.reduce((sum, b) => sum + b.weight, 0)),
    [batches]
  );

  const totalTareWeight = useMemo(() => {
    const tare = parseFloat(unitTareWeight);
    if (!tare || tare <= 0 || totalCrateCount === 0) return 0;
    return round2(tare * totalCrateCount);
  }, [unitTareWeight, totalCrateCount]);

  const netWeight = useMemo(() => {
    if (usesCrates) {
      return round2(totalGrossWeight - totalTareWeight);
    }
    return round2(parseFloat(manualQuantity) || 0);
  }, [usesCrates, totalGrossWeight, totalTareWeight, manualQuantity]);

  const amount = useMemo(() => {
    const r = parseFloat(rate);
    if (!r || netWeight <= 0) return 0;
    return round2(netWeight * r);
  }, [rate, netWeight]);

  // ---- crate batch handlers ----
  const handleAddBatch = () => {
    const count = parseInt(batchCrateCount, 10);
    const weight = parseFloat(batchWeight);

    if (!count || count <= 0) {
      setError("Enter how many crates were weighed in this batch.");
      return;
    }

    if (!weight || weight <= 0) {
      setError("Enter the weight shown on the machine for this batch.");
      return;
    }

    setError("");

    setBatches((prev) => [
      ...prev,
      { id: Date.now(), crateCount: count, weight: round2(weight) },
    ]);

    setBatchCrateCount("");
    setBatchWeight("");
  };

  const handleRemoveBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  const resetForm = () => {
    setSourceId("");
    setProductId("");
    setRate("");
    setRemarks("");
    setManualQuantity("");
    setBatchCrateCount("");
    setBatchWeight("");
    setBatches([]);
    setUnitTareWeight("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(null);

    if (!sourceId) {
      setError(
        sourceType === "VENDOR"
          ? "Please select a vendor."
          : "Please select a farmer."
      );
      return;
    }

    if (!productId) {
      setError("Please select an article.");
      return;
    }

    if (!rate || parseFloat(rate) <= 0) {
      setError("Please enter a valid rate.");
      return;
    }

    if (usesCrates && batches.length === 0) {
      setError("Add at least one crate weighing before saving.");
      return;
    }

    if (!usesCrates && (!manualQuantity || parseFloat(manualQuantity) <= 0)) {
      setError("Please enter the received quantity.");
      return;
    }

    const item = {
      productId: Number(productId),
      usesCrates,
      rate: parseFloat(rate),
      remarks: remarks || undefined,
    };

    if (usesCrates) {
      item.crateCount = totalCrateCount;
      item.crateGrossWeight = totalGrossWeight;
      item.crateUnitTareWeight = unitTareWeight
        ? parseFloat(unitTareWeight)
        : undefined;
    } else {
      item.quantity = parseFloat(manualQuantity);
    }

    const payload = {
      vendorId: sourceType === "VENDOR" ? Number(sourceId) : undefined,
      farmerId: sourceType === "FARMER" ? Number(sourceId) : undefined,
      remarks: remarks || undefined,
      items: [item],
    };

    try {
      setSubmitting(true);

      const res = await api.post("/purchases", payload);

      setSuccess({
        purchaseNumber: res.data.purchaseNumber,
        totalAmount: res.data.totalAmount,
        totalQuantity: res.data.totalQuantity,
      });

      resetForm();
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Could not save the material receipt."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const sourceList = sourceType === "VENDOR" ? vendors : farmers;

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 11.5,
          letterSpacing: 2.2,
          fontWeight: 700,
          color: palette.rust,
          mb: 0.5,
        }}
      >
        INTAKE
      </Typography>

      <Typography
        sx={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: { xs: 26, sm: 30 },
          color: palette.ink,
          mb: 3,
        }}
      >
        Receive Material
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccess(null)}>
          Receipt <strong>{success.purchaseNumber}</strong> saved — net weight{" "}
          <strong>{success.totalQuantity} kg</strong>, amount{" "}
          <strong>₹{success.totalAmount}</strong>.
        </Alert>
      )}

      <Card elevation={0} sx={{ borderRadius: 3, border: `1px solid ${palette.line}` }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          {loadingRefs ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress size={28} sx={{ color: palette.forest }} />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* ---- Source: Vendor or Farmer ---- */}
              <Grid item xs={12}>
                <ToggleButtonGroup
                  value={sourceType}
                  exclusive
                  onChange={(e, val) => {
                    if (val) {
                      setSourceType(val);
                      setSourceId("");
                    }
                  }}
                  sx={{ mb: 2 }}
                >
                  <ToggleButton
                    value="VENDOR"
                    sx={{
                      textTransform: "none",
                      px: 3,
                      "&.Mui-selected": {
                        background: palette.forest,
                        color: "#fff",
                        "&:hover": { background: palette.forest },
                      },
                    }}
                  >
                    Vendor
                  </ToggleButton>
                  <ToggleButton
                    value="FARMER"
                    sx={{
                      textTransform: "none",
                      px: 3,
                      "&.Mui-selected": {
                        background: palette.forest,
                        color: "#fff",
                        "&:hover": { background: palette.forest },
                      },
                    }}
                  >
                    Farmer
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label={sourceType === "VENDOR" ? "Select Vendor" : "Select Farmer"}
                  value={sourceId}
                  onChange={(e) => setSourceId(e.target.value)}
                  sx={fieldSx}
                >
                  {sourceList.length === 0 && (
                    <MenuItem disabled value="">
                      No {sourceType === "VENDOR" ? "vendors" : "farmers"} found
                    </MenuItem>
                  )}
                  {sourceList.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {sourceType === "VENDOR" ? s.vendorName : s.farmerName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Select Article"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  sx={fieldSx}
                >
                  {products.length === 0 && (
                    <MenuItem disabled value="">
                      No articles found
                    </MenuItem>
                  )}
                  {products.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.productName} ({p.articleName})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ borderColor: palette.line }} />
              </Grid>

              {/* ---- Crate mode toggle ---- */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: palette.ink, mb: 1 }}>
                  How was this material weighed?
                </Typography>

                <ToggleButtonGroup
                  value={usesCrates ? "CRATE" : "DIRECT"}
                  exclusive
                  onChange={(e, val) => {
                    if (val) setUsesCrates(val === "CRATE");
                  }}
                >
                  <ToggleButton
                    value="CRATE"
                    sx={{
                      textTransform: "none",
                      px: 3,
                      "&.Mui-selected": {
                        background: palette.gold,
                        color: palette.ink,
                        "&:hover": { background: palette.gold },
                      },
                    }}
                  >
                    Received in Crates
                  </ToggleButton>
                  <ToggleButton
                    value="DIRECT"
                    sx={{
                      textTransform: "none",
                      px: 3,
                      "&.Mui-selected": {
                        background: palette.gold,
                        color: palette.ink,
                        "&:hover": { background: palette.gold },
                      },
                    }}
                  >
                    Direct Weight (No Crates)
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              {/* ---- CRATE MODE ---- */}
              {usesCrates ? (
                <>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Crates in this batch"
                      value={batchCrateCount}
                      onChange={(e) => setBatchCrateCount(e.target.value)}
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Weight from machine (kg)"
                      value={batchWeight}
                      onChange={(e) => setBatchWeight(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddBatch()}
                      sx={fieldSx}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddRoundedIcon />}
                      onClick={handleAddBatch}
                      sx={{
                        height: 54,
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 2,
                        background: palette.forest,
                        "&:hover": { background: "#081f16" },
                      }}
                    >
                      Add
                    </Button>
                  </Grid>

                  {batches.length > 0 && (
                    <Grid item xs={12}>
                      <TableContainer sx={{ border: `1px solid ${palette.line}`, borderRadius: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ background: "rgba(15,46,32,0.035)" }}>
                              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>#</TableCell>
                              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Crates</TableCell>
                              <TableCell sx={{ fontWeight: 700, fontSize: 12 }}>Weight (kg)</TableCell>
                              <TableCell sx={{ fontWeight: 700, fontSize: 12 }} align="right">
                                &nbsp;
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {batches.map((b, idx) => (
                              <TableRow key={b.id}>
                                <TableCell sx={{ fontSize: 13 }}>{idx + 1}</TableCell>
                                <TableCell sx={{ fontSize: 13 }}>{b.crateCount}</TableCell>
                                <TableCell sx={{ fontSize: 13, fontFamily: "'IBM Plex Mono', monospace" }}>
                                  {b.weight.toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton size="small" onClick={() => handleRemoveBatch(b.id)}>
                                    <DeleteOutlineRoundedIcon sx={{ fontSize: 18, color: palette.rust }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  )}

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Empty weight per crate — kg (optional)"
                      value={unitTareWeight}
                      onChange={(e) => setUnitTareWeight(e.target.value)}
                      helperText="Leave blank to skip crate-weight deduction"
                      sx={fieldSx}
                    />
                  </Grid>

                  {/* ---- Manifest-style totals summary ---- */}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 2,
                        border: `1px dashed ${palette.gold}`,
                        background: "rgba(201,162,75,0.06)",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 2, sm: 4 },
                      }}
                    >
                      <SummaryStat icon={<ScaleRoundedIcon />} label="Total Crates" value={totalCrateCount} />
                      <SummaryStat label="Gross Weight" value={`${totalGrossWeight.toFixed(2)} kg`} />
                      <SummaryStat
                        label="Tare Deducted"
                        value={totalTareWeight > 0 ? `- ${totalTareWeight.toFixed(2)} kg` : "—"}
                      />
                      <SummaryStat label="Net Weight" value={`${netWeight.toFixed(2)} kg`} highlight />
                    </Box>
                  </Grid>
                </>
              ) : (
                // ---- DIRECT MODE ----
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity (kg)"
                    value={manualQuantity}
                    onChange={(e) => setManualQuantity(e.target.value)}
                    sx={fieldSx}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Divider sx={{ borderColor: palette.line }} />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Rate (₹ per kg)"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Net Weight (kg)"
                  value={netWeight > 0 ? netWeight.toFixed(2) : ""}
                  InputProps={{ readOnly: true }}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Total Amount (₹)"
                  value={amount > 0 ? amount.toFixed(2) : ""}
                  InputProps={{ readOnly: true }}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Remarks (optional)"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  sx={fieldSx}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={submitting}
                  startIcon={submitting ? null : <SaveRoundedIcon />}
                  onClick={handleSubmit}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    background: `linear-gradient(135deg, ${palette.forest}, #081f16)`,
                    boxShadow: "0 14px 26px -14px rgba(15,46,32,0.5)",
                    "&:hover": {
                      background: `linear-gradient(135deg, #081f16, #051309)`,
                    },
                  }}
                >
                  {submitting ? (
                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                  ) : (
                    "Save Material Receipt"
                  )}
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

function SummaryStat({ icon, label, value, highlight }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Box display="flex" alignItems="center" gap={0.6} sx={{ mb: 0.3 }}>
        {icon &&
          React.cloneElement(icon, {
            sx: { fontSize: 15, color: palette.gold },
          })}
        <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: palette.inkSoft }}>
          {label.toUpperCase()}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: highlight ? 20 : 16,
          fontWeight: 700,
          color: highlight ? palette.forest : palette.ink,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
