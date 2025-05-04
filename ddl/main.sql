create schema meu_estoque;

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
