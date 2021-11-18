let path =require('path')
module.exports={
    entry:'./src/index.js',
    mode:'production',
    output: {
        path: path.resolve( __dirname, 'dist/scripts', ),
        filename: 'main.js'
    },
    resolve:{
        extensions:['.js']
    },
    watch:true,
    module:{
        rules:[
            {test:/\.css$/,
             use:['style-loader','css-loader']

        },
        {
            test:/\.js$/,
            use:['babel-loader'],
            exclude:'/node_modules/'
        }
    ]
    }

        

}