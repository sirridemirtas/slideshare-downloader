"use client";
import { useContext } from "react";
import { AppContext } from "../store";
import { Preview, UrlBox, Selection } from "../components";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <div className="container">
      <nav className="nav_wrapper">
        <div className="nav">
          <span className="title">SlideShare Downloader</span>
        </div>
      </nav>
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
