Bokeh.Views.EditPhotoDetails = Backbone.CompositeView.extend({
  template: JST["photos/edit_details"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "blur .edit-details" : "submit"
  },

  submit: function(event) {
    event.preventDefault();
    var attrs = $(".edit-details").serializeJSON().photo;
    this.model.set(attrs);
    this.model.save();
  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  }
})
