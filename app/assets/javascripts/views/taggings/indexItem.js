Bokeh.Views.TagsIndexItem = Backbone.CompositeView.extend({
  template: JST["taggings/indexItem"],
  className: "tag-item group",
  tagName: "section",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click #delete-tagging" : "removeTag",
    "click .tag" : "searchTag"
  },

  removeTag: function(event) {
    event.preventDefault();
    this.model.destroy();
  },

  searchTag: function(event) {
    event.preventDefault();
    Bokeh.query = this.model.attributes.tag_name;
    Backbone.history.navigate("#/search", {trigger: true})
  },

  render: function () {
    var renderedContent = this.template({ tagging: this.model});
    this.$el.html(renderedContent);
    return this;
  }
})
