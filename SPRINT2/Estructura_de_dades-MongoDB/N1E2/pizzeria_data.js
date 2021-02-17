db = db.getSiblingDB('pizzeria');
db.dropDatabase();

db.createCollection('customers');
db.createCollection('products');
db.createCollection('stores');
db.createCollection('employees');
db.createCollection('orders');

db.customers.insertOne( {
    name: 'Customer_1_Name',
    surnames: 'Customer_1_Surnames',
    address: 'Address_Customer_1',
    postal_code: '46468',
    city: 'San Francisco',
    province: 'California',
    phone_number: '6656456466'
} );

db.customers.insertOne( {
    name: 'Customer_2_Name',
    surnames: 'Customer_2_Surnames',
    address: 'Address_Customer_2',
    postal_code: '28848',
    city: 'Los Angeles',
    province: 'California',
    phone_number: '8894355455'
} );


db.products.insertOne( {
    name: 'Pizza Margarita',
    description: 'Product_1 Description',
    picture: 'FIGURA_PRODUCTO_1',
    price: 13.5,
    pizza_category: 'CATEGORÍA_PIZZA_1'
} );

db.products.insertOne( {
    name: 'Burger XXXL',
    description: 'Product_2 Description',
    picture: 'FIGURA_PRODUCTO_2',
    price: 5.95,
    pizza_category: null
} );

db.products.insertOne( {
    name: 'Beer Pilsen',
    description: 'Product_3 Description',
    picture: 'FIGURA_PRODUCTO_3',
    price: 2.95,
    pizza_category: null
} );


db.stores.insertOne( {
    address: 'Address Store_1',
    postal_code: '46864',
    city: 'San Francisco',
    province: 'California'
} );

db.stores.insertOne( {
    address: 'Address Store_2',
    postal_code: '58796',
    city: 'Las Vegas',
    province: 'Nevada'
} );


db.employees.insertOne( {
    name: 'Employee_1_name',
    surnames: 'Employee_1_surnames',
    NIF: '83831964V',
    phone_number: 4689269776,
    job_position: 'cook',
    store_id: db.stores.findOne({address: 'Address Store_1'})._id
} );

db.employees.insertOne( {
    name: 'Employee_2_name',
    surnames: 'Employee_2_surnames',
    NIF: '36855855T',
    phone_number: 9655873652,
    job_position: 'delivery',
    store_id: db.stores.findOne({address: 'Address Store_1'})._id
} );

db.employees.insertOne( {
    name: 'Employee_3_name',
    surnames: 'Employee_3_surnames',
    NIF: '83479245W',
    phone_number: 6845932455,
    job_position: 'cook',
    store_id: db.stores.findOne({address: 'Address Store_2'})._id
} );

db.employees.insertOne( {
    name: 'Employee_4_name',
    surnames: 'Employee_4_surnames',
    NIF: '31254687A',
    phone_number: 6158934874,
    job_position: 'delivery',
    store_id: db.stores.findOne({address: 'Address Store_2'})._id
} );


db.orders.insertOne( {
    customer_id: db.customers.findOne({name: 'Customer_1_Name'})._id,
    date_time: new Date(2020, 11, 15, 18, 30),
    delivery_location: 'home',
    order_details: [{
        product_id: db.products.findOne({name: 'Pizza Margarita'})._id,
        quantity: 1},
        {product_id: db.products.findOne({name: 'Burger XXXL'})._id,
        quantity: 1},
        {product_id: db.products.findOne({name: 'Beer Pilsen'})._id,
        quantity: 2}],
    total: 25.35,
    store_id: db.stores.findOne({address: 'Address Store_1'})._id,
    delivered_date: new Date(2020, 11, 15, 19, 00),
    employee_id: db.employees.findOne({name: 'Employee_2_name'})._id
} );

db.orders.insertOne( {
    customer_id: db.customers.findOne({name: 'Customer_2_Name'})._id,
    date_time: new Date(2020, 11, 15, 19, 12),
    delivery_location: 'store',
    order_details: [{
        product_id: db.products.findOne({name: 'Burger XXXL'})._id,
        quantity: 1},
        {product_id: db.products.findOne({name: 'Beer Pilsen'})._id,
        quantity: 1}],
    total: 8.9,
    store_id: db.stores.findOne({address: 'Address Store_1'})._id,
    delivered_date: null,
    employee_id: null
} );



