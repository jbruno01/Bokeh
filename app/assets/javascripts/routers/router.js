Bokeh.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.photos = options.photos;
    this.albums = options.albums;
    this.comments = options.comments;
  },

  routes: {
    "" : "siteHomePage",
    "users/:id" : "userShow",
    "photos/:id" : "photoShow",
    "albums" : "albumsIndex",
    "albums/:id" : "albumShow",
    "session/new": "signIn"
  },

  siteHomePage: function () {
    var homeView = new Bokeh.Views.SiteHomeView();
    this._swapView(homeView);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);
    var photoView = new Bokeh.Views.PhotoShow({ model: photo})
    this._swapView(photoView);
  },

  userShow: function () {
    var callback = this.userShow.bind(this);
      if (!this._requireSignedIn(callback)) { return; }

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

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Bokeh.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
    if (!Bokeh.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
   if (Bokeh.currentUser.isSignedIn()) {
     callback = callback || this._goHome.bind(this);
     callback();
     return false;
   }

   return true;
 },

 _goHome: function(){
  Backbone.history.navigate("s", { trigger: true });
},

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
