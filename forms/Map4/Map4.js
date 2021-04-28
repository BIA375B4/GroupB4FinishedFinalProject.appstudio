/*   TO USE THIS PROJECT 
This project uses a Google Places API to get rental apartments by CU. 
It then takes these results and uses them in a Google Maps API to make a map with clickable markers. 

1. Make sure your Google Project that the API key is for is attached to the Google Maps and Google Places API's (in Google Console > Libraries). 
2. Make sure your Google Project is attached to a billing account (you'll have to give them your credit card - you won't get charges, cancel after class is over)
3. Add your own Google API key to the Project Property 'extra headers' as indicated.
4. Add the same googleAPI key to the api call in 'requestURLApt' below as indicated
*/

let requestURLApt = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=Walmart or Target  by Creighton University&key=AIzaSyCI-h9x3djD2HQQyAbR-pV5VNV2GNzAr6w&location=41.265331,-95.949364&radius=5000"
var apartments = []
var infoApartments = []
let apiData2 = ''
let message2 = ""

function onXHRLoad2() {
  message2 = ""

  // 'this' is another name for the object returned from the API call
  let apiData2 = JSON.parse(this.responseText)
  // good data coming back from API call

  for (i = 0; i < apiData2.results.length; i++) 
    apartments[i] = {
      "description": apiData2.results[i].name,
      "lat": apiData2.results[i].geometry.location.lat,
      "lng": apiData2.results[i].geometry.location.lng,
      "address": apiData2.results[i].formatted_address
  }
}

function callAPI2(URL) {
  var xhttp = new XMLHttpRequest()

  // if you need cors (you'll get a cors error if you don't have it and you need it)
  // use this code to add the cors code to your url 
  xhttp.open('GET', 'https://cors.bridged.cc/' + requestURLApt)

  // if you DON'T need cors use this code:
  //xhttp.open('GET',URL)

  // Headers
  // if you need to set the returned data type, use this line of code: 
  //xhttp.setRequestHeader('Content-Type', 'application/json')

  // if you need authorization token (stored in myToken) use this line of code: 
  // xhttp.setRequestHeader('Authorization', 'Bearer ' + myToken)

  // if you need a key and it's not in the url use code in one of the following
  // examples (think of headers as parameters)
  // or just use the Postman url which has all the parameters already added like I did here. 

  // make the API request
  xhttp.addEventListener('load', onXHRLoad2)
  xhttp.send()
}

// put down markers
window.onload = function() {
  callAPI2(requestURLApt)
}

btnCL4.onclick = function() {
// description is what will show in Info window
  for (i = 0; i < apartments.length; i++) {
        infoApartments[i] = {
          "description": apartments[i].description + "<br> " + apartments[i].address,
          "lat": apartments[i].lat,
          "lng": apartments[i].lng
        }
  }
  LoadMap()
}

// make the map with markers
function LoadMap() {

  var mapOptions = {
    center: new google.maps.LatLng(infoApartments[0].lat, infoApartments[0].lng),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions)

  //Create and open InfoWindow.
  var infoWindow = new google.maps.InfoWindow()
  var myLatlng
  for ( i = 0; i < infoApartments.length; i++) {
    data = infoApartments[i]
    myLatLng = new google.maps.LatLng(data.lat, data.lng)
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: data.description
    });    // leave semi-colon here
    //Attach click event to the marker.
    
    /*  when function inside (), means it is self-starting function - just runs without being called. 
    () after closing }) shows functions' parameters (if any) */
    (function(marker, data) {
        google.maps.event.addListener(marker, "click", function(e) {
              //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
              infoWindow.setContent("<div style = 'width:150px;min-height:35px'>" + data.description + "</div>")
              infoWindow.open(map, marker)
          })   
    }
    )(marker, data)  
    
  }  // for looop
}




imgHomeButtonCopy.onclick=function(){
  ChangeForm(welcomePage)
}
