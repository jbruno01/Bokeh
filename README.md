# Bokeh

[Live Demo][demo]

[demo]: http://bokeh-app.xyz.com

## Minimum Viable Product
Bokeh is a photo sharing app inspired by Flickr built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Upload photos
- [x] Leave comments
- [x] Search for photos or other users
- [x] View explore page which is all photos


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, New Photos (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to Sign Up/In and land
on a homepage. Rails controllers will be in place to create new photos. I'll make
sure pushing to Heroku works as well.

[Details][phase-one]

### Phase 2: Backbone integration and Photo Upload (~2 days)
Add backbone implementation for front-end displaying of content. Create models, collections, and views, with Rails serving up JSON. At the end of this phase,
users should be able to navigate through the site using a 1-page design as well
as add photos through filepicker. I'd like to have two options for uploading. If
users click an upload link in the header bar, a popup window will appear allowing them to either drag-and-drop files or directly select files from a file window. Alternatively, if they are currently viewing their photo index page, they will be able to simply drop a photo file anywhere on that page.

[Details][phase-two]

### Phase 3: Editing photo info and leaving comments (~1 day)
Add functionality to edit information about photos. This includes
titles and descriptions. I would like to make most of these things edit-in-place where applicable as well as have a popup window initial input of details; i.e edit in place when views a single photo fullscreen, popup window when uploading photos. Users will also be able to leave comments for every photo. Comments should include a users name as well as some content.

[Details][phase-three]

### Phase 4: Searching for Users or Photos (~1 day)
I'll add a text field to the header bar. After submitting their input, users
should be be shown a page with any matches. These matches can be either photos
or people. Display format should be similar to indexing photos (tiles), with a distinct section for both photos (half the page) and users(the other half). Each tile should be directly clickable and take the user to the desired page.


[Details][phase-four]

### Phase 5: Styling and flashy extras (2-3 days)
The prettify stage. Photo websites are all about presentation. The nicer the frame, the better your photos will look. To that end, I'll implement CSS and JQuery UI methods to add a bunch of extra polish and features. Reordering photos in your albums through drag-and-drop, extra info when hovering over either photos or user avatars, filmstrip and left/right navigation when viewing album photos, etc. I'd like it to look like flickr, but feel less bloated and more elegant.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Filmstrip when viewing photos singularly
- [ ] "Favorite" button and counter for photos
- [ ] "Inspiration" album for users. Photos that they've favorited
- [ ] Pagination/infinite scroll
- [ ] User avatars by way of resizing any photo in their collection
- [ ] Drag to position banner photos for albums and users
- [ ] Typeahead search bar
- [ ] Messages between users
- [ ] Tag photos and albums

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
