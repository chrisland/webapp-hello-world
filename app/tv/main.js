$(function(){

    /*
     * Special Samsung TV Sauce
     */
    if(navigator.userAgent.search(/Maple/) > -1) {
        var widgetAPI = new window.Common.API.Widget();
        widgetAPI.sendReadyEvent();
    }

    "use strict";

    var ms = window.multiscreen;
    var app;

    var ui = {
        phrase : $('blockquote'),
        author : $('sub')
    };

    ms.local(function(err, service){

        app = service.application({
            id: window.location.href,
            //id : 'rPqGyLKFwH',
            stopOnDisconnect : false,
            startOnConnect : false
        });

        app.connect({name: 'TV'}, function (err) {
            if(err) return console.error(err);
        });

        app.on('say', function(msg, from){
            ui.phrase.text(msg);
            ui.author.text('~ ' + (from.attributes.name || 'Unknown'));
        });

        app.on('clientConnect', function(client){
            ui.phrase.text('Hello '+client.attributes.name);
            ui.author.text('~ Your TV');
        });

        app.on('clientDisconnect', function(client){
            ui.phrase.text('Goodbye '+client.attributes.name);
            ui.author.text('~ Your TV');
        });

    });

});

