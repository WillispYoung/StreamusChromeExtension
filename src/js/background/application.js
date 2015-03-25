﻿define(function(require) {
    'use strict';

    var BackgroundArea = require('background/model/backgroundArea');
    var BackgroundAreaView = require('background/view/backgroundAreaView');
    var ForegroundAreaView = require('foreground/view/foregroundAreaView');

    var Application = Marionette.Application.extend({
        //  Set this flag to true to enable localhost server & debugging flags.
        localDebug: false,
        //  The URL to which AJAX requests are sent. localhost for debugging or cloud server in production.
        serverUrl: '',
        //  A unique identifier for this Streamus instance. Useful for telling logs apart without a signed in user.
        instanceId: '',

        regions: {
            backgroundAreaRegion: '#backgroundAreaRegion'
        },
        
        backgroundPage: window,
        
        //  All the channels used for global event communication across the page
        channels: {
            tab: Backbone.Wreqr.radio.channel('tab'),
            error: Backbone.Wreqr.radio.channel('error'),
            backgroundNotification: Backbone.Wreqr.radio.channel('backgroundNotification'),
            notification: Backbone.Wreqr.radio.channel('notification'),
            backgroundArea: Backbone.Wreqr.radio.channel('backgroundArea'),
            clipboard: Backbone.Wreqr.radio.channel('clipboard'),
            foreground: Backbone.Wreqr.radio.channel('foreground'),
            player: Backbone.Wreqr.radio.channel('player'),
            activePlaylist: Backbone.Wreqr.radio.channel('activePlaylist'),
            global: Backbone.Wreqr.radio.channel('global'),
            dialog: Backbone.Wreqr.radio.channel('dialog'),
            foregroundArea: Backbone.Wreqr.radio.channel('foregroundArea'),
            window: Backbone.Wreqr.radio.channel('window'),
            contextMenu: Backbone.Wreqr.radio.channel('contextMenu'),
            playlistsArea: Backbone.Wreqr.radio.channel('playlistsArea'),
            searchArea: Backbone.Wreqr.radio.channel('searchArea'),
            activeStreamItemArea: Backbone.Wreqr.radio.channel('activeStreamItemArea'),
            element: Backbone.Wreqr.radio.channel('element'),
            saveSongs: Backbone.Wreqr.radio.channel('saveSongs'),
            listItem: Backbone.Wreqr.radio.channel('listItem'),
            simpleMenu: Backbone.Wreqr.radio.channel('simpleMenu')
        },
        
        backgroundChannels: {
            error: Backbone.Wreqr.radio.channel('error'),
            notification: Backbone.Wreqr.radio.channel('notification'),
            foreground: Backbone.Wreqr.radio.channel('foreground')
        },

        initialize: function() {
            this._setServerUrl();
            this._setInstanceId();
            this.on('start', this._onStart);            

            window.showForeground = function(foregroundElement) {
                var foregroundAreaView = new ForegroundAreaView({
                    el: foregroundElement
                });
                foregroundAreaView.render();
            };
        },

        _onStart: function() {
            this._showBackground();
        },

        _setServerUrl: function() {
            this.serverUrl = this.localDebug ? 'http://localhost:39853/' : 'https://aws-server.streamus.com/Streamus/';
        },

        _setInstanceId: function() {
            var instanceId = window.localStorage.getItem('instanceId');

            if (instanceId === null) {
                instanceId = 'instance_' + _.now();
                window.localStorage.setItem('instanceId', instanceId);
            }

            this.instanceId = instanceId;
        },

        _showBackground: function() {
            this.backgroundAreaRegion.show(new BackgroundAreaView({
                model: new BackgroundArea()
            }));
        }
    });

    var streamus = new Application();
    window.Streamus = streamus;
    streamus.start();
});