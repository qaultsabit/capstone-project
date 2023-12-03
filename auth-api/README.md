## Endpoints
### 1. Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
   - email (string)
   - password (string)
- **Response:**
   - status code: `200`
      ```json
      {
         "error": false,
         "message": "success",
         "loginResult": {
             "userId": "userId",
             "name": "userName",
             "token": "token"
        }
      }
      ```

### 2. Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
   - name (string)
   - email (string)
   - password (string)
- **Response**:
   - status code: `201`
     ```json
     {
        "error": false,
        "message": "User created"
     }
     ```
     
