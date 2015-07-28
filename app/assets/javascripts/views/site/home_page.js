Bokeh.Views.SiteHomeView = Backbone.CompositeView.extend({
  template: JST["site/home"],

  initialize: function () {
    // this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPhotoView)
  },

  addPhotoView: function (photo) {
    var subView = new Bokeh.Views.HomeIndexItem({ model: photo });
    this.addSubview(".photo-index", subView)
  },

  addPhotos: function() {
    this.collection.forEach(function (photo) {
    debugger
      this.addPhotoView(photo)
    }.bind(this))
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.addPhotos()
    return this;
  }
})
