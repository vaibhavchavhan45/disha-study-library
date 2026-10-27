-- 1. Run these queries in pgAdmin for local development
-- 2. Run in Neon SQL Editor for production

-- 3. To migrate local data to production:
    -- A. Export local DB:
    --    pg_dump -U postgres -d disha > backup.sql
    -- B. Restore to Neon:
    --    psql "your-neon-connection-string" < backup.sql

-- Public tables
CREATE TABLE public.bookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    field_of_preparation VARCHAR(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.otp_store (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    otp VARCHAR(4) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    attempts integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.otp_block (
    ip text NOT NULL,
    resend_count integer DEFAULT 0,
    blocked_until timestamp with time zone,
    PRIMARY KEY (ip)
);


-- Protected tables
CREATE TABLE public.admins (
    id SERIAL PRIMARY KEY,
    name text,
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL
);

CREATE TABLE public.admin_otp_store (
    id SERIAL PRIMARY KEY,
    email text NOT NULL,
    otp VARCHAR(6) NOT NULL,
    purpose VARCHAR(10) DEFAULT 'login'::character varying NOT NULL,
    attempts integer DEFAULT 0,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.seats (
    id SERIAL PRIMARY KEY,
    seat_number integer NOT NULL UNIQUE,
    gender text NOT NULL,
    status text DEFAULT 'EMPTY'::text,
    name text,
    email text,
    phone VARCHAR(15),
    photo_url text,
    pending_amount numeric DEFAULT 0,
    fee_status text,
    start_date date,
    expiry_date date,
    CONSTRAINT seats_fee_status_check CHECK ((fee_status = ANY (ARRAY['PAID'::text, 'UNPAID'::text, 'PENDING'::text]))),
    CONSTRAINT seats_status_check CHECK ((status = ANY (ARRAY['EMPTY'::text, 'OCCUPIED'::text]))),
    CONSTRAINT seats_gender_check CHECK ((gender = ANY (ARRAY['GIRLS'::text, 'BOYS'::text])))
);

CREATE TABLE public.waiting_students (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text,
    phone text NOT NULL,
    gender text,
    photo_url text,
    start_date date,
    expiry_date date,
    fee_status text,
    pending_amount numeric DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT waiting_students_fee_status_check CHECK ((fee_status = ANY (ARRAY['PAID'::text, 'UNPAID'::text, 'PENDING'::text]))),
    CONSTRAINT waiting_students_gender_check CHECK ((gender = ANY (ARRAY['BOYS'::text, 'GIRLS'::text])))
);

CREATE TABLE public.ex_students (
    id SERIAL PRIMARY KEY,
    name text,
    email text,
    phone text,
    photo_url text,
    seat_number integer,
    gender text,
    fee_status text,
    start_date date,
    exit_date timestamp with time zone DEFAULT now()
);