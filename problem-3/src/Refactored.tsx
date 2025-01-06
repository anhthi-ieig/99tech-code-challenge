import { FC, useCallback, useMemo } from "react";

type BlockchainUnion = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  walletId: string;
  currency: string;
  amount: number;
  blockchain: BlockchainUnion;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {
  id: string;
  testId: string;
}

export const WalletPage: FC<Props> = (props) => {
  const { id, testId } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = useCallback((blockchain: BlockchainUnion): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      case "Neo":
        return 20;
      default:
        return -99;
    }
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const lhsPriority = getPriority(balance.blockchain);
        return lhsPriority > -99 && balance.amount <= 0 ? true : false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances, getPriority]);

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.walletId}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div id={id} data-testid={testId}>
      {rows}
    </div>
  );
};
