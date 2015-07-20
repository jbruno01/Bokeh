Bokeh.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST["comments/new_form"],

  events: {
    "click .comment-submit" : "submit"
  },

  initialize: function () {
    this.listenTo(Bokeh.currentUser, "sync", this.render)
  },

  submit: function(event) {
    var comment = new Bokeh.Models.Comment();
    event.preventDefault();
    var content = $(".new-comment-area").val();
    comment.set(content);
    var that = this;
    comment.save({}, {
      success: function () {
        console.log("saved!");
        that.collection.add(comment);

      }
    });
  },

  render: function () {
    var renderedContent = this.template({ user: Bokeh.currentUser });

    this.$el.html(renderedContent);
    return this;
  }
})
