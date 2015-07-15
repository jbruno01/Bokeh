Bokeh.Views.AlbumShow = Backbone.View.extend({
  template: JST["albums/show"],

  initialize: function () {
    this.listenTo(this.model, "add sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    return this;
  }

})
