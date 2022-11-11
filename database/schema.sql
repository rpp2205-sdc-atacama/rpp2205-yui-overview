drop database if exists sdc_atacama_sql;

create database sdc_atacama_sql;

use sdc_atacama_sql;

drop table if exists product_info;
create table product_info (
  id int primary key,
  name varchar(100),
  description varchar(255),
  slogan varchar(100),
  category varchar(50),
  default_price decimal,
);

drop table if exists features;
create table features (
  product_id int,
  feature varchar(50),
  value varchar(50),
  foreign key (product_id) references product_info (id)
);

drop table if exists styles (
  style_id int primary key,
  product_id int,
  name varchar(100),
  foreign key (product_id) references product_info (id)
);

drop table if exists price;
create table price (
  id int primary key,
  style_id int,
  original_price decimal,
  sale_price decimal,
  foreign key (style_id) references styles (style_id)
);

drop table if exists photos;
create table photos (
  photo_id int primary key,
  style_id int,
  thumbnail_url varchar(255),
  url varchar(255),
  foreign key (style_id) references styles (style_id)
);

drop table if exists skus;
create table skus (
  sku_id int primary key,
  style_id int,
  quantity int,
  size char(10),
  foreign key (style_id) references styles (style_id)
);