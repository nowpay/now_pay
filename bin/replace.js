var recursive = require('recursive-readdir');
var fs        = require('fs');
/*var search    = process.argv[2];
var replace   = process.argv[3];*/
var search = '18933340759';
var replace = '18933340759';
console.log(process.argv);

recursive('./', ['.git', '*.css', '*.jpg', '*.png', '*.gif', '*.log'], function(err, files) {
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
      var regexp = new RegExp(search, 'g');
      if(!regexp.test(data)) return;
      var temp = data.replace(regexp, replace);
      fs.writeFile(f, temp);
    });
  });
});
