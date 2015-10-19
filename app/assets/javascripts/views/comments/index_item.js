Bokeh.Views.CommentIndexItem = Backbone.CompositeView.extend({
  template: JST["comments/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click .hover-edit" : "editView",
    "blur .edit-comment-area" : "submit"
  },

  submit: function(event) {
    event.preventDefault();
    var content = this.$(".edit-comment-area").val();
    this.model.attributes.content = content;
    this.model.save();
  },

  editView: function(event) {
    event.preventDefault();
    $(".hover-edit").remove();
    var $textarea = $("<textarea></textarea>");
    $textarea.addClass("edit-comment-area");
    $textarea.val(this.model.get("content"));
    $textarea.attr("cols", 40);
    $textarea.attr("rows", 4);
    this.$("p.content").html($textarea);
  },

  render: function () {
    var renderedContent = this.template({ comment: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
