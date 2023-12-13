## Endpoints
### 1. Get User Total Coins and Recycling
- **URL**: `/user/coins`
- **Method**: `GET`
- **Headers**:
   - Authorization: Bearer Token
- **Response:**
   - status code: `200`
      ```json
      {
          "name":
          "coins":
          "listRecycling":
          "totalWithdraw":
      }
      ```

### 2. Update User Coins
- **URL**: `/user/coins`
- **Method**: `PUT`
- **Headers**:
   - Authorization: Bearer Token
- **Request Body**:
   - inputCoins (number)
- **Response**:
   - status code: `200`
     ```json
     {
         "updateCoins":
     }
     ```
     
