const updateButton = document.querySelector("#update");

updateButton.addEventListener("click", async () => {
   console.log("starting update");
   try {
      const response = await fetch("/update", { method: "POST" });
      const data = await response.json();
      console.log(data);
   } catch (e) {
      console.log(e);
   }
});
