var express = require('express');
var app = express();
var port = 5000;
var Routers = express.Router();
var Mask = require('./public/javascripts/Mask.js');
var assert = require('assert');

/* Mongdodb for client side input

var mongodb = require('mongodb');
var mongoo = mongodb.MongoClient;

 var url = 'mongodb://localhost:27017/test';
mongoo.connect(url, function(err, db) {
 assert.equal(null, err);
 console.log("Connected correctly to server.");
 db.close();
 });
 */


////
app.use(express.static('public'));

/* Sanborn Image thumbnail call
* Route original ReportMap_WS to MapServer to get method returning same result.
* @ param fMinX {}, fMinY {}, fMaxX {}, fMaxY {}, iPageWidth {}, iPageHeight {}, sWhere {}
* @ return URL to MapServer WMS
*
* http://localhost:5000/ReportMap_WS2/ReportMap_WS.asmx/MapByExtentSanborn?fMinX=-75.02&fMinY=39.94&fMaxX=-75.00&fMaxY=39.96&iPageWidth=400&iPageHeight=400&sWhere=
*/



app.get('/ReportMap_WS2/ReportMap_WS.asmx/MapByExtentSanborn',function(req,res){
  var wms = getSanbornByExtend(req.query.fMinX,req.query.fMaxX,req.query.fMinY,req.query.fMaxY,req.query.iPageWidth,req.query.iPageHeight,req.query.sWhere);
  console.log (wms);
  return res.redirect(wms);
} );

app.get('/Mask/RadiusMask',function(req,res){
    var Radius_geometry = Mask.getBuffers(Number(req.query.x),Number(req.query.y),req.query.dist,req.query.units);
    return console.log(Radius_geometry.geometry.coordinates);
}
);


app.put('/Mask/RadiusMask',function(req,res){
    var Radius_geometry = Mask.getBuffers(Number(req.query.x),Number(req.query.y),req.query.dist,req.query.units);
    try {
        console.log('start creating');
        Mask.createMaskLayer(req.query.templatepath.split(' ')[1].toString(), req.query.outputpath.toString(),req.query.masklayername,Radius_geometry);
        res.send('Mask layer created.');
    }catch(e){
        res.send(e);
    }
}
);


app.listen(5000,function(err){
  console.log('running server on port:' + port);
});

//  app configure
var endpoint =  "http://gisappsdevawvc2:8080/cgi-bin/mapserv.exe?map=/ms4w/apps/SanbornImage/SanbornImage.map&";
var layer ="footprint";

function getSanbornByExtend (x1,x2,y1,y2,width,height,filter) {
  var url = endpoint + 'REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&FORMAT=png&TRANSPARENT=True&SRS=EPSG:4326&';
  url += "&LAYERS=" + layer;
  url += "&BBOX=" + x1 + "," + y1 + "," + x2 + "," + y2;
  url += "&width=" + width;
  url += "&height=" + height;
  url += "&filter=" + filter;

  return url;
}