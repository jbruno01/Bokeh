Bokeh.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST["comments/new_form"],

  events: {
    "click .comment-submit" : "submit"
  },

  initialize: function () {
    this.listenTo(Bokeh.currentUser, "sync", this.render)
  },

  submit: function(event) {
    event.preventDefault();
    var newComment = new Bokeh.Models.Comment();
    var content = $(".new-comment-area").serializeJSON()
    newComment.set(content);
    newComment.attributes.comment.photo_id = this.model.id;
    var that = this;
    newComment.save({}, {
      success: function () {
        that.collection.add(newComment);
      }
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
})
