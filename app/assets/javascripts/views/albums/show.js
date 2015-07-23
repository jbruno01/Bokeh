Bokeh.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST["albums/show"],

  initialize: function () {
    this.renderBanner();
    this.listenTo(this.model.photos(), "add", this.addPhotoView);
    this.listenTo(this.model, "sync", this.render);
  },

  addPhotoView: function (photo) {
    var subview = new Bokeh.Views.PhotoIndexItem({ model: photo });
    this.addSubview('.photo-tiles', subview);
  },

  renderBanner: function () {
    var bannerView = new Bokeh.Views.AlbumBanner({ model: this.model })
    this.addSubview(".banner-view", bannerView);
  },

  render: function () {
    var renderedContent = this.template({ album: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }

})
