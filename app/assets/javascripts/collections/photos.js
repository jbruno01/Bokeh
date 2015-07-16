Bokeh.Collections.Photos = Backbone.Collection.extend({
  model: Bokeh.Models.Photo,
  url: "/api/photos"
})

Bokeh.Collections.photos = new Bokeh.Collections.Photos();
