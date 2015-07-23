Bokeh.Views.PhotoIndexItem = Backbone.CompositeView.extend({
  template: JST["photos/index_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events : {
    "click .photo-delete" : "deletePhoto",
    "click .photo-edit" : "editPhoto"
  },

  editPhoto: function(event) {
    event.preventDefault();
    this.editView = new Bokeh.Views.AddEditPhotoView({ model: this.model, collection: this.collection })
    this.addSubview(".photo-tile", this.editView)
  },

  deletePhoto: function (event) {
    event.preventDefault();
    this.model.destroy()
  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
