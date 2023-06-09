import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Theme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

interface ParkingRecord {
  id: number;
  entryTime: string;
  exitTime: string | null;
  spaceNumber: number;
  vehiclePlate: string;
  userEmail: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      "& th": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      "& tbody tr:hover": {
        backgroundColor: theme.palette.action.hover,
        cursor: "pointer",
      },
    },
  })
);

export const ParkingTable = ({
  parkingRecords,
  onRowClick,
}: {
  parkingRecords: ParkingRecord[];
  onRowClick: (record: ParkingRecord) => void;
}) => {
  // const classes = useStyles();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Ingreso (Fecha y Hora)</TableCell>
          <TableCell>Salida (Fecha y Hora)</TableCell>
          <TableCell>Placa</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {parkingRecords.map((record) => (
          <TableRow key={record.id} onClick={() => onRowClick(record)}>
            <TableCell>{record.id}</TableCell>
            <TableCell>{record.entryTime}</TableCell>
            <TableCell>{record.exitTime ? record.exitTime : ""}</TableCell>
            <TableCell>{record.vehiclePlate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};