import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const LiveChartBubble = (props: any): React.ReactElement => {
  return (
    <Box
      p={1}
      m={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.300"
      style={{
        borderRadius: "50%",
        width: `${props.size}px`,
        height: `${props.size}px`,
        maxWidth: 300,
        maxHeight: 300,
        background: props.color
      }}
    >
      <Tooltip title={props.source}>
        <Typography noWrap>{props.source}</Typography>
      </Tooltip>
      <Typography>{props.transactions}</Typography>
    </Box>
  );
};

export default LiveChartBubble;
