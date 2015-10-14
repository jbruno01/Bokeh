Bokeh.Views.SplashPage = Backbone.CompositeView.extend({
  template: JST["site/splash"],
  // eventually I'd like to populate the background image with random images
  // every time someone loads the site.

  initialize: function(options){
    this.listenTo(Bokeh.currentUser, "signIn signOut", this.render);
  },

  events: {
    "click .guest-user" : "guestUser"
  },

  guestUser: function(){
    event.preventDefault();
    Bokeh.currentUser.signIn({
      email: "jbruno01@gmail.com",
      password: "password"
    });
  },

  render: function () {
    var renderedContent = this.template( {currentUser: Bokeh.currentUser});
    this.$el.html(renderedContent);
    return this;
  }
})
