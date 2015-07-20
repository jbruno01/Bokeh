Bokeh.Views.PhotoDetails = Backbone.CompositeView.extend({
  template: JST["photos/details"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
