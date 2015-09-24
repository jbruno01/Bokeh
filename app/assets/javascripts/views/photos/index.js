Bokeh.Views.IndexPhotoView = Backbone.CompositeView.extend({
  template: JST["photos/index"],
  tagName: "section",
  className: "droppable",

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
    "click .close-modal" : "closeOverlay"
  },

  closeOverlay: function(event) {
    event.preventDefault();
    $(".upload-prompt").addClass("hidden");
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
        },
        error: function(resp){
          $(".errors").addClass("active");
          $p = $('<p></p>')
          $p.append(
            "One of your files was invalid. Only jpeg or png files less than 5MB."
          );
          $(".errors").append($p);
            window.setTimeout(that.clearErrors, 5000);
          }
     });
   })
  },

  clearErrors: function() {
    $(".errors").empty();
    $(".errors").removeClass("active");
  },

  setDrop: function() {
    var that = this;
    var $dz = $(".droppable");

    var $popup = $(".dragover-popup");
    $dz.bind('fileuploadsubmit', function (e, data) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    $dz.on("dragenter", function(e){
      e.preventDefault();
      e.stopPropagation();
      $popup.toggleClass("active");
    })

    $dz.on("dragleave", function(e){
      e.preventDefault();
      e.stopPropagation();
      $popup.toggleClass("active");
    })

    $(".droppable").fileupload({
      drop: function (e, data) {
        e.stopPropagation();
        e.preventDefault();
        that.fileUpload(data.files);
        $popup.toggleClass("active");
      },
      url: "api/photos",
      type: "json"
    });

    if (!Bokeh.currentUser.id || (this.model.id.toString() !== Bokeh.currentUser.id.toString())) {
      $(".droppable").fileupload('disable');
    }
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.setDrop();
    return this;
  }
})
