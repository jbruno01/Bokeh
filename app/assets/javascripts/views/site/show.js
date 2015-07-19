Bokeh.Views.SiteHomeView = Backbone.View.extend({
  template: JST["site/home"],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
})
