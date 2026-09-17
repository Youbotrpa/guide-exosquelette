export default {
  fetch(request) {
    const url = new URL(request.url);
    return Response.redirect("https://guide-exosquelette.info" + url.pathname + url.search, 301);
  }
};
