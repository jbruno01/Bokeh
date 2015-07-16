Bokeh.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.photos = options.photos;
    this.albums = options.albums;
  },

  routes: {
    "" : "photosIndex",
    "photos/:id" : "photoShow",
    "albums" : "albumsIndex",
    "albums/:id" : "albumShow",

  },

  siteHomePage: function () {
    this.collection.fetch();
    var homeView = new Bokeh.Views.SiteHomeView({ collection: this.photos });
    this._swapView(homeView);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);
    var photoView = new Bokeh.Views.PhotoShow({ model: photo})
    this._swapView(photoView);
  },

  photosIndex: function () {
    this.photos.fetch();
    var indexPhotoView = new Bokeh.Views.IndexPhotoView({ collection: this.photos })
    this._swapView(indexPhotoView);
  },

  albumsIndex: function () {
    this.albums.fetch();
    var indexAlbumView = new Bokeh.Views.AlbumsIndex({ collection: this.albums })
    this._swapView(indexAlbumView);
  },

  albumShow: function (id) {
    var album = this.albums.getOrFetch(id);
    var showView = new Bokeh.Views.AlbumShow({ model: album })
    this._swapView(showView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
