import { useState, useContext } from "react";
import { AppContext } from "../../store";

const DownloadPDF = () => {
  const { state } = useContext(AppContext);
  const [pdfData, setPdfData] = useState(null);

  const handleButtonClick = async () => {
    console.log(state);
    try {
      const response = await fetch("/api/create-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.slides),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const pdfBlob = await response.blob();
      setPdfData(pdfBlob);

      // Save the PDF using FileSaver.js
      const FileSaver = require("file-saver");
      FileSaver.saveAs(pdfBlob, state.title);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Generate PDF</button>
      {pdfData && <p>PDF generated successfully!</p>}
    </div>
  );
};

export default DownloadPDF;
