## Endpoints
### 1. Add Favorite Article
- **URL**: `/user/favorite`
- **Method**: `POST`
- **Headers**: Authorization: Bearer Token
- **Request Body**: id (string)

### 2. Get Favorite Articles
- **URL**: `/user/favorite`
- **Method**: `GET`
- **Headers**: Authorization: Bearer Token

### 3. Get Detail Favorite Articles
- **URL**: `/user/favorite/:id`
- **Method**: `GET`
- **Headers**: Authorization: Bearer Token

### 4. Delete Favorite Article
- **URL**: `/user/favorite/:id`
- **Method**: `DELETE`
- **Headers**: Authorization: Bearer Token

### 5. Get Recomendation Article
- **URL**: `/articles/recommendation/:judul`
- **Method**: `GET`
- **Headers**: Authorization: Bearer Token
