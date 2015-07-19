window.Bokeh = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bokeh.Routers.Router ({
      $rootEl: $("#main"),
      photos: Bokeh.Collections.photos,
      albums: Bokeh.Collections.albums,
      comments: Bokeh.Collections.comments
    });

    this.header = new Bokeh.Views.Header({ el: "#header" });

    Backbone.history.start();
  }
};
