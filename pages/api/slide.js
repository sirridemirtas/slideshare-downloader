import { parse } from "node-html-parser";
import isSlideShareUrl from "../../helpers/validation";
import { getThumbnailLinks, getSlideLinks } from "../../helpers/slideLinks";

export default function handler(req, res) {
  if (!isSlideShareUrl(req.query.url)) {
    res.status(400).json({
      status: "error",
      message: "Invalid SlideShare URL",
    });
    return false;
  }

  fetch(req.query.url)
    .then((response) => response.text())
    .then((data) => {
      const root = parse(data);
      const slideSize = root
        .querySelector('[data-cy="page-number"]')
        .childNodes.pop().rawText;
      const firstSlide = root
        .querySelector("#slide-image-0")
        .getAttribute("src");
      const slideTitle = root.querySelector("h1.title").childNodes[0].rawText;
      const originalUrl = root
        .querySelector('link[rel="canonical"]')
        .getAttribute("href");

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
