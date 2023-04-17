# myIndiaMap

## Project - MapMyIndia

### Project Link ==>  https://mapmyindai.onrender.com

### Overview - A map user visit any place to add memories that location and add videos
### frist  to user login than to create own memories Unauthorized user can not create memories.

## FEATURE I - User

### Models

- User Model

```yaml
{
  name: { string, mandatory },
  email: { string, mandatory, valid email, unique },
  phone :{string ,mantory ,valid phone number ,uniqe}
  password: { string, mandatory, valid password },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}
```

## User APIs

### POST /register

- Create a user document from request body.
- Save password in encrypted format. (use bcrypt-js)
- **Response format**

```yaml
{
  "message": "User registration successfull",
  "data":
    {
      "name": "jon",
      "email": "jon@gmail.com",
       "phone number" : 5847963214
      "_id": "643c2495e44153efbabecb8f",
      "profile" : "apcnd.jpg"
      "createdAt": "2023-04-16T16:38:45.110Z",
      "updatedAt": "2023-04-16T16:38:45.110Z",
    },
}
```

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the userId and a JWT token contatining the userId, exp, iat.
  > **_NOTE:_** There is a slight change in response body. You should also return userId in addition to the JWT token.
- **Response format**
```yaml
{
  "message": "Login Success",
  "data":
    {
      "_id": "6433e4e016a27dfe09b9337f",
      "name": "jon",
      "email": "jon@gmail.com",
      "createdAt": "2023-04-10T10:28:48.448Z",
      "updatedAt": "2023-04-11T13:15:56.868Z",
    },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMzZTRlMDE2YTI3ZGZlMDliOTMzN2YiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE1Mzk3NjYsImV4cCI6MTY4MTYyNjE2Nn0.6y9aKeZMKtRrsqLW9v-1T6IlkcDMaybTC3D-fXgyj5M",
}
```

## FEATTURE II - memories

### Models

- memories Model

```yaml
{
  {
    content: { type: String, require: true},
    "profile" : "apcnd.jpg",
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
}
```

## Memories API (authentication required /  create,get and delete )

### POST /memories

- Create a file document from request body.
- Upload image to S3 bucket and save image public url in document.
- Upload  image S3 bucket and save image public url in document.
- **Response format**

```yaml
{
  "message": "memories Created successfully",
  "data":
    {
  "_id": {
    "$oid": "642ead85dbbf3441a3035d53"
  },
  "content": "this friday is good friday",
  "userId": {
    "$oid": "642ead24dbbf3441a3035d50"
  },
  "lat": "2.45",
  "lang": "8.236",
  "isDeleted": true,
  "createdAt":
  "updatedAt":,
 
}
}
```

### GET /memories

- Returns login user memories  in the collection that aren't deleted.

  
- **Response format**

```yaml
{
    "data": [
        {
            "_id": "6431916c09569017e98eba0a",
            "content" : "today vist delhi "
            "img": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
            "isDeleted": false,
            "createdAt": "2023-04-08T16:08:12.085Z",
            "updatedAt": "2023-04-08T16:08:12.085Z",
            "__v": 0
        },
        {
            "_id": "6431916c09569017e98eba0a",
            "content" : "today vist delhi "
            "img": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/abc/modern-interior-design-grey-living-room2.png",
            "isDeleted": false,
            "createdAt": "2023-04-08T16:08:12.085Z",
            "updatedAt": "2023-04-08T16:08:12.085Z",
            "__v": 0
        },
}


### DELETE /memories/:id

- Deletes a memories id if it's not already deleted
- **Response format**

```yaml
{ "message": "file Deleted successfully" }
```



```yaml
{ "status": false, "message": "You are not loggedIn / You are not authorized " }
```
