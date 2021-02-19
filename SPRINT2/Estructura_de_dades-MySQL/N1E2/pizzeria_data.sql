USE PIZZERIA;

INSERT INTO provinces VALUES
(1,'California'),
(2,'Nevada');

INSERT INTO cities VALUES
(1,'San Francisco',1),
(2,'Los Angeles',1),
(3,'Sacramento',1),
(4,'Las Vegas',2),
(5,'Reno',2);

INSERT INTO customers VALUES
(1,'Customer_1_Name','Customer_1_Surnames','Address_Customer_1','46468','6656456466',1),
(2,'Customer_2_Name','Customer_2_Surnames','Address_Customer_2','28848','8894355455',2),
(3,'Customer_3_Name','Customer_3_Surnames','Address_Customer_3','58265','6558745855',4),
(4,'Customer_4_Name','Customer_4_Surnames','Address_Customer_4','36879','8695241689',4),
(5,'Customer_5_Name','Customer_5_Surnames','Address_Customer_5','12648','6558745855',5);

INSERT INTO stores VALUES
(1,'Address Store_1','46864',1),
(2,'Address Store_2','58796',4);


INSERT INTO employees VALUES
(1,'Employee_1_name','Employee_1_surnames','83831964V','4689269776','cook',1),
(2,'Employee_2_name','Employee_2_surnames','36855855T','9655873652','delivery',1),
(3,'Employee_3_name','Employee_3_surnames','83479245W','6845932455','cook',2),
(4,'Employee_4_name','Employee_4_surnames','31254687A','6158934874','delivery',2);

INSERT INTO pizza_categories VALUES
(1,'CATEGORÍA_PIZZA_1'),
(2,'CATEGORÍA_PIZZA_2'),
(3,'CATEGORÍA_PIZZA_3'),
(4,'CATEGORÍA_PIZZA_4');

INSERT INTO products VALUES
(1,'Pizza Margarita','Product_1 Description','LINK_FIGURA_PRODUCTO_1',13.5,1),
(2,'Burger XXXL','Product_2 Description','LINK_FIGURA_PRODUCTO_2',5.95,NULL),
(3,'Beer Pilsen','Product_3 Description','LINK_FIGURA_PRODUCTO_3',2.95,NULL);

INSERT INTO orders VALUES
(1,'2020/11/15 18:30','home',25.35,1,1,2,'2020/11/15 19:00'),
(2,'2020/11/15 19:00','store',8.9,2,1,null,null),
(3,'2020/11/15 18:20','home',65.8,3,1,2,'2020/11/15 20:15'),
(4,'2020/11/15 20:05','home',16.45,4,2,4,'2020/11/15 20:45'),
(5,'2020/11/15 19:30','store',17.8,5,2,null,null);

INSERT INTO order_details VALUES
(1,1,1),
(1,2,1),
(1,3,2),
(2,2,1),
(2,3,1),
(3,1,4),
(3,3,4),
(4,1,1),
(4,3,1),
(5,2,2),
(5,3,2);

