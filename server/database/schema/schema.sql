drop table if exists product_info cascade;
create table product_info (
  id integer primary key,
  name text,
  slogan text,
  description text,
  category character varying(50),
  default_price integer
);

drop table if exists features;
create table features (
  id integer primary key,
  product_id integer,
  feature character varying(50),
  value character varying(50),
  foreign key (product_id) references product_info (id)
);

drop table if exists styles cascade;
create table styles (
  style_id integer primary key,
  product_id integer,
  name character varying(100),
  default_style integer,
  foreign key (product_id) references product_info (id)
);

drop table if exists prices;
create table prices (
  price_id integer primary key,
  style_id integer,
  sale_price integer,
  original_price integer,
  foreign key (style_id) references styles (style_id)
);

drop table if exists photos;
create table photos (
  photo_id integer primary key,
  style_id integer,
  url text,
  thumbnail_url text,
  foreign key (style_id) references styles (style_id)
);

drop table if exists skus;
create table skus (
  sku_id integer primary key,
  style_id integer,
  size character varying(10),
  quantity integer,
  foreign key (style_id) references styles (style_id)
);

drop table if exists related;
create table related (
  related_id serial primary key,
  product_id integer,
  related_product_id integer,
  foreign key (product_id) references product_info (id)
);

CREATE index idx_product_id ON product_info(id);
CREATE index idx_feature_id ON features(product_id);
CREATE index idx_style ON styles(product_id);
CREATE index idx_photos ON photos(style_id);
CREATE index idx_prices ON prices(style_id);
CREATE index idx_skus ON skus(style_id);
CREATE index idx_related ON related(product_id);
