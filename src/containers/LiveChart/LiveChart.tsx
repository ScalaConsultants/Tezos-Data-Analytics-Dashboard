import React from "react";
import { useMappedState } from "redux-react-hook";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LiveChartBubble from "../../components/LiveChart/LiveChartBubble";
import DatePicker from "../../components/DatePicker/DatePicker";
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
  blokchain: state.blokchain
});

function LiveChart(): React.ReactElement {
  const { blokchain } = useMappedState(mapState);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  if (!blokchain.length) return <CircularProgress />;

  const summedTransactions = blokchain.reduce((acc: any, next: any): any => {
    const foundIndex = acc.findIndex((a: any) => a.source === next.source);
    if (foundIndex !== -1) {
      acc[foundIndex].transactions++;
    } else {
      next.transactions = 1;
      acc.push(next);
    }

    return acc;
  }, []);
  const transactionsToDisplay = summedTransactions
    .sort((a: any, b: any): number => b.transactions - a.transactions)
    .slice(0, 50);
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
