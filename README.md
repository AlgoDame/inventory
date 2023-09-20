# Routes
- `/users` => Create users; Post request
- `/inventory` => Add product to inventory; authorized Post request
- `/inventory/:id` => Update product in existing inventory; authorized Put request
- `/inventory/sales` => Calculate sales of product by year; authorized Get request
- `/inventory/statistics` => Calculate average sales and value of available products for given period range; authorized Get request

# Notes
- Added payload validation with Joi.
- Bulk inserted products into the `Inventory` collection via mongodb shell using the command `db.inventories.insertMany(<productArray>)`


```js
[
    {
        "name": "Puree - Kiwi",
        "price": 198,
        "qtyAvailable": 31,
        "qtySold": 73,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2021-04-19"),
        "updatedAt": ISODate("2023-01-21")
    },
    {
        "name": "Dikon",
        "price": 113,
        "qtyAvailable": 86,
        "qtySold": 79,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2022-07-26"),
        "updatedAt": ISODate("2021-03-01")
    },
    {
        "name": "Fireball Whisky",
        "price": 189,
        "qtyAvailable": 78,
        "qtySold": 6,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2022-08-12"),
        "updatedAt": ISODate("2022-08-29")
    },
    {
        "name": "Garlic - Peeled",
        "price": 105,
        "qtyAvailable": 56,
        "qtySold": 1,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2022-08-17"),
        "updatedAt": ISODate("2021-05-26")
    },
    {
        "name": "Tart Shells - Savory, 2",
        "price": 341,
        "qtyAvailable": 29,
        "qtySold": 61,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2022-05-07"),
        "updatedAt": ISODate("2023-01-13")
    },
    {
        "name": "Chick Peas - Dried",
        "price": 126,
        "qtyAvailable": 99,
        "qtySold": 62,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2021-01-01"),
        "updatedAt": ISODate("2023-07-17")
    },
    {
        "name": "Jolt Cola",
        "price": 328,
        "qtyAvailable": 81,
        "qtySold": 9,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2022-12-07"),
        "updatedAt": ISODate("2022-06-06")
    },
    {
        "name": "Sugar - Splenda Sweetener",
        "price": 208,
        "qtyAvailable": 50,
        "qtySold": 32,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2022-10-15"),
        "updatedAt": ISODate("2022-11-17")
    },
    {
        "name": "Wine - Bourgogne 2002, La",
        "price": 106,
        "qtyAvailable": 81,
        "qtySold": 18,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2023-03-05"),
        "updatedAt": ISODate("2023-04-21")
    },
    {
        "name": "Huck White Towels",
        "price": 210,
        "qtyAvailable": 73,
        "qtySold": 99,
        "userId": ObjectId('650b2dea51065ecfe0aa9806'),
        "createdAt": ISODate("2021-01-13"),
        "updatedAt": ISODate("2021-01-05")
    }
]
```

# Run project
- npm install
- npm run dev

# Dependencies
- MongoDB
- Node.js

