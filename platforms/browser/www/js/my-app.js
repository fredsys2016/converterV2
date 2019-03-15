// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    setRate();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

//local variables
var rateExchance;
var USD="USD";
var EURO="EURO";
var stateChange=EURO;
var stateConvert=EURO;

//
function setRate()
{
    var http =new XMLHttpRequest();
    const url='http://apilayer.net/api/live?access_key=6d3651564f4794e0aeb46979636b86ac';
    http.open("GET", url);
    http.send();
    http.onreadystatechange=(e)=>{
        var response =http.responseText;
        var responseJSON=JSON.parse(response);
        console.log(responseJSON);
        //set value by default
        rateExchance = responseJSON.quotes.USDEUR;
        document.getElementById("lblRate").innerHTML="1 Euro = USD "+ rateExchance;
        document.getElementById("txtResult").value="";
    }
}

//Switch Currency
function switchConverter()
{

    console.log("Paso algo 1");
    if(stateChange == USD)
    {
        stateChange=EURO;
        document.getElementById("lblAmount").innerHTML= EURO;
        document.getElementById("lblResult").innerHTML= USD;
        document.getElementById("txtAmount").value=0;
        document.getElementById("txtResult").value=0;
        stateConvert = EURO;
        console.log("Paso algo 2");
    }else {
        stateChange=USD;
        document.getElementById("lblAmount").innerHTML= USD;
        document.getElementById("lblResult").innerHTML= EURO;
        document.getElementById("txtAmount").value=0;
        document.getElementById("txtResult").value=0;
        stateConvert = USD;
        //console.log("Paso algo 3");
    }
}
//convert currency 
function convertCurrency()
{
    var amount=document.getElementById("txtAmount").value;
    var result;
    try{

        if(stateConvert==USD)
        {
            //convert from USD to EURO
            result =parseFloat( amount * rateExchance).toFixed(2);
            //console.log(result +"  < Amount " +amount +" rate "+ rateExchance);
        }
        else{
        //convert from Euro to USD
        result =parseFloat(amount / rateExchance).toFixed(2);
        //console.log(result);
        }
    }
    catch(err){
        alert(err);
    }
    
    document.getElementById("txtResult").value = result;
}

