"use client";
import { useContext } from "react";
import { AppContext } from "../store";
import { UrlBox, Thumbnails } from "../components";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <main className="main">
      <h1 className="title">SlideShare Downloader</h1>
      <UrlBox />
      {state.thumbs && <Thumbnails images={state.thumbs} />}
    </main>
  );
}
