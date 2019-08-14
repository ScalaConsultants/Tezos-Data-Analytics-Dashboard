import React, { useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LiveChartBubble from "../../components/LiveChart/LiveChartBubble";
import DatePicker from "../../components/DatePicker/DatePicker";
import * as BlokchainActions from "../../store/actions/blokchain";
import { colors } from "../../helpers/colors";

const MIN_SIZE = 70; //px;
const MAX_SIZE = 300; //px;
function calculateSize(max: number, transactions: number): number {
  // max is the biggest amount of transactions and it's always used as a base size;
  const percentage = (transactions / max) * 100;
  const size = Math.ceil(percentage / 10) * MIN_SIZE;

  return size;
}

const mapState = (state: any): any => ({
  summedBlocks: state.blokchain.summedBlocks,
  blocks: state.blokchain.blocks
});

function LiveChart(): React.ReactElement {
  const { summedBlocks, blocks } = useMappedState(mapState);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  const dispatch = useDispatch();

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  const sumBlocksByOwner = (): void => {
    dispatch({
      type: BlokchainActions.BLOKCHAIN_SUM_TRANSACTIONS,
      payload: {
        blocks
      }
    });
  };

  if (blocks.length === 0) {
    return <CircularProgress />;
  }

  if (!Object.keys(summedBlocks).length) {
    sumBlocksByOwner();
    return <CircularProgress />;
  }

  const transactionsToDisplay = summedBlocks.slice(0, 50);
  const mostTransactions = transactionsToDisplay[0].transactions;

  return (
    <React.Fragment>
      <DatePicker
        date={selectedDate}
        handleDateChange={handleDateChange}
        label="From"
      />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        m={1}
        bgcolor="background.paper"
        border={2}
        borderColor="primary.secondary"
      >
        {transactionsToDisplay.map(
          (b: any, i: number): React.ReactElement => (
            <LiveChartBubble
              key={i}
              amount={b.amount}
              source={b.source}
              transactions={b.transactions}
              size={
                i === 0
                  ? MAX_SIZE
                  : calculateSize(mostTransactions, b.transactions)
              }
              color={colors[i % colors.length]}
            />
          )
        )}
      </Box>
    </React.Fragment>
  );
}

export default LiveChart;
