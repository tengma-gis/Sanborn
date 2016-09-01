/**
 * Created by TMa on 8/11/2016.
 */
var wkt = require('wellknown'),
     turf = require('turf');

var child = require('child_process');

/*
 * todo: Convert x,y csv to shp using
 */
function table_xy(){
    // detect table type, convert to csv

    // build vrt and layer set source to csv file. Point longtitude to x and latitude to y.

    // export vrt data layer to shp
}


/**
 * todo: Get buffer for feature in WKT
 * 
 * 
 */
function bufferWKT(){
    
}

/**
 * todo: Convert gml string to geojson
 *
 *
 *
 */
function gmlParser(gml_string){
    var spawn = require('child_process').spawn,
        py    = spawn('python', ['GML2GEOJSON.py']),
        data = gml_string;

    console.log(html_swap_code(data));

    dataString = '';

// Once some data is returned
    py.stdout.on('data', function(data){
        dataString += data.toString();
    });

// Once stream is finished
    py.stdout.on('end', function(){
        console.log('GeoJSON output is :',dataString);
    });


// python input, data parse to string first
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();

    return dataString;
}

/*
* html encode and decode swap
* @param s html string
 */

function html_encode(s){

        if (!String.prototype.encodeHTML) {
            String.prototype.encodeHTML = function () {
                return s.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');
            };
        }
}

function html_decode(s){
        if (!String.prototype.decodeHTML) {

            String.prototype.decodeHTML = function () {
                ss=s.replace(/&apos;/g, "'")
                    .replace(/&quot;/g, '"')
                    .replace(/&gt;/g, '>')
                    .replace(/&lt;/g, '<')
                    .replace(/&amp;/g, '&');
                console.log(ss);
            };
        }
}

var data = "&quot;&lt;gml:Point xmlns:gml=&quot;http://www.opengis.net/gml&quot;&gt;&lt;gml:coordinates&gt;108420.33,753808.59&lt;/gml:coordinates&gt;&lt;/gml:Point&gt;&quot;";


console.log(html_decode(data));







//console.log('this is the parsed: ' + parsed);

// console.log(gmlParser(parsed));


