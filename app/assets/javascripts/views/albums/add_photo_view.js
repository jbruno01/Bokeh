Bokeh.Views.AddPhotoView = Backbone.View.extend({
  template: JST["albums/add_photo"],

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
  }
})
