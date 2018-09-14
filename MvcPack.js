var mv = require('mv')
var copydir = require('copy-dir')
var config = require('./app.config').config
const fs = require('fs');
var path = require('path');
const replace = require('replace-in-file')

console.log('config: ' + JSON.stringify(config));

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
      }
  };

deleteFolderRecursive(config.StaticTarget)
fs.unlinkSync(config.IndexTarget)

copydir.sync(config.StaticSource,config.StaticTarget)
copydir.sync(config.BuildSource,config.BuildTarget, function(type, filepath, name){
    if(path.extname(filepath) === '.html'){
        return true
    }
    return false
})

fs.readdir(config.StaticTarget+'/js', (err, files) => {
    files.forEach(file => {
      fs.rename(config.StaticTarget+'/js/'+file,config.StaticTarget+'/js/'+file.replace('main', 'reactapp'), 
      function(err, data){
        if(err) console.log(err);
      })
    });
  })

fs.readdir(config.StaticTarget+'/css', (err, files) => {
    files.forEach(file => {
        fs.rename(config.StaticTarget+'/css/'+file,config.StaticTarget+'/css/'+file.replace('main', 'reactapp'), 
        function(err, data){
        if(err) console.log(err);
      })
    });
  })

  const replaceOptions1 = {
    files: config.IndexTarget,
    from: /main/g,
    to: 'reactapp',
  };

  const changes1 = replace.sync(replaceOptions1);

  const replaceOptions2 = {
    files: config.IndexTarget,
    from: /\/static/g,
    to: '../static',
  };

  const changes2 = replace.sync(replaceOptions2);