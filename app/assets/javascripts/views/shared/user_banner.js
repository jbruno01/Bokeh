Bokeh.Views.UserBanner = Backbone.CompositeView.extend({
  template: JST["shared/user_banner"],
  className: "banner-container",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render),
    this.listenTo(this.model.photos(), "add remove", this.render)
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
