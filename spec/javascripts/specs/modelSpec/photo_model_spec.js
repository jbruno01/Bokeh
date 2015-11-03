//= require application

describe("Photo", function() {

  var photo;

  beforeEach(function() {
    photo = new Bokeh.Models.Photo;
  });

  it("has a comments function", function() {
    expect(photo.comments).toBeDefined();
  });

  it("has a user function", function() {
    expect(photo.user).toBeDefined();
  });

  it("has a taggings function", function() {
    expect(photo.taggings).toBeDefined();
  });
});
