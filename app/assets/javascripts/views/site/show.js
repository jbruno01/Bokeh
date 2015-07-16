Bokeh.Views.SiteHomeView = Backbone.View.extend({
  template: JST["site/home"],

  render: function () {
    var renderedContent = this.template({ albums: this.collection });
    this.$el.html(renderedContent);
    return this;
  }
})
