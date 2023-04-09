const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const copyButton = document.querySelector("#copy");
const buttonText = document.querySelector("#button-text");
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

const checkmark = `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                     <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                     <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                   </svg>`;

// only allows button click every 2500ms
let lastClickTime = 0;
const clickInterval = 2500;

copyButton.addEventListener("click", (event) => {
   const currentTime = new Date().getTime();
   if (currentTime - lastClickTime > clickInterval) {
      const filteredAddresses = addresses.filter((address) => address[1] >= slider.value);
      console.table(filteredAddresses);
      copyButton.innerHTML = `<div class="flex fadein"><p>Copied To Clipboard </p>${checkmark}</div>`;
      navigator.clipboard.writeText(
         filteredAddresses.map((address) => address[0]).join("\n")
      );
      setTimeout(() => {
         copyButton.innerHTML = `<p>Copy Addresses To Clipboard</p>`;
      }, 2500);
      lastClickTime = currentTime;
   }
});

(async () => {
   const response = await fetch("/get_data");
   addresses = await response.json();
   numAddresses.textContent = addresses.filter(
      (address) => address[1] >= slider.value
   ).length;
})();
