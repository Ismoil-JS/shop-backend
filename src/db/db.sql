CREATE DATABASE "exam3";

CREATE TABLE categories (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(64) NOT NULL
);

INSERT INTO categories (name) VALUES ('Transport');
INSERT INTO categories (name) VALUES ('Food');
INSERT INTO categories (name) VALUES ('Clothes');
INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Other');


CREATE TABLE subCategories (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(64) NOT NULL,
    categoryId INTEGER NOT NULL DEFAULT 5,
    FOREIGN KEY (categoryId) REFERENCES categories(id) 
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


INSERT INTO subCategories (name, categoryId) VALUES ('From abroad', 1);
INSERT INTO subCategories (name, categoryId) VALUES ('Chevrolet', 1);
INSERT INTO subCategories (name, categoryId) VALUES ('Food', 2);
INSERT INTO subCategories (name, categoryId) VALUES ('Drink', 2);
INSERT INTO subCategories (name, categoryId) VALUES ('Snack', 2);
INSERT INTO subCategories (name, categoryId) VALUES ('Clothes for olders', 3);
INSERT INTO subCategories (name, categoryId) VALUES ('Clothes for children', 3);
INSERT INTO subCategories (name, categoryId) VALUES ('Phone', 4);
INSERT INTO subCategories (name, categoryId) VALUES ('Laptop', 4);
INSERT INTO subCategories (name, categoryId) VALUES ('Other', 5);

select c.name, sc.name from categories c inner join subcategories sc on sc.categoryid = c.id;

CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    subCategoryId INTEGER NOT NULL,
    FOREIGN KEY (subCategoryId) REFERENCES subCategories(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

ALTER TABLE products ALTER COLUMN subCategoryId SET DEFAULT 10;

INSERT INTO products (name, price, subCategoryId) VALUES ('BMW', 10000, 1);
INSERT INTO products (name, price, subCategoryId) VALUES ('Mercedes', 15000, 1);
INSERT INTO products (name, price, subCategoryId) VALUES ('Audi', 12000, 1);
INSERT INTO products (name, price, subCategoryId) VALUES ('Captiva', 8000, 2);
INSERT INTO products (name, price, subCategoryId) VALUES ('Maluba', 5000, 2);
INSERT INTO products (name, price, subCategoryId) VALUES ('Cabolat', 5000, 2);
INSERT INTO products (name, price, subCategoryId) VALUES ('Burger', 1000, 3);
INSERT INTO products (name, price, subCategoryId) VALUES ('Pizza', 2000, 3);
INSERT INTO products (name, price, subCategoryId) VALUES ('Coca Cola', 500, 4);
INSERT INTO products (name, price, subCategoryId) VALUES ('Fanta', 500, 4);
INSERT INTO products (name, price, subCategoryId) VALUES ('Sprite', 500, 4);
INSERT INTO products (name, price, subCategoryId) VALUES ('Lays', 500, 5);
INSERT INTO products (name, price, subCategoryId) VALUES ('Pringles', 500, 5);
INSERT INTO products (name, price, subCategoryId) VALUES ('Doritos', 500, 5);
INSERT INTO products (name, price, subCategoryId) VALUES ('T-shirt', 500, 6);
INSERT INTO products (name, price, subCategoryId) VALUES ('Shirt', 500, 6);
INSERT INTO products (name, price, subCategoryId) VALUES ('Pants', 500, 6);
INSERT INTO products (name, price, subCategoryId) VALUES ('Dress', 500, 7);
INSERT INTO products (name, price, subCategoryId) VALUES ('Skirt', 500, 7);
INSERT INTO products (name, price, subCategoryId) VALUES ('T-shirt', 500, 7);
INSERT INTO products (name, price, subCategoryId) VALUES ('Iphone', 500, 8);
INSERT INTO products (name, price, subCategoryId) VALUES ('Samsung', 500, 8);
INSERT INTO products (name, price, subCategoryId) VALUES ('Huawei', 500, 8);
INSERT INTO products (name, price, subCategoryId) VALUES ('Macbook', 500, 9);
INSERT INTO products (name, price, subCategoryId) VALUES ('Lenovo', 500, 9);
INSERT INTO products (name, price, subCategoryId) VALUES ('Asus', 500, 9);
INSERT INTO products (name, price, subCategoryId) VALUES ('Other', 500, 10);

SELECT 
    c.name AS category_name,
    sc.name AS sub_category_name,
    p.name AS product_name,
    p.price AS product_price
FROM
    products p
INNER JOIN
    subCategories sc ON sc.id = p.subCategoryId
INNER JOIN
    categories c ON c.id = sc.categoryId;


-- THIS IS FOR USER TABLE

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    accessToken VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(255) NULL,
    deleted_at TIMESTAMP NULL
);

-- THIS IS FOR ORDER TABLE

CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    userId VARCHAR(255) NOT NULL,
    productId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
    FOREIGN KEY (productId) REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

insert into orders(userid, productid) values('user_id(uuid)', 3); // this is for testing

-- TO SEE ORDERS TABLE
CREATE VIEW orders_view AS
SELECT 
    u.username AS username,
    p.name AS order_name,
    p.price AS product_price
FROM
    products p
INNER JOIN
    orders o ON p.id = o.productId
INNER join
    users u ON u.id = o.userId;