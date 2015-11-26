var recursive = require('recursive-readdir');
var fs        = require('fs');
/*var search    = process.argv[2];
var replace   = process.argv[3];*/
var search = '<script type="text/javascript" src="static/js/firebase.js"></script>';
var replace = '<script type="text/javascript" src="static/js/firebase.js"></script>\n<script type="text/javascript" src="static/js/app.js"></script>';
console.log(process.argv);

recursive('./', ['.git', '*.js', '*.css', '*.jpg', '*.png', '*.gif', '*.log'], function(err, files) {
  if(err) {
    console.error(err);
    return;
  }
  files.forEach(function(f) {
    fs.readFile(f, 'utf-8', function(err, data) {
      if(err) {
        console.error(err);
        return;
      }
      if(-1==data.indexOf(search)) return;
      var temp = data.replace(new RegExp(search, 'g'), replace);
      fs.writeFile(f, temp);
    });
  });
});
