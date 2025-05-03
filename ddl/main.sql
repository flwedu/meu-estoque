create table categories (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table products (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    price decimal(10, 2) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table product_images (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references products(id),
    image_url varchar(255) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table product_categories (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references products(id),
    category_id uuid not null references categories(id)
);

create table users (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table stock (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references products(id),
    quantity int not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Índices para melhorar a performance
create index idx_product_categories_product_id on product_categories(product_id);
create index idx_product_categories_category_id on product_categories(category_id);
create index idx_product_images_product_id on product_images(product_id);
create index idx_stock_product_id on stock(product_id);
create index idx_users_email on users(email);
