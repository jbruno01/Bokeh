Bokeh.Views.AddEditPhotoView = Backbone.CompositeView.extend({
  id: "add-photo-form",

  template: JST["photos/add_edit_photo"],

  events: {
    "click .photo-submit" : "submit",
    "click .close-form" : "removeForm"
  },

  initialize: function () {
    this.photos = Bokeh.currentUser.photos();
    this.listenTo(Bokeh.currentUser.albums(), "sync", this.render)
  },

  render: function(){
    var renderedContent = this.template({ photo: this.model, albums: Bokeh.currentUser.albums() });
    this.$el.html(renderedContent);
    return this;
  },

  removeForm: function(event) {
    event.preventDefault();
    this.remove()
  },

  submit: function(event) {
    debugger
    event.preventDefault();
    this.remove()
    var description = this.$("#input-photo-description").val();
    var album = this.$("#input-photo-album").val();
    var formData = new FormData();
    if(this.model.isNew()) {
      var file = this.$("#input-photo-image")[0].files[0];
      formData.append("photo[image]", file);
    };
    var that = this;
    if(this.$(".avatar-checkbox").is(":checked")){
      var user = Bokeh.Collections.users.get(this.model.attributes.user_id).bind(this)
      user.attributes.avatar_url = this.model.attributes.avatar_url;
      user.save();
    }
    formData.append("photo[description]", description);
    formData.append("photo[album_id]", album);
    this.model.saveFormData(formData, {
      success: function(){
        console.log("saved");
        that.collection.add(that.model, { merge: true })
      }
    });
  }
})
