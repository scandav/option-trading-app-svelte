const cumNormDist = function (t) {
  const s = 0.31938153,
    e = -0.356563782,
    i = 1.781477937,
    a = -1.821255978,
    o = 1.330274429,
    l = 0.2316419,
    r = 0.39894228;
  let c = 0;
  return t >= 0
    ? ((c = 1 / (1 + l * t)),
      1 -
        r *
          Math.exp((-t * t) / 2) *
          c *
          (c * (c * (c * (c * o + a) + i) + e) + s))
    : ((c = 1 / (1 - l * t)),
      r *
        Math.exp((-t * t) / 2) *
        c *
        (c * (c * (c * (c * o + a) + i) + e) + s));
};

const computeEstimatedPrices = function (
  underlyingPrice,
  strikePrice,
  volatility,
  interestRate,
  calendarDays
) {
  const t = interestRate;
  const s = volatility;
  const e = calendarDays;
  const i = Math.log(underlyingPrice / strikePrice);
  const a = t + 0.5 * Math.pow(s, 2);
  const o = e / 365;
  const l = cumNormDist((i + a * o) / (s * Math.sqrt(e / 365)));
  const callPrice =
    underlyingPrice * l -
    strikePrice *
      Math.exp((-t * e) / 365) *
      cumNormDist(
        (Math.log(underlyingPrice / strikePrice) +
          ((t + 0.5 * Math.pow(s, 2)) * e) / 365) /
          (s * Math.sqrt(e / 365)) -
          s * Math.sqrt(e / 365)
      );
  const putPrice =
    callPrice +
    strikePrice * Math.exp((-interestRate * e) / 365) -
    underlyingPrice;

  return { call: callPrice, put: putPrice };
};

const computeProbability = function (
  underlyingPrice,
  strikePrice,
  volatility,
  calendarDays
) {
  const t = underlyingPrice;
  const s = strikePrice;
  const e = calendarDays / 365;
  const i = volatility;
  const a = i * Math.sqrt(e);
  const o = Math.log(s / t);
  const l = o / a;
  const r = Math.floor((1 / (1 + 0.2316419 * Math.abs(l))) * 1e5) / 1e5;
  const c = Math.floor(0.3989423 * Math.exp((-l * l) / 2) * 1e5) / 1e5;
  const n = 1.330274 * Math.pow(r, 5);
  const p = 1.821256 * Math.pow(r, 4);
  const m = 1.781478 * Math.pow(r, 3);
  const d = 0.356538 * Math.pow(r, 2);
  const f = 0.3193815 * r;
  let u = 1 - c * (n - p + m - d + f);

  u = Math.floor(1e5 * u) / 1e5;
  l < 0 && (u = 1 - u);
  return {
    above: Math.floor(1e3 * u) / 10,
    below: Math.floor(1e3 * (1 - u)) / 10,
  };
};

export { computeEstimatedPrices, computeProbability };
