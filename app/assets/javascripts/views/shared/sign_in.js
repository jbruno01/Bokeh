Bokeh.Views.SignIn = Backbone.CompositeView.extend({
  template: JST["shared/sign_in"],

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Bokeh.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
    "click .close-modal": "closeSignInForm",
    "click .guest-user" : "guestUser"
  },


  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  closeSignInForm: function(event) {
    event.preventDefault();
    this.remove();
    Backbone.history.navigate("", {trigger: true})
  },

  guestUser: function (event) {
    event.preventDefault();
    Bokeh.currentUser.signIn({
      email: "mark@email.com",
      password: "password"
    });
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
      Backbone.history.navigate("#/explore", { trigger: true });
    }
  }

});
