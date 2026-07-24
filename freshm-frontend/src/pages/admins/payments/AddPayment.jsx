// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { savePayment } from "../../../services/paymentService";


// import {

//     Box,
//     Typography,
//     Card,
//     CardContent,
//     Grid,
//     TextField,
//     Button,
//     MenuItem

// } from "@mui/material";



// export default function AddPayment() {
//     const navigate = useNavigate();

//     const [payment, setPayment] = useState({
//         purchaseId: "",
//         amount: "",
//         paymentMode: "",
//         transactionNumber: "",
//         paymentDate: "",
//         // remarks: "",
//     });

//     const handleChange = (e) => {
//         setPayment({
//             ...payment,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSave = async () => {
//         try {
//             await savePayment(payment);

//             alert("Payment Saved Successfully");

//             navigate("/admin/payments");
//         } catch (error) {
//             console.error(error);
//             alert("Failed to Save Payment");
//         }
//     };


//     return (

//         <Box>


//             <Typography

//                 variant="h4"

//                 fontWeight={700}

//                 mb={3}

//             >

//                 Add Payment

//             </Typography>




//             <Card>


//                 <CardContent>


//                     <Grid container spacing={3}>


//                         <Grid item xs={12} md={6}>


//                             <TextField

//                                 select

//                                 fullWidth

//                                 label="Payment To"

//                             >


//                                 <MenuItem value="vendor">

//                                     Vendor

//                                 </MenuItem>


//                                 <MenuItem value="farmer">

//                                     Farmer

//                                 </MenuItem>


//                             </TextField>


//                         </Grid>




//                         <Grid item xs={12} md={6}>


//                             <TextField

//                                 fullWidth

//                                 label="Party Name"

//                             />


//                         </Grid>




//                         <Grid item xs={12} md={6}>

//                             <TextField
//                                 fullWidth
//                                 label="Amount"
//                                 name="amount"
//                                 value={payment.amount}
//                                 onChange={handleChange}
//                             />


//                         </Grid>




//                         <Grid item xs={12} md={6}>


//                             <TextField
//                                 fullWidth
//                                 label="Payment Mode"
//                                 name="paymentMode"
//                                 value={payment.paymentMode}
//                                 onChange={handleChange}
//                             />


//                         </Grid>

//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Transaction Number"
//                                 name="transactionNumber"
//                                 value={payment.transactionNumber}
//                                 onChange={handleChange}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 type="date"
//                                 label="Payment Date"
//                                 name="paymentDate"
//                                 value={payment.paymentDate}
//                                 onChange={handleChange}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Purchase ID"
//                                 name="purchaseId"
//                                 value={payment.purchaseId}
//                                 onChange={handleChange}
//                             />
//                         </Grid>



//                         <Grid item xs={12}>


//                             <Button
//                                 variant="contained"
//                                 onClick={handleSave}
//                             >
//                                 Save Payment
//                             </Button>


//                         </Grid>


//                     </Grid>


//                 </CardContent>


//             </Card>



//         </Box>


//     )

// }





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePayment } from "../../../services/paymentService";


import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    MenuItem,
    Stack,
    Divider,
    InputAdornment,
} from "@mui/material";

import {
    Payments,
    Person,
    CurrencyRupee,
    AccountBalanceWallet,
    ReceiptLong,
    CalendarToday,
    Numbers,
    Save,
} from "@mui/icons-material";


const palette = {
    forestDeep: "#0B2F22",
    forest: "#0F2E20",
    gold: "#C9A24B",
    goldLight: "#E7CD8B",
    paper: "#FAF6EC",
    paperDim: "#F3EDDF",
    ink: "#17231C",
    inkSoft: "#4B5A50",
    sage: "#7E9A88",
    line: "rgba(201,162,75,0.35)",
};

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        background: "#fff",
        "& fieldset": {
            borderColor: "rgba(0,0,0,.12)",
        },
        "&:hover fieldset": {
            borderColor: palette.sage,
        },
        "&.Mui-focused fieldset": {
            borderColor: palette.forest,
            borderWidth: 1.5,
        },
    },
};


export default function AddPayment() {
    const navigate = useNavigate();

    const [payment, setPayment] = useState({
        purchaseId: "",
        amount: "",
        paymentMode: "",
        transactionNumber: "",
        paymentDate: "",
        // remarks: "",
    });

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            await savePayment(payment);

            alert("Payment Saved Successfully");

            navigate("/admin/payments");
        } catch (error) {
            console.error(error);
            alert("Failed to Save Payment");
        }
    };


    return (

        <Box
            sx={{
                p: 4,
                background: palette.paperDim,
                minHeight: "100vh",
            }}
        >

            <Typography
                sx={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 34,
                    fontWeight: 600,
                    color: palette.ink,
                }}
            >
                Add Payment
            </Typography>



            <Card
                elevation={0}
                sx={{
                    borderRadius: 4,
                    background: palette.paper,
                    border: `1px solid ${palette.line}`,
                    boxShadow: "0 20px 50px rgba(11,47,34,.08)",
                }}
            >
                <CardContent sx={{ p: 4 }}>



                    <Grid container spacing={3}>


                        <Grid item xs={12} md={6}>


                            <TextField
                                select
                                fullWidth
                                label="Payment To"
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Payments color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            >


                                <MenuItem value="vendor">

                                    Vendor

                                </MenuItem>


                                <MenuItem value="farmer">

                                    Farmer

                                </MenuItem>


                            </TextField>


                        </Grid>




                        <Grid item xs={12} md={6}>


                            <TextField
                                fullWidth
                                label="Party Name"
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />


                        </Grid>




                        <Grid item xs={12} md={6}>

                            <TextField
                                fullWidth
                                label="Amount"
                                name="amount"
                                value={payment.amount}
                                onChange={handleChange}
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CurrencyRupee color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />


                        </Grid>




                        <Grid item xs={12} md={6}>


                            <TextField
                                fullWidth
                                label="Payment Mode"
                                name="paymentMode"
                                value={payment.paymentMode}
                                onChange={handleChange}
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountBalanceWallet color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />


                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Transaction Number"
                                name="transactionNumber"
                                value={payment.transactionNumber}
                                onChange={handleChange}
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <ReceiptLong color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="date"
                                //   label="Payment Date"
                                name="paymentDate"
                                value={payment.paymentDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarToday color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Purchase ID"
                                name="purchaseId"
                                value={payment.purchaseId}
                                onChange={handleChange}
                                sx={fieldSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Numbers color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>



                        <Grid item xs={12}>


                            <Button
                                startIcon={<Save />}
                                variant="contained"
                                onClick={handleSave}
                                sx={{
                                    mt: 2,
                                    px: 5,
                                    height: 52,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    background: "linear-gradient(135deg,#0F2E20,#0B2F22)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg,#081F16,#0B2F22)",
                                    },
                                }}
                            >
                                Save Payment
                            </Button>


                        </Grid>


                    </Grid>


                </CardContent>


            </Card>



        </Box>


    )

}