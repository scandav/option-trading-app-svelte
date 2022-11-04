<script>
  import {
    computeProbability,
    computeEstimatedPrices,
  } from "../utils/black-n-scholes";
  import { Slider } from "carbon-components-svelte";

  export let underlyingPrice;
  export let strikePrice;
  export let contractStartDate;
  export let contractEndDate;

  let volatility = 0.1;

  $: daysCount = Math.ceil(
    (contractEndDate - contractStartDate) / (1000 * 60 * 60 * 24)
  );
  $: prices = computeProbability(
    underlyingPrice,
    strikePrice,
    volatility,
    daysCount
  );
  $: probabilities = computeEstimatedPrices(
    underlyingPrice,
    strikePrice,
    volatility,
    0.04,
    daysCount
  );
</script>

<main>
  <h3>Calcolatore di Probabilità</h3>
  <Slider
    bind:value={volatility}
    min={0}
    max={1}
    step={0.01}
    labelText="Volatilità"
  />
  <div>{underlyingPrice}</div>
  <div>{strikePrice}</div>
  <div>{contractStartDate}</div>
  <div>{contractEndDate}</div>
  <div>{daysCount}</div>

  <div>{JSON.stringify(prices)}</div>
  <div>{JSON.stringify(probabilities)}</div>
</main>
