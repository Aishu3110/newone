import React from "react";
import axios from "axios";

export default {
  addIncome: async function (newRow) {
    try {
      const response = await axios.post(`/income/addincome`, newRow);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  updateIncome: async function (id, newRow) {
    try {
      console.log("updatw");
      const response = await axios.put(`/income/updateincome/${id}`, newRow);
      console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  },
  getTotalIncome: async function () {
    try {
      const response = await axios.get(`/income/getTotalIncomeRate`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getUnpaidTotalIncome: async function () {
    try {
      const response = await axios.get(`/income/getUnpaidTotalIncomeRate`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  donwloadInvoice: async function (id) {
    try {
      const response = await axios.get(`/generateinvoice/${id}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  generatereceipt: async function (id) {
    try {
      const response = await axios.get(`/generatereceipt/${id}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  deleteSingleIncome: async function (id) {
    try {
      const response = await axios.put(`/income/deletesinglerecord/${id}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getTotalExpense: async function () {
    try {
      const response = await axios.get(`/expense/getDirectTotalExpenseRate`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getUnpaidTotalExpense: async function () {
    try {
      const response = await axios.get(`/expense/getIndirectTotalExpenseRate`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  addExpense: async function (newRow) {
    try {
      const response = await axios.post(`/expense/addexpense`, newRow);
      return response;
    } catch (err) {
      return err;
    }
  },
  updateExpense: async function (id, newRow) {
    try {
      const response = await axios.put(`/expense/updateexpense/${id}`, newRow);
      return response;
    } catch (err) {
      return err;
    }
  },
  deleteSingleExpense: async function (id) {
    try {
      const response = await axios.put(
        `/expense/deletesingleexpenserecord/${id}`
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
