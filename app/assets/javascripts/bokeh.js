window.Bokeh = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bokeh.Routers.Router ({
      $rootEl: $("#main"),
      albums: Bokeh.Collections.albums
    });

    Backbone.history.start();
  }
};
