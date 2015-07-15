Bokeh.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.albums;
  },

  routes: {
    "" : "index"
  },

  index: function () {
    this.collection.fetch();
    var IndexView = new Bokeh.Views.AlbumsIndex({ collection: this.collection })
    this.$rootEl.html(IndexView.render().$el)
  }
})
