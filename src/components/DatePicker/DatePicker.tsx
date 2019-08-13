import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

interface Props {
  label: string;
  date: Date | null;
  handleDateChange: (date: Date | null) => void;
}

/**
 * This component is used in `LiveChart` if you need for reference.
 */
export default function MaterialUIPickers({
  label,
  date,
  handleDateChange
}: Props): React.ReactElement {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="mui-pickers-date"
        label={label}
        value={date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
