Bokeh.Views.AddEditPhotoView = Backbone.CompositeView.extend({
  id: "add-photo-form",

  template: JST["photos/add_edit_photo"],

  events: {
    "click .photo-submit" : "submit",
    "click .close-form" : "removeForm"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function(){
    var renderedContent = this.template({ photo: this.model, albums: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

  removeForm: function(event) {
    event.preventDefault();
    this.remove()
  },

  submit: function(event) {
    debugger
    this.remove()
    event.preventDefault();
    var description = this.$("#input-photo-description").val();
    var album = this.$("#input-photo-album").val();
    var formData = new FormData();
    if(this.model.isNew()) {
      var file = this.$("#input-photo-image")[0].files[0];
      formData.append("photo[image]", file);
    };
    formData.append("photo[description]", description);
    formData.append("photo[album_id]", album);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
      }
    });
  }
})
