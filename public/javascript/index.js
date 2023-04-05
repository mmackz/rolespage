const downloadButton = document.querySelector("#download");
const updateButton = document.querySelector("#update");
const timestamp = document.querySelector(".timestamp");

const slider = document.querySelector("#threshold");
const thresholdValue = document.querySelector("#threshold-value");

timestamp.textContent = `Last Update: ${new Date(
   +timestamp.getAttribute("data-timestamp")
).toLocaleString()}`;

slider.addEventListener("input", (event) => {
   thresholdValue.textContent = event.target.value;
});

downloadButton.addEventListener("click", () => {
   window.location.href = `/download?threshold=${slider.value}`;
});

updateButton.addEventListener("click", async () => {
   console.log("starting update");
   try {
      const response = await fetch("/update", { method: "POST" });
      const data = await response.json();

      if (response.status === 200) {
         timestamp.textContent = `Last Update: ${new Date(+data).toLocaleString()}`;
         console.log(response.status);
      } else if (response.status === 429) console.log("Too many requests");
   } catch (e) {
      console.log(e);
   }
});
