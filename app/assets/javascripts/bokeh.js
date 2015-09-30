window.Bokeh = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bokeh.Routers.Router ({
      $rootEl: $("#main"),
      photos: Bokeh.Collections.photos,
      comments: Bokeh.Collections.comments,
      users: Bokeh.Collections.users
    });

    this.currentUser = new Bokeh.Models.CurrentUser();
    this.currentUser.fetch({
      success: function(){
        Backbone.history.start();
        this.header = new Bokeh.Views.Header({
          el: "#header",
          model: this.currentUser
        });
      }.bind(this)
    });
  }
};
