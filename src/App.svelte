<script>
  import "carbon-components-svelte/css/white.css";
  import {
    NumberInput,
    Toggle,
    DatePicker,
    DatePickerInput,
  } from "carbon-components-svelte";
  // import { onMount } from "svelte";

  import ContractProbability from "./components/ContractProbability.svelte";

  let currentPrice = 3000;
  let strikePrice = 3000;
  let contractStartString;
  let contractEndString;

  $: margin = ((strikePrice - currentPrice) / currentPrice) * 100;
  $: contractStartDate = new Date(contractStartString?.replace(/\//g, "-"));
  $: contractEndDate = new Date(contractEndString?.replace(/\//g, "-"));
</script>

<main>
  <NumberInput bind:value={currentPrice} label="Prezzo del Sottostante" />
  <Toggle labelText="Usa prezzo del sottostante dal grafico" toggled />
  <NumberInput bind:value={strikePrice} label="Prezzo d'Esercizio" step={10} />
  <div>Margine: {margin.toFixed(1)} %</div>

  <DatePicker
    datePickerType="range"
    bind:valueFrom={contractStartString}
    bind:valueTo={contractEndString}
  >
    <DatePickerInput labelText="Inizio Contratto" placeholder="mm/dd/yyyy" />
    <DatePickerInput labelText="Fine Contratto" placeholder="mm/dd/yyyy" />
  </DatePicker>

  <ContractProbability
    underlyingPrice={currentPrice}
    {strikePrice}
    {contractStartDate}
    {contractEndDate}
  />
</main>
