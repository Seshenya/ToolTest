/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import { baseUrl } from "baseUrl";

import Icon from '@mui/material/Icon';

// Images
import { statusColors } from "constants/DummyProducts";

export default function ProductsTableData({ setUpdateStatusOpen }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoic2VzaGVueWFAaW5mb3JtYXRpay5ocy1mdWxkYS5kZSIsImlhdCI6MTcwMjIzMDQ3NSwiZXhwIjoxNzAyMjM0MDc1fQ.5vAIsf8X6KSgZpwbIQAsxP4QKz6LZn7tD1Frlpc2-4M";
  
    axios.get("https://gdsdt4-server.northeurope.cloudapp.azure.com/media/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const fetchedProducts = response.data;

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Invalid data format received from the backend. Expected an array.");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return {
    columns: [
      { Header: "Product", accessor: "product", align: "left" },
      { Header: "Creator", accessor: "creator", align: "left" },
      { Header: "date", accessor: "date", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: products.map((product) => ({
      product: product.title,
      creator: product.creator.name,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={product.status} color={statusColors[product.status]} variant="gradient" size="sm" />
        </MDBox>
      ),
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {product.date}
        </MDTypography>
      ),
      action: (
        <MDBox display='flex'>
          <MDBox>
            <Icon fontSize='small' onClick={() => setUpdateStatusOpen(true)}>edit</Icon>
          </MDBox>
          <MDBox ml={1}>
            <Icon fontSize='small'>download</Icon>
          </MDBox>
        </MDBox>
      ),
    })),
  };
}
