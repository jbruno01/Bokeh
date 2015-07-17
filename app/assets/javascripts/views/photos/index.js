Bokeh.Views.IndexPhotoView = Backbone.CompositeView.extend({
  template: JST["photos/index"],

  initialize: function(){
    this.addPhotos()
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPhotoView);
    this.listenTo(this.collection, "remove", this.removePhotoView)
  },

  events: {
    "click .new-photo" : "newPhoto",
  },

  addPhotoView: function (photo) {
    var subview = new Bokeh.Views.PhotoIndexItem({ model: photo });
    this.addSubview('.photo-index', subview);
    if(this.newPhotoView){
      this.removePhotoForm();
    };
  },

  removePhotoForm: function () {
    this.removeSubview(".add-photo-form", this.newPhotoView);
    var $button = $("<button></button>");
    $button.addClass("new-photo");
    $(".add-photo-form").html($button);
  },

  addPhotos: function() {
    this.collection.models.forEach(function (pic) {
      var subView = new Bokeh.Views.PhotoIndexItem({ model: pic });
      this.addSubview(".photo-index", subView)
    }.bind(this))
  },

  removePhotoView: function (model) {
    this.removeModelSubview(".photo-index", model)
  },

  newPhoto: function(event) {
    event.preventDefault();
    $(".new-photo").remove();
    var albums = Bokeh.Collections.albums;
    albums.fetch()
    var newPhoto = new Bokeh.Models.Photo();
    this.newPhotoView = new Bokeh.Views.AddPhotoView({ model: newPhoto, collection: albums })
    this.addSubview(".add-photo-form", this.newPhotoView)
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }
})
