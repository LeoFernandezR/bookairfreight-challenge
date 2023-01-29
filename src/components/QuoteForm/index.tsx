import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import random from "lodash/random";
import { IQuote } from "../../App";

import styles from "./quoteForm.module.css";

const shippingChannelOptions = ["Air", "Ocean"] as const;

type shippingChannel = typeof shippingChannelOptions[number];

const schema = yup
  .object({
    startingCountry: yup
      .string()
      .trim()
      .required("This field is required")
      .matches(/^[a-zA-Z]*$/, "Only characters please"),
    destinationCountry: yup
      .string()
      .trim()
      .required("This field is required")
      .matches(/^[a-zA-Z]*$/, "Only characters please"),
    quotePrice: yup
      .number()
      .integer()
      .positive()
      .defined()
      .required("This field is required")
      .typeError("Please enter a valid positive number"),
    shippingChannel: yup
      .mixed<shippingChannel>()
      .oneOf([...shippingChannelOptions])
      .required("This field is required"),
  })
  .required();

export type QuoteInput = yup.InferType<typeof schema>;

interface Props {
  generateQuote: (quote: IQuote) => void;
}

const QuoteForm = ({ generateQuote }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteInput>({ resolver: yupResolver(schema), mode: "onTouched" });

  const onSubmit = (data: QuoteInput) => {
    if (data.shippingChannel === "Air") {
      const startRange = random(3, 7);
      const endRange = startRange + random(2, 4);

      generateQuote({
        ...data,
        rangeDays: [startRange, endRange],
      });
    } else if (data.shippingChannel === "Ocean") {
      const startRange = random(25, 30);
      const endRange = startRange + random(5, 10);

      generateQuote({
        ...data,
        rangeDays: [startRange, endRange],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label htmlFor={register("startingCountry").name}>
          Starting country
        </label>
        <input {...register("startingCountry")} />
        {errors.startingCountry && <p>{errors.startingCountry?.message}</p>}
      </div>
      <div>
        <label htmlFor={register("destinationCountry").name}>
          Destination country
        </label>
        <input {...register("destinationCountry")} />
        {errors.destinationCountry && (
          <p>{errors.destinationCountry?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor={register("quotePrice").name}>Quote price</label>
        <input type='number' {...register("quotePrice")} />
        {errors.quotePrice && <p>{errors.quotePrice?.message}</p>}
      </div>
      <div>
        <label htmlFor={register("shippingChannel").name}>
          Shipping channel
        </label>
        <select {...register("shippingChannel")}>
          <option value='Ocean'>Ocean</option>
          <option value='Air'>Air</option>
        </select>
        {errors.shippingChannel && <p>{errors.shippingChannel?.message}</p>}
      </div>

      <button type='submit' className={styles.button}>
        Create quote
      </button>
    </form>
  );
};

export default QuoteForm;
