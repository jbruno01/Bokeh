Bokeh.Views.PhotoIndexItem = Backbone.CompositeView.extend({
  template: JST["photos/index_item"],
  className: "photo-index-tile group",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events : {
    "click .photo-delete" : "deletePhoto",
    "click .photo-avatar" : "setAvatar",
    "click .photo-banner" : "setBanner"
  },

  setBanner: function(event) {
    event.preventDefault();
    event.preventDefault();
    var user = Bokeh.Collections.users.get(this.model.attributes.user_id).bind(this);
    user.attributes.banner_url = this.model.get("original_url");
    user.save();
  },

  setAvatar: function(event) {
    event.preventDefault();
    var user = Bokeh.Collections.users.get(this.model.attributes.user_id).bind(this);
    user.attributes.avatar_url = this.model.get("avatar_url");
    user.save({},{
        success: function(){
          Bokeh.currentUser.fetch();
          user.trigger("avatar")
        }
    });
  },

  deletePhoto: function (event) {
    event.preventDefault();
    this.model.destroy()
  },

  render: function () {
    var renderedContent = this.template({ photo: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
