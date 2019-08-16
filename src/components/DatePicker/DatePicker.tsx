import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { DatePickerProps } from "../../types";

/**
 * This component is used in `LiveChart` if you need for reference.
 */
export default function DatePicker({
  label,
  date,
  handleDateChange
}: DatePickerProps): React.ReactElement {
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
