/**
 * Created by binyamin.greenberg on 8/23/17.
 */
/**
 * Created by binyamin.greenberg on 7/11/17.
 */
var path = require('path');
var webpack = require("webpack");


module.exports = {

    entry:{
        app:'./app/app.module.js',
    },

    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}