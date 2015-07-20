Bokeh.Views.AlbumsIndex = Backbone.CompositeView.extend({
  template: JST["albums/index"],

  initialize: function(){
    this.listenTo(this.albums(), "sync", this.render)
  },

  render: function () {
    debugger
    var renderedContent = this.template({ albums: this.collection });
    this.$el.html(renderedContent)
    return this;
  }
})
