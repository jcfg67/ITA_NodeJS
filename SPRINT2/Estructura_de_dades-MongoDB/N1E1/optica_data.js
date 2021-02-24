db = db.getSiblingDB('optica');
db.dropDatabase();

db.createCollection('suppliers');
db.createCollection('glasses');
db.createCollection('customers');
db.createCollection('orders');
db.createCollection('employees');

db.suppliers.insertOne( {
    name: 'Supplier1',
    address: {
        street: '4th Av',
        number: '55',
        floor: 'B5',
        door: '',
        city: 'NY',
        postal_code: '45648',
        country: 'USA',
    },
    phone: '6656456466',
    fax: '34384334843',
    NIF: 'G188686686'
} );

db.suppliers.insertOne( {
    name: 'Supplier2',
    address: {
        street: '5th Av',
        number: '55',
        floor: '33',
        door: '',
        city: 'NY',
        postal_code: '35688',
        country: 'USA',
    },
    phone: '6464688266',
    fax: '89955648943',
    NIF: 'P986338341'
} );


db.glasses.insertOne( {
    name: 'Ray-Ban',
    supplier_id: db.suppliers.findOne({name: 'Supplier2'})._id
} );

db.glasses.insertOne( {
    name: 'Carrera',
    supplier_id: db.suppliers.findOne({name: 'Supplier1'})._id
} );

db.glasses.insertOne( {
    name: 'Tous',
    supplier_id: db.suppliers.findOne({name: 'Supplier1'})._id
} );

db.glasses.insertOne( {
    name: 'Arnette',
    supplier_id: db.suppliers.findOne({name: 'Supplier2'})._id
} );

db.glasses.insertOne( {
    name: 'Oakley',
    supplier_id: db.suppliers.findOne({name: 'Supplier1'})._id
} );


db.customers.insertOne( {
    name: 'Customer1',
    address: 'Palo Alto, 204 CA',
    phone: '464688620',
    email: 'jhon666@gmail.com',
    registered_at: new Date(2019, 12, 5),
    recommended_by: null
} );

db.customers.insertOne( {
    name: 'Customer2',
    address: 'Boulevard Rose, 8204 MN',
    phone: '685390231',
    email: 'peterkile@outlook.com',
    registered_at: new Date(2020, 1, 7),
    recommended_by: db.customers.findOne({name: 'Customer1'})._id
} );


db.employees.insertOne( {
    name: 'Employee_1_name',
} );

db.employees.insertOne( {
    name: 'Employee_2_name',
} );


db.orders.insertOne( {
    customer_id: db.customers.findOne({name: 'Customer1'})._id,
    brand_id: db.glasses.findOne({name: 'Oakley'})._id,
    graduation_right_eye: 2.75,
    graduation_left_eye: 2.5,
    frame_type: 'rimless',
    frame_color: 'silver',
    right_eye_glass_color: 'yellow-green',
    left_eye_glass_color: 'yellow-green',
    price: 149.99,
    employee: db.employees.findOne({name: 'Employee_1_name'})._id
} );

db.orders.insertOne( {
    customer_id: db.customers.findOne({name: 'Customer2'})._id,
    brand_id: db.glasses.findOne({name: 'Arnette'})._id,
    graduation_right_eye: 0.5,
    graduation_left_eye: 1,
    frame_type: 'plastic',
    frame_color: 'black',
    right_eye_glass_color: 'black',
    left_eye_glass_color: 'black',
    price: 69.99,
    employee: db.employees.findOne({name: 'Employee_2_name'})._id
} );


