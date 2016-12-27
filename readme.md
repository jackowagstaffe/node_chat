Node Chat App
=============

Routes
------

 - `GET /` load single page chat app
 - `POST /login` login
 - `POST /logout` logout

### Users
 - `GET /api/users` list users
 - `GET /api/users/{id}` get info about a user
 - `POST /api/users`
 - `PUT /api/users/{id}` update a user
 - `DELETE /api/users/{id}` delete a user

### Threads
 - `GET /threads` list threads
 - `GET /threads/{id}` get details of a specific thread
 - `POST /threads` create new thread
 - `PUT /threads/{id}` update a thread
 - `DELETE /threads/{id}` delete a thread

#### Threads/Messages

 - `GET /threads/{id}/messages` get the messages for a thread
 - `POST /threads/{id}/messages` add a message to a thread
 - `DELETE /threads/{id}/messages` soft delete a message from a thread

 also have a socket broadcasting new messages for each thread

Objects
-------

### User

|Field      |Type    |
|-----------|--------|
|username   |string  |
|password   |string  |
|admin      |boollean|
|img        |string  |
|description|string  |

### Thread

|Field   |Type     |
|--------|---------|
|name    |string   |
|created |timestamp|
|updated |timestamp|
|users   |json     |
|settings|json     |

### Message

|Field    |Type  |
|---------|------|
|thread_id|int   |
|user_id  |int   |
|text     |string|
|settings |json  |
