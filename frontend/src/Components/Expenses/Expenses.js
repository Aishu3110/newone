import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  Container,
  Divider,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  createTheme,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Menu, MenuItem } from "@mui/material";
import Axios from "axios";

import { Date } from "core-js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  // const [showNavBar, setShowNavBar] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showNavBar, setShowNavBar] = useState(true);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    account: "",
    limit_amount: "",
    balance: "",
    date: "",
  });

  const [editMode, setEditMode] = useState({});

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setShowNavBar(true);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setShowNavBar(true);
  };

  //   const handleMenuClose = () => {
  //     setMenuAnchorEl(null);
  //     setShowNavBar(false);
  //   };

  const handleAddRow = () => {
    setNewRowData({
      account: "",
      limit_amount: "",
      balance: "",
      date: "",
    });
    setAddDialogOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRowData({
      ...newRowData,
      [name]: value,
    });
  };

  const handleAddButtonClick = () => {
    const newData = {
      account: newRowData.account,
      limit_amount: newRowData.limit_amount,
      balance: newRowData.balance,
      date: newRowData.date,
    };

    Axios.post("/api/account-summary", newData)

      .then((response) => {
        if (response.status === 200) {
          setTableData((prevTableData) => [...prevTableData, newData]);
          setAddDialogOpen(false);
        } else {
          console.error("Error adding data to the API");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleEditMode = (index) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [index]: !prevEditMode[index],
    }));
  };

  const handleRowInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];
    updatedTableData[index] = {
      ...updatedTableData[index],
      [name.split("-")[0]]: value,
    };
    if (editMode[index]) {
      Axios.put(`/api/account-summary/${updatedTableData[index].id}`, {
        account: updatedTableData[index].account,
        limit_amount: updatedTableData[index].limit_amount,
        balance: updatedTableData[index].balance,
        date: updatedTableData[index].date,
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Record updated successfully");
          } else {
            console.error("Error updating record");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setTableData(updatedTableData);
  };

  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState(null);

  const handleDownloadClick = (event) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null);
  };

  const handleDownload = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Account Summary", 10, 10);
    const columns = ["Account", "Limit", "Balance", "Date"];
    const data = tableData.map((row) => [
      row.account,
      row.limit_amount,
      row.balance,
      row.date,
    ]);
    const margin = 10;
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 20,
      margin: { top: margin },
    });
    doc.save("account_summary.pdf");
  };

  const handleDeleteRow = (index, accountId) => {
    if (!accountId) {
      const updatedTableData = [...tableData];
      updatedTableData.splice(index, 1);
      setTableData(updatedTableData);
    } else {
      Axios.delete(`/api/account-summary/${accountId}`)
        .then((response) => {
          if (response.status === 200) {
            const updatedTableData = [...tableData];
            updatedTableData.splice(index, 1);
            setTableData(updatedTableData);
          } else {
            console.error("Error deleting data from the API");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    Axios.get("/api/account-summary")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTableData(response.data.results);
        } else {
          console.error("Error fetching data from the API");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="fixed" color="primary">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "auto",
                marginLeft: "170px",
              }}
            />
          </Toolbar>
        </AppBar> */}

        {/* {showNavBar && (
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                backgroundColor: "#000000",
              },
            }}
          >
            <Toolbar />
            <List>
              <ListItem>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "#FFFFFF",
                  }}
                >
                  Pyra Fin
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                button
                key="dashboard"
                onClick={() => handleTabClick("dashboard")}
              >
                <ListItemText
                  primary="Dashboard"
                  style={{ color: "#FBC91B" }}
                />
              </ListItem>
              <ListItem
                button
                key="income"
                onClick={() => handleTabClick("income")}
              >
                <ListItemText primary="Invoice" style={{ color: "#FBC91B" }} />
              </ListItem>
            </List>
          </Drawer>
        )} */}
        <main style={{ flexGrow: 1 }}>
          <Toolbar />
          <Container maxWidth="lg">
            {selectedTab === "dashboard" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h1>Expenses</h1>
              </div>
            )}
            {selectedTab === "income" && (
              <div>
                <h1>Invoice</h1>
              </div>
            )}
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
