import { useState } from "react";
import QuoteForm, { QuoteInput } from "./components/QuoteForm";
import Quote from "./components/Quote";

import styles from "./app.module.css";
export interface IQuote extends QuoteInput {
  rangeDays: [number, number];
}

function App() {
  // I decided to use a simple useState and not a context or state management library since the data it's pretty straightforward
  const [quote, setQuote] = useState<IQuote | null>(null);

  return (
    <main className={styles.app}>
      <QuoteForm generateQuote={setQuote} />
      {quote && <Quote quote={quote} />}
    </main>
  );
}

export default App;
