Bokeh.Views.IndexPhotoView = Backbone.CompositeView.extend({
  template: JST["photos/index"],
  tagName: "section",
  className: "droppable",

  events: {
    "click .close-modal" : "closeOverlay"
  },

  initialize: function(){
    this.renderBanner({ model: this.model });
    this.addPhotos();
    this.listenTo(this.model.photos(), "add", this.addPhotoView);
    this.listenTo(this.model.photos(), "remove", this.removePhotoView);
    this.listenTo(this.model.avatar_url, "change", this.renderBanner);
    this.listenTo(this.model.banner_url, "change", this.renderBanner);
  },

  addPhotoView: function (photo) {
    var subview = new Bokeh.Views.PhotoIndexItem({ model: photo });
    this.addSubview('.photo-index', subview);
  },

  closeOverlay: function(event) {
    event.preventDefault();
    $(".upload-prompt").addClass("hidden");
  },

  addPhotos: function() {
    this.model.photos().forEach(function (pic) {
      this.addPhotoView(pic);
    }.bind(this))
  },

  removePhotoView: function (model) {
    this.removeModelSubview(".photo-index", model)
  },

  renderBanner: function () {
    var bannerView = new Bokeh.Views.UserBanner({ model: this.model, collection: this.model.photos() })
    $(".banner-view").empty();
    this.addSubview(".banner-view", bannerView);
  },

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    this.setDrop();
    return this;
  },

  setDrop: function() {
    this.setFileUpload();
    if (!Bokeh.currentUser.id || (this.model.id.toString() !== Bokeh.currentUser.id.toString())) {
      $(".droppable").fileupload('disable');
    }
  },

  fileUpload: function (files) {
    var that = this;
    files.forEach(function(file){
      var newPhoto = new Bokeh.Models.Photo();
      var formData = new FormData();
      formData.append("photo[image]", file);
      var size = file.size
      newPhoto.saveFormData(formData, {
        success: function(){
          that.collection.add(newPhoto, { merge: true })
          that.dataUploaded = that.dataUploaded + size;
          that.renderProgress();
        },
        error: function(resp){
          $(".errors").addClass("active");
          $p = $('<p></p>')
          $p.append(
            "One of your files was invalid. Only jpeg or png files less than 5MB."
          );
          $(".errors").append($p);
            window.setTimeout(that.clearErrors, 5000);
            that.dataUploaded = that.dataUploaded + size;
            that.renderProgress();
        }
      });
    })
  },

  renderProgress: function() {
    var percent = (this.dataUploaded / this.dataTotal) * 100;
    $(".bar").width(percent + "%")
    if( percent === 100 ) {
      window.setTimeout(this.clearProgress, 2000);
    }
  },

  clearProgress: function() {
    $("#progress").removeClass("active")
  },

  clearErrors: function() {
    $(".errors").empty();
    $(".errors").removeClass("active");
  },

  setFileUpload: function() {
    var that = this;
    var $dz = $(".droppable");
    var $popup = $(".dragover-popup");

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

    $dz.fileupload({
      drop: function (e, data) {
        e.stopPropagation();
        e.preventDefault();
        that.setProgressBar(data);
        that.fileUpload(data.files);
        $popup.toggleClass("active");
      },
      url: "api/photos",
      type: "json"
    });
  },

  setProgressBar: function(data) {
    this.dataTotal = 0;
    this.dataUploaded = 0;
    data.files.forEach( function(file){
      this.dataTotal = this.dataTotal + file.size
    }.bind(this))
    $(".bar").width("0%")
    $("#progress").toggleClass("active")
  }
})
