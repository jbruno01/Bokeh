Bokeh.Views.TagsIndexItem = Backbone.CompositeView.extend({
  template: JST["tags/indexItem"],
  className: "tag-items",
  tagName: "div",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({ tag: this.model});
    this.$el.html(renderedContent);
    return this;
  }
})
