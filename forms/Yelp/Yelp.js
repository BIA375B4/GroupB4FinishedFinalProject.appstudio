let myToken = 'AUtEe-t6YW4wWTIu5HueBA49KF3rdHceN7-19sWdPRZUrpmk7XGRzRbPjHYdS6cOzItchcSt1Q5vtOpm-8p_YyogQDvnLqN2tTL4HbhuUrHvC-0Gi4s8LvZJG3lrYHYx'
let categories = ['American (Traditional)', 'Chicken Shop', 'American (New)', 'Gastropubs', 'Mexican', 'Bars', 'Seafood', 'Coffee Roasteries', 'Ramen', 'Himalayan/Nepalese', 'Breakfast & Brunch', 'Italian', 'Burgers']
let apiData = ''
let message = ""

// 1. *** use your own url copied from Postman ****
let requestURL = "https://api.yelp.com/v3/businesses/search?term=restaurants&radius=8000&latitude=41.265331&longitude=-95.949364"

function onXHRLoad() {
    message = ""
   
    // 'this' is another name for the object returned from the API call
    apiData = JSON.parse(this.responseText)
    console.log(apiData)
    /*
    for (i = 0; i <= apiData.businesses.length-1; i++) {
        console.log(`${apiData.businesses[i].name}`)
        message = message + apiData.businesses[i].name + "\n"
    }
    */
    // 2. *** put your textarea control name here ****
    // txtaRestaurants.value = message
   
    // if want to add to database call a function here that does that
    // addToDatabase()
}

function callAPI(URL) {
    var xhttp = new XMLHttpRequest();
   
    // if you need cors (you'll get a cors error if you don't have it and you need it)
    // use this code to add the cors code to your url
    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL)
   
    // if you DON'T need cors use this code:
    //xhttp.open('GET',URL)
   
    /* Headers */
    // if you need to set the returned data type, use this line of code:
    //xhttp.setRequestHeader('Content-Type', 'application/json')
   
    // if you need authorization token (stored in myToken) use this line of code:
    xhttp.setRequestHeader('Authorization', 'Bearer ' + myToken)
   
    // if you need a key and it's not in the url use code in one of the following
    // examples (think of headers as parameters)
    // or just use the Postman url which has all the parameters already added like I did here.
   
   
    // Here are headers you might need:
    /*
    xhttp.setRequestHeader('key','AIzaSyCE-pjULPU_Gp5Qf0qL39tVsdJBX55J0cY')
    xhttp.setRequestHeader('location','41.276900,-95.942310')
    xhttp.setRequestHeader('rankby','distance')
    xhttp.setRequestHeader('type','restaurant')
    */

    // make the API request
    xhttp.addEventListener('load', onXHRLoad)
    xhttp.send()
}
/*
// 3. *** add a new button onclick event and put the callAPI code into it ***
btnSeeThai.onclick=function(){
    // call the code that will make the API call, then process what comes back
    callAPI(requestURL)
}
*/
Yelp.onshow=function(s){
    txtaRestaurants_contents.style.height = "400px"
    drpCategorySearch.clear()  
    callAPI(requestURL)
    categories = categories.sort()
    for (i = 0; i < categories.length; i++)
        drpCategorySearch.addItem(categories[i])
    }

drpCategorySearch.onclick=function(s){
    if (typeof(s) == "object")
        return
    else {
        drpCategorySearch.value = s
        let searchItem = drpCategorySearch.selection
        message =
        txtaRestaurants.value = message
        for (i = 0; i < apiData.businesses.length; i++){
            if (apiData.businesses[i].categories[0].title == searchItem) {
                message = message + apiData.businesses[i].name + ', Rating: ' + apiData.businesses[i].rating + ', ' + apiData.businesses[i].location.address1 + ', ' + apiData.businesses[i].location.city + ', ' + apiData.businesses[i].location.zip_code + ', ' + apiData.businesses[i].display_phone + "\n" + "\n"
                txtaRestaurants.value = message
                }
            }
        }
}

imgHome.onclick=function(){
  ChangeForm(welcomePage)
}
