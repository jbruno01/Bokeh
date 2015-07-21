Bokeh.Views.SiteHomeView = Backbone.CompositeView.extend({
  template: JST["site/home"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  addPhotos: function() {
    this.collection.forEach(function (pic) {
      var subView = new Bokeh.Views.PhotoIndexItem({ model: pic });
      this.addSubview(".home-photo-index", subView)
    }.bind(this))
  },

  render: function () {
    var renderedContent = this.template({ photos: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
})
