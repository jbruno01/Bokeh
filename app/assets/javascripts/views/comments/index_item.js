Bokeh.Views.CommentIndexItem = Backbone.CompositeView.extend({
  template: JST["comments/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "dblclick" : "editView"
  },

  editView: function(event) {
    event.preventDefault();
  },

  render: function () {
    var renderedContent = this.template({ comment: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
