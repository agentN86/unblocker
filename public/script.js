function $(id) {
    return document.getElementById(id);
  }

  $('unblocker-form').onsubmit = function () {
    var url = $('url').value;
    if (url.substr(0, 4) != "http") {
      // url heuristic: if it has at least one dot and doesn't have any spaces, assume it's a url that just omitted the protocol
      if (url.includes('.') && !url.includes(' ')) {
        url = "https://" + url;
      } else

        url = "https://google.com/search?q=" + encodeURIComponent(url);
    }
    window.location = location.protocol + '//' + location.host + '/proxy/' + url;
    return false;
  };

  function checkError() {
    var search = window.location.search;
    var start = search.indexOf('error=');
    if (start > -1) {
      var stop = search.indexOf('&', start);
      if (stop == -1) { stop = undefined; }
      // +6 for "error="
      var err = search.substr(start + 6, stop);
      var $error = $('error');
      $error.innerText = $error.textContent = decodeURIComponent(err);
      $error.style.display = "block";
    }
  }

  window.onload = function () {
    $('url').focus();
    checkError();
  }