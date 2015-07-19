Bokeh.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST["comments/new_form"],

  events: {
    "click .submit" : "submit"
  },

  submit: function(event) {
    event.preventDefault();
    var content = $(".form").val();
    this.model.set(content);
    var that = this;
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
      }
    });
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
})
