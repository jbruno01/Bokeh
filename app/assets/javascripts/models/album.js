Bokeh.Models.Album = Backbone.Model.extend({
  urlRoot: "/api/albums",

  photos: function() {
    if(!this._photos){
      this._photos = new Bokeh.Collections.Photos([], { album: this })
    }
    return this._photos;
  },

  parse: function(response) {
    if(response.photos){
      this.photos().set(response.photos, { parse: true });
      delete response.photos;
    }

    return response;
  }


});
