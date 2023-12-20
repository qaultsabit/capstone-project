## Endpoints
### 1. Add Favorite Article
- **URL**: `/user/articles`
- **Method**: `POST`
- **Headers**: Authorization: Bearer Token
- **Request Body**: id (string)

### 2. Get Favorite Articles
- **URL**: `/user/articles`
- **Method**: `GET`
- **Headers**: Authorization: Bearer Token

### 3. Get Detail Favorite Articles
- **URL**: `/user/articles/:id`
- **Method**: `GET`
- **Headers**: Authorization: Bearer Token

### 4. Delete User Recycling
- **URL**: `/user/articles/:id`
- **Method**: `DELETE`
- **Headers**: Authorization: Bearer Token

### 5. Get Recomendation Article
- **URL**: `/articles/recommendation/:judul`
- **Method**: `GET`
- **Headers**: Authorization: Bearer Token
