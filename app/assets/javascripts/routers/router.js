Bokeh.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.albums;
  },

  routes: {
    "" : "index",
    "albums/new" : "new",
    "albums/:id" : "show"
  },

  index: function () {
    this.collection.fetch();
    var indexView = new Bokeh.Views.AlbumsIndex({ collection: this.collection })
    this._swapView(indexView);
  },

  show: function (id) {
    var album = this.collection.getOrFetch(id);
    var showView = new Bokeh.Views.AlbumShow({ model: album })
    this._swapView(showView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
