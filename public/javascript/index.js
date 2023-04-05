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

downloadButton.addEventListener("click", async () => {
   try {
      const response = await fetch("/download", {
         method: "POST",
         body: JSON.stringify({ threshold: slider.value })
      });
      const data = await response.json();
      console.log(data);
   } catch (e) {
      console.log(e);
   }
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
