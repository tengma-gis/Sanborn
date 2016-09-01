/**
 * Created by TMa on 5/1/2016.
 * Generate a mask layer when giving a point and a radius
 */

var wkt = require('wellknown');
var fs = require('fs');

var path = require('path');

/*
* user input
*/
var x = -72.8958;
var y = 41.2556;
var distance = 1;
var units = 'miles';
var maskLayerName = 'Mask2';

/*
* application settings for file paths
*/
var templatePath = "D:/Project/Sanborn/public/mask_template.layer";
var outputPath =  "./";



/* Point and buffered feature
* @param x,y {WGS 84 degrees}, distance {double}, units {string}, maskLayerName {string}.
* @return buffered
*/
var getBuffers =function getBuffer(xx,yy,dist,units){
    var turf = require('turf');
    var Point = turf.point([xx,yy]);

   var buffered = turf.buffer(Point,dist,units);
   return buffered;

};

/*
* @param  file_input_path {string}, mask_layer_name {string}, mask_geometry {feature}
* @return result{string}
* read mask layer template and write info to [mask].layer
*/
function createMaskLayer(file_input_path,output_layer_path,mask_layer_name,mask_geometry){
    path = require('path');
       fs.readFile(file_input_path,'utf8',function(e,data){
        if(e){
            return console.log(e);
            throw e;
        };
        result = data.replace('#@NAME',mask_layer_name);
        result = result.replace('#@WKT',wkt.stringify(mask_geometry));
        writeMaskLayer(mask_layer_name,output_layer_path,result);
    });
}

// todo: rewrite the function, expose both get WKT and get Layer file
function writeMaskLayer(mask_layer_name,output_layer_path,result){
    fs.writeFile(output_layer_path+mask_layer_name+'.layer',result,function(err){
        if(err) throw err;
    });
}
/*
*  test call remove comment and run js to get a mask layer file in the same folder
*/
createMaskLayer(templatePath,outputPath,maskLayerName,getBuffers(x,y,distance,units));

// todo: export module function
/*
 * export as module
 */

exports.getBuffers = getBuffers;
exports.createMaskLayer = createMaskLayer;
