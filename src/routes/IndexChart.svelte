<script>
  import { LineChart } from "@carbon/charts-svelte";

  import "@carbon/styles/css/styles.css";
  import "@carbon/charts/styles.css";
</script>

<LineChart
  data={{
    labels: ["Qty"],
    datasets: [
      {
        label: "Dataset 1",
        data: [
          {
            date: "2020-12-10T22:59:15.000Z",
            value: 10,
          },
          {
            date: "2020-12-10T22:59:30.000Z",
            value: 15,
          },
          {
            date: "2020-12-10T22:59:45.000Z",
            value: 7,
          },
          {
            date: "2020-12-10T23:00:00.000Z",
            value: 2,
          },
          {
            date: "2020-12-10T23:00:15.000Z",
            value: 9,
          },
          {
            date: "2020-12-10T23:00:30.000Z",
            value: 13,
          },
          {
            date: "2020-12-10T23:00:45.000Z",
            value: 8,
          },
        ],
      },
    ],
  }}
  options={{
    title:
      "Line (time series) - Time interval 15seconds - Zoom bar enabled (initial zoomed domain)",
    axes: {
      left: {},
      bottom: {
        scaleType: "time",
      },
    },
    legend: {
      clickable: false,
    },
    experimental: true,
    zoomBar: {
      top: {
        enabled: true,
        type: "slider_view",
        initialZoomDomain: [
          "2020-12-10T22:59:25.000Z",
          "2020-12-10T23:00:25.000Z",
        ],
      },
    },
    height: "400px",
  }}
/>
