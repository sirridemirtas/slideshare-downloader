import { parse } from "node-html-parser";

export default function handler(req, res) {
  if (!validateSlideShareUrl(req.query.url)) {
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
        thumbs: createThumbnailLinks(firstSlide, slideSize),
        slides: createSlideLinks(firstSlide, slideSize),
      });
    });
}

function createLinks(firstSlide, size) {
  let slides = [];
  let urlParts = splitTextWithRegex(firstSlide);
  for (let i = 0; i < size; i++) {
    slides.push(`${urlParts[0]}${i + 1}${urlParts[1]}`);
  }
  return slides;
}

function createSlideLinks(firstSlide, size) {
  firstSlide = firstSlide
    .replace("-320.jpg", "-2048.jpg")
    .replace("/85/", "/75/");
  return createLinks(firstSlide, size);
}

function createThumbnailLinks(firstSlide, size) {
  firstSlide = firstSlide
    .replace("-2048.jpg", "-320.jpg")
    .replace("/75/", "/85/");
  return createLinks(firstSlide, size);
}

function splitTextWithRegex(text) {
  const match = /(?<=-)(\d+)(?=-\d+.jpg)/g.exec(text);
  if (match) {
    const index = match.index + match[0].length;
    return [text.slice(0, index).slice(0, -1), text.slice(index)];
  } else {
    return [text];
  }
}

function validateSlideShareUrl(url) {
  // Regular expression to match valid URLs with optional protocol and slideshare.net domain
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?slideshare\.net\/.*$/i;

  // Check if the URL matches the regular expression
  if (!urlRegex.test(url)) {
    return false; // Invalid URL
  }

  // If the URL doesn't have a protocol, add "https://"
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  return url; // Return the validated URL with protocol if necessary
}
