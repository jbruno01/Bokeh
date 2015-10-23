//= require application

describe("User", function() {
  var user;

  beforeEach(function() {
    user = new Bokeh.Models.User({
      "name": 'John',
      "banner_url": "test_banner.com",
      "avatar_url": "test_avatar.com"
    });
  });

  it("has a name", function() {
    expect(user.get("name")).toEqual("John");
  })

  it("has a banner and avatar url", function() {
    expect(user.get("banner_url")).toEqual("test_banner.com");
    expect(user.get("avatar_url")).toEqual("test_avatar.com");
  })

  it("has a photos function", function() {
    expect(user.photos).toBeDefined();
  })

  it("has a parse function", function() {
    expect(user.parse).toBeDefined();
  })
});
