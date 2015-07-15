Bokeh.Collections.Albums = Backbone.Collection.extend({
  model: Bokeh.Models.Album,
  url: "api/albums"
})

Bokeh.Collections.albums = new Bokeh.Collections.Albums();
