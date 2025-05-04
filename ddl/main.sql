create table meu_estoque.categories (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table meu_estoque.products (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    price decimal(10, 2) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table meu_estoque.product_images (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references meu_estoque.products(id),
    image_url varchar(255) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table meu_estoque.product_categories (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references meu_estoque.products(id),
    category_id uuid not null references meu_estoque.categories(id)
);

create table meu_estoque.users (
    id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table meu_estoque.stock (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references meu_estoque.products(id),
    quantity int not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table meu_estoque.movements (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references meu_estoque.products(id),
    quantity int not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Índices para melhorar a performance
create index idx_product_categories_product_id on meu_estoque.product_categories(product_id);
create index idx_product_categories_category_id on meu_estoque.product_categories(category_id);
create index idx_product_images_product_id on meu_estoque.product_images(product_id);
create index idx_stock_product_id on meu_estoque.stock(product_id);
create index idx_users_email on meu_estoque.users(email);
