import { parse } from 'node-html-parser'

export default function handler(req, res) {
  fetch(req.query.url)
    .then(response => response.text())
    .then(data => {
      const root = parse(data)
      const slideSize = root.querySelector('[data-cy="page-number"]').childNodes.pop().rawText
      const firstSlide = root.querySelector('#slide-image-0').getAttribute('src')

      res.status(200).json({
        status: "ok",
        slide_url: req.query.slide,
        slides: createSlideLinks(firstSlide, slideSize),
        thumbs: createThummbLinks(firstSlide, slideSize)
      })
    })
}

function createLinks(firstSlide, size) {
  let slides = [];
  let urlParts = splitTextWithRegex(firstSlide)
  for (let i = 0; i<size; i++) {
    slides.push(`${urlParts[0]}${i+1}${urlParts[1]}`)
  }
  return slides
}

function createSlideLinks(firstSlide, size) {
  firstSlide = firstSlide.replace('-320.jpg', '-2048.jpg').replace('/85/', '/75/')
  return createLinks(firstSlide, size)
}

function createThummbLinks(firstSlide, size) {
  firstSlide = firstSlide.replace('-2048.jpg', '-320.jpg').replace('/75/', '/85/')
  return createLinks(firstSlide, size)
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
