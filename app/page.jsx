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
            SlideShare Downloader operates under strict adherence to copyright
            laws. The platform functions as a conduit, retrieving content
            directly from the Content Delivery Networks (CDNs) of the original
            sources. It is important to note that SlideShare Downloader does not
            host or store any copyrighted material on its servers. Furthermore,
            the platform maintains no affiliation with SlideShare or any other
            content-sharing platforms.
          </span>
        </div>
      </footer>
    </div>
  );
}
