import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import moment from "moment";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid } from "@mui/material";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ApiCalls from "../API/ApiCalls";

export default function ExpenseRecord({
  totalExpenseDetails,
  totalIndirectExpenseDetails,
}) {
  const [open, setOpen] = React.useState(false);
  const [deleteopen, setdeleteOpen] = React.useState(false);
  const [deleteid, setDeleteId] = useState(0);

  let updatedrow = [];
  const [rows, setRows] = useState([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const [validationError, setValidationError] = useState("");
  const [actionTake, setActionTake] = useState(false);
  const [adddetails, setAddDetails] = useState({
    id: "",
    InvoiceNumber: "",
    Particulars: "",
    Amount: "",
    CGST: "",
    SGST: "",
    IGST: "",
    PaymentType: "",
    AccountType: "",
    DueDate: "",
    ActionDate: "",
    TotalAmount: 0,
    BalanceDue: 0,
  });

  const today = new Date().toISOString().split("T")[0];

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActionTake(false);
    setAddDetails({
      InvoiceNumber: "",
      Particulars: "",
      Amount: "",
      CGST: "",
      SGST: "",
      IGST: "",
      PaymentType: "",
      AccountType: "",
      DueDate: "",
      ActionDate: "",
      TotalAmount: 0,
      BalanceDue: 0,
    });
  };

  const handleaddExpense = () => {
    if (
      adddetails.InvoiceNumber == "" ||
      adddetails.Particulars == "" ||
      adddetails.Amount == 0 ||
      adddetails.PaymentType == "" ||
      adddetails.AccountType == "" ||
      adddetails.DueDate == "" ||
      adddetails.ActionDate == ""
    ) {
      alert(`Mandatory fields should not be empty`);
    } else {
      if (adddetails.ActionDate <= adddetails.DueDate) {
        const total =
          (adddetails.CGST / 100) * adddetails.Amount +
          (adddetails.SGST / 100) * adddetails.Amount +
          (adddetails.IGST / 100) * adddetails.Amount +
          adddetails.Amount;
        setAddDetails({
          ...adddetails,
          TotalAmount: total,
          BalanceDue: total,
        });
        if (actionTake) {
          ApiCalls.updateExpense(adddetails.id, {
            ...adddetails,
            TotalAmount: total,
            BalanceDue: total,
            CGST: Number(adddetails.CGST),
            SGST: Number(adddetails.SGST),
            IGST: Number(adddetails.IGST),
          })
            .then((res) => {
              if (res.response.status === 200 || res.status === 200) {
                window.alert("Expense Updated Successfully");
                totalExpenseDetails();
                totalIndirectExpenseDetails();
                getExpenseRecord();
                setActionTake(false);
                setOpen(false);
                setAddDetails({
                  id: "",
                  InvoiceNumber: "",
                  Particulars: "",
                  Amount: "",
                  CGST: "",
                  SGST: "",
                  IGST: "",
                  PaymentType: "",
                  AccountType: "",
                  DueDate: "",
                  ActionDate: "",
                  TotalAmount: 0,
                  BalanceDue: 0,
                });
              } else if (res.response.status == 403) {
                window.alert("Invoice Number Already exists");
              }
            })
            .catch((err) => window.alert("Sorry!Try Again"));
        } else {
          ApiCalls.addExpense({
            ...adddetails,
            TotalAmount: total,
            BalanceDue: total,
            CGST: Number(adddetails.CGST),
            SGST: Number(adddetails.SGST),
            IGST: Number(adddetails.IGST),
          })
            .then((res) => {
              if (res.response.status === 200 || res.status === 200) {
                window.alert("Expense Created Successfully");
                getExpenseRecord();
                totalExpenseDetails();
                totalIndirectExpenseDetails();
                setOpen(false);
                setAddDetails({
                  id: "",
                  InvoiceNumber: "",
                  Particulars: "",
                  Amount: "",
                  CGST: "",
                  SGST: "",
                  IGST: "",
                  PaymentType: "",
                  AccountType: "",
                  DueDate: "",
                  ActionDate: "",
                  TotalAmount: 0,
                  BalanceDue: 0,
                });
              } else if (res.response.status == 403) {
                window.alert("Invoice Number Already exists");
              }
            })
            .catch((err) => window.alert("Sorry!Try Again", err));
        }
      } else {
        window.alert("Invoice date should be less than or equal to due date");
      }
    }
  };

  useEffect(() => {
    getExpenseRecord();
  }, []);
  const getExpenseRecord = () => {
    axios
      .get(`/expense/getexpensedetails`)
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  };
  const handleDeleteClose = () => {
    setdeleteOpen(false);
    getExpenseRecord();
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
    ApiCalls.deleteSingleExpense(id)
      .then((res) => {
        window.alert("Expense deleted");
        totalExpenseDetails();
        totalIndirectExpenseDetails();
        setdeleteOpen(false);
        getExpenseRecord();
      })
      .catch((err) => window.alert("Sorry!Try Again"));
  };

  const columns = [
    {
      field: "InvoiceNumber",
      headerName: (
        <div>
          <b>Invoice Number </b>
        </div>
      ),
      width: 150,
      editable: true,
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Particulars",
      headerName: (
        <div>
          <b>Particulars </b>
        </div>
      ),
      width: 200,
      editable: true,
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Amount",
      headerName: (
        <div>
          <b>Amount </b>
        </div>
      ),
      type: "number",
      width: 130,
      editable: true,
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "CGST",
      headerName: (
        <div>
          <b>CGST % </b>
        </div>
      ),
      type: "number",
      width: 130,
      editable: true,
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const value = params.value || 0;
        return (
          <span>
            <b>{value}</b>
          </span>
        );
      },
    },
    {
      field: "SGST",
      headerName: (
        <div>
          <b>SGST % </b>
        </div>
      ),
      type: "number",
      width: 130,
      editable: true,
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const value = params.value || 0;
        return (
          <span>
            <b>{value}</b>
          </span>
        );
      },
    },
    {
      field: "IGST",
      headerName: (
        <div>
          <b>IGST % </b>
        </div>
      ),
      type: "number",
      width: 130,
      editable: true,
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const value = params.value || 0;
        return (
          <span>
            <b>{value}</b>
          </span>
        );
      },
    },
    {
      field: "TotalAmount",
      headerName: (
        <div>
          <b>Total Amount </b>
        </div>
      ),
      type: "number",
      width: 130,
      editable: true,
      align: "left",
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
    },
    {
      field: "PaymentType",
      headerName: (
        <div>
          <b>Payment Type </b>
        </div>
      ),
      width: 160,
      editable: true,
      align: "left",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Direct", "Indirect"],
      headerClassName: "super-app-theme--header",
    },
    {
      field: "AccountType",
      headerName: (
        <div>
          <b>Account Type </b>
        </div>
      ),
      width: 160,
      editable: true,
      align: "left",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Cash", "Solution", "Workz", "Digital", "Director Fund"],
      headerClassName: "super-app-theme--header",
    },
    {
      field: "ActionDate",
      headerName: (
        <div>
          <b>Invoice Date </b>
        </div>
      ),
      type: "date",
      width: 150,
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
      width: 150,
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      cellClassName: "actions",
      align: "left",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",

      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "#676767" }} />}
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
        <Grid item lg={12}>
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
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogContent fullWidth>
          <DialogContentText sx={{ fontWeight: 800 }}>
            Add Expense Details
          </DialogContentText>
          <Grid container lg={12} sx={{ display: "flex" }}>
            <Grid item lg={4}>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Invoice Number <span style={{ color: "red" }}>*</span>
                  </span>
                }
                className="red-asterisk"
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
              <div>
                <TextField
                  id="standard-number"
                  label={<span>CGST %</span>}
                  type="number"
                  variant="standard"
                  sx={{ marginBottom: "25px", width: 218 }}
                  className="red-asterisk"
                  onChange={(e) => {
                    if (
                      /^\d*\.?\d*$/.test(e.target.value) &&
                      parseFloat(e.target.value) >= 0
                    ) {
                      setAddDetails({
                        ...adddetails,
                        CGST: Number(e.target.value),
                      });
                      setValidationError("");
                    } else {
                      setAddDetails({
                        ...adddetails,
                        CGST: Number(e.target.value),
                      });
                      setValidationError("Please enter a positive number.");
                    }
                  }}
                  value={Number(adddetails.CGST) || ""}
                />
                {validationError && (
                  <div style={{ color: "red" }}>{validationError}</div>
                )}
              </div>
              <FormControl sx={{ m: 1, minWidth: 220, marginBottom: "20px" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  placeholder="Payment Type"
                >
                  Payment Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={adddetails.PaymentType}
                  label="Status"
                  onChange={(e) =>
                    setAddDetails({
                      ...adddetails,
                      PaymentType: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Direct"}>Direct</MenuItem>
                  <MenuItem value={"Indirect"}>InDirect</MenuItem>
                </Select>
              </FormControl>
              <label htmlFor="">
                {" "}
                InvoiceDate <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="date"
                label="ActionDate"
                style={{ width: "200px", height: "60px" }}
                value={adddetails.ActionDate}
                onChange={(e) =>
                  setAddDetails({ ...adddetails, ActionDate: e.target.value })
                }
              ></input>
            </Grid>
            <Grid item lg={4}>
              <TextField
                id="filled-basic"
                label={
                  <span>
                    Particulars <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="filled"
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Particulars: e.target.value,
                  })
                }
                sx={{ marginBottom: "26px" }}
                value={adddetails.Particulars}
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
              <FormControl sx={{ m: 1, minWidth: 220, marginBottom: "23px" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  placeholder="Payment Type"
                >
                  Account Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={adddetails.AccountType}
                  label="Status"
                  onChange={(e) =>
                    setAddDetails({
                      ...adddetails,
                      AccountType: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Cash"}>Cash</MenuItem>
                  <MenuItem value={"Solution"}>Solution</MenuItem>
                  <MenuItem value={"Workz"}>Workz</MenuItem>
                  <MenuItem value={"Digital"}>Digital</MenuItem>
                  <MenuItem value={"Director Fund"}>Director Fund</MenuItem>
                </Select>
              </FormControl>
              <label htmlFor="">
                {" "}
                DueDate<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="date"
                label={adddetails.DueDate}
                style={{ width: "200px", height: "60px" }}
                value={adddetails.DueDate}
                onChange={(e) =>
                  setAddDetails({ ...adddetails, DueDate: e.target.value })
                }
              ></input>
            </Grid>
            <Grid item lg={4}>
              <TextField
                id="standard-number"
                label={
                  <span>
                    Amount <span style={{ color: "red" }}>*</span>
                  </span>
                }
                type="number"
                variant="standard"
                sx={{ marginTop: "10px", marginBottom: "26px", width: 218 }}
                onChange={(e) =>
                  setAddDetails({
                    ...adddetails,
                    Amount: Number(e.target.value),
                  })
                }
                value={adddetails.Amount || ""}
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            sx={{ background: "#FBC91B" }}
            variant="contained"
            onClick={() => handleaddExpense()}
          >
            {actionTake ? "UPDATE" : "ADD"}
          </Button>
          <Button onClick={() => handleClose()} autoFocus>
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
