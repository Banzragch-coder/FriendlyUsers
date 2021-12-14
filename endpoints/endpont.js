var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "	{\r\n	“name”:”+++”,\r\n	“pass”:”+++”\r\n	}\r\n";

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("http://10.21.64.231:7070/login", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
