Bokeh.Collections.Photos = Backbone.Collection.extend({
  model: Bokeh.Models.Photo,
  url: "/api/photos",

  getOrFetch: function(id) {
    var photo = this.get(id);
    if(!photo) {
      var photo = new Bokeh.Models.Photo({ id: id });
      var photos = this;
      photo.fetch({
        success: function () {
          photos.add(photo)
        }
      })
    } else {
      photo.fetch();
    }

    return photo;
  }
})

Bokeh.Collections.photos = new Bokeh.Collections.Photos();
