var Pathfinder = (function () {
    var fs = require('fs'),
        assetSubs = {
            'js': '<script src=\'#\'></script>',
            'css': '<link rel=\'stylesheet\' href=\'#\'>'
        };
    
    function getPaths (params) {
        var fileContent = fs.readFileSync(params['clientPath'] + params['fileName']).toString(),
            reFileName = /\w+\/?\w+(-\w+)?.js/g,
            paths = [],
            found;
        
        while ((found = reFileName.exec(fileContent)) != null) { 
            if (params['exclude']) {
                if (found[0].indexOf(params['exclude']) < 0) {
                    paths.push(params['clientPath'] + found[0]);
                } 
            } else {
                paths.push(params['clientPath'] + found[0]);
            }
        }
        
        return paths;
    }
    
    function clearAssets (params) {
        var clientPath = params['clientPath'],
            publicPath = params['publicPath'],
            fileName = params['fileName'],
            assets = params['assets'],
            fileContent = fs.readFileSync(clientPath + fileName).toString(),
            reAsset, found, key;
        
        assets.forEach(function (item) {
            reAsset = new RegExp('<!-- ' + item + ' -->[\\s\\S]+<!-- ' + item + '-end -->');
            found = reAsset.exec(fileContent);
            for (key in assetSubs) {
                if (item.indexOf(key) > 0) {
                    fileContent = fileContent.replace(found[0], assetSubs[key].replace('#', item));
                }
            }           
        });
        fs.writeFileSync(publicPath + fileName, fileContent);
    }
    
    return {
        'getPaths': getPaths,
        'clearAssets': clearAssets
    };
})();

module.exports = Pathfinder;