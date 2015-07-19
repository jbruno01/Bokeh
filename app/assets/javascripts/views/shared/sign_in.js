Bokeh.Views.SignIn = Backbone.CompositeView.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Bokeh.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit"
  },

  template: JST["shared/sign_in"],

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    Bokeh.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});
