"use client";
import { useContext } from "react";
import { AppContext } from "../store";
import { DownloadPDF, UrlBox, Thumbnails } from "../components";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <main className="main">
      <h1 className="title">SlideShare Downloader</h1>
      <UrlBox />
      {state.slides.length != 0 && <DownloadPDF />}
      {state.thumbs && <Thumbnails images={state.thumbs} />}
    </main>
  );
}
