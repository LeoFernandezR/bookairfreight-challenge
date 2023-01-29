import React from "react";
import { IQuote } from "../../App";
import { IoMdBoat, IoIosAirplane } from "react-icons/io";
import dayjs from "dayjs";

import styles from "./quote.module.css";

interface Props {
  quote: IQuote;
}

const formatDays = (rangeDays: IQuote["rangeDays"]) => {
  const [start, end] = rangeDays;
  return `${start}-${end} days`;
};

const formatDate = (rangeDays: IQuote["rangeDays"]) => {
  const [start, end] = rangeDays;
  const startDate = dayjs().add(start, "days").format("MMM DD");
  const endDate = dayjs().add(end, "days").format("MMM DD");

  return `${startDate} - ${endDate}`;
};

const formatPrice = (price: IQuote["quotePrice"]) => {
  const USDollar = new Intl.NumberFormat("en-US");

  return USDollar.format(price);
};

const Quote = ({ quote }: Props) => {
  const config = {
    Air: {
      icon: <IoIosAirplane className={styles.icon} />,
      daysRange: formatDays(quote.rangeDays),
      dateRange: formatDate(quote.rangeDays),
    },
    Ocean: {
      icon: <IoMdBoat className={styles.icon} />,
      daysRange: formatDays(quote.rangeDays),
      dateRange: formatDate(quote.rangeDays),
    },
  };

  const q = config[quote.shippingChannel];

  return (
    <section className={styles.section}>
      <article className={styles.deliveryChannel}>
        <h4>
          <span>{q.icon}</span> Traditional{" "}
          {quote.shippingChannel.toLowerCase()} freight
        </h4>
        <div className={styles.deliveryRange}>
          <h2>{q.daysRange}</h2>
          <p>Estimated delivery</p>
          <h3 className={styles.dateDelivery}>{q.dateRange}</h3>
        </div>
      </article>
      <article className={styles.deliveryDetails}>
        <div>
          <h2>
            {quote.startingCountry} -&gt; {quote.destinationCountry}
          </h2>
        </div>
        <h1>US$ {formatPrice(quote.quotePrice)}</h1>
      </article>
    </section>
  );
};

export default Quote;
