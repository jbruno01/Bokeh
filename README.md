# Bokeh

[Live Demo][demo]

[demo]: http://bokeh-app.xyz.com


##Description

Bokeh is a photo sharing app inspired by Flickr, built on Rails and Backbone. Users can upload, view, and comment on photos.

##Features

###All users:
- Sign up through Bokeh or with Google
- Access any photo contained on the site
- Search for users and photos by name and title, respectively
- When viewing an individual photo, they can also see any comments left for that photo

###Registered-users:
- Upload and delete photos to their account
- Choose an avatar and banner image to personalize their user experience
- Leave comments on photos
- Edit photo information and any comments that they have left



##Technical Details
- 100% of the site's frontend content is Backbone.js consuming JSON passed down through custom Jbuilder templates
- Enhanced security with password encryption using BCrypt
- Sign In/Up through Google omniAuth
- Multisearch with PgSearch
- Photo storage with AWS S3 and the Paperclip gem
- Nested composite views to reduce re-rendering of content
- Drag and Drop multifile uploads

##Languages
- Ruby
- JavaScript
- HTML/CSS

##Frameworks
- Ruby on Rails
- backbone.js

## APIs and Libraries
- Paperclip
- Amazon S3 (Simple Storage Service)
- JQuery
- Jbuilder
- Justified Gallery
- PgSearch
- OmniAuth Google OAuth2

##Future Todos
- Photo tags
- "Favorite" a photo
- Dynamic resizing of avatar and banner images
- Messages between users
- Filmstrip-type functionality when viewing individual photos
