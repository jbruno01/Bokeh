Bokeh.Models.Album = Backbone.Model.extend({
  urlRoot: "/api/albums",

  photos: function(id) {
    if(!this._photos){
      this._photos = new Bokeh.Collections.Photos([], { album: this })
    }
    return this._photos;
  }
})
