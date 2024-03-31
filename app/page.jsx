"use client";
import { useContext } from "react";
import { AppContext } from "./store";

import DownloadPDF from "./components/DownloadPDF/DownloadPDF";
import UrlBox from "./components/UrlBox/UrlBox";
import Thumbnails from "./components/Thumbnails/Thumbnails";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <main className="main">
      <h1 class="title">SlideShare Downloader</h1>
      <UrlBox />
      {state.slides.length != 0 && <DownloadPDF />}
      {state.thumbs && <Thumbnails images={state.thumbs} />}
    </main>
  );
}
