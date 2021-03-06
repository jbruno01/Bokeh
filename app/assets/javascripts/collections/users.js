Bokeh.Collections.Users = Backbone.Collection.extend({
  model: Bokeh.Models.User,
  url: "api/users/",


  getOrFetch: function(id) {
    var user = this.get(id);
    if(!user) {
      var user = new Bokeh.Models.User({ id: id });
      var users = this;
      user.fetch({
        success: function () {
          users.add(user)
        }
      })
    } else {
      user.fetch();
    }

    return user;
  }

})

Bokeh.Collections.users = new Bokeh.Collections.Users()
