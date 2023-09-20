# Routes
- `/users` => Create users; Post request
- `/inventory` => Add product to inventory; authorized Post request
- `/inventory/:id` => Update product in existing inventory; authorized Put request
- `/inventory/sales` => Calculate sales of product by year; authorized Get request
- `/inventory/statistics` => Calculate average sales and value of available products for given period range; authorized Get request

# Notes
- Added payload validation with Joi.