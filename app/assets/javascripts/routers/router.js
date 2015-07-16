Bokeh.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.collection = options.photos;
  },

  routes: {
    "" : "photoIndex",
    "photos/:id" : "photoShow",
    "albums/new" : "newAlbum",
    "albums/:id" : "albumShow",

  },

  photoIndex: function () {
    this.collection.fetch();
    var indexPhotoView = new Bokeh.Views.IndexPhotoView({ collection: this.collection })
    this._swapView(indexPhotoView);
  },

  albumShow: function (id) {
    var album = this.collection.getOrFetch(id);
    var showView = new Bokeh.Views.AlbumShow({ model: album, collection: this.collection })
    this._swapView(showView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
