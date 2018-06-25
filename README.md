# movie-api
movie api

# Category

| Route | HTTP Verb	 | POST body	 | Description |
| --- | --- | --- | --- |
| /api/category | `POST` | { 'category' : 'catname', 'catSubNumber' : 'subnumber', 'catNumber' :'catNumber' }  | redirect category list|
| /api/category | `GET` | top category | Category List |;
| /api/category/:category_id | `GET` | Movies related to category | Category detail |
| /api/category/:category_id | `PUT` | Category update | Redirect category list |
| /api/category/:category_id | `DELETE` | Category delete | Redirect category list |


# Movies

| Route | HTTP Verb	 | POST body	 | Description |
| --- | --- | --- | --- |
| /api/movies | `POST` | {'director' : 'id', 'category' : 'movies-category', 'title' : 'movies-name(unique, required)', 'movie_img' : 'movie-img', 'movie-video' : 'video, 'country' : 'movies-coutnry', 'year' : 'Date', 'imdb_score' : 'movies_imdb'  } | Movie Detail |
| /api/movies | `GET` | Movies List | Movies List |
| /api/movies/:movies_id | `GET` | Movie Detail | Movie Detail |
| /api/movies/:movies_id | `PUT`| Movie Update | Redirect Movie Detail |
| /api/movies/:movies_id | `DELETE` | Movies Delete | Redirect Movie List |
| /api/movies/top10 | `GET` | Get the top 10 movies | Get the top 10 movies  |
| /api/movies/between/:start_year/:end_year | `GET` | Movies between two dates | Movies between two dates |

# Director

| Route | HTTP Verb	 | POST body	 | Description |
| --- | --- | --- | --- |
| /api/director | `POST` | { 'director_name' : 'name', 'director_surname' : 'surname', 'director_bio' : 'biography', 'director_age' : 'age', 'director_rate' : 'director_rate', } | Director detail   |
| /api/director | `GET` | Director list | Director List  |
| /api/director/:director_id | `GET` | Director Detail | Director Detail |
| /api/director/:director_id | `PUT` | Update Director | Director Detail |
| /api/director/:director_id | `DELETE` | Delet Director | Director List |
| /api/director/between/:start_year/:end_year | `GET` | Director between two age | Director between two age |

