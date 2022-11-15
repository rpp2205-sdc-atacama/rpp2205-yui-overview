drop table if exists product;
create table product (
  id integer primary key,
  name character varying(100),
  description varchar(255),
  slogan character varying(100),
  category character varying(50),
  default_price integer
);

drop table if exists features;
create table features (
  id integer primary key,
  product_id integer,
  feature character varying(50),
  value character varying(50),
  foreign key (product_id) references product (id)
);

drop table if exists styles;
create table styles (
  id integer primary key,
  productId integer,
  name character varying(100),
  sale_price integer,
  original_price integer,
  default_style integer,
  foreign key (productId) references product (id)
);

drop table if exists photos;
create table photos (
  id integer primary key,
  styleId integer,
  thumbnail_url character varying(255),
  url character varying(255),
  foreign key (styleId) references styles (id)
);

drop table if exists skus;
create table skus (
  id integer primary key,
  styleId integer,
  quantity integer,
  size character(10),
  foreign key (styleId) references styles (id)
);