## Assumption

- I assume below objects are valid and import correctly to `WalletPage` component
  . `classes` styles
  . `BoxProps` interface
  . `useWalletBalances` and `usePrices` hooks

## Computational Inefficiencies and Anti-patterns Found

1. Unused props, dependencies
   . `children` props from Props interface
   . `balancePriority` var at line 37
   . `prices` dependency at sortedBalances useMemo
   . `formattedBalances` const at line 56

2. The `WalletPage` component is not exported
   => Add export

3. Case `Zilliqa` and `Neo` return the same value
   => Should be grouped together

4. Redundant `(props: Props)`
   => Using `React.FC<Props>` is good enough which includes definition of children prop by default

5. Should `not use rest parameters` to pass to child component
   => Only pass props that child components need

6. Should `not use index as key prop` which leads to preventing re-render in list of `WalletRow`
   => Use `unique prop (e.g. walletId)` as key prop for `WalletRow` component

7. If the `Props` interface doesn't have it own props after extending to `BoxProps`
   => Use `BoxProps` directly

8. Nested if in `filter of balances` at line 42 and 43 which create more complexity
   => Apply `ternary operator`

9. `WalletBalance` interface has no definition for `blockchain` prop
   => `blockchain` prop should be defined as `a Union Type`

10. Avoid using `any` type (e.g. blockchain parameter of getPriority function)
    => Define a specific type

11. Sort function of sortedBalances `is not optimized` and `has no else case`
    => Apply `ternary operator`

12. `FormattedWalletBalance` interface has 2 props (`currency`, `amount`) which are defined in `WalletBalance`
    => `FormattedWalletBalance` interface should extends from `WalletBalance`

13. lhsPriority is not defined
    => should be result from getPriority function

14. Unnecessary variable of getPriority is created for each item in loop of Balances
    => Apply useCallback to memorize the function address
