Bokeh.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST["photos/show"],

  initialize: function () {
    // this.addComments();
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model, "sync", this.addComments);
    this.listenTo(this.model.comments(), "add", this.addComment)
  },

  addComment: function (comment) {
    var subview = new Bokeh.Views.CommentIndexItem({ model: comment });
    if(this.newCommentview){
      this.removeSubview(".comment-index", this.newCommentview);
    }
    this.addSubview('.comment-index', subview);
    this.renderNewForm();

  },

  addComments: function() {
    this.model.comments().forEach(function (comment) {
      this.addComment(comment);
    }.bind(this))
    // this.renderNewFrom();
  },

  renderNewForm: function () {
    this.newCommentview = new Bokeh.Views.CommentForm({
      collection: this.model.comments(),
      model: this.model
    });
    this.addSubview(".comment-index", this.newCommentview)

  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }
})
