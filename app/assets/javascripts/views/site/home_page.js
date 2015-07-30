Bokeh.Views.SiteHomeView = Backbone.CompositeView.extend({
  template: JST["site/home"],

  initialize: function () {
    this.addPhotos()
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPhotoView)
  },

  addPhotoView: function (photo) {
    var subView = new Bokeh.Views.HomeIndexItem({ model: photo });
    this.addSubview(".photo-index", subView)
  },

  addPhotos: function() {
    this.collection.forEach(function (photo) {
      this.addPhotoView(photo)
    }.bind(this))
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews();
    // $(".photo-index").justifiedGallery({
    //   rowHeight: 200,
    //   margins: 3,
    //   lastRow: "nojustify"
    //   })
    return this;
  }
})
