import { useContext, useState } from "react";
import { AppContext } from "../../store";
import styles from "./DownloadPDF.module.css";

const DownloadPDF = () => {
  const { state } = useContext(AppContext);
  const [pdfData, setPdfData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/create-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.selected_slides),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("API request failed");
      }

      const pdfBlob = await response.blob();
      setPdfData(pdfBlob);

      // save the PDF using FileSaver.js
      const FileSaver = require("file-saver");
      FileSaver.saveAs(pdfBlob, state.title);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* <span>
        <b>Title:</b> {state.title}
      </span>
      <span>
        <b>Page Count:</b> {state.slideSize}
      </span> */}
      <button
        className={styles.button}
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        Download as PDF
      </button>
      {/* {
        <p style={{ height: "20px" }}>
          {isLoading
            ? "Generating PDF..."
            : pdfData && "PDF generated successfully!"}
        </p>
      } */}
    </div>
  );
};

export default DownloadPDF;
