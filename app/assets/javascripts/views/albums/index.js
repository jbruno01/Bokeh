Bokeh.Views.AlbumsIndex = Backbone.CompositeView.extend({
  template: JST["albums/index"],

  initialize: function(){
    this.renderBanner();
    this.addAlbums();
    this.listenTo(this.model.albums(), "add", this.addAlbumView);
    this.listenTo(this.model.albums(), "sync", this.render);
    this.listenTo(this.model.albums(), "remove", this.removeAlbumView);
  },

  events: {
    "click .new-album" : "newAlbum",
  },

  addAlbumView: function (album) {
    var subview = new Bokeh.Views.AlbumIndexItem({ model: album });
    this.addSubview('.album-index', subview);
  },

  removeAlbumForm: function () {
    this.removeSubview(".add-album-form", this.newAlbumView);
    var $button = $("<button></button>");
    $button.html("Delete");
    $button.addClass("new-album");

    $(".add-album-form").append($button);
  },

  addAlbums: function() {
    this.model.albums().forEach(function (album) {
      var subView = new Bokeh.Views.AlbumIndexItem({ model: album });
      this.addSubview(".album-index", subView)
    }.bind(this))
  },

  removeAlbumView: function (model) {
    this.removeModelSubview(".album-index", model)
  },

  newAlbum: function(event) {
    event.preventDefault();
    // $(".new-album").remove();
    var newAlbum = new Bokeh.Models.Album();
    this.newAlbumView = new Bokeh.Views.AddAlbumView({ model: newAlbum, collection: this.model.albums() })
    this.addSubview(".add-album-form", this.newAlbumView)
  },

  renderBanner: function () {
    var bannerView = new Bokeh.Views.UserBanner({ model: this.model })
    this.addSubview(".banner-view", bannerView);
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }
})
