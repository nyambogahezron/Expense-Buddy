-- ##### 
-- users profile table
-- #####
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  primary key (id)
);
alter table public.profile enable row level security;
-- inserts a row into public.profile
create function public.handle_new_user() returns trigger language plpgsql security definer
set search_path = '' as $$ begin
insert into public.profile (id, name, email)
values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'email'
  );
return new;
end;
$$;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
-- #########
-- Create the TransactionsTypes table
-- ########
CREATE TABLE TransactionsTypes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(10) NOT NULL
);
create or replace function insert_default_categories () returns trigger language plpgsql security definer
set search_path = '' as $$ BEGIN
INSERT INTO categories (name, icon, "user")
VALUES ('Food', '🍜', new.id),
  ('Transport', '🚗', new.id),
  ('Home', '🏠', new.id),
  ('Health', '🚑', new.id),
  ('Entertainment', '🎬', new.id),
  ('Shopping', '🛍️', new.id),
  ('Online Services Subscription', '💻', new.id),
  ('Salary', '💰', new.id),
  ('Business', '🏢', new.id),
  ('Investment', '📈', new.id),
  ('Clothing', '👔', new.id),
  ('Other', '❓', new.id);
END;
$$;
create trigger on_auth_user_set_defaults
after
insert on auth.users for each row execute procedure insert_default_categories ();
-- #########
-- Create the transactions table
-- ########
-- Create the transactions table
CREATE TABLE public.transactions (
  id SERIAL PRIMARY KEY,
  userId UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  iconColor VARCHAR(7) DEFAULT '#FFA500',
  type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
  category JSONB NOT NULL,
  transactionFee DECIMAL(10, 2) NOT NULL,
  description TEXT,
  receipt TEXT
);