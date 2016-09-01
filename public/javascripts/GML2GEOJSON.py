## GML2GEOJSON.py
import sys,json,HTMLParser
from osgeo import ogr

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines();
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0]);

def main():

    parser = HTMLParser.HTMLParser();
    
    #get our data as an gml string from read_in()
    gml = """<gml:Point xmlns:gml="http://www.opengis.net/gml"><gml:coordinates>108420.33,753808.59</gml:coordinates></gml:Point>"""
    
    #unescape our input data string
    gml_unescape = parser.unescape(gml);
    
    #create features
    targets = ogr.CreateGeometryFromGML(gml_unescape);

    #export features to GeoJSON
    Feature_GeoJSON = targets.ExportToJson();

    #return the sum to the output stream
    print Feature_GeoJSON;
	
	

#start process
if __name__ == '__main__':
    main()
