Bokeh.Collections.Albums = Backbone.Collection.extend({
  model: Bokeh.Models.Album,
  url: "/api/albums",

  getOrFetch: function(id) {
    var album = this.get(id);
    if(!album) {
      var album = new Bokeh.Models.Album({ id: id });
      var albums = this;
      album.fetch({
        success: function () {
          albums.add(album)
        }
      })
    } else {
      album.fetch();
    }

    return album;
  }


});

Bokeh.Collections.albums = new Bokeh.Collections.Albums();
