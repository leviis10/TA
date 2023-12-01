function currencyFormatter(number, locale = "id-ID") {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}

export default currencyFormatter;
