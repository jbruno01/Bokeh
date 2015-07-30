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

  render: function () {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
})
