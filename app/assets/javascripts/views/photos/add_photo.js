Bokeh.Views.AddPhotoView = Backbone.CompositeView.extend({
  id: "add-photo-form",

  template: JST["photos/add_photo"],

  events: {
    "click .photo-submit" : "submit"
  },

  initialize: function () {
    debugger
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function(){
    var renderedContent = this.template({ albums: this.model.albums()});
    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    this.remove()
    var newPhoto = new Bokeh.Models.Photo();
    event.preventDefault();
    var file = this.$("#input-photo-image")[0].files[0];
    var description = this.$("#input-photo-description").val()
    var formData = new FormData();
    formData.append("photo[image]", file);
    formData.append("photo[description]", description)

    var that = this;
    newPhoto.saveFormData(formData, {
      success: function(){
        console.log(that);
        that.model.photos().add(newPhoto);
      }
    });
  }
})
