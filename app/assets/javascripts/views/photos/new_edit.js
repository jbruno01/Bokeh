Bokeh.Views.AddEditPhotoView = Backbone.CompositeView.extend({
  class: "add-photo-form",

  template: JST["photos/add_edit_photo"],

  events: {
    "click .photo-submit" : "submit",
    "click #close-form" : "removeForm"
  },

  initialize: function () {
    this.photos = Bokeh.currentUser.photos();
  },

  render: function(){
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  removeForm: function(event) {
    event.preventDefault();
    this.remove()
  },

  submit: function(event) {
    event.preventDefault();
    this.remove();
    $(".upload-spinner").removeClass("hidden");
    $(".new-photo").prop("disabled", true);
    var title = this.$("#input-photo-title").val();
    var description = this.$("#input-photo-description").val();
    var formData = new FormData();
    if(this.model.isNew()) {
      var file = this.$("#input-photo-image")[0].files[0];
      formData.append("photo[image]", file);
    } else {
      var user = Bokeh.Collections.users.get(this.model.attributes.user_id).bind(this)
    };
    // var avatar = this.$(".avatar-checkbox").is(":checked")
    // var banner = this.$(".banner-checkbox").is(":checked")
    var that = this;
    // if(avatar){
    //   user.attributes.avatar_url = this.model.attributes.avatar_url;
    // };
    // if(banner){
    //   user.attributes.banner_url = this.model.attributes.original_url;
    // };
    // if(avatar || banner){
    //   user.save()
    // };
    // formData.append("photo[description]", description);
    // formData.append("photo[title]", title);
    this.model.saveFormData(formData, {
      success: function(){
        that.collection.add(that.model, { merge: true })
        // $(".upload-spinner").addClass("hidden");
        // $('.new-photo').prop("disabled", false);
      }
    });
  }
})
