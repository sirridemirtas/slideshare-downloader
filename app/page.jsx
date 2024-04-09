"use client";
import { useContext } from "react";
import { AppContext } from "../store";
import { AppBar, Preview, UrlBox, Selection } from "../components";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <div className="container">
      <AppBar />
      <main className="main">
        <UrlBox />
        {state.thumbs.length ? <Preview /> : ""}
        {state.selection_mode === true ? (
          <Selection images={state.thumbs} />
        ) : (
          ""
        )}
      </main>
      <footer className="footer_wrapper">
        <div className="footer">
          <span>SlideShare Downloader</span>
        </div>
      </footer>
    </div>
  );
}
