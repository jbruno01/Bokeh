Bokeh.Views.IndexPhotoView = Backbone.CompositeView.extend({
  template: JST["photos/index"],

  initialize: function(){
    this.renderBanner({ model: this.model });
    this.addPhotos();
    this.listenTo(this.model.photos(), "add", this.addPhotoView);
    // this.listenTo(this.model.photos(), "sync", this.addPhotos);
    this.listenTo(this.model.photos(), "remove", this.removePhotoView);
    this.listenTo(this.model, "sync", this.render);

  },

  events: {
    "click .new-photo" : "newPhoto",
  },

  addPhotoView: function (photo) {
    var subview = new Bokeh.Views.PhotoIndexItem({ model: photo });
    this.addSubview('.photo-index-photos', subview);
  },

  removePhotoForm: function () {
    this.removeSubview(".add-photo-form", this.newPhotoView);
    this.newPhotoView = null;
    this.$(".add-photo-form").append("")
  },

  addPhotos: function() {
    this.model.photos().forEach(function (pic) {
      this.addPhotoView(pic);
    }.bind(this))
  },

  removePhotoView: function (model) {
    this.removeModelSubview(".photo-index-photos", model)
  },

  newPhoto: function(event) {
    event.preventDefault();
    if(this.newPhotoView){
      this.removePhotoForm();
    }
    var newPhoto = new Bokeh.Models.Photo();
    this.newPhotoView = new Bokeh.Views.AddEditPhotoView({ model: newPhoto, collection: this.model.photos() })
    this.addSubview(".add-photo-form", this.newPhotoView)
  },

  renderBanner: function () {
    var bannerView = new Bokeh.Views.UserBanner({ model: this.model, collection: this.model.photos() })
    this.addSubview(".banner-view", bannerView);
  },

  fileUpload: function (files) {
    var that = this;
    files.forEach(function(file){
      var newPhoto = new Bokeh.Models.Photo();
      var formData = new FormData();
      formData.append("photo[image]", file);
      newPhoto.saveFormData(formData, {
        success: function(){
          that.collection.add(newPhoto, { merge: true })
        }
      })
    })

  },

  setDrop: function() {
    var that = this;
    // if(Bokeh.currentUser.id && this.model.id === Bokeh.currentUser.id.toString()){
      debugger
      $(".droppable").bind('fileuploadsubmit', function (e, data) {
        return false;
      });

      $(".droppable").fileupload({
        drop: function (e, data) {
          that.fileUpload(data.files);
        },
        url: "api/photos",
        type: "json"
      })
    // }
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.setDrop();
    return this;
  }
})
