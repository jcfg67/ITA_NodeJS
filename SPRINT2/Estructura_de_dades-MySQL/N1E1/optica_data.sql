USE OPTICA;

INSERT INTO suppliers (supplier_id, name, street, number, floor, door, city, postal_code, country, phone, fax, NIF)
VALUES
(1,'Supplier_1','4th Av','55','B5',null,'NY','45648','USA','6656456466','34384334843','G188686686'),
(2,'Supplier_2','5th Av','55','33',null,'NY','35688','USA','6464688266','89955648943','P986338341');

INSERT INTO brands (brand_id, name, supplier_id)
VALUES
(1,'Ray-Ban',2),
(2,'Carrera',1),
(3,'Tous',1),
(4,'Arnette',2),
(5,'Oakley',1);

INSERT INTO customers (customer_id, name, address, phone, email, registered_at, recommended_by)
VALUES
(1,'Customer_1','Palo Alto, 204 CA','464688620','jhon666@gmail.com','2019/12/5',null),
(2,'Customer_2','Boulevard Rose, 8204 MN','589362547','peterkile@outlook.com','2020/01/7',1);

INSERT INTO employees (employee_id, name)
VALUES
(1,'Employee_1'),
(2,'Employee_2');

INSERT INTO glasses (glass_id, brand_id, graduation_right_eye, graduation_left_eye, frame_type, frame_color, right_eye_glass_color, left_eye_glass_color, price)
VALUES
(1,5,2.75,2.5,'rimless','silver','yellow-green','yellow-green',149.99),
(2,4,0.5,1,'plastic','black','black','black',69.99),
(3,2,3.0,2.75,'plastic','black','transparent','transparent',129.5);

INSERT INTO orders (order_id, customer_id, glass_id, employee_id)
VALUES
(1,1,1,1),
(2,2,2,1),
(3,1,3,2);

