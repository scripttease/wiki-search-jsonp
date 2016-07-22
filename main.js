// Assign function to user input box
document.querySelector("#inputBox").onchange = getAPIData;

// Create jsonp script
function getAPIData(event) {
  var searchTerms = event.target.value;
  var url = createSearchURL(searchTerms);
  jsonp = document.createElement("script");
  jsonp.id = "jsonp";
  jsonp.type = "text/javascript";
  jsonp.src = createSearchURL(searchTerms); 
  document.body.appendChild(jsonp);
};

// Handle json response
function displayResponse(response) {
  if (typeof response.query === "undefined") {
    document.querySelector(".responses").innerHTML = "Your search terms do not match any Wikipedia articles";
    document.querySelector("input").reset;
    document.querySelector("input").value = " ";
  } else {
    var pagesObj = response.query.pages;
    console.log(pagesObj);
    Object.getOwnPropertyNames(response.query.pages).forEach(function(val, idx, obj) {
      console.log(val + " " + pagesObj[val].title);
      console.log(idx);
      // Dynamically create elements for JSONP responses
      var div = document.createElement("div");
      div.className = "response";
      div.id = "response" + idx;
      var p = document.createElement("p");
      p.className = "title";
      p.id = "title" + idx;
      var p1 = document.createElement("p");
      p1.className = "extract";
      p1.id = "extract" + idx;
      var a = document.createElement("a");
      a.className = "link";
      a.id = "link" + idx;
      a.target = "_blank";
      document.querySelector(".responses").appendChild(div);
      document.querySelector("#response" + idx).appendChild(a);
      document.querySelector("#link" + idx).appendChild(p);
      document.querySelector("#response" + idx).appendChild(p1);
      // Add border to responses
      document.querySelector("#response" + idx).style["border-style"] = "solid";
      // Add JSONP response to dynamically created elements
      document.getElementById("title" + idx).innerHTML = pagesObj[val].title;
      document.getElementById("extract" + idx).innerHTML = pagesObj[val].extract;
      // Add link to wikipedia page for each response
      document.getElementById("link" + idx).setAttribute("href", "https://en.wikipedia.org/?curid=" + pagesObj[val].pageid);
    });
    document.querySelector("input").reset;
    document.querySelector("input").value = " ";
  };
};

function createSearchURL(searchTerms) {
  var searchTermsString = searchTerms.replace(/\s/g, "%20");
  var baseURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&exsentences=3&exlimit=10&explaintext&generator=search&gsrsearch=";
  var searchURL;
  var callbackURL = "&callback=displayResponse";
  return searchURL = baseURL + searchTermsString + callbackURL;
};
// There is a javascript function (not even a library!) that already exists that will parse search terms into URL friendly format so if your user puts in a comma, or an = etc etc this will still work - need to look this up.
