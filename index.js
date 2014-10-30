#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var program = require('commander');

program
  .version('1.0.0')
  .option('-f, --file <path>', 'JSON file path')
  .parse(process.argv);

var files;
var currentFileIndex = 0;
var outputFolder = "pretty";

if( !program.file )
{
	console.log( "JSON file path and Output directory required. -h for help");
}else{
	if( program.file == "all" )
	{
		var allFiles = fs.readdirSync("./");
		files = [];
		for (var i = 0; i < allFiles.length; i++) {
			var rawFile = allFiles[i];
			if( path.extname(rawFile) === ".json" ){
				files.push( rawFile );
			}
		};
		if( files.length == 0){
			console.log( "No JSON files in current directory");
			return;
		}else{
			console.log( "Will process all JSON files in current directory...");
		}
	}else{
		files = [program.file];
	}
	// Check output folder exists
	if ( !fs.existsSync(outputFolder)) {
		console.log( "Output directory '" + outputFolder + "' does not exist. It will be created.")
		fs.mkdirSync( outputFolder );
	    // Do something
	}
	readFile();
}

function readFile( )
{
	var fileName = files[currentFileIndex];
	console.log( fileName + ' (' + (currentFileIndex+1) + ' of ' + files.length + ')');
	fs.readFile( fileName, 'utf8', function(err, data) {
		if (err){
			console.log( "ERROR reading: ", err );
			return;
		}
		var jsonObj = JSON.parse(data);
		var prettyJson = JSON.stringify( jsonObj, null, 4 );
		fs.writeFile("./"+outputFolder+"/"+fileName, prettyJson, function(err) {
		    if(err) {
		        console.log("ERROR writing: ", err);
		        console.log( "Are you sure the provided Output directory ('" + outputFolder + "') exists?")
		    } else {
		        currentFileIndex++;
		        if( currentFileIndex < files.length )
		        {
		        	readFile();
		        }
		    }
		}); 

	});
}