import { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Input,
  SortIcon,
  Tooltip,
  Typography,
  usySpacing,
} from "@usy-ui/base";
import { Controller, useForm } from "react-hook-form";

import styles from "./App.module.scss";
import ethIconSrc from "./assets/eth.svg";
import usdcSrc from "./assets/usdc.svg";
import { ValidateRules } from "./constants/validation";
import { formatCurrency, removeFormatCurrency } from "./utils/format";

/**
 * I'm using my own UI library named Usy-UI
 * https://www.npmjs.com/package/@usy-ui/base
 */

type FormType = {
  amountToSend: string;
  amountToReceive: string;
};

type CurrencyPriceType = {
  currency: string;
  date: string;
  price: number;
};
type CurrencyPricesObjType = Record<string, CurrencyPriceType>;

function App() {
  const usdcEthRate = useRef<number>();
  const [isFetching, setIsFetching] = useState(false);
  const { control, handleSubmit, setValue } = useForm<FormType>({
    defaultValues: {
      amountToSend: "",
    },
  });

  const onSubmit = (values: FormType) => {
    if (usdcEthRate.current) {
      const amountToSend = parseFloat(
        removeFormatCurrency(values.amountToSend)
      );
      const amountToReceive = (amountToSend * usdcEthRate.current).toFixed(2);
      setValue("amountToReceive", formatCurrency(amountToReceive.toString()));
    }
  };

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const currencyPricesList: CurrencyPriceType[] = await fetch(
        "https://interview.switcheo.com/prices.json"
      ).then((data) => data.json());

      setIsFetching(false);
      const currencyPricesObj = currencyPricesList.reduce((acc, item) => {
        acc[item.currency] = item;
        return acc;
      }, {} as CurrencyPricesObjType);

      usdcEthRate.current =
        currencyPricesObj["ETH"].price / currencyPricesObj["USDC"].price;
    })();
  }, []);

  return (
    <main className={styles["app-container"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <Typography size="huge" align="center">
          Currency Swap
        </Typography>
        <Flex
          direction="column"
          gap={usySpacing.px20}
          marginProps={{
            marginTop: usySpacing.px40,
            marginBottom: usySpacing.px40,
          }}
        >
          <Controller
            name="amountToSend"
            control={control}
            rules={{ required: ValidateRules.required }}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                label="Amount to send"
                iconLeft={
                  <Tooltip content="USDC">
                    <img src={usdcSrc} alt="USDC" />
                  </Tooltip>
                }
                placeholder="Enter amount"
                description={error?.message}
                hasError={Boolean(error?.message)}
                transformOnBlur={(value) => formatCurrency(value)}
                hasAsterisk
              />
            )}
          />
          <Controller
            name="amountToReceive"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                label="Amount to receive"
                iconLeft={
                  <Tooltip content="ETH">
                    <img src={ethIconSrc} alt="ETH" />
                  </Tooltip>
                }
                placeholder="Converted amount"
                description={
                  isFetching
                    ? "Loading..."
                    : `1 USDC = ${usdcEthRate.current?.toFixed(2)} ETH`
                }
              />
            )}
          />
        </Flex>
        <Button type="submit">Confirm Swap</Button>
      </form>
    </main>
  );
}

export default App;
