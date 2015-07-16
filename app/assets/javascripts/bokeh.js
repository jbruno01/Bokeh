window.Bokeh = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Bokeh.Routers.Router ({
      $rootEl: $("#main"),
      photos: Bokeh.Collections.photos
    });

    Backbone.history.start();
  }
};
