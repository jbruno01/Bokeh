Bokeh.Views.IndexPhotoView = Backbone.View.extend({
  template: JST["photos/index"],

  initialize: function(){
    this.listenTo(this.collection, "sync add", this.render)
  },

  events: {
    "click .new-photo" : "newPhoto"
  },

  newPhoto: function(event) {
    event.preventDefault();
    $(".new-photo").remove();
    var albums = Bokeh.Collections.albums;
    albums.fetch()
    var newPhoto = new Bokeh.Models.Photo();
    var newPhotoView = new Bokeh.Views.AddPhotoView({ model: newPhoto, collection: albums })
    this.$el.prepend(newPhotoView.render().$el)
  },

  render: function () {
    var renderedContent = this.template({ photos: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
})
