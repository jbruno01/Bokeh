Bokeh.Views.AlbumShow = Backbone.View.extend({
  template: JST["albums/show"],

  initialize: function () {
    this.listenTo(this.model, "add sync", this.render)
  },

  events: {
    "click .new-photo" : "newPhoto"
  },

  newPhoto: function(event) {
    event.preventDefault();
    $(".new-photo").remove()
    var newPhoto = new Bokeh.Models.Photo();
    var newPhotoView = new Bokeh.Views.AddPhotoView({ model: newPhoto, collection: this.collection })
    this.$el.append(newPhotoView.render().$el)
  },

  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    return this;
  }

})
