// To be used in StealJS

//Directory traversal code taken form: http://www.mailsend-online.com/blog/directory-traversal-in-rhino-javascript.html.

/* Call from the "framework" directory like so:

	./js steal/clean/directory.js path/to/clean
*/

importPackage(java.io);

load("steal/rhino/steal.js");
steal.plugins('steal/clean', function () {

	var jsFiles = [],
		unwriteables = [];

	function addJS(file) {

		var path = file.getCanonicalPath();

		if (path.match(/\.js$/)){
			if (file.canWrite()) {
				jsFiles.push(path);
			} else {
				unwriteables.push(path)
			}
		}
	}

	function getJSFiles(dir, dirHandler) {
		var lst = new File(dir).listFiles(), i;
		for(i=0;i<lst.length;i++) {

			if(lst[i].isDirectory()) {
				getJSFiles(lst[i].getCanonicalPath(), dirHandler || null);
			}

			dirHandler(lst[i]);
		}
	}

	getJSFiles(_args[0] || './', addJS);
	
	_args.shift();

	for (var i = 0; i < jsFiles.length; i++){
		steal.clean(jsFiles[i], _args)
	}
	
	print('\n\n\n\nStatus: ');
	print('Files cleaned: ' + jsFiles.length);
	
	for (var i = 0; i < unwriteables.length; i++){
		print('SKIPPED, NOT WRITEABLE: ' + unwriteables[i]);
	}
	
	if (unwriteables.length) {
		print('\nFiles skipped: ' + unwriteables.length);
	}
});