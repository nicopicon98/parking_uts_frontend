import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { StatBox } from "./components/statbox";
import { Typography } from "@mui/material";
import { ParkingTable } from "./components/parking-table";
import SearchIcon from "@mui/icons-material/Search";

interface ParkingLot {
  id: number;
  status: number;
}

interface ParkingRecord {
  id: number;
  entryTime: string;
  exitTime: string | null;
  spaceNumber: number;
  vehiclePlate: string;
  userEmail: string;
}

const Dashboard = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [parkingRecords, setParkingRecords] = useState<ParkingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle inserting a new parking space
  const handleInsertSpace = () => {
    // Implement your logic to insert a new space here
    // Update the parkingLots state with the new data
  };

  // Function to handle search query change
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (values: { searchQuery: string }) => {
    // Implement your logic to fetch parking records based on the search query
    // Update the parkingRecords state with the fetched data
    console.log(searchQuery);
  };

  const rowClickHandler = (record: ParkingRecord) => {
    console.log(record, "record");
  };

  return (
    <Container component="main" maxWidth="xl">
      {/* Title */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography component="h1" variant="h1">
          Dashboard
        </Typography>
      </Box>
      {/* GRID */}
      <Box padding={1} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StatBox>
              <Formik
                initialValues={{ searchQuery: "" }}
                onSubmit={handleSearchSubmit}
              >
                <Form
                  style={{
                    alignItems: "center",
                    justifyContent: "end",
                    display: "flex",
                  }}
                >
                  <Field
                    as={TextField}
                    name="searchQuery"
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                  <IconButton type="submit" aria-label="Buscar">
                    <SearchIcon />
                  </IconButton>
                </Form>
              </Formik>
              <ParkingTable
                parkingRecords={[
                  {
                    id: 1,
                    entryTime: "entryTime Example",
                    exitTime: "exitTime Example",
                    spaceNumber: 12,
                    vehiclePlate: "PLACA",
                    userEmail: "correo@uts.edu.co",
                  },
                ]}
                onRowClick={rowClickHandler}
              />
            </StatBox>
          </Grid>
          <Grid item xs={6}>
            <StatBox>
              <p>2</p>
            </StatBox>
          </Grid>
          <Grid item xs={6}>
            <StatBox>
              <p>3</p>
            </StatBox>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
