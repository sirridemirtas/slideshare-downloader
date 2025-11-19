"use client";
import { useContext } from "react";
import { AppContext } from "@/store";
import {
  AppBar,
  Preview,
  Selection,
  Slideshow,
  UrlBox,
} from "@/components/common";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <div className="container">
      <AppBar />
      <main className="main">
        {/* <h2 className="hero">
          Download as PDF or present fullscreen.
          <br />
          <p className="subtext">
            Effortlessly convert presentations to PDF. Select specific pages for
            customized downloads. Enjoy fullscreen presentations directly in
            your browser, no signup needed.
          </p>
        </h2> */}

        <UrlBox />

        {state.thumbs.length ? <Preview /> : ""}
        {state.selection_mode === true ? (
          <Selection images={state.thumbs} />
        ) : (
          ""
        )}

        {state.presentation_mode === true ? (
          <Slideshow slides={state.slides} thumbs={state.thumbs} />
        ) : (
          ""
        )}
      </main>
      <footer className="footer_wrapper">
        <div className="footer">
          <span>&copy; 2024 &#183; Sirri Demirtas</span>
          <span className={"disclaimer"}>
            SlideShare Viewer & Downloader operates in strict adherence to
            copyright laws. The platform acts solely as a technical conduit,
            retrieving and displaying content directly from the Content Delivery
            Networks (CDNs) of the original sources. SlideShare Viewer &
            Downloader does not host or store any copyrighted material on its
            servers and is not affiliated with SlideShare or any other
            content-sharing platform.
          </span>
        </div>
      </footer>
    </div>
  );
}
