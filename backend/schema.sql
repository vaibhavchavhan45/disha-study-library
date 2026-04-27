--
-- PostgreSQL database dump
--

\restrict pEah3cwb7cTcoD4LNvCcRby6PQYgFZya5BE0I1072npW8GNSSYIx87paAzkeOIA

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_otp_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_otp_store (
    id integer NOT NULL,
    email text NOT NULL,
    otp character varying(6) NOT NULL,
    purpose character varying(10) DEFAULT 'login'::character varying NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    attempts integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.admin_otp_store OWNER TO postgres;

--
-- Name: admin_otp_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_otp_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_otp_store_id_seq OWNER TO postgres;

--
-- Name: admin_otp_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_otp_store_id_seq OWNED BY public.admin_otp_store.id;


--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    name text
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(15) NOT NULL,
    field_of_preparation character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: ex_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ex_students (
    id integer NOT NULL,
    seat_number integer,
    gender text,
    name text,
    phone text,
    email text,
    photo_url text,
    fee_status text,
    exit_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    start_date date
);


ALTER TABLE public.ex_students OWNER TO postgres;

--
-- Name: ex_students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ex_students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ex_students_id_seq OWNER TO postgres;

--
-- Name: ex_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ex_students_id_seq OWNED BY public.ex_students.id;


--
-- Name: otp_block; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_block (
    ip text NOT NULL,
    resend_count integer DEFAULT 0,
    blocked_until timestamp with time zone
);


ALTER TABLE public.otp_block OWNER TO postgres;

--
-- Name: otp_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_store (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    otp character varying(4) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    attempts integer DEFAULT 0
);


ALTER TABLE public.otp_store OWNER TO postgres;

--
-- Name: otp_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otp_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.otp_store_id_seq OWNER TO postgres;

--
-- Name: otp_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.otp_store_id_seq OWNED BY public.otp_store.id;


--
-- Name: seats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seats (
    id integer NOT NULL,
    seat_number integer NOT NULL,
    gender text NOT NULL,
    name text,
    phone text,
    email text,
    photo_url text,
    status text DEFAULT 'EMPTY'::text,
    fee_status text,
    start_date date,
    expiry_date date,
    CONSTRAINT seats_fee_status_check CHECK ((fee_status = ANY (ARRAY['PAID'::text, 'UNPAID'::text, 'PENDING'::text]))),
    CONSTRAINT seats_gender_check CHECK ((gender = ANY (ARRAY['GIRLS'::text, 'BOYS'::text]))),
    CONSTRAINT seats_status_check CHECK ((status = ANY (ARRAY['EMPTY'::text, 'OCCUPIED'::text])))
);


ALTER TABLE public.seats OWNER TO postgres;

--
-- Name: seats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seats_id_seq OWNER TO postgres;

--
-- Name: seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;


--
-- Name: waiting_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waiting_students (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    gender text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    photo_url text,
    fee_status text,
    start_date date,
    expiry_date date,
    CONSTRAINT waiting_students_fee_status_check CHECK ((fee_status = ANY (ARRAY['PAID'::text, 'UNPAID'::text, 'PENDING'::text]))),
    CONSTRAINT waiting_students_gender_check CHECK ((gender = ANY (ARRAY['GIRLS'::text, 'BOYS'::text])))
);


ALTER TABLE public.waiting_students OWNER TO postgres;

--
-- Name: waiting_students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.waiting_students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.waiting_students_id_seq OWNER TO postgres;

--
-- Name: waiting_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.waiting_students_id_seq OWNED BY public.waiting_students.id;


--
-- Name: admin_otp_store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_otp_store ALTER COLUMN id SET DEFAULT nextval('public.admin_otp_store_id_seq'::regclass);


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: ex_students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ex_students ALTER COLUMN id SET DEFAULT nextval('public.ex_students_id_seq'::regclass);


--
-- Name: otp_store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_store ALTER COLUMN id SET DEFAULT nextval('public.otp_store_id_seq'::regclass);


--
-- Name: seats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);


--
-- Name: waiting_students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waiting_students ALTER COLUMN id SET DEFAULT nextval('public.waiting_students_id_seq'::regclass);


--
-- Name: admin_otp_store admin_otp_store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_otp_store
    ADD CONSTRAINT admin_otp_store_pkey PRIMARY KEY (id);


--
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: ex_students ex_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ex_students
    ADD CONSTRAINT ex_students_pkey PRIMARY KEY (id);


--
-- Name: otp_block otp_block_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_block
    ADD CONSTRAINT otp_block_pkey PRIMARY KEY (ip);


--
-- Name: otp_store otp_store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_store
    ADD CONSTRAINT otp_store_pkey PRIMARY KEY (id);


--
-- Name: seats seats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);


--
-- Name: seats seats_seat_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_seat_number_key UNIQUE (seat_number);


--
-- Name: waiting_students waiting_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waiting_students
    ADD CONSTRAINT waiting_students_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict pEah3cwb7cTcoD4LNvCcRby6PQYgFZya5BE0I1072npW8GNSSYIx87paAzkeOIA

