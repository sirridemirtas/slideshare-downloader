import { parse } from "node-html-parser";

import { isSlideShareUrl } from "@/utils/url";
import { getThumbnailLinks, getSlideLinks } from "@/utils/slide-links";

export default function handler(req, res) {
  const sendError = (message) => {
    res.status(400).json({
      error: message,
    });
  };

  if (!isSlideShareUrl(req.query.url)) {
    sendError("Invalid SlideShare URL");
    return false;
  }

  fetch(req.query.url)
    .then((response) => {
      if (!response.ok) {
        sendError("Failed to fetch SlideShare presentation");
      }
      return response.text();
    })
    .then((data) => {
      const root = parse(data);
      const slideSize = root
        .querySelector('[id="slide-preview-0"] span span')
        .rawText.replace(/\s*\/\s*/g, "")
        .trim();
      const firstSlide = root
        .querySelector("#slide-image-0")
        .getAttribute("src");
      const slideTitle = root.querySelector("h1.title").childNodes[0].rawText;
      const originalUrl = root
        .querySelector('link[rel="canonical"]')
        .getAttribute("href");

      /* console.log("SlideShare presentation fetched:", slideTitle);
      console.log("Original URL:", originalUrl);
      console.log("Slide size:", slideSize);
      console.log("First slide image:", firstSlide); */

      res.status(200).json({
        status: "ok",
        title: slideTitle,
        url: originalUrl,
        size: slideSize,
        thumbs: getThumbnailLinks(firstSlide, slideSize),
        slides: getSlideLinks(firstSlide, slideSize),
      });
    });
}
