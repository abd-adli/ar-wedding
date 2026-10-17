-- ========================================================
-- Supabase Setup Script for AR-Wedding (Anchored Realm)
-- Paste and run this in your Supabase Dashboard -> SQL Editor
-- ========================================================

-- ── 1. Create the wedding_guestbook table ────────────────
create table if not exists public.wedding_guestbook (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.wedding_guestbook enable row level security;

-- Policies for wedding_guestbook
drop policy if exists "Allow public read access on wedding_guestbook" on public.wedding_guestbook;
create policy "Allow public read access on wedding_guestbook"
  on public.wedding_guestbook for select
  using (true);

drop policy if exists "Allow public insert access on wedding_guestbook" on public.wedding_guestbook;
create policy "Allow public insert access on wedding_guestbook"
  on public.wedding_guestbook for insert
  with check (true);

-- Enable Realtime Replication for instant live UI updates
do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'wedding_guestbook'
  ) then
    alter publication supabase_realtime add table public.wedding_guestbook;
  end if;
end $$;


-- ── 2. Create the guest_photos table (DispossCam) ─────────
create table if not exists public.guest_photos (
  id uuid primary key default gen_random_uuid(),
  photo_url text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.guest_photos enable row level security;

drop policy if exists "Allow public read access on guest_photos" on public.guest_photos;
create policy "Allow public read access on guest_photos"
  on public.guest_photos for select
  using (true);

drop policy if exists "Allow public insert access on guest_photos" on public.guest_photos;
create policy "Allow public insert access on guest_photos"
  on public.guest_photos for insert
  with check (true);


-- ── 3. Storage: 'dissposcam-bucket' and Storage RLS ───────

-- A. Create or ensure 'dissposcam-bucket' is registered and marked public
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'dissposcam-bucket',
  'dissposcam-bucket',
  true,
  52428800, -- 50MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

-- B. Policy on storage.buckets: Allow anon/public to view public buckets (enables listBuckets())
drop policy if exists "Allow public to view public buckets" on storage.buckets;
create policy "Allow public to view public buckets"
  on storage.buckets for select
  using (public = true);

-- C. Policies on storage.objects: Drop old ones first to prevent duplicates
drop policy if exists "Allow public read from dissposcam-bucket" on storage.objects;
drop policy if exists "Allow public upload to dissposcam-bucket" on storage.objects;
drop policy if exists "Allow public select from dissposcam-bucket" on storage.objects;
drop policy if exists "Allow public insert to dissposcam-bucket" on storage.objects;
drop policy if exists "Allow public update to dissposcam-bucket" on storage.objects;

-- Allow ANYONE (public/anon) to read/download photos from 'dissposcam-bucket'
create policy "Allow public select from dissposcam-bucket"
  on storage.objects for select
  using (bucket_id = 'dissposcam-bucket');

-- Allow ANYONE (public/anon) to upload photos into 'dissposcam-bucket'
create policy "Allow public insert to dissposcam-bucket"
  on storage.objects for insert
  with check (bucket_id = 'dissposcam-bucket');

-- Allow ANYONE (public/anon) to update/upsert photos in 'dissposcam-bucket'
create policy "Allow public update to dissposcam-bucket"
  on storage.objects for update
  using (bucket_id = 'dissposcam-bucket')
  with check (bucket_id = 'dissposcam-bucket');
