    var map = L.map('map').setView([28.3949, 84.1240], 8);



    /*==============================================
                TILE LAYER and WMS
    ================================================*/
    //osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);
    // map.addLayer(osm)



// __________________________________Taking user input and showing response in XML dialog box_______________________________


var serviceType = 'WMS';

if (serviceType=="WMS") {

    let wms = 'http://localhost:8080/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities';
    sendGetCapabilityReq(wms);
  
}

if (serviceType=="WFS") {

    let wfs = 'http://localhost:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetCapabilities';
    sendGetCapabilityReq(wfs);

}


if (serviceType=="WCS") {

    let wcs = 'http://www.example.com/wcs?service=wcs&AcceptVersions=1.1.0&request=GetCapabilities';
    sendGetCapabilityReq(wcs);

}




var response_xml;

function sendGetCapabilityReq(request) {
    // body...
    var xhr = new XMLHttpRequest();
    xhr.open('get', request);
    xhr.send();

    xhr.onload = function() {
        response_xml=xhr.response;  //xml response stored in file
       // console.log(response_xml);

reqtype_layer_parsing();
    }



    // return a;

}





// __________________________________WMS XML parsing ______________________________

function reqtype_layer_parsing(response)
{


  var responseParser=new DOMParser();
  var xmlDoc=responseParser.parseFromString(response,"application/xml");
  if(reqType != 'WFS'){    
    var noOfRequests=xmlDoc.getElementsByTagName("Request")[0].childElementCount;
    console.log(noOfRequests);
    for(var i=0;i<noOfRequests;i++){
      var temp=document.getElementById("request");
      var newOption=document.createElement("option");
      if(xmlDoc.getElementsByTagName("Request")[0].childNodes[i].tagName!=undefined){
        newOption.text=xmlDoc.getElementsByTagName("Request")[0].childNodes[i].tagName;
        newOption.value=xmlDoc.getElementsByTagName("Request")[0].childNodes[i].tagName;
        var select=document.getElementById(selected_req);

        select.appendChild(newOption);

      }
    }

 var noOfLayers=xmlDoc.getElementsByTagName("Layer").length;
    console.log(noOfLayers)
    var layers=xmlDoc.getElementsByTagName("Layer");
    for(var i=3;i<noOfLayers;i++){
      var newOption=document.createElement("option");
      if(layers[i].tagName!=undefined){
        newOption.text=layers[i].getElementsByTagName("Title")[0].innerHTML;
        newOption.value=layers[i].getElementsByTagName("Name")[0].innerHTML;
        var select=document.getElementById(selected_layer);
        select.appendChild(newOption);

      }
    }


}


// __________________________________WFS XML parsing ______________________________


// __________________________________WCS XML parsing _______________________________




//___________________________________Sending request and Displaying Data WMS_______________

// var map = L.map('map').setView([55.67, 12.60], 11);

// var mywms = L.tileLayer.wms("http://wfs-kbhkort.kk.dk/k101/wms", {
//     layers: 'k101:theme-startkort',
//     format: 'image/png',
//     transparent: true,
//     version: '1.1.0',
//     attribution: "myattribution"
// });
// mywms.addTo(map);

//___________________________________Sending request and Displaying Data WFS_______________

//___________________________________Sending request and Displaying Data WCS_______________