Bokeh.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  photos: function() {
    if(!this._photos){
      this._photos = new Bokeh.Collections.Photos([], { user: this })
    }
    return this._photos;
  },

  albums: function() {
    if(!this._albums){
      this._albums = new Bokeh.Collections.Albums([], { user: this })
    }
    return this._albums;
  },

  parse: function(response) {
    if(response.photos){
      this.photos().set(response.photos, { parse: true });
      delete response.photos;
    }

    if(response.albums){
      this.albums().set(response.albums, { parse: true});
      delete response.albums;
    }

    return response;
  }
})

Bokeh.Models.CurrentUser = Bokeh.Models.User.extend({

  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
        Backbone.history.navigate("#/explore", {trigger: true})
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
