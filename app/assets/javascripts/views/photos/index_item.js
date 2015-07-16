Bokeh.Views.PhotoIndexItem = Backbone.CompositeView.extend({
  template: JST["photos/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
