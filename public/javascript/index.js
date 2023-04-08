const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const copyButton = document.querySelector("#copy");
const numAddresses = document.querySelector("#text");
const timestamp = document.querySelector("#last-update");

// initialize addresses table
let addresses = null;
sliderValue.textContent = slider.value;

timestamp.textContent = `Last Update: ${new Date(
   +timestamp.getAttribute("data-timestamp")
).toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric" })}`;

slider.addEventListener("input", (event) => {
   sliderValue.textContent = event.target.value;
   numAddresses.textContent = addresses.filter(
      (address) => address[1] >= slider.value
   ).length;
});

copyButton.addEventListener("click", (event) => {
   navigator.clipboard.writeText(
      addresses
         .filter((address) => address[1] >= slider.value)
         .map((address) => address[0])
         .join("\n")
   );
});

(async () => {
   const response = await fetch("/get_data");
   addresses = await response.json();
   numAddresses.textContent = addresses.filter(
      (address) => address[1] >= slider.value
   ).length;
})();
