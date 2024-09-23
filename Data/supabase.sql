
-- users profile table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,

  primary key (id)
);

alter table public.profile enable row level security;

-- inserts a row into public.profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profile (id, name, email)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'email');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create the TransactionsTypes table
CREATE TABLE TransactionsTypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(10) NOT NULL
);

-- Insert the data
-- Insert the data
INSERT INTO TransactionsTypes (id, name, icon) VALUES
(1, 'Food', '🍜'),
(2, 'Transport', '🚗'),
(3, 'Home', '🏠'),
(4, 'Health', '🚑'),
(5, 'Entertainment', '🎬'),
(6, 'Shopping', '🛍️'),
(7, 'Online Services Subscription', '💻'),
(8, 'Salary', '💰'),
(9, 'Business', '🏢'),
(10, 'Investment', '📈'),
(11, 'Clothing', '👔'),
(12, 'Other', '❓');


create
or replace function insert_default_categories () returns trigger language plpgsql security definer
set
  search_path = '' as $$
BEGIN
    INSERT INTO categories (name, icon, "user") VALUES
    ( 'Food', '🍜', new.id),
    ( 'Transport', '🚗', new.id),
    ( 'Home', '🏠', new.id),
    ( 'Health', '🚑', new.id),
    ( 'Entertainment', '🎬', new.id),
    ( 'Shopping', '🛍️', new.id),
    ( 'Online Services Subscription', '💻', new.id),
    ( 'Salary', '💰', new.id),
    ( 'Business', '🏢', new.id),
    ( 'Investment', '📈', new.id),
    ( 'Clothing', '👔', new.id),
    ( 'Other', '❓', new.id);
END;
$$;

create trigger on_auth_user_set_defaults
after insert on auth.users for each row
execute procedure insert_default_categories ();