﻿define(function(require) {
    'use strict';

    require('backbone.marionette');
    require('backbone.localStorage');
    require('jquery.perfectScrollbar');
    require('jquery.qtip');
    require('jquery-ui');
    var Cocktail = require('cocktail');

    Cocktail.patch(Backbone);

    require('backbone.marionette.foreground');
    require('backbone.localStorage.foreground');
    window.setForeground = function(foregroundJQuery, foregroundDocument) {
        console.log('setting BackboneForegrounds jQuery');
        foregroundJQuery.hello = 'hello';
        BackboneForeground.$ = foregroundJQuery;
        
        MarionetteForeground.isNodeAttached = function(el) {
            return BackboneForeground.$.contains(foregroundDocument.documentElement, el);
        };

        MarionetteForeground.CollectionView.initRenderBuffer = function() {
            this.elBuffer = foregroundDocument.createDocumentFragment();
            this._bufferedChildren = [];
        };
    };

    //  Some sensitive data is not committed to GitHub. Use an example file to help others and provide detection of incomplete setup.
    //requirejs.onError = function(error) {
    //    var headerWritten = false;
    //    console.error('error:', error);

    //    error.requireModules.forEach(function(requireModule) {
    //        if (requireModule.indexOf('background/key/') !== -1) {
    //            if (!headerWritten) {
    //                console.warn('%c ATTENTION! Additional configuration is required', 'color: rgb(66,133,244); font-size: 18px; font-weight: bold;');
    //                console.warn('%c -----------------------------------------------', 'color: rgb(66,133,244); font-size: 18px; font-weight: bold;');
    //                headerWritten = true;
    //            }

    //            console.warn('%cKey not found. \n Rename "' + requireModule + '.js.example" to "' + requireModule + '.js".\n Then, follow the instructions in the file.', 'color: red');
    //        }
    //    });

    //    if (headerWritten) {
    //        console.warn('%c -----------------------------------------------', 'color: rgb(66,133,244); font-size: 18px; font-weight: bold;');
    //    }
    //};

    //  Finally, load the application:
    require(['background/application']);
});