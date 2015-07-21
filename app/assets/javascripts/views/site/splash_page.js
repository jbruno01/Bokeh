Bokeh.Views.SplashPage = Backbone.CompositeView.extend({
  template: JST["site/splash"],
  // eventually I'd like to populate the background image with random images
  // every time someone loads the site.

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
})
