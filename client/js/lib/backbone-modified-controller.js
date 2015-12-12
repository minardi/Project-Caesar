'use strict';

var Controller = Backbone.Controller = function(collection) {
    this.collection = collection;

    this.parentMethod = function () {
        console.log('Follow the white rabbit!');
    };

    this.setupMediator = function (subscribers) {
        var key;

        for (key in subscribers) {
            cs.mediator.subscribe(key, subscribers[key], {}, this);
        }
    };
};

Controller.extend = function(protoProps, staticProps) {
    var parent = this;
    var child;
 
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    _.extend(child, parent, staticProps);

    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
 
    if (protoProps) _.extend(child.prototype, protoProps);
 
    child.__super__ = parent.prototype;

    return child;
};
