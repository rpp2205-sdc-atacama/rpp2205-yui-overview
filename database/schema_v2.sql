drop database if exists sdc_atacama_sql;

create database sdc_atacama_sql;

use sdc_atacama_sql;

drop table if exists product;
create table product (
  id integer primary key,
  name varchar(100),
  description varchar(255),
  slogan varchar(100),
  category varchar(50),
  default_price integer,
);

drop table if exists features;
create table features (
  id integer primary key,
  product_id integer,
  feature varchar(50),
  value varchar(50),
  foreign key (product_id) references product (id)
);

drop table if exists styles;
create table styles (
  id integer primary key,
  productId integer,
  name varchar(100),
  sale_price integer,
  original_price integer,
  default_style integer,
  foreign key (productId) references product (id)
);

drop table if exists photos;
create table photos (
  id integer primary key,
  styleId integer,
  thumbnail_url varchar(255),
  url varchar(255),
  foreign key (styleId) references styles (id)
);

drop table if exists skus;
create table skus (
  id integer primary key,
  styleId integer,
  quantity integer,
  size char(10),
  foreign key (styleId) references styles (id)
);