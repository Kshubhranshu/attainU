CREATE SCHEMA public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--
-- TOC entry
-- Name: user_address; Type: TABLE; Schema: public; Owner: pxrclgjmygprty
--
CREATE TABLE public.user_address (
   user_id UUID default uuid_generate_v4(),
   username character varying(100),
   address character varying(250),
   primary key (user_id)
);