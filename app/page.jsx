"use client";
import React, { useState, useEffect, use } from "react";
import ActionBar from "./components/ActionBar/ActionBar";
import Thumbnails from "./components/Thumbnails/Thumbnails";
import UrlBox from "./components/UrlBox/UrlBox";

const url =
  "http://localhost:3000/api/slide?url=https%3A%2F%2Fwww.slideshare.net%2FSkeletonTech%2Fskeleton-culture-code";

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <main className="main">
      <h1 class="title">SlideShare Downloader</h1>
      <UrlBox />
      {/* {data && <h1>{data.title}</h1>}
      <ActionBar data={data} /> */}
      {data && <Thumbnails images={data.thumbs} />}
    </main>
  );
}
