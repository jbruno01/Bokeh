# Schema Information

## Albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null
description | string    |
            | timestamps| not null

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null
description | string    |
album_id    | integer   | foreign key
            | timestamps| not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique
            | timestamps| not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
photo_id    | integer   | not null, foreign key (references photo)
tag_id      | integer   | not null, foreign key (references tags)
            | timestamps| not null

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
photo_id    | integer   | not null, foreign key (references photo)
body        | text      | not null
            | timestamps| not null


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
name            | string    | not null
password_digest | string    | not null
session_token   | string    | not null, unique
                | timestamps| not null
