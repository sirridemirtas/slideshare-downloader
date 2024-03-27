const isSlideShareUrl = (url) => {
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

export default isSlideShareUrl;
