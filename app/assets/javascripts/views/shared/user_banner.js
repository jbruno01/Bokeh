Bokeh.Views.UserBanner = Backbone.CompositeView.extend({
  template: JST["shared/user_banner"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
