/**
 * Created by TMa on 5/22/2016.
 */

var fs = require('fs');
var replace = require("replace");

// Template file for layer and mapfile
var my_layer_template = "../layer_template.layer";
var my_map_file_template = "../map_template.map";


//customer input
var my_file_input_path="./Mapfile_input.json";



var mapfile;
var result ='';
 
fs.readFile(my_file_input_path,'utf8',function (err, data){
    if (err) throw err;
    mapfile = JSON.parse(data);
    mapsettings = mapfile.mapSetting;
    mapWebsetting = mapfile.mapWebsetting;

    // test create layer files
    createLayerFiles(my_file_input_path,my_layer_template);

    console.log("layers created");

    //test create map file
    createMapFile(my_file_input_path,my_map_file_template);
});

// read the json file now for input
function createLayerFiles(file_input_path,layer_template) {
    fs.readFile(file_input_path, 'utf8', function (err, data) {
        if (err) throw err;
        mapfile = JSON.parse(data);
        //console.log(mapfile.layers[0].layer);

        var theLayers = mapfile.layers;

        for (layerID in theLayers) {
            myLayer = theLayers[layerID].layer;
            name = JSON.stringify(myLayer.layerName).replace(/['"]/g, '');
            try {
                writeLayerFile(myLayer, name,layer_template );
            }
            catch (err) {
                throw "Can not create the Layer files because " + err;
            }
        }
    });
};

function writeLayerFile(layerobject,layername,layer_template) {
  if(isObject(layerobject)){
      fs.readFile(layer_template,'utf8',function(err,data) {
              if (err) throw err;
              result = JSON.stringify(data);
              changedLayer = ChangeText(layerobject);
              try {
                  fs.writeFile('../' + layername + '.layer', JSON.parse(result), function (err) {
                      if (err) throw err;
                  })
              }catch(err){
                  throw err;
              }
          }
      );
  }
}


function createMapFile(file_input_path,map_file_template){
    //Todo: read mapfile template
    try {
        fs.readFile(map_file_template, 'utf8', function (err, data) {
            if (err) throw err;
            mapfiletemplate = JSON.stringify(data).replace(/['"]/g, '');

           console.log(mapfiletemplate);
        });
    }catch(err){
        throw console.log(err);
    };


    //Todo: replace mapsetting and mapWebsetting

    console.log("1");
    //console.log(mapfile.mapWebsetting);



   //todo: mapfile validation
}


function maskMapFile(mapfile_path,masklayer_path){
   //todo: change the mapfile to include the masklayer 
    
}

function addDataLayer(mapfile_path,dataLayer_path){
    //todo: add include data layer path to mapfile
}

function removeDataLayer(mapfile_path,dataLayer_path){
    //todo: remove include data layer line in mapfile
}

function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function ChangeText(obj) {
        for (var k in obj) {
        // console.log(parameter + ':'+layerobject[parameter]);

        // Text change logic is to replace a string with an initial "#@" and change the substring with the obj value.
        var str = "#@" + k;

        // if the obj contains another obj, iterating through
        if (typeof obj[k] == "object" && obj[k] !== null)
            ChangeText(obj[k]);
        else
            result = result.replace(str, obj[k]);
            try {
                result = result.replace("#" + k, k);
            }
            catch(err){
                throw "try to remove commented item "+k +" with error"
            }
    };
}