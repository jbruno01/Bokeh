Bokeh.Views.UserBanner = Backbone.CompositeView.extend({
  template: JST["shared/user_banner"],
  className: "banner-container",

  initialize: function () {
    this.listenToOnce(this.model, "sync", this.render),
    this.listenTo(this.model.photos(), "remove", this.render)
    this.listenTo(this.model, "avatar", this.renderAvatar)
  },

  renderAvatar: function () {
    $(".avatar-image").attr("src", this.model.escape("avatar_url"))
  },

  loadingGifInit: function () {
    $(".banner-image").toggleClass("hidden");
    $(".banner-image").load(function() {
      $(".loader-gif").hide();
      $(".banner-image").toggleClass("hidden")
    });
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.loadingGifInit();
    return this;
  }
})
