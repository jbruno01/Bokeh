Bokeh.Models.Photo = Backbone.Model.extend({
  urlRoot: '/api/photos',


  toJSON: function() {
    var json = {
      photo: _.clone(this.attributes)
    };
    return json;
  },

  user: function() {
    if (!this._user) {
      this._user = new Bokeh.Models.User([], {
        photo: this
      })
    }

    return this._user;
  },

  comments: function() {
    if (!this._comments) {
      this._comments = new Bokeh.Collections.Comments([], {
        photo: this
      })
    }
    return this._comments;
  },

  taggings: function() {
    if (!this._taggings) {
      this._taggings = new Bokeh.Collections.Taggings([], {
        photo: this
      })
    }
    return this._taggings;
  },

  tagNames: function(){
    if (!this._tagNames) {
      this._tagNames = []
    }
    return this._tagNames;
  },

  saveFormData: function(formData, options) {
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp) {
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp) {
        options.error && options.error(resp, model, options);
      }
    });
  },


  parse: function(response) {
    if (response.comments) {
      this.comments().set(response.comments, {
        parse: true
      });
      delete response.comments;
    };

    if (response.user) {
      this.user().set(response.user, {
        parse: true
      });
      delete response.user;
    };

    if (response.taggings) {
      this.taggings().set(response.taggings, {
        parse: true
      });
      delete response.taggings;
    };

    if (response.tag_names) {
      this._tagNames = response.tag_names;
      delete response.tag_names;
    };

    return response;
  }
})
