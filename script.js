 <script>
  function calculate() {
  let finalPrice = parseFloat(document.getElementById('finalPrice').value);
  let platform = document.getElementById('platform').value;

  if (isNaN(finalPrice)) {
    document.getElementById('output').innerText = "Please enter the final price.";
    return;
  }

  let basePrice, gstAmount, fee, payout;

  if (platform === "direct") {
    // Direct/Offline booking: only 14% commission
    fee = finalPrice * 0.14;
    payout = finalPrice - fee;

    document.getElementById('output').innerHTML =
      "Final Price: ₹" + finalPrice.toFixed(2) + "<br>" +
      "Commission (14%): ₹" + fee.toFixed(2) + "<br>" +
      "Owner Payout: ₹" + payout.toFixed(2);

  } else {
    // GST logic: 5% if nightly rate ≤ 7500, else 18%
    let gst = (finalPrice <= 7500) ? 0.05 : 0.18;

    // Service fee logic per platform
    let serviceFee;
    if (platform === "homeyhuts") {
      serviceFee = 0.14;
    } else if (platform === "agoda") {
      serviceFee = 0.10;
    } else if (platform === "mmt") {
      serviceFee = 0.15;
    } else if (platform === "airbnb") {
      serviceFee = 0.10;
    }

    basePrice = finalPrice / (1 + gst);
    gstAmount = basePrice * gst;
    fee = basePrice * serviceFee;
    payout = basePrice - fee;

    document.getElementById('output').innerHTML =
      "Base Price: ₹" + basePrice.toFixed(2) + "<br>" +
      "GST Amount: ₹" + gstAmount.toFixed(2) + "<br>" +
      "Service Fee: ₹" + fee.toFixed(2) + "<br>" +
      "Owner Payout: ₹" + payout.toFixed(2);
  }
}
</script>
