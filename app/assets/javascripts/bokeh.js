window.Bokeh = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bokeh.Routers.Router ({
      $rootEl: $("#main"),
      photos: Bokeh.Collections.photos,
      albums: Bokeh.Collections.albums
    });

    Backbone.history.start();
  }
};
