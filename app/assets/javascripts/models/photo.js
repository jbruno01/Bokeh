Bokeh.Models.Photo = Backbone.Model.extend({
  urlRoot: '/api/photos',

  comments: function() {
    if(!this._comments){
      this._comments = new Bokeh.Collections.Comments([], { photo: this })
    }
    return this._comments;
  },

  parse: function(response) {
    if(response.comments){
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    return response;
  }
})
