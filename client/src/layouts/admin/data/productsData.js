import React, { useEffect, useState } from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import Icon from '@mui/material/Icon';

import { statusColors } from "constants/DummyProducts";

function ProductsTable({ setUpdateStatusOpen }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const API = 'http://localhost:4000/media';
    const TOKEN = 'your_token';
  
    fetch(API, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    })
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.error('Error:', error));
  }, []);
  

  const productsTableData = {
    columns: [
      { Header: "Product", accessor: "product", align: "left" },
      { Header: "Creator", accessor: "creator", align: "left" },
      { Header: "date", accessor: "date", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: products.map((product) => {
      return (
        {
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
        }
      )
    })
  };

}
