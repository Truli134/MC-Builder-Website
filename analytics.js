const GA_MEASUREMENT_ID =
  window.MCBUILDERS_CONFIG?.analyticsMeasurementId || "G-REPLACE_ME";

if (GA_MEASUREMENT_ID && !GA_MEASUREMENT_ID.includes("REPLACE")) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}
