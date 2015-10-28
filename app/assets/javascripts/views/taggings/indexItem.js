Bokeh.Views.TagsIndexItem = Backbone.CompositeView.extend({
  template: JST["taggings/indexItem"],
  className: "tag-item group",
  tagName: "section",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click #delete-tagging" : "removeTag"
  },

  removeTag: function(event) {
    event.preventDefault();
    this.model.destroy();
  },

  render: function () {
    var renderedContent = this.template({ tagging: this.model});
    this.$el.html(renderedContent);
    return this;
  }
})
