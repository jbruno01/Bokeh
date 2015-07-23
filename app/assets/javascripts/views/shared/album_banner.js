Bokeh.Views.AlbumBanner = Backbone.CompositeView.extend({
  template: JST["shared/album_banner"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
