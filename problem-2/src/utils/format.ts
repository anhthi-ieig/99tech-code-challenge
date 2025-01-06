export const formatCurrency = (amount: string) => {
  if (!amount) {
    return "";
  }

  const parsableAmount = parseFloat(amount.replaceAll(",", ""));
  return new Intl.NumberFormat().format(parsableAmount);
};

export const removeFormatCurrency = (formattedCurrency: string) =>
  formattedCurrency.replaceAll(",", "");
