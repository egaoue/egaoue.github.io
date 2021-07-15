var url = new URL(document.location.href);
var lang = url.searchParams.get('text');

document.getElementById("pic").innerText = lang;