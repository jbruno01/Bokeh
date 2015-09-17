Bokeh.Views.SplashPage = Backbone.CompositeView.extend({
  template: JST["site/splash"],
  // eventually I'd like to populate the background image with random images
  // every time someone loads the site.

  initialize: function(options){
    this.listenTo(Bokeh.currentUser, "signIn signOut", this.render);
  },

  render: function () {
    var renderedContent = this.template( {currentUser: Bokeh.currentUser});
    this.$el.html(renderedContent);
    return this;
  }
})
