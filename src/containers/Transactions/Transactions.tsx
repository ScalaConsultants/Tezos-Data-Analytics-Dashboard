import React, { useState } from "react";
import { useMappedState } from "redux-react-hook";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid/Grid";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";

import { stableSort, getSorting } from "../../helpers/helpers";

const headerCols = [
  { id: "timestamp", numeric: false, disablePadding: true, label: "Timestamp" },
  { id: "source", numeric: false, disablePadding: false, label: "Source" },
  {
    id: "destination",
    numeric: false,
    disablePadding: false,
    label: "Destination"
  }
];

type Order = "asc" | "desc";
type OrderBy = string;

const mapState = (state: any) => ({
  blokchain: state.blokchain
});

const Transactions = (): React.ReactElement => {
  // const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<OrderBy>("name");

  const handleRequestSort = (event: any, property: any) => {
    if (orderBy === property && order === "desc") {
      setOrder("asc");
    } else if (orderBy === property && order === "asc") {
      setOrder("desc");
    }
    setOrderBy(property);
  };

  const createSortHandler = (property: any) => (event: any) => {
    handleRequestSort(event, property);
  };



  const timestampToDate = (timestamp: number) => {
    const newDate = new Date(timestamp);
    const formattedDate =
      ('0' + newDate.getDate())
        .slice(-2) + '-' + ('0' + (newDate.getMonth() + 1))
          .slice(-2) + '-' + newDate.getFullYear();
    const dateWithHour = formattedDate.split("-").reverse().join("-") + ' ' + newDate.getHours()+':'+newDate.getMinutes()+':'+newDate.getSeconds();

    return dateWithHour.toString();
  }

  return (
    <Grid container spacing={9} className="Container">
      <Grid item xs={12} lg={12}>
        <h1 id="client-manager-title" className="Transactions__header">
          Last 100 transactions
        </h1>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Table>
          <TableHead>
            <TableRow>
              {headerCols.map(row => (
                <TableCell
                  key={row.id}
                  align={row.numeric ? "right" : "left"}
                  padding={row.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(
              blokchain.slice(0, 100),
              getSorting(order, orderBy)
            ).map((row: any, index: any) => (
              <TableRow hover key={index}>
                <TableCell component="th" scope="row">
                  {timestampToDate(row.timestamp)}
                </TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.destination}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Transactions;
