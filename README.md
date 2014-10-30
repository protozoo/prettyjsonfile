prettyjsonfile
==============

Node CLI command to read a JSON file (or ALL files in current folder) and prettify it (add indentation and line breaks).

It will create a folder called 'pretty' and generate the prettyfied files inside.

##Installation

	$ npm install -g prettyjsonfile

##Usage

To parse a single file:

	#prettyjsonfile -f uglyFile.json

To parse a all files in current folder:

	#prettyjsonfile -f all