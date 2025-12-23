document.addEventListener("DOMContentLoaded", () => {
  const predictBtn = document.getElementById("predictBtn");
  const fileInput = document.getElementById("imageInput");
  const resultElement = document.getElementById("result");

  predictBtn.addEventListener("click", async () => {
    resultElement.innerHTML = "Processing image... 🌱"; // show processing message

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Please select an image!");
      resultElement.innerHTML = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData
      });

      const text = await response.text(); // get raw text
      console.log("Backend response:", text);

      if (!response.ok) {
        resultElement.innerHTML = "⚠️ Server error: " + response.statusText;
        return;
      }

      const result = JSON.parse(text); // parse JSON manually
      console.log("Parsed result:", result);

      if (result.error) {
        resultElement.innerHTML = "⚠️ " + result.error;
        return;
      }

      const confidencePercent = (result.confidence * 100).toFixed(2);
      resultElement.innerHTML = `<strong>Prediction:</strong> ${result.class_name} <br>
                                 <strong>Confidence:</strong> ${confidencePercent}%`;

      // PDF button
      const downloadBtn = document.createElement("button");
      downloadBtn.textContent = "Download Report (PDF)";
      downloadBtn.style.marginTop = "10px";
      resultElement.appendChild(downloadBtn);

      downloadBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("🌱 Plant Disease Detection Report", 20, 20);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Prediction: ${result.class_name}`, 20, 40);
        doc.text(`Confidence: ${confidencePercent}%`, 20, 50);
        doc.text(`Date: ${new Date().toLocaleString()}`, 20, 60);
        doc.save("plant_disease_report.pdf");
      });

    } catch (error) {
      console.error("Fetch error:", error);
      resultElement.innerHTML = "⚠️ Error predicting disease. See console for details.";
    }
  });
});
