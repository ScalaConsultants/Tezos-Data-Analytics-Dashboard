import React, { useEffect, useState } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import * as BlokchainActions from "../../store/actions/blokchain";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LiveChartBubble from "../../components/LiveChart/LiveChartBubble";
import { colors } from "../../helpers/colors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MIN_SIZE = 70; //px;
const MAX_SIZE = 300; //px;
function calculateSize(max: number, transactions: number): number {
  // max is the biggest amount of transactions and it's always used as a base size;
  const percentage = (transactions / max) * 100;
  const size = Math.ceil(percentage / 10) * MIN_SIZE;

  return size;
}

function getRandNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

const mapState = (state: any): any => ({
  blokchain: state.blokchain
});

function LiveChart(): React.ReactElement {
  const dispatch = useDispatch();
  const { blokchain } = useMappedState(mapState);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date): void => {
    setStartDate(date);
  };

  useEffect((): void => {
    const fetchTransactions = (): void => {
      dispatch({
        type: BlokchainActions.BLOKCHAIN_FETCH_TRANSACTIONS
      });
    };

    fetchTransactions();
  }, [dispatch]);

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
      <DatePicker selected={startDate} onChange={handleChange} />
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
              color={colors[getRandNum(0, colors.length - 1)]}
            />
          )
        )}
      </Box>
    </React.Fragment>
  );
}

export default LiveChart;
