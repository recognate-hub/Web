-- Drop existing tables if they exist
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS contact_requests CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS rd_prototypes CASCADE;

-- 1. Create Projects Table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "fullDescription" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  "keyOutcomes" TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Completed',
  url TEXT,
  "liveUrl" TEXT,
  "githubUrl" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  "priceTag" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  "logoUrl" TEXT,
  "downloadUrl" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Team Members Table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  speciality TEXT NOT NULL,
  "imageUrl" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Jobs Table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Job Applications Table
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Contact Requests Table
CREATE TABLE contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  category TEXT,
  timeline TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create RD Prototypes Table
CREATE TABLE rd_prototypes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  color TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

----------------------------------------------------
-- SETUP ROW LEVEL SECURITY (RLS) POLICIES
----------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rd_prototypes ENABLE ROW LEVEL SECURITY;

-- 1. Read Access (Publicly readable for displaying on website)
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public can read jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public can read rd_prototypes" ON rd_prototypes FOR SELECT USING (true);

-- 2. Write Access (Only authenticated users / admins can modify content)
CREATE POLICY "Auth can modify projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can modify products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can modify team_members" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can modify jobs" ON jobs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth can modify rd_prototypes" ON rd_prototypes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Form Submissions (Public can insert, but only admins can read/modify)
CREATE POLICY "Public can submit job_applications" ON job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can read/modify job_applications" ON job_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can submit contact_requests" ON contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can read/modify contact_requests" ON contact_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

----------------------------------------------------
-- SETUP STORAGE BUCKETS
----------------------------------------------------

-- Insert the 'assets' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'assets' bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Insert" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'assets');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'assets');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'assets');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'assets');
