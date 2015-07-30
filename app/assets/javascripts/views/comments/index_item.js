Bokeh.Views.CommentIndexItem = Backbone.CompositeView.extend({
  template: JST["comments/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "dblclick" : "editView",
    "blur .new-comment-area" : "submit"
  },

  submit: function(event) {
    event.preventDefault();
    var content = this.$("textarea").val();
    this.model.attributes.content = content;
    this.model.save();
  },

  editView: function(event) {
    event.preventDefault();
    var $textarea = $("<textarea></textarea>")
    $textarea.addClass("new-comment-area");
    $textarea.val(this.model.get("content"));
    $textarea.attr("cols", 40);
    $textarea.attr("rows", 4);
    this.$(".comment-content").html($textarea);
  },

  render: function () {
    var renderedContent = this.template({ comment: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
