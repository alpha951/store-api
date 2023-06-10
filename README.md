# Store API

This is a Store API project that provides static product data with multiple query, sorting, pagination functionalities. The API allows users to retrieve product information based on various parameters such as featured status, company, name, and numeric filters.

## Installation

1. Clone the repository: `gh repo clone alpha951/store-api`
2. Navigate to the project directory: `cd store-api`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and add the following environment variables:
    - `PORT`: The port number for the server to listen on.
    - `MONGO_URI`: The MongoDB connection string.

```env

## Usage

1. Start the server: `npm start`
2. Access the API endpoints using a tool like Postman or any HTTP client.

## Endpoints

### GET api/v1/products/static

This endpoint returns static product data for testing purposes.

#### Example Request

```

GET api/v1/products/static

```

#### Example Response

```json
{
  "msg": "Product Testing static route Hit",
  "data": [
    {
      "name": "Product 1",
      "featured": true,
      "price": 10.99,
      "company": "Company A",
      "createdAt": "2023-06-10T12:00:00.000Z",
      "updatedAt": "2023-06-10T12:00:00.000Z"
    },
    {
      "name": "Product 2",
      "featured": true,
      "price": 19.99,
      "company": "Company B",
      "createdAt": "2023-06-09T12:00:00.000Z",
      "updatedAt": "2023-06-09T12:00:00.000Z"
    },
    ...
  ]
}
```

### GET api/v1/products

This endpoint allows querying and retrieving products based on various parameters.

#### Parameters

- `featured` (optional): Filter products by featured status (`true` or `false`).
- `company` (optional): Filter products by company.
- `name` (optional): Filter products by name (case-insensitive, supports partial match).
- `sort` (optional): Sort products by one or more fields. Multiple fields can be separated by commas.
- `fields` (optional): Specify the fields to include or exclude in the query results. Multiple fields can be separated by commas.
- `numericFilters` (optional): Filter products by numeric fields using comparison operators (`>`, `>=`, `=`, `<`, `<=`). Multiple filters can be separated by commas.

#### Example Request

```
GET api/v1/products?featured=true&company=CompanyA&name=phone&sort=price,-rating&fields=name,price,rating&page=1&limit=10
```

#### Example Response

```json
{
  "nbHits": 2,
  "msg": "Product route Hit",
  "data": [
    {
      "name": "Phone A",
      "price": 199.99,
      "rating": 4.5
    },
    {
      "name": "Phone B",
      "price": 299.99,
      "rating": 4.2
    }
  ]
}
```
