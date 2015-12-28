QUnit.test( "Test of tests", function( assert ) {
    assert.strictEqual(42, 42, 'Truth to be found');
});

QUnit.test( "ConfirmView render test", function (assert) {
    var el = '<div class="test"></div>';
    $('body').append(el);

    this.view = new App.Messenger.ConfirmView({
        el: $('.test')
    });

    this.view.set('sdfsd', function(){return true;}, function(){return true;});
    assert.ok(this.view, 'view exists');

    assert.equal(this.view.render(), this.view, 'render returns this');

    assert.ok(this.view.$el.html(), 'view append in el');
    this.view.$el.html('');
    this.view.remove();
    this.view = null;
});

QUnit.test( "ConfirmView close test", function (assert) {
    var el = '<div class="test"></div>';
    $('body').append(el);

    this.view = new App.Messenger.ConfirmView({
        el: $('.test')
    });

    this.view.set('sdfsd', function(){return true;}, function(){return true;});

    this.view.render();

    assert.ok(this.view.$el.html(), 'view is there');
    this.view.close();
    setTimeout(function() {
        assert.ok(!this.view.$el.html(), 'view is closed');
        this.view.$el.html('');
        this.view = null;
    }.bind(this), 2000);
});