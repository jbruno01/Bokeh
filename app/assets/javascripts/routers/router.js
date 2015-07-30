Bokeh.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.photos = options.photos;
    this.comments = options.comments;
    this.users = options.users
  },

  routes: {
    "" : "splash",
    "explore" : "siteHomePage",
    "users/new": "new",
    "users/:id" : "userShow",
    "photos/:id" : "photoShow",
    "session/new": "signIn",
    "search" : "search"
  },

  search: function () {
    var searchView = new Bokeh.Views.Search();

    this._swapView(searchView);
  },

  new: function () {
    if (!this._requireSignedOut()) { return; }

    var user = new Bokeh.Models.User({});
    var newView = new Bokeh.Views.NewUserForm({ model: user });
    this._swapView(newView);
  },

  siteHomePage: function () {
    this.photos.fetch()
    var homeView = new Bokeh.Views.SiteHomeView({ collection: this.photos });
    this._swapView(homeView);
  },

  splash: function () {
    var homeView = new Bokeh.Views.SplashPage();
    this._swapView(homeView);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);
    var photoView = new Bokeh.Views.PhotoShow({ model: photo})
    this._swapView(photoView);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
    var callback = this.userShow.bind(this);
      // if (!this._requireSignedIn(callback)) { return; }

    var indexPhotoView = new Bokeh.Views.IndexPhotoView({ model: user });
    this._swapView(indexPhotoView);
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
  Backbone.history.navigate("", { trigger: true });
},

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
})
