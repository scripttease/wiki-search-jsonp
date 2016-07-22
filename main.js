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
  var pagesObj = response.query.pages;
  console.log(pagesObj);
  Object.getOwnPropertyNames(pagesObj).forEach(function(val, idx, obj) {
    console.log(val + " " + pagesObj[val].title);
    console.log(idx);
    document.getElementById("response"+ idx).innerHTML = "Page ID: " + val + " Page Title: " + pagesObj[val].title + " Page Extract: " + pagesObj[val].extract;
  });
};
// };


function createSearchURL(searchTerms) {
  var searchTermsString = searchTerms.replace(/\s/g, "%20");
  var baseURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&exsentences=1&exlimit=10&explaintext&generator=search&gsrsearch=";
  var searchURL;
  var callbackURL = "&callback=displayResponse";
  return searchURL = baseURL + searchTermsString + callbackURL;
};
// There is a javascript function (not even a library!) that already exists that will parse search terms into URL friendly format so if your user puts in a comma, or an = etc etc this will still work - need to look this up.

// var responsesAll = responses.query.pages
// forEach(responsesAll, function(n, x) {
//   title: v.title,
//   extract: v.extract,
// });
