"use client";
import { useContext } from "react";
import { AppContext } from "./store";

import ActionBar from "./components/ActionBar/ActionBar";
import Thumbnails from "./components/Thumbnails/Thumbnails";
import UrlBox from "./components/UrlBox/UrlBox";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <main className="main">
      <h1 class="title">SlideShare Downloader</h1>
      <UrlBox />
      {/* {data && <h1>{data.title}</h1>}
      <ActionBar data={data} /> */}
      {state.thumbs && <Thumbnails images={state.thumbs} />}
    </main>
  );
}
