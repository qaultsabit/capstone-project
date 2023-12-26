# Capstone Bangkit Academy CH2-PS491

## Introduction

Recycle Me is an Sustainable Living App Android platform that can make it easier for users, especially Indonesians, to recycle waste. In this application there are 3 main features, namely:
- Complete recycling articles with 8 waste categories
- Scan trash along with recommended articles about recycling
- Coin rewards that can be exchanged for E-Wallet balance

## Our Goals
- Educate and Raise Awareness: Our primary goal is to educate users about the importance of recycling and raise awareness about sustainable living practices. Through comprehensive recycling articles covering eight waste categories, we aim to provide users with valuable information on how to effectively manage and recycle different types of waste.

# Recycle Me API

## Installation and Usage

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Google Cloud SDK](https://cloud.google.com/sdk)

### Installation Steps

1. Clone this repository:

    ```bash
    git clone https://github.com/CH2-PS491-Capstone/Recycle-Me-API.git
    cd auth-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file and fill it with the required configuration information:

    ```env
    PORT=8787
    JWT_KEY=
    FIREBASE_PROJECT_ID=
    FIREBASE_PRIVATE_KEY=
    GOOGLE_PRIVATE_KEY=
    GOOGLE_CLIENT_EMAIL=
    GCLOUD_BUCKET_NAME=
    ```

### Usage

1. Run the API locally:

    ```bash
    npm run start
    ```

    The API will be accessible at `http://localhost:8787`.

2. Test the API using Postman or other API testing software.

## Deploy to Google Cloud Run

1. Log in to your Google Cloud account using the Google Cloud SDK:

    ```bash
    gcloud auth login
    ```

2. Set the GCP project to be used:

    ```bash
    gcloud config set project your-gcp-project-id
    ```

3. Build and deploy to Cloud Run:

    ```bash
    gcloud builds submit --tag gcr.io/your-gcp-project-id/project-name
    gcloud run deploy --image gcr.io/your-gcp-project-id/project-name
    ```

4. Access the newly deployed API endpoint.
