<script>
	import 'carbon-components-svelte/css/white.css';
	import {
		NumberInput,
		Toggle,
		DatePicker,
		DatePickerInput,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';

	import ContractProbability from './ContractProbability.svelte';
	import IndexChart from './IndexChart.svelte';
	import { onMount } from 'svelte';

	let currentPrice = 3000;
	let strikePrice = 3000;
	let contractStartString;
	let contractEndString;

	$: margin = ((strikePrice - currentPrice) / currentPrice) * 100;
	$: contractStartDate = new Date(contractStartString?.replace(/\//g, '-'));
	$: contractEndDate = new Date(contractEndString?.replace(/\//g, '-'));

	onMount(async () => {
		const response = await fetch('/.netlify/functions/hello-world').then((res) => res.json());

		console.log('CIAO');
		console.log(JSON.stringify(response));
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>IOTA</h1>

	<Grid fullWidth>
		<Row>
			<Column sm={3}><IndexChart /></Column>
			<Column sm={1}>
				<Toggle labelText="Usa prezzo del sottostante dal grafico" toggled />
				<NumberInput bind:value={currentPrice} label="Prezzo del Sottostante" /></Column
			>
		</Row>
	</Grid>

	<h2>Contratto</h2>

	<Grid fullWidth>
		<Row>
			<Column>
				<NumberInput bind:value={strikePrice} label="Prezzo d'Esercizio" step={10} />
			</Column>
			<Column>Margine: {margin.toFixed(1)} %</Column>
			<Column>
				<DatePicker
					datePickerType="range"
					bind:valueFrom={contractStartString}
					bind:valueTo={contractEndString}
				>
					<DatePickerInput labelText="Inizio Contratto" placeholder="mm/dd/yyyy" />
					<DatePickerInput labelText="Fine Contratto" placeholder="mm/dd/yyyy" />
				</DatePicker></Column
			>
		</Row>
	</Grid>

	<ContractProbability
		underlyingPrice={currentPrice}
		{strikePrice}
		{contractStartDate}
		{contractEndDate}
	/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
