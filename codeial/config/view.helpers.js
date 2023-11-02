// import fs from 'fs'
// import path from 'path'
// import env from './enviornment.js'

// export default (app) => {
//     app.locals.assetPath = function(filePath){
//         if(env.name == 'development'){
//             return filePath
//         }
//         // console.log(path.join(path.resolve(), 'public', 'assets','rev-manifest.json'))
//         // console.log(filePath);
//         return '/' + JSON.parse(fs.readFileSync(path.join(path.resolve(), 'public', 'assets','rev-manifest.json')))[filePath];
//         // console.log(pathoffile)
        
//     }
// }