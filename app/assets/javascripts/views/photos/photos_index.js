Bokeh.Views.IndexPhotoView = Backbone.CompositeView.extend({
  template: JST["photos/index"],

  initialize: function(){
    this.addPhotos()
    this.listenTo(this.collection, "sync", this.render)
    this.listenTo(this.collection, "add", this.addPhotoView);
  },

  events: {
    "click .new-photo" : "newPhoto"
  },

  addPhotoView: function (photo) {
    debugger
    if($("#add-photo-form")){
      $("#add-photo-form").empty()
    };
    var subview = new Bokeh.Views.PhotoIndexItem({ model: photo });
    this.addSubview('.photo-index', subview);
  },

  addPhotos: function() {
    this.collection.models.forEach(function (pic) {
      var subView = new Bokeh.Views.PhotoIndexItem({ model: pic });
      this.addSubview(".photo-index", subView)
    }.bind(this))
  },

  newPhoto: function(event) {
    debugger
    event.preventDefault();
    $(".new-photo").remove();
    var albums = Bokeh.Collections.albums;
    albums.fetch()
    var newPhoto = new Bokeh.Models.Photo();
    var newPhotoView = new Bokeh.Views.AddPhotoView({ model: newPhoto, collection: albums })
    this.addSubview(".photo-index", newPhotoView, true)
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }
})
