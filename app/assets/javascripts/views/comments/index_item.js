Bokeh.Views.CommentIndexItem = Backbone.CompositeView.extend({
  template: JST["comments/index_item"],

  initialize: function () {
    this.listenTo(this.model, "change", this.render)
  },

  events: {
    "dblclick" : "editView"
  },

  render: function () {
    var renderedContent = this.template({ comment: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
