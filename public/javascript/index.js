const updateButton = document.querySelector("#update");
const timestamp = document.querySelector(".timestamp");

const slider = document.querySelector("#threshold");
const thresholdValue = document.querySelector("#threshold-value");

timestamp.textContent = `Last Update: ${new Date(+timestamp.getAttribute("data-timestamp")).toLocaleString()}`;

slider.addEventListener("input", (event) => {
   thresholdValue.textContent = event.target.value;
});

updateButton.addEventListener("click", async () => {
   console.log("starting update");
   try {
      const response = await fetch("/update", { method: "POST" });
      const data = await response.json();
      timestamp.textContent = `Last Update: ${new Date(+data).toLocaleString()}`
      console.log(data);
   } catch (e) {
      console.log(e);
   }
});
