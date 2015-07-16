Bokeh.Views.AddPhotoView = Backbone.View.extend({
  template: JST["photos/add_photo"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  events: {
    "click .photo-submit" : "submit"
  },

  render: function(){
    var renderedContent = this.template({ albums: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    $form = this.$("form");
    var attrs = $form.serializeJSON().photo;
    var that = this;
    var photos = Bokeh.Collections.photos;
    this.model.set(attrs);
    this.model.save({}, {
      success: function (){
        photos.add(that.model, {merge: true})
      }
    })
  }
})
