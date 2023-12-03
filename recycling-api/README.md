## Endpoints
### 1. Add Recycling
- **URL**: `/recycling/add`
- **Method**: `POST`
- **Headers**:
   - Content_Type: multipart/form-data
   - Authorization: Bearer <token>
- **Request Body**:
   - barang (string)
   - kategori (string)
   - recycling (string)
   - description (string)
   - photo (file)
- **Response:**
   - status code: `201`
      ```json
      {
         "error": false,
         "message": "success",
         "coins": 10
      }
      ```

### 2. Get User Recycling Results
- **URL**: `/recycling/results`
- **Method**: `GET`
- **Headers**:
   - Authorization: Bearer <token>
- **Response:**
   - status code: `200`
      ```json
      {
          "error": false,
          "message": "User Recycling Results fetched successfully",
          "listRecycling": [
              {
                  "id": "recyclingId",
                  "nama": "userName",
                  "barang": "barang",
                  "kategori": "kategori"
                  "recycling": "recycling",
                  "description": "description",                  
                  "photoUrl": "https://storage.googleapis.com/",
                  "coins": 10
              },
              {
                  "id": "recyclingId",
                  "nama": "userName",
                  "barang": "barang",
                  "kategori": "kategori"
                  "recycling": "recycling",
                  "description": "description",                  
                  "photoUrl": "https://storage.googleapis.com/",
                  "coins": 10
              },
              ...
          ]
      }
      ```

### 3. Get Detail User Recycling Results
- **URL**: `/recycling/results/:id`
- **Method**: `GET`
- **Headers**:
   - Authorization: Bearer <token>
- **Response:**
   - status code: `200`
      ```json
      {
          "error": false,
          "message": "User Recycling Results fetched successfully",
          "Recycling":  {
              "id": "recyclingId",
              "nama": "userName",
              "barang": "barang",
              "kategori": "kategori"
              "recycling": "recycling",
              "description": "description",                  
              "photoUrl": "https://storage.googleapis.com/",
              "coins": 10
          }
      }
      ```
