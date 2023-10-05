import * as React from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Moment from "react-moment";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import axios from "axios";

import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ApiCalls from "../API/ApiCalls";
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
const lastTwoDigitsCurrentYear = currentYear % 100;
const lastTwoDigitsNextYear = nextYear % 100;

export default function Income2({ totalIncomecall, totalunpaidincomecall }) {
  const [open, setOpen] = React.useState(false);
  const [deleteopen, setdeleteOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [deleteid, setDeleteId] = useState(0);
  const [rows, setRows] = useState([]);

  let updatedrow = [];

  const [rowModesModel, setRowModesModel] = useState({});
  const [actionTake, setActionTake] = useState(false);
  let initialvalue = {
    InvoiceNumber: "",
    CompanyName: "",
    StreetAddress: "",
    City: "",
    Pincode: "",
    State: "",
    PlaceofSupply: "",
    Particulars: "",
    PSYear: `${lastTwoDigitsCurrentYear}-${lastTwoDigitsNextYear}`,
    Items: "",
    HSNSAC: "",
    Rate: "",
    CGST: "",
    SGST: "",
    IGST: "",
    Status: "",
    DueDate: "",
    ActionDate: "",
    GSTIN: "",
    BankName: "ICICI Bank Nugapakkam",
    Branch: "Chennai",
    BeneficiaryName: "Pyramidion Solutions Private Limited",
    AccountDetails: "Current",
    ACNO: "000905027741",
    IFSCCode: "ICIC0000009",
    TotalAmount: 0,
    BalanceDue: 0,
  };
  const [adddetails, setAddDetails] = useState(initialvalue);
  const today = new Date().toISOString().split("T")[0];

  const handleaddIncome = () => {
    if (
      adddetails.CompanyName == "" ||
      adddetails.StreetAddress == "" ||
      adddetails.City == "" ||
      adddetails.State == "" ||
      adddetails.Pincode == "" ||
      adddetails.PlaceofSupply == "" ||
      adddetails.GSTIN == "" ||
      adddetails.Particulars == "" ||
      adddetails.Items == "" ||
      adddetails.HSNSAC == "" ||
      adddetails.Rate == "" ||
      adddetails.DueDate == "" ||
      adddetails.ActionDate == "" ||
      adddetails.Status == ""
    ) {
      alert(`Mandatory fields should not be empty`);
    } else {
      if (adddetails.ActionDate <= adddetails.DueDate) {
        const total =
          (adddetails.CGST / 100) * adddetails.Rate +
          (adddetails.SGST / 100) * adddetails.Rate +
          (adddetails.IGST / 100) * adddetails.Rate +
          adddetails.Rate;
        setAddDetails({
          ...adddetails,
          TotalAmount: total,
          BalanceDue: total,
        });
        if (actionTake) {
          ApiCalls.updateIncome(adddetails.id, {
            ...adddetails,
            TotalAmount: total,
            BalanceDue: total,
            CGST: Number(adddetails.CGST),
            SGST: Number(adddetails.SGST),
            IGST: Number(adddetails.IGST),
          })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                window.alert("Income Updated Successfully");
                totalIncomecall();
                totalunpaidincomecall();
                setActionTake(false);
                setOpen(false);
                getIncomeRecord();
                setAddDetails({ ...initialvalue, id: "" });
              } else if (res.response.status == 403) {
                window.alert("Invoice Number Already exists");
              }
            })
            .catch((err) => window.alert("Sorry!Try Again"));
        } else {
          ApiCalls.addIncome({
            ...adddetails,
            TotalAmount: total,
            BalanceDue: total,
            CGST: Number(adddetails.CGST),
            SGST: Number(adddetails.SGST),
            IGST: Number(adddetails.IGST),
          })
            .then((res) => {
              if (res.status == 200) {
                window.alert("Income Created Successfully");
                totalIncomecall();
                totalunpaidincomecall();
                setOpen(false);
                getIncomeRecord();
                setAddDetails({ ...initialvalue, id: "" });
              } else if (res.response.status == 403) {
                window.alert("Invoice Number Already exists");
              }
            })
            .catch((err) => window.alert("Sorry Try Again Later "));
        }
      } else {
        window.alert("Invoice date should be less than or equal to due date");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAddDetails({ ...initialvalue, id: "" });
  };
  const handleDeleteClose = () => {
    setdeleteOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleEditClick = (id) => {
    setActionTake(true);
    setOpen(true);
    updatedrow = rows.filter((e) => e.id == id);

    let updateduedate = moment(updatedrow[0].DueDate);
    let updateactiondate = moment(updatedrow[0].ActionDate);

    setAddDetails({
      ...updatedrow[0],
      DueDate: updateduedate.format("YYYY-MM-DD"),
      ActionDate: updateactiondate.format("YYYY-MM-DD"),
    });
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setdeleteOpen(true);
  };

  const handleDelete = (id) => {
    ApiCalls.deleteSingleIncome(id)
      .then((res) => {
        window.alert("Income deleted");
        getIncomeRecord();
        totalIncomecall();
        totalunpaidincomecall();
        setdeleteOpen(false);
      })
      .catch((err) => window.alert("Sorry!Try Again"));
  };
  const handleDownloadClick = (id) => {
    ApiCalls.donwloadInvoice(id)
      .then((res) => {
        if (res.status == 200 || 201) {
          // window.alert(`Download Success\nfilename:${res.data.fileName}`);
          setTimeout(() => {
            window.open(
              `http://localhost:8089/file/${res.data.fileName}`,
              "__blank"
            );
          }, 5000);
        }
      })
      .catch((err) => window.alert("Download Failed!Try again!"));
  };

  const generatereceipt = (id) => {
    ApiCalls.generatereceipt(id)
      .then((res) => {
        if (res.status == 200 || 201) {
          setTimeout(() => {
            window.open(
              `http://localhost:8089/file/${res.data.fileName}`,
              "__blank"
            );
          }, 5000);
        }
      })
      .catch((err) => window.alert("Download Failed!Try again!"));
  };

  useEffect(() => {
    getIncomeRecord();
  }, []);

  const getIncomeRecord = () => {
    axios
      .get(`/income/getincomedetails`)
      .then((res) => {
        console.log(res);
        setRows(res.data);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      field: "InvoiceNumber",
      headerName: (
        <div>
          <b>Invoice Number </b>
        </div>
      ),
      headerAlign: "center",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "CompanyName",
      headerName: (
        <div>
          <b>Company Name </b>
        </div>
      ),
      headerAlign: "center",
      width: 200,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Particulars",
      headerName: (
        <div>
          <b>Particulars</b>
        </div>
      ),
      headerAlign: "center",
      width: 180,
      editable: true,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "Rate",
      headerName: (
        <div>
          <b>Rate</b>
        </div>
      ),
      type: "number",
      width: 120,
      editable: true,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",

      align: "left",
    },

    {
      field: "CGST",
      headerName: (
        <div>
          <b>CGST % </b>
        </div>
      ),
      type: "number",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "SGST",
      headerName: (
        <div>
          <b>SGST % </b>
        </div>
      ),
      type: "number",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "IGST",
      headerName: (
        <div>
          <b>IGST % </b>
        </div>
      ),
      type: "number",
      width: 100,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "TotalAmount",
      headerName: (
        <div>
          <b>Total Amount</b>
        </div>
      ),
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "center",
      renderCell: (params) => {
        const value = params.value || 0;
        return (
          <span>
            <b>{value}</b>
          </span>
        );
      },
      headerClassName: "super-app-theme--header",

      align: "left",
    },
    {
      field: "BalanceDue",
      headerName: (
        <div>
          <b>Balance Due</b>
        </div>
      ),
      type: "number",
      width: 150,
      editable: true,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "Status",
      headerName: (
        <div>
          <b>Status</b>
        </div>
      ),
      width: 120,
      editable: true,
      headerAlign: "center",
      type: "singleSelect",
      renderCell: (params) => {
        const value = params.value;
        if (params.value == "Paid") {
        }
        let color = "green";
        if (params.value == "UnPaid" || "Overdue" || "Declined") {
          color = "red";
        } else {
          color = "";
        }

        return (
          <div
            style={{
              color:
                value == "UnPaid" || value == "Overdue" || value == "Declined"
                  ? "red"
                  : "green",
            }}
          >
            {value} &nbsp;
            {value == "Paid" && (
              <span
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid blue",
                  color: "blue",
                }}
                onClick={() => generatereceipt(params.id)}
              >
                {" "}
                receipt
              </span>
            )}
          </div>
        );
      },
      headerClassName: "super-app-theme--header",
    },
    {
      field: "DueDate",
      headerName: (
        <div>
          <b>Due Date </b>
        </div>
      ),
      type: "date",
      width: 130,
      align: "left",
      headerAlign: "center",
      editable: true,
      valueGetter: (params) => {
        const dueDate = params.row.DueDate;

        if (dueDate === null || dueDate === undefined) {
          return null;
        }

        return new Date(dueDate);
      },
      min: { today },
      headerClassName: "super-app-theme--header",
    },
    {
      field: "ActionDate",
      headerName: (
        <div>
          <b>Action Date</b>
        </div>
      ),
      type: "date",
      width: 130,
      align: "left",
      headerAlign: "center",
      editable: true,
      valueGetter: (params) => {
        const actionDate = params.row.ActionDate;
        if (actionDate === null || actionDate === undefined) {
          return new Date();
        }
        return new Date(actionDate);
      },
      min: { today },
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      cellClassName: "actions",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",

      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "secondary" }} />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "#676767" }} />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            sx={{
              color: "#676767",
            }}
          />,
          <GridActionsCellItem
            icon={<DownloadIcon sx={{ color: "#676767" }} />}
            label="Delete"
            onClick={() => handleDownloadClick(id)}
            sx={{
              color: "#676767",
            }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        "& .super-app-theme--header": {
          backgroundColor: "#676767",
          color: "white",
          fontSize: "17px",
          border: "1px solid #fff",
          borderRadius: "5px",
        },
      }}
    >
      <Grid container>
        <Grid item lg={12} md={12} xs={12}>
          <Button
            sx={{
              marginBottom: "50px",
              float: "right",
              right: "60px",
            }}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClick}
          >
            Add record
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        columnBuffer={5}
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogContent fullWidth>
          <DialogContentText sx={{ fontWeight: 800 }}>
            Add Income Details
          </DialogContentText>
          <Grid item lg={4} md={6} xs={8}>
            {" "}
            <TextField
              id="filled-basic"
              label={
                <span>
                  Invoice Number <span style={{ color: "red" }}>*</span>
                </span>
              }
              variant="filled"
              onChange={(e) =>
                setAddDetails({
                  ...adddetails,
                  InvoiceNumber: e.target.value,
                })
              }
              sx={{ marginBottom: "28px" }}
              value={adddetails.InvoiceNumber}
            />
          </Grid>
          <Grid container lg={12} md={12} sx={{ display: "flex" }}>
            <Grid item lg={4} md={6} xs={8}>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Company Name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    CompanyName: e.target.value,
                  })
                }
                sx={{ marginBottom: "28px" }}
                value={adddetails.CompanyName}
              />

              <TextField
                id="standard-number"
                label={
                  <span style={{ marginTop: -20 }}>
                    Pincode <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="number"
                variant="standard"
                sx={{ marginBottom: "20px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Pincode: Number(e.target.value),
                  })
                }
                value={adddetails.Pincode}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    GSTIN <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    GSTIN: e.target.value,
                  })
                }
                value={adddetails.GSTIN}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Items <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Items: e.target.value,
                  })
                }
                value={adddetails.Items}
              />
              <TextField
                id="standard-number"
                label={<span>CGST %</span>}
                type="number"
                variant="standard"
                sx={{ marginBottom: "37px", width: 218 }}
                className="red-asterisk"
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    CGST: Number(e.target.value),
                  })
                }
                value={Number(adddetails.CGST) || ""}
              />
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label">
                  Status <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={adddetails.Status}
                  label="Status"
                  onChange={(e) =>
                    setAddDetails({
                      ...adddetails,
                      Status: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Paid"}>Paid</MenuItem>
                  <MenuItem value={"UnPaid"}>UnPaid</MenuItem>
                  <MenuItem value={"Overdue"}>Over Due</MenuItem>
                  <MenuItem value={"Declined"}>Declined</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Bank Name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    BankName: e.target.value,
                  })
                }
                value={adddetails.BankName}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Account Details <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    AccountDetails: e.target.value,
                  })
                }
                value={adddetails.AccountDetails}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={8}>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Street Address <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    StreetAddress: e.target.value,
                  })
                }
                sx={{ marginBottom: "20px" }}
                value={adddetails.StreetAddress}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    State <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    State: e.target.value,
                  })
                }
                value={adddetails.State}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Particulars <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "28px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Particulars: e.target.value,
                  })
                }
                value={adddetails.Particulars}
              />
              <TextField
                id="standard-number"
                label={
                  <span>
                    HSNSAC <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="number"
                variant="standard"
                sx={{ marginBottom: "20px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    HSNSAC: Number(e.target.value),
                  })
                }
                value={adddetails.HSNSAC || ""}
              />
              <TextField
                id="standard-number"
                label={<span>SGST %</span>}
                type="number"
                variant="standard"
                sx={{ marginBottom: "25px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    SGST: Number(e.target.value),
                  })
                }
                value={Number(adddetails.SGST) || ""}
              />

              <div>
                <label htmlFor="">
                  {" "}
                  DueDate <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="date"
                  label="DueDate"
                  style={{
                    width: "200px",
                    height: "55px",
                    marginBottom: "14px",
                  }}
                  value={adddetails.DueDate}
                  onChange={(e) =>
                    setAddDetails({ ...adddetails, DueDate: e.target.value })
                  }
                ></input>
              </div>
              <TextField
                id="standard-number"
                label={
                  <span>
                    A/C No:<span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="number"
                variant="standard"
                sx={{ marginBottom: "20px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    ACNO: Number(e.target.value),
                  })
                }
                value={adddetails.ACNO || ""}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Branch <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Branch: e.target.value,
                  })
                }
                value={adddetails.Branch}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={10}>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    City <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    City: e.target.value,
                  })
                }
                value={adddetails.City}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Place of Supply <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    PlaceofSupply: e.target.value,
                  })
                }
                value={adddetails.PlaceofSupply}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    PS Year <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "28px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    PSYear: e.target.value,
                  })
                }
                value={adddetails.PSYear}
              />
              <TextField
                id="standard-number"
                label={
                  <span>
                    Rate <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="number"
                variant="standard"
                sx={{ marginBottom: "20px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Rate: Number(e.target.value),
                  })
                }
                value={Number(adddetails.Rate) || ""}
              />
              <TextField
                id="standard-number"
                label={<span>IGST %</span>}
                type="number"
                variant="standard"
                sx={{ marginBottom: "25px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    IGST: Number(e.target.value),
                  })
                }
                value={Number(adddetails.IGST) || ""}
              />

              <div>
                <label htmlFor="">
                  {" "}
                  InvoiceDate <span style={{ color: "red" }}>*</span>
                </label>
                <br />
                <input
                  type="date"
                  label="DueDate"
                  style={{
                    width: "200px",
                    height: "55px",
                    marginBottom: "10px",
                  }}
                  value={adddetails.ActionDate}
                  onChange={(e) =>
                    setAddDetails({ ...adddetails, ActionDate: e.target.value })
                  }
                ></input>
              </div>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Beneficiary Name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    BeneficiaryName: e.target.value,
                  })
                }
                value={adddetails.BeneficiaryName}
              />
              <TextField
                id="filled-basic"
                label={
                  <span>
                    IFSC Code <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                sx={{ marginBottom: "20px" }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    IFSCCode: e.target.value,
                  })
                }
                value={adddetails.IFSCCode}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            sx={{ background: "#FBC91B" }}
            variant="contained"
            onClick={() => handleaddIncome()}
          >
            {actionTake ? "UPDATE" : "ADD"}
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteopen}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Are you sure want to delete the record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "red" }}
            autoFocus
            onClick={() => handleDelete(deleteid)}
          >
            Yes
          </Button>
          <Button onClick={() => handleDeleteClose()} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
