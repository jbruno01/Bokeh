Bokeh.Views.AlbumIndexItem = Backbone.CompositeView.extend({
  template: JST["albums/index_item"],

  initialize: function () {
    this.listenTo(this.model.photos(), "sync", this.render);
    this.listenTo(this.model, "sync", this.render);
  },

  events : {
    "click .album-delete" : "deleteAlbum"
  },

  deleteAlbum: function (event) {
    event.preventDefault();
    this.model.destroy()
  },

  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
