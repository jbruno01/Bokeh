Bokeh.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST["photos/show"],

  initialize: function () {
    this.addComments()
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.addComent)
  },

  addComment: function (comment) {
    var subview = new Bokeh.Views.CommentIndexItem({ model: comment });
    this.addSubview('.comment-index', subview);
  },

  addComments: function() {
    this.model.comments().forEach(function (comment) {
      this.renderNewComment(comment);
    }.bind(this))
  },

  renderNewFrom: function () {
    debugger
    var view = new Bokeh.Views.CommentForm({
      collection: this.model.comments()
    });
    this.addSubview(".comment-index", view)
  },


  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews()
    this.renderNewFrom();
    return this;
  }
})
