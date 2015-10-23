//= require application

describe("Splash Page", function() {
  var splashView

  beforeEach(function() {
    Bokeh.currentUser = new Bokeh.Models.CurrentUser();
    spyOn(Bokeh.Views.SplashPage.prototype, 'render').and.callThrough();
    splashView = new Bokeh.Views.SplashPage();
  });

  it("has a template set", function() {
    expect(splashView.template).toBeDefined();
  })

  it("has a click event for guestUser", function() {
    expect(splashView.events['click .guest-user']).toBeDefined();
    expect(splashView.events['click .guest-user']).toEqual('guestUser');
  })

  it("has a custom function called guestUser", function() {
    expect(splashView.guestUser).toBeDefined();
  })

  it("rerenders when currentUser signs in/out", function() {
    Bokeh.currentUser.trigger("signIn");
    expect(splashView.render).toHaveBeenCalled();
  })

  it("contains a signUp button", function() {
    splashView.render();
    expect(splashView.$el.html()).toContain("splash-sign-in-up");
  })

});
