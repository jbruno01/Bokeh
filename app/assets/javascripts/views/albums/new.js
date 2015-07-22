Bokeh.Views.AddAlbumView = Backbone.CompositeView.extend({
  template: JST["albums/new"],

  events: {
    "click .add-album" : "submit",
    "click .close-form" : "closeForm"
  },

  closeForm: function(event) {
    event.preventDefault();
    this.remove();
  },

  submit: function (event) {
    event.preventDefault()
    var attrs = $("form").serializeJSON();
    this.model.set(attrs);
    var that = this;
    debugger
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model)
        console.log("saved");
      }
    })
  },

  render: function () {
    var renderedContent = this.template({ album: this.model })
    this.$el.html(renderedContent);
    return this;
  }
})
