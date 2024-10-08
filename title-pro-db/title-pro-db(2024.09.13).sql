PGDMP      :    	            |            titlepro_group    16.4    16.4 8   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    38616    titlepro_group    DATABASE     �   CREATE DATABASE titlepro_group WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE titlepro_group;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    38617    account_year_creation    TABLE     �  CREATE TABLE public.account_year_creation (
    id bigint NOT NULL,
    entry_date date,
    from_year character varying(100),
    to_year character varying(100),
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT account_year_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT account_year_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 )   DROP TABLE public.account_year_creation;
       public         heap    postgres    false    4            �            1259    38626    account_year_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_year_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.account_year_creation_id_seq;
       public          postgres    false    215    4            �           0    0    account_year_creation_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.account_year_creation_id_seq OWNED BY public.account_year_creation.id;
          public          postgres    false    216            �            1259    38627    assign_type_creation    TABLE     �  CREATE TABLE public.assign_type_creation (
    id bigint NOT NULL,
    entry_date date,
    assign_type_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT assign_type_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT assign_type_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 (   DROP TABLE public.assign_type_creation;
       public         heap    postgres    false    4            �            1259    38636    assign_type_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.assign_type_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.assign_type_creation_id_seq;
       public          postgres    false    217    4            �           0    0    assign_type_creation_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.assign_type_creation_id_seq OWNED BY public.assign_type_creation.id;
          public          postgres    false    218            �            1259    38637    company_creation    TABLE     �  CREATE TABLE public.company_creation (
    id bigint NOT NULL,
    entry_date date,
    company_name character varying(100),
    address character varying(100),
    mobile_number character varying(100),
    phone_number character varying(100),
    gst_number character varying(100),
    tin_number character varying(100),
    email_id character varying(100),
    image_name character varying(100),
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT company_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT company_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 $   DROP TABLE public.company_creation;
       public         heap    postgres    false    4            �            1259    38646    company_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.company_creation_id_seq;
       public          postgres    false    4    219            �           0    0    company_creation_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.company_creation_id_seq OWNED BY public.company_creation.id;
          public          postgres    false    220            �            1259    38647    contact_creation    TABLE     �  CREATE TABLE public.contact_creation (
    id bigint NOT NULL,
    entry_date date,
    contact_name character varying(255),
    contact_type_name character varying(255),
    customer_fees_id bigint,
    address text,
    branch_code character varying(255),
    unit character varying(255),
    city_name character varying(255),
    state_id bigint,
    county_id bigint,
    zipcode character varying(255),
    mobile_number character varying(255),
    alternate_mobile_number character varying(255),
    email_id character varying(255),
    ein character varying(255),
    service_date character varying(255),
    service_expiration_date character varying(255),
    eo_exp_date text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT contact_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT contact_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 $   DROP TABLE public.contact_creation;
       public         heap    postgres    false    4            �            1259    38656    contact_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contact_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.contact_creation_id_seq;
       public          postgres    false    4    221            �           0    0    contact_creation_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.contact_creation_id_seq OWNED BY public.contact_creation.id;
          public          postgres    false    222            �            1259    38657    contact_type_creation    TABLE     �  CREATE TABLE public.contact_type_creation (
    id bigint NOT NULL,
    entry_date date,
    contact_type_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT contact_type_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT contact_type_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 )   DROP TABLE public.contact_type_creation;
       public         heap    postgres    false    4            �            1259    38666    contact_type_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contact_type_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.contact_type_creation_id_seq;
       public          postgres    false    4    223            �           0    0    contact_type_creation_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.contact_type_creation_id_seq OWNED BY public.contact_type_creation.id;
          public          postgres    false    224            �            1259    38667    county_creation    TABLE     �  CREATE TABLE public.county_creation (
    id bigint NOT NULL,
    county_name character varying(100),
    county_code character varying(100),
    state_id bigint,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT country_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT country_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 #   DROP TABLE public.county_creation;
       public         heap    postgres    false    4            �            1259    38676    country_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.country_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.country_creation_id_seq;
       public          postgres    false    4    225            �           0    0    country_creation_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.country_creation_id_seq OWNED BY public.county_creation.id;
          public          postgres    false    226            �            1259    38677    customer_creation    TABLE     �  CREATE TABLE public.customer_creation (
    id bigint NOT NULL,
    entry_date date,
    customer_name character varying(100),
    gender character varying(255) DEFAULT 'male'::character varying NOT NULL,
    marital_status character varying(255) DEFAULT 'single'::character varying NOT NULL,
    dob date,
    email_id character varying(100),
    mobile_number character varying(100),
    emergency_mobile_number character varying(100),
    aadhar_number character varying(100),
    pan_number character varying(100),
    country_id bigint,
    state_id bigint,
    city_name character varying(100),
    address text,
    zipcode character varying(100),
    image_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT customer_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT customer_creation_gender_check CHECK (((gender)::text = ANY (ARRAY[('male'::character varying)::text, ('female'::character varying)::text, ('others'::character varying)::text]))),
    CONSTRAINT customer_creation_marital_status_check CHECK (((marital_status)::text = ANY (ARRAY[('single'::character varying)::text, ('married'::character varying)::text, ('unmarried'::character varying)::text]))),
    CONSTRAINT customer_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 %   DROP TABLE public.customer_creation;
       public         heap    postgres    false    4            �            1259    38690    customer_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.customer_creation_id_seq;
       public          postgres    false    227    4            �           0    0    customer_creation_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.customer_creation_id_seq OWNED BY public.customer_creation.id;
          public          postgres    false    228            �            1259    38691    customer_fees_creation    TABLE     �  CREATE TABLE public.customer_fees_creation (
    id bigint NOT NULL,
    entry_date date,
    state_id bigint,
    county_id bigint,
    customer_fees character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT customer_fees_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT customer_fees_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 *   DROP TABLE public.customer_fees_creation;
       public         heap    postgres    false    4            �            1259    38700    customer_fees_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_fees_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.customer_fees_creation_id_seq;
       public          postgres    false    229    4                        0    0    customer_fees_creation_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.customer_fees_creation_id_seq OWNED BY public.customer_fees_creation.id;
          public          postgres    false    230            �            1259    38701    customer_fees_sublist    TABLE     t  CREATE TABLE public.customer_fees_sublist (
    id bigint NOT NULL,
    entry_date date,
    customer_fees_id bigint,
    payee_id bigint,
    contact_id bigint,
    expense_type_id bigint,
    transaction_type_id bigint,
    cost_per_units numeric(15,2),
    no_of_units numeric(15,2),
    total numeric(15,2),
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT customer_fees_sublist_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text])))
);
 )   DROP TABLE public.customer_fees_sublist;
       public         heap    postgres    false    4            �            1259    38708    customer_fees_sublist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_fees_sublist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.customer_fees_sublist_id_seq;
       public          postgres    false    231    4                       0    0    customer_fees_sublist_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.customer_fees_sublist_id_seq OWNED BY public.customer_fees_sublist.id;
          public          postgres    false    232            �            1259    38709    data_source_creation    TABLE     �  CREATE TABLE public.data_source_creation (
    id bigint NOT NULL,
    entry_date date,
    data_source_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    state_id bigint,
    county_id bigint,
    CONSTRAINT data_source_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT data_source_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 (   DROP TABLE public.data_source_creation;
       public         heap    postgres    false    4            �            1259    38718    data_source_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.data_source_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.data_source_creation_id_seq;
       public          postgres    false    4    233                       0    0    data_source_creation_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.data_source_creation_id_seq OWNED BY public.data_source_creation.id;
          public          postgres    false    234            �            1259    38719    department_creation    TABLE     �  CREATE TABLE public.department_creation (
    id bigint NOT NULL,
    entry_date date,
    department_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT department_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT department_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 '   DROP TABLE public.department_creation;
       public         heap    postgres    false    4            �            1259    38728    department_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.department_creation_id_seq;
       public          postgres    false    4    235                       0    0    department_creation_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.department_creation_id_seq OWNED BY public.department_creation.id;
          public          postgres    false    236            �            1259    38729    document_view    TABLE     k  CREATE TABLE public.document_view (
    id bigint NOT NULL,
    entry_date date,
    file_name character varying(100),
    type character varying(255) DEFAULT 'active'::character varying NOT NULL,
    extension character varying(10),
    size character varying(20),
    saved_file character varying(200),
    folder_id integer,
    order_id bigint,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    deleted_dt timestamp(0) without time zone,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT document_view_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT document_view_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text]))),
    CONSTRAINT document_view_type_check CHECK (((type)::text = ANY (ARRAY[('file'::character varying)::text, ('image'::character varying)::text, ('folder'::character varying)::text])))
);
 !   DROP TABLE public.document_view;
       public         heap    postgres    false    4            �            1259    38740    document_view_id_seq    SEQUENCE     }   CREATE SEQUENCE public.document_view_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.document_view_id_seq;
       public          postgres    false    237    4                       0    0    document_view_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.document_view_id_seq OWNED BY public.document_view.id;
          public          postgres    false    238            �            1259    38741    email_template_creation    TABLE     
  CREATE TABLE public.email_template_creation (
    id bigint NOT NULL,
    entry_date date,
    email_template_name character varying(100),
    email_subject text,
    email_content text,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT email_template_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT email_template_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 +   DROP TABLE public.email_template_creation;
       public         heap    postgres    false    4            �            1259    38750    email_template_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.email_template_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.email_template_creation_id_seq;
       public          postgres    false    239    4                       0    0    email_template_creation_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.email_template_creation_id_seq OWNED BY public.email_template_creation.id;
          public          postgres    false    240            �            1259    38751    expense_type_creation    TABLE     �  CREATE TABLE public.expense_type_creation (
    id bigint NOT NULL,
    entry_date date,
    expense_type_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT expense_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT expense_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 )   DROP TABLE public.expense_type_creation;
       public         heap    postgres    false    4            �            1259    38760    expense_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.expense_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.expense_creation_id_seq;
       public          postgres    false    4    241                       0    0    expense_creation_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.expense_creation_id_seq OWNED BY public.expense_type_creation.id;
          public          postgres    false    242            �            1259    38761    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap    postgres    false    4            �            1259    38767    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public          postgres    false    4    243                       0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public          postgres    false    244            �            1259    38768 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false    4            �            1259    38771    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    4    245                       0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    246            �            1259    38772    order_email    TABLE     >  CREATE TABLE public.order_email (
    id bigint NOT NULL,
    entry_date date,
    to_mail text NOT NULL,
    cc_mail text NOT NULL,
    email_template_id bigint,
    subject text NOT NULL,
    body text NOT NULL,
    order_id bigint,
    saved_file text,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.order_email;
       public         heap    postgres    false    4            �            1259    38777    order_email_id_seq    SEQUENCE     {   CREATE SEQUENCE public.order_email_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_email_id_seq;
       public          postgres    false    247    4            	           0    0    order_email_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.order_email_id_seq OWNED BY public.order_email.id;
          public          postgres    false    248            �            1259    38778    order_entry    TABLE     �	  CREATE TABLE public.order_entry (
    id bigint NOT NULL,
    entry_date date,
    order_number character varying(255),
    order_status character varying(255),
    contact_id bigint,
    open_date character varying(255),
    close_date character varying(255),
    due_date character varying(255),
    arrival_date character varying(255),
    delivery_date character varying(255),
    active_workflow character varying(255),
    assigned_to character varying(255),
    street_address text,
    unit character varying(255),
    city_name character varying(255),
    state_id bigint,
    county_id bigint,
    zipcode character varying(255),
    parcel_id character varying(255),
    sub_division character varying(255),
    block character varying(255),
    lot character varying(255),
    section character varying(255),
    land_value character varying(255),
    improvement_value character varying(255),
    total_assessed_value character varying(255),
    product_type character varying(255),
    transaction_type_id bigint,
    work_flow_group_id bigint,
    work_flow_id bigint,
    property_type character varying(255),
    data_source_id bigint,
    add_in_product character varying(255),
    customer_name character varying(255),
    customer_address text,
    customer_branch_code character varying(255),
    lender_name character varying(255),
    lender_address text,
    lender_branch_code character varying(255),
    file character varying(255),
    loan character varying(255),
    sales_price character varying(255),
    loan_type character varying(255),
    loan_date character varying(255),
    loan_amount character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT order_entry_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT order_entry_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
    DROP TABLE public.order_entry;
       public         heap    postgres    false    4            �            1259    38787    order_entry_borrower_or_seller    TABLE     a  CREATE TABLE public.order_entry_borrower_or_seller (
    id bigint NOT NULL,
    entry_date date,
    order_id bigint,
    borrower_or_seller character varying(255),
    name character varying(255),
    ssn character varying(255),
    dob character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT order_entry_borrower_or_seller_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT order_entry_borrower_or_seller_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 2   DROP TABLE public.order_entry_borrower_or_seller;
       public         heap    postgres    false    4            �            1259    38796 %   order_entry_borrower_or_seller_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_entry_borrower_or_seller_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.order_entry_borrower_or_seller_id_seq;
       public          postgres    false    4    250            
           0    0 %   order_entry_borrower_or_seller_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.order_entry_borrower_or_seller_id_seq OWNED BY public.order_entry_borrower_or_seller.id;
          public          postgres    false    251            �            1259    38797    order_entry_id_seq    SEQUENCE     {   CREATE SEQUENCE public.order_entry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_entry_id_seq;
       public          postgres    false    4    249                       0    0    order_entry_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.order_entry_id_seq OWNED BY public.order_entry.id;
          public          postgres    false    252            �            1259    38798    orders_file_history    TABLE     +  CREATE TABLE public.orders_file_history (
    id bigint NOT NULL,
    entry_date date,
    order_id bigint,
    user_id bigint,
    entry_name character varying(255),
    action text,
    created_datetime timestamp(0) without time zone,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 '   DROP TABLE public.orders_file_history;
       public         heap    postgres    false    4            �            1259    38803    orders_file_history_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_file_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.orders_file_history_id_seq;
       public          postgres    false    253    4                       0    0    orders_file_history_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.orders_file_history_id_seq OWNED BY public.orders_file_history.id;
          public          postgres    false    254            �            1259    38804    orders_invoice_mainlist    TABLE       CREATE TABLE public.orders_invoice_mainlist (
    id bigint NOT NULL,
    entry_date date,
    order_id bigint,
    order_number character varying(255),
    invoice_number character varying(255),
    description text,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT orders_invoice_mainlist_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text])))
);
 +   DROP TABLE public.orders_invoice_mainlist;
       public         heap    postgres    false    4                        1259    38811    orders_invoice_mainlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_invoice_mainlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.orders_invoice_mainlist_id_seq;
       public          postgres    false    4    255                       0    0    orders_invoice_mainlist_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.orders_invoice_mainlist_id_seq OWNED BY public.orders_invoice_mainlist.id;
          public          postgres    false    256                       1259    38812    orders_invoice_sublist    TABLE     �  CREATE TABLE public.orders_invoice_sublist (
    id bigint NOT NULL,
    entry_date date,
    orders_invoice_mainlist_id bigint,
    payee_id bigint,
    contact_id bigint,
    expense_type_id bigint,
    transaction_type_id bigint,
    cost_per_units numeric(15,2),
    no_of_units numeric(15,2),
    total numeric(15,2),
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT orders_invoice_sublist_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text])))
);
 *   DROP TABLE public.orders_invoice_sublist;
       public         heap    postgres    false    4                       1259    38819    orders_invoice_sublist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_invoice_sublist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.orders_invoice_sublist_id_seq;
       public          postgres    false    4    257                       0    0    orders_invoice_sublist_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.orders_invoice_sublist_id_seq OWNED BY public.orders_invoice_sublist.id;
          public          postgres    false    258                       1259    38820    orders_note    TABLE     �  CREATE TABLE public.orders_note (
    id bigint NOT NULL,
    entry_date date,
    order_id bigint,
    dob timestamp(0) without time zone,
    user_id bigint,
    note text,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT orders_note_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text])))
);
    DROP TABLE public.orders_note;
       public         heap    postgres    false    4                       1259    38827    orders_note_id_seq    SEQUENCE     {   CREATE SEQUENCE public.orders_note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orders_note_id_seq;
       public          postgres    false    4    259                       0    0    orders_note_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orders_note_id_seq OWNED BY public.orders_note.id;
          public          postgres    false    260                       1259    38828 
   orders_tab    TABLE     �   CREATE TABLE public.orders_tab (
    id bigint NOT NULL,
    last_changes_datetime timestamp(0) without time zone,
    user_id bigint,
    tab_id text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.orders_tab;
       public         heap    postgres    false    4                       1259    38833    orders_tab_id_seq    SEQUENCE     z   CREATE SEQUENCE public.orders_tab_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.orders_tab_id_seq;
       public          postgres    false    261    4                       0    0    orders_tab_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.orders_tab_id_seq OWNED BY public.orders_tab.id;
          public          postgres    false    262                       1259    38834    orders_task    TABLE     �  CREATE TABLE public.orders_task (
    id bigint NOT NULL,
    entry_date date,
    task_status character varying(255),
    order_id bigint,
    work_flow_group_id bigint,
    work_flow_id bigint,
    task_id bigint,
    countdown_timer character varying(255),
    start_time time(0) without time zone,
    stop_time time(0) without time zone,
    description text,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.orders_task;
       public         heap    postgres    false    4                       1259    38839    orders_task_id_seq    SEQUENCE     {   CREATE SEQUENCE public.orders_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orders_task_id_seq;
       public          postgres    false    263    4                       0    0    orders_task_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orders_task_id_seq OWNED BY public.orders_task.id;
          public          postgres    false    264            	           1259    38840    password_reset_tokens    TABLE     �   CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 )   DROP TABLE public.password_reset_tokens;
       public         heap    postgres    false    4            
           1259    38845    payee_creation    TABLE     �  CREATE TABLE public.payee_creation (
    id bigint NOT NULL,
    entry_date date,
    payee_name character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id bigint,
    updated_user_id bigint,
    deleted_user_id bigint,
    created_ipaddress character varying(255),
    updated_ipaddress character varying(255),
    deleted_ipaddress character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT payee_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT payee_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 "   DROP TABLE public.payee_creation;
       public         heap    postgres    false    4                       1259    38854    payee_creation_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.payee_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.payee_creation_id_seq;
       public          postgres    false    4    266                       0    0    payee_creation_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.payee_creation_id_seq OWNED BY public.payee_creation.id;
          public          postgres    false    267                       1259    38855    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap    postgres    false    4                       1259    38860    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public          postgres    false    268    4                       0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public          postgres    false    269                       1259    38861    sessions    TABLE     �   CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false    4                       1259    38866    staff_category_creation    TABLE     �  CREATE TABLE public.staff_category_creation (
    id bigint NOT NULL,
    entry_date date,
    staff_category_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT staff_category_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT staff_category_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 +   DROP TABLE public.staff_category_creation;
       public         heap    postgres    false    4                       1259    38875    staff_category_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.staff_category_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.staff_category_creation_id_seq;
       public          postgres    false    271    4                       0    0    staff_category_creation_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.staff_category_creation_id_seq OWNED BY public.staff_category_creation.id;
          public          postgres    false    272                       1259    38876    staff_creation    TABLE     �  CREATE TABLE public.staff_creation (
    id bigint NOT NULL,
    entry_date date,
    department_id bigint,
    staff_category_id bigint,
    staff_name character varying(100),
    gender character varying(255) DEFAULT 'male'::character varying NOT NULL,
    marital_status character varying(255) DEFAULT 'single'::character varying NOT NULL,
    dob date,
    email_id character varying(100),
    mobile_number character varying(100),
    emergency_mobile_number character varying(100),
    aadhar_number character varying(100),
    pan_number character varying(100),
    county_id bigint,
    state_id bigint,
    city_name character varying(100),
    address text,
    zipcode character varying(100),
    image_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT staff_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT staff_creation_gender_check CHECK (((gender)::text = ANY (ARRAY[('male'::character varying)::text, ('female'::character varying)::text, ('others'::character varying)::text]))),
    CONSTRAINT staff_creation_marital_status_check CHECK (((marital_status)::text = ANY (ARRAY[('single'::character varying)::text, ('married'::character varying)::text, ('unmarried'::character varying)::text]))),
    CONSTRAINT staff_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 "   DROP TABLE public.staff_creation;
       public         heap    postgres    false    4                       1259    38889    staff_creation_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.staff_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.staff_creation_id_seq;
       public          postgres    false    273    4                       0    0    staff_creation_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.staff_creation_id_seq OWNED BY public.staff_creation.id;
          public          postgres    false    274                       1259    38890    state_creation    TABLE     �  CREATE TABLE public.state_creation (
    id bigint NOT NULL,
    county_id bigint,
    state_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT state_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT state_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 "   DROP TABLE public.state_creation;
       public         heap    postgres    false    4                       1259    38899    state_creation_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.state_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.state_creation_id_seq;
       public          postgres    false    275    4                       0    0    state_creation_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.state_creation_id_seq OWNED BY public.state_creation.id;
          public          postgres    false    276                       1259    38900    task_creation    TABLE     �  CREATE TABLE public.task_creation (
    id bigint NOT NULL,
    entry_date date,
    work_flow_group_id bigint,
    work_flow_id bigint,
    task_name character varying(100),
    when_1 character varying(100),
    specific_task character varying(100),
    assign_type_id character varying(100),
    assign_task_group character varying(100),
    assign_user_id character varying(100),
    assign_date character varying(100),
    task_guidance text,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT task_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT task_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 !   DROP TABLE public.task_creation;
       public         heap    postgres    false    4                       1259    38909    task_creation_id_seq    SEQUENCE     }   CREATE SEQUENCE public.task_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.task_creation_id_seq;
       public          postgres    false    4    277                       0    0    task_creation_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.task_creation_id_seq OWNED BY public.task_creation.id;
          public          postgres    false    278                       1259    38910    task_type_creation    TABLE     �  CREATE TABLE public.task_type_creation (
    id bigint NOT NULL,
    entry_date date,
    task_type_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT task_type_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT task_type_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 &   DROP TABLE public.task_type_creation;
       public         heap    postgres    false    4                       1259    38919    task_type_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_type_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.task_type_creation_id_seq;
       public          postgres    false    279    4                       0    0    task_type_creation_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.task_type_creation_id_seq OWNED BY public.task_type_creation.id;
          public          postgres    false    280                       1259    38920    tax_creation    TABLE     �  CREATE TABLE public.tax_creation (
    id bigint NOT NULL,
    entry_date date,
    tax_name character varying(100),
    tax_percentage character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT tax_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT tax_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
     DROP TABLE public.tax_creation;
       public         heap    postgres    false    4                       1259    38929    tax_creation_id_seq    SEQUENCE     |   CREATE SEQUENCE public.tax_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tax_creation_id_seq;
       public          postgres    false    4    281                       0    0    tax_creation_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tax_creation_id_seq OWNED BY public.tax_creation.id;
          public          postgres    false    282                       1259    38930    transaction_type_creation    TABLE     #  CREATE TABLE public.transaction_type_creation (
    id bigint NOT NULL,
    entry_date date,
    transaction_type_name character varying(100),
    cost_per_units numeric(15,2),
    no_of_units numeric(15,2),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT transaction_type_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT transaction_type_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 -   DROP TABLE public.transaction_type_creation;
       public         heap    postgres    false    4                       1259    38939     transaction_type_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transaction_type_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.transaction_type_creation_id_seq;
       public          postgres    false    4    283                       0    0     transaction_type_creation_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.transaction_type_creation_id_seq OWNED BY public.transaction_type_creation.id;
          public          postgres    false    284                       1259    38940    user_creation    TABLE     u  CREATE TABLE public.user_creation (
    id bigint NOT NULL,
    entry_date date,
    user_type_id bigint,
    staff_id bigint,
    mobile_number character varying(100),
    user_name character varying(100),
    password text,
    confirm_password text,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    assign_type_id text,
    mail_id character varying(100),
    CONSTRAINT user_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT user_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 !   DROP TABLE public.user_creation;
       public         heap    postgres    false    4                       1259    38949    user_creation_id_seq    SEQUENCE     }   CREATE SEQUENCE public.user_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.user_creation_id_seq;
       public          postgres    false    4    285                       0    0    user_creation_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.user_creation_id_seq OWNED BY public.user_creation.id;
          public          postgres    false    286                       1259    38950    user_log_creation    TABLE     �  CREATE TABLE public.user_log_creation (
    id bigint NOT NULL,
    entry_date date,
    user_id bigint,
    login_at timestamp(0) without time zone,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT user_log_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT user_log_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 %   DROP TABLE public.user_log_creation;
       public         heap    postgres    false    4                        1259    38959    user_log_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_log_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.user_log_creation_id_seq;
       public          postgres    false    4    287                       0    0    user_log_creation_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.user_log_creation_id_seq OWNED BY public.user_log_creation.id;
          public          postgres    false    288            !           1259    38960    user_permission_creation    TABLE     �  CREATE TABLE public.user_permission_creation (
    id bigint NOT NULL,
    entry_date date,
    user_type_id bigint,
    user_screen_id bigint,
    view_rights character varying(255) DEFAULT '0'::character varying NOT NULL,
    add_rights character varying(255) DEFAULT '0'::character varying NOT NULL,
    edit_rights character varying(255) DEFAULT '0'::character varying NOT NULL,
    delete_rights character varying(255) DEFAULT '0'::character varying NOT NULL,
    more_rights text,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT user_permission_creation_add_rights_check CHECK (((add_rights)::text = ANY (ARRAY[('1'::character varying)::text, ('0'::character varying)::text]))),
    CONSTRAINT user_permission_creation_delete_rights_check CHECK (((delete_rights)::text = ANY (ARRAY[('1'::character varying)::text, ('0'::character varying)::text]))),
    CONSTRAINT user_permission_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT user_permission_creation_edit_rights_check CHECK (((edit_rights)::text = ANY (ARRAY[('1'::character varying)::text, ('0'::character varying)::text]))),
    CONSTRAINT user_permission_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text]))),
    CONSTRAINT user_permission_creation_view_rights_check CHECK (((view_rights)::text = ANY (ARRAY[('1'::character varying)::text, ('0'::character varying)::text])))
);
 ,   DROP TABLE public.user_permission_creation;
       public         heap    postgres    false    4            "           1259    38977    user_permission_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_permission_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.user_permission_creation_id_seq;
       public          postgres    false    289    4                       0    0    user_permission_creation_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.user_permission_creation_id_seq OWNED BY public.user_permission_creation.id;
          public          postgres    false    290            +           1259    39166    user_screen_creation    TABLE       CREATE TABLE public.user_screen_creation (
    id bigint NOT NULL,
    entry_date date,
    main_id bigint,
    screen_name character varying(100),
    order_number bigint,
    more_options text,
    remove_options text,
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT user_screen_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT user_screen_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 (   DROP TABLE public.user_screen_creation;
       public         heap    postgres    false    4            ,           1259    39175    user_screen_id_seq    SEQUENCE     {   CREATE SEQUENCE public.user_screen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.user_screen_id_seq;
       public          postgres    false    4    299                       0    0    user_screen_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.user_screen_id_seq OWNED BY public.user_screen_creation.id;
          public          postgres    false    300            #           1259    38988    user_type_creation    TABLE     �  CREATE TABLE public.user_type_creation (
    id bigint NOT NULL,
    entry_date date,
    user_type_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT user_type_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT user_type_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 &   DROP TABLE public.user_type_creation;
       public         heap    postgres    false    4            $           1259    38997    user_type_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_type_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.user_type_creation_id_seq;
       public          postgres    false    4    291                       0    0    user_type_creation_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.user_type_creation_id_seq OWNED BY public.user_type_creation.id;
          public          postgres    false    292            %           1259    38998    users    TABLE     x  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            &           1259    39003    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    4    293                        0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    294            '           1259    39004    work_flow_creation    TABLE       CREATE TABLE public.work_flow_creation (
    id bigint NOT NULL,
    entry_date date,
    work_flow_group_id bigint,
    work_flow_name character varying(100),
    place_after character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT work_flow_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT work_flow_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 &   DROP TABLE public.work_flow_creation;
       public         heap    postgres    false    4            (           1259    39013    work_flow_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_flow_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.work_flow_creation_id_seq;
       public          postgres    false    295    4            !           0    0    work_flow_creation_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.work_flow_creation_id_seq OWNED BY public.work_flow_creation.id;
          public          postgres    false    296            )           1259    39014    work_flow_group_creation    TABLE     �  CREATE TABLE public.work_flow_group_creation (
    id bigint NOT NULL,
    entry_date date,
    work_flow_group_name character varying(100),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    delete_status character varying(255) DEFAULT 'no'::character varying NOT NULL,
    created_user_id integer,
    updated_user_id integer,
    deleted_user_id integer,
    created_ipaddress character varying(100),
    updated_ipaddress character varying(100),
    deleted_ipaddress character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT work_flow_group_creation_delete_status_check CHECK (((delete_status)::text = ANY (ARRAY[('yes'::character varying)::text, ('no'::character varying)::text]))),
    CONSTRAINT work_flow_group_creation_status_check CHECK (((status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text])))
);
 ,   DROP TABLE public.work_flow_group_creation;
       public         heap    postgres    false    4            *           1259    39023    work_flow_group_creation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_flow_group_creation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.work_flow_group_creation_id_seq;
       public          postgres    false    4    297            "           0    0    work_flow_group_creation_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.work_flow_group_creation_id_seq OWNED BY public.work_flow_group_creation.id;
          public          postgres    false    298            �           2604    39024    account_year_creation id    DEFAULT     �   ALTER TABLE ONLY public.account_year_creation ALTER COLUMN id SET DEFAULT nextval('public.account_year_creation_id_seq'::regclass);
 G   ALTER TABLE public.account_year_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    39025    assign_type_creation id    DEFAULT     �   ALTER TABLE ONLY public.assign_type_creation ALTER COLUMN id SET DEFAULT nextval('public.assign_type_creation_id_seq'::regclass);
 F   ALTER TABLE public.assign_type_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    39026    company_creation id    DEFAULT     z   ALTER TABLE ONLY public.company_creation ALTER COLUMN id SET DEFAULT nextval('public.company_creation_id_seq'::regclass);
 B   ALTER TABLE public.company_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    39027    contact_creation id    DEFAULT     z   ALTER TABLE ONLY public.contact_creation ALTER COLUMN id SET DEFAULT nextval('public.contact_creation_id_seq'::regclass);
 B   ALTER TABLE public.contact_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �           2604    39028    contact_type_creation id    DEFAULT     �   ALTER TABLE ONLY public.contact_type_creation ALTER COLUMN id SET DEFAULT nextval('public.contact_type_creation_id_seq'::regclass);
 G   ALTER TABLE public.contact_type_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            �           2604    39029    county_creation id    DEFAULT     y   ALTER TABLE ONLY public.county_creation ALTER COLUMN id SET DEFAULT nextval('public.country_creation_id_seq'::regclass);
 A   ALTER TABLE public.county_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225                       2604    39030    customer_creation id    DEFAULT     |   ALTER TABLE ONLY public.customer_creation ALTER COLUMN id SET DEFAULT nextval('public.customer_creation_id_seq'::regclass);
 C   ALTER TABLE public.customer_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227                       2604    39031    customer_fees_creation id    DEFAULT     �   ALTER TABLE ONLY public.customer_fees_creation ALTER COLUMN id SET DEFAULT nextval('public.customer_fees_creation_id_seq'::regclass);
 H   ALTER TABLE public.customer_fees_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            	           2604    39032    customer_fees_sublist id    DEFAULT     �   ALTER TABLE ONLY public.customer_fees_sublist ALTER COLUMN id SET DEFAULT nextval('public.customer_fees_sublist_id_seq'::regclass);
 G   ALTER TABLE public.customer_fees_sublist ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231                       2604    39033    data_source_creation id    DEFAULT     �   ALTER TABLE ONLY public.data_source_creation ALTER COLUMN id SET DEFAULT nextval('public.data_source_creation_id_seq'::regclass);
 F   ALTER TABLE public.data_source_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233                       2604    39034    department_creation id    DEFAULT     �   ALTER TABLE ONLY public.department_creation ALTER COLUMN id SET DEFAULT nextval('public.department_creation_id_seq'::regclass);
 E   ALTER TABLE public.department_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235                       2604    39035    document_view id    DEFAULT     t   ALTER TABLE ONLY public.document_view ALTER COLUMN id SET DEFAULT nextval('public.document_view_id_seq'::regclass);
 ?   ALTER TABLE public.document_view ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237                       2604    39036    email_template_creation id    DEFAULT     �   ALTER TABLE ONLY public.email_template_creation ALTER COLUMN id SET DEFAULT nextval('public.email_template_creation_id_seq'::regclass);
 I   ALTER TABLE public.email_template_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239                       2604    39037    expense_type_creation id    DEFAULT        ALTER TABLE ONLY public.expense_type_creation ALTER COLUMN id SET DEFAULT nextval('public.expense_creation_id_seq'::regclass);
 G   ALTER TABLE public.expense_type_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241                       2604    39038    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243                       2604    39039    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    246    245                       2604    39040    order_email id    DEFAULT     p   ALTER TABLE ONLY public.order_email ALTER COLUMN id SET DEFAULT nextval('public.order_email_id_seq'::regclass);
 =   ALTER TABLE public.order_email ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247                       2604    39041    order_entry id    DEFAULT     p   ALTER TABLE ONLY public.order_entry ALTER COLUMN id SET DEFAULT nextval('public.order_entry_id_seq'::regclass);
 =   ALTER TABLE public.order_entry ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    252    249            "           2604    39042 !   order_entry_borrower_or_seller id    DEFAULT     �   ALTER TABLE ONLY public.order_entry_borrower_or_seller ALTER COLUMN id SET DEFAULT nextval('public.order_entry_borrower_or_seller_id_seq'::regclass);
 P   ALTER TABLE public.order_entry_borrower_or_seller ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    250            %           2604    39043    orders_file_history id    DEFAULT     �   ALTER TABLE ONLY public.orders_file_history ALTER COLUMN id SET DEFAULT nextval('public.orders_file_history_id_seq'::regclass);
 E   ALTER TABLE public.orders_file_history ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    253            &           2604    39044    orders_invoice_mainlist id    DEFAULT     �   ALTER TABLE ONLY public.orders_invoice_mainlist ALTER COLUMN id SET DEFAULT nextval('public.orders_invoice_mainlist_id_seq'::regclass);
 I   ALTER TABLE public.orders_invoice_mainlist ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    256    255            (           2604    39045    orders_invoice_sublist id    DEFAULT     �   ALTER TABLE ONLY public.orders_invoice_sublist ALTER COLUMN id SET DEFAULT nextval('public.orders_invoice_sublist_id_seq'::regclass);
 H   ALTER TABLE public.orders_invoice_sublist ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    258    257            *           2604    39046    orders_note id    DEFAULT     p   ALTER TABLE ONLY public.orders_note ALTER COLUMN id SET DEFAULT nextval('public.orders_note_id_seq'::regclass);
 =   ALTER TABLE public.orders_note ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    260    259            ,           2604    39047    orders_tab id    DEFAULT     n   ALTER TABLE ONLY public.orders_tab ALTER COLUMN id SET DEFAULT nextval('public.orders_tab_id_seq'::regclass);
 <   ALTER TABLE public.orders_tab ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    262    261            -           2604    39048    orders_task id    DEFAULT     p   ALTER TABLE ONLY public.orders_task ALTER COLUMN id SET DEFAULT nextval('public.orders_task_id_seq'::regclass);
 =   ALTER TABLE public.orders_task ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    264    263            .           2604    39049    payee_creation id    DEFAULT     v   ALTER TABLE ONLY public.payee_creation ALTER COLUMN id SET DEFAULT nextval('public.payee_creation_id_seq'::regclass);
 @   ALTER TABLE public.payee_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    267    266            1           2604    39050    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    269    268            2           2604    39051    staff_category_creation id    DEFAULT     �   ALTER TABLE ONLY public.staff_category_creation ALTER COLUMN id SET DEFAULT nextval('public.staff_category_creation_id_seq'::regclass);
 I   ALTER TABLE public.staff_category_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    271            5           2604    39052    staff_creation id    DEFAULT     v   ALTER TABLE ONLY public.staff_creation ALTER COLUMN id SET DEFAULT nextval('public.staff_creation_id_seq'::regclass);
 @   ALTER TABLE public.staff_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    274    273            :           2604    39053    state_creation id    DEFAULT     v   ALTER TABLE ONLY public.state_creation ALTER COLUMN id SET DEFAULT nextval('public.state_creation_id_seq'::regclass);
 @   ALTER TABLE public.state_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    276    275            =           2604    39054    task_creation id    DEFAULT     t   ALTER TABLE ONLY public.task_creation ALTER COLUMN id SET DEFAULT nextval('public.task_creation_id_seq'::regclass);
 ?   ALTER TABLE public.task_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    277            @           2604    39055    task_type_creation id    DEFAULT     ~   ALTER TABLE ONLY public.task_type_creation ALTER COLUMN id SET DEFAULT nextval('public.task_type_creation_id_seq'::regclass);
 D   ALTER TABLE public.task_type_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    280    279            C           2604    39056    tax_creation id    DEFAULT     r   ALTER TABLE ONLY public.tax_creation ALTER COLUMN id SET DEFAULT nextval('public.tax_creation_id_seq'::regclass);
 >   ALTER TABLE public.tax_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    282    281            F           2604    39057    transaction_type_creation id    DEFAULT     �   ALTER TABLE ONLY public.transaction_type_creation ALTER COLUMN id SET DEFAULT nextval('public.transaction_type_creation_id_seq'::regclass);
 K   ALTER TABLE public.transaction_type_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    284    283            I           2604    39058    user_creation id    DEFAULT     t   ALTER TABLE ONLY public.user_creation ALTER COLUMN id SET DEFAULT nextval('public.user_creation_id_seq'::regclass);
 ?   ALTER TABLE public.user_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    286    285            L           2604    39059    user_log_creation id    DEFAULT     |   ALTER TABLE ONLY public.user_log_creation ALTER COLUMN id SET DEFAULT nextval('public.user_log_creation_id_seq'::regclass);
 C   ALTER TABLE public.user_log_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    288    287            O           2604    39060    user_permission_creation id    DEFAULT     �   ALTER TABLE ONLY public.user_permission_creation ALTER COLUMN id SET DEFAULT nextval('public.user_permission_creation_id_seq'::regclass);
 J   ALTER TABLE public.user_permission_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    290    289            `           2604    39176    user_screen_creation id    DEFAULT     y   ALTER TABLE ONLY public.user_screen_creation ALTER COLUMN id SET DEFAULT nextval('public.user_screen_id_seq'::regclass);
 F   ALTER TABLE public.user_screen_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    300    299            V           2604    39062    user_type_creation id    DEFAULT     ~   ALTER TABLE ONLY public.user_type_creation ALTER COLUMN id SET DEFAULT nextval('public.user_type_creation_id_seq'::regclass);
 D   ALTER TABLE public.user_type_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    292    291            Y           2604    39063    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    294    293            Z           2604    39064    work_flow_creation id    DEFAULT     ~   ALTER TABLE ONLY public.work_flow_creation ALTER COLUMN id SET DEFAULT nextval('public.work_flow_creation_id_seq'::regclass);
 D   ALTER TABLE public.work_flow_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    296    295            ]           2604    39065    work_flow_group_creation id    DEFAULT     �   ALTER TABLE ONLY public.work_flow_group_creation ALTER COLUMN id SET DEFAULT nextval('public.work_flow_group_creation_id_seq'::regclass);
 J   ALTER TABLE public.work_flow_group_creation ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    298    297            �          0    38617    account_year_creation 
   TABLE DATA           �   COPY public.account_year_creation (id, entry_date, from_year, to_year, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    215   4      �          0    38627    assign_type_creation 
   TABLE DATA           �   COPY public.assign_type_creation (id, entry_date, assign_type_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    217   �      �          0    38637    company_creation 
   TABLE DATA           7  COPY public.company_creation (id, entry_date, company_name, address, mobile_number, phone_number, gst_number, tin_number, email_id, image_name, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    219   �      �          0    38647    contact_creation 
   TABLE DATA           �  COPY public.contact_creation (id, entry_date, contact_name, contact_type_name, customer_fees_id, address, branch_code, unit, city_name, state_id, county_id, zipcode, mobile_number, alternate_mobile_number, email_id, ein, service_date, service_expiration_date, eo_exp_date, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    221   M      �          0    38657    contact_type_creation 
   TABLE DATA           �   COPY public.contact_type_creation (id, entry_date, contact_type_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    223   �      �          0    38667    county_creation 
   TABLE DATA           �   COPY public.county_creation (id, county_name, county_code, state_id, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    225   A      �          0    38677    customer_creation 
   TABLE DATA           �  COPY public.customer_creation (id, entry_date, customer_name, gender, marital_status, dob, email_id, mobile_number, emergency_mobile_number, aadhar_number, pan_number, country_id, state_id, city_name, address, zipcode, image_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    227   M      �          0    38691    customer_fees_creation 
   TABLE DATA             COPY public.customer_fees_creation (id, entry_date, state_id, county_id, customer_fees, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    229   j      �          0    38701    customer_fees_sublist 
   TABLE DATA           D  COPY public.customer_fees_sublist (id, entry_date, customer_fees_id, payee_id, contact_id, expense_type_id, transaction_type_id, cost_per_units, no_of_units, total, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    231   2       �          0    38709    data_source_creation 
   TABLE DATA             COPY public.data_source_creation (id, entry_date, data_source_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at, state_id, county_id) FROM stdin;
    public          postgres    false    233   �       �          0    38719    department_creation 
   TABLE DATA           �   COPY public.department_creation (id, entry_date, department_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    235   �!      �          0    38729    document_view 
   TABLE DATA           !  COPY public.document_view (id, entry_date, file_name, type, extension, size, saved_file, folder_id, order_id, status, delete_status, deleted_dt, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    237   �"      �          0    38741    email_template_creation 
   TABLE DATA             COPY public.email_template_creation (id, entry_date, email_template_name, email_subject, email_content, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    239   ?#      �          0    38751    expense_type_creation 
   TABLE DATA           �   COPY public.expense_type_creation (id, entry_date, expense_type_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    241   �%      �          0    38761    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public          postgres    false    243   P&      �          0    38768 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public          postgres    false    245   m&      �          0    38772    order_email 
   TABLE DATA             COPY public.order_email (id, entry_date, to_mail, cc_mail, email_template_id, subject, body, order_id, saved_file, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    247   *      �          0    38778    order_entry 
   TABLE DATA             COPY public.order_entry (id, entry_date, order_number, order_status, contact_id, open_date, close_date, due_date, arrival_date, delivery_date, active_workflow, assigned_to, street_address, unit, city_name, state_id, county_id, zipcode, parcel_id, sub_division, block, lot, section, land_value, improvement_value, total_assessed_value, product_type, transaction_type_id, work_flow_group_id, work_flow_id, property_type, data_source_id, add_in_product, customer_name, customer_address, customer_branch_code, lender_name, lender_address, lender_branch_code, file, loan, sales_price, loan_type, loan_date, loan_amount, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    249   �*      �          0    38787    order_entry_borrower_or_seller 
   TABLE DATA             COPY public.order_entry_borrower_or_seller (id, entry_date, order_id, borrower_or_seller, name, ssn, dob, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    250   �-      �          0    38798    orders_file_history 
   TABLE DATA           �   COPY public.orders_file_history (id, entry_date, order_id, user_id, entry_name, action, created_datetime, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    253   |0      �          0    38804    orders_invoice_mainlist 
   TABLE DATA           	  COPY public.orders_invoice_mainlist (id, entry_date, order_id, order_number, invoice_number, description, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    255   �1      �          0    38812    orders_invoice_sublist 
   TABLE DATA           O  COPY public.orders_invoice_sublist (id, entry_date, orders_invoice_mainlist_id, payee_id, contact_id, expense_type_id, transaction_type_id, cost_per_units, no_of_units, total, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    257   2      �          0    38820    orders_note 
   TABLE DATA           �   COPY public.orders_note (id, entry_date, order_id, dob, user_id, note, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    259   92      �          0    38828 
   orders_tab 
   TABLE DATA           h   COPY public.orders_tab (id, last_changes_datetime, user_id, tab_id, created_at, updated_at) FROM stdin;
    public          postgres    false    261   3      �          0    38834    orders_task 
   TABLE DATA           0  COPY public.orders_task (id, entry_date, task_status, order_id, work_flow_group_id, work_flow_id, task_id, countdown_timer, start_time, stop_time, description, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    263   c3      �          0    38840    password_reset_tokens 
   TABLE DATA           I   COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
    public          postgres    false    265   96      �          0    38845    payee_creation 
   TABLE DATA           �   COPY public.payee_creation (id, entry_date, payee_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    266   V6      �          0    38855    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public          postgres    false    268   �6      �          0    38861    sessions 
   TABLE DATA           _   COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
    public          postgres    false    270   	7      �          0    38866    staff_category_creation 
   TABLE DATA           �   COPY public.staff_category_creation (id, entry_date, staff_category_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    271   &7      �          0    38876    staff_creation 
   TABLE DATA           �  COPY public.staff_creation (id, entry_date, department_id, staff_category_id, staff_name, gender, marital_status, dob, email_id, mobile_number, emergency_mobile_number, aadhar_number, pan_number, county_id, state_id, city_name, address, zipcode, image_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    273   �7      �          0    38890    state_creation 
   TABLE DATA           �   COPY public.state_creation (id, county_id, state_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    275   �8      �          0    38900    task_creation 
   TABLE DATA           r  COPY public.task_creation (id, entry_date, work_flow_group_id, work_flow_id, task_name, when_1, specific_task, assign_type_id, assign_task_group, assign_user_id, assign_date, task_guidance, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    277   �9      �          0    38910    task_type_creation 
   TABLE DATA           �   COPY public.task_type_creation (id, entry_date, task_type_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    279   �=      �          0    38920    tax_creation 
   TABLE DATA           �   COPY public.tax_creation (id, entry_date, tax_name, tax_percentage, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    281   *>      �          0    38930    transaction_type_creation 
   TABLE DATA             COPY public.transaction_type_creation (id, entry_date, transaction_type_name, cost_per_units, no_of_units, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    283   �>      �          0    38940    user_creation 
   TABLE DATA           F  COPY public.user_creation (id, entry_date, user_type_id, staff_id, mobile_number, user_name, password, confirm_password, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at, assign_type_id, mail_id) FROM stdin;
    public          postgres    false    285   q?      �          0    38950    user_log_creation 
   TABLE DATA           �   COPY public.user_log_creation (id, entry_date, user_id, login_at, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    287   �A      �          0    38960    user_permission_creation 
   TABLE DATA           J  COPY public.user_permission_creation (id, entry_date, user_type_id, user_screen_id, view_rights, add_rights, edit_rights, delete_rights, more_rights, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    289   Qa      �          0    39166    user_screen_creation 
   TABLE DATA           (  COPY public.user_screen_creation (id, entry_date, main_id, screen_name, order_number, more_options, remove_options, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    299   @f      �          0    38988    user_type_creation 
   TABLE DATA           �   COPY public.user_type_creation (id, entry_date, user_type_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    291   gk      �          0    38998    users 
   TABLE DATA           u   COPY public.users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) FROM stdin;
    public          postgres    false    293   'm      �          0    39004    work_flow_creation 
   TABLE DATA             COPY public.work_flow_creation (id, entry_date, work_flow_group_id, work_flow_name, place_after, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    295   Dm      �          0    39014    work_flow_group_creation 
   TABLE DATA              COPY public.work_flow_group_creation (id, entry_date, work_flow_group_name, description, status, delete_status, created_user_id, updated_user_id, deleted_user_id, created_ipaddress, updated_ipaddress, deleted_ipaddress, created_at, updated_at) FROM stdin;
    public          postgres    false    297   4q      #           0    0    account_year_creation_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.account_year_creation_id_seq', 4, true);
          public          postgres    false    216            $           0    0    assign_type_creation_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.assign_type_creation_id_seq', 2, true);
          public          postgres    false    218            %           0    0    company_creation_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.company_creation_id_seq', 23, true);
          public          postgres    false    220            &           0    0    contact_creation_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.contact_creation_id_seq', 4, true);
          public          postgres    false    222            '           0    0    contact_type_creation_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.contact_type_creation_id_seq', 2, true);
          public          postgres    false    224            (           0    0    country_creation_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.country_creation_id_seq', 16, true);
          public          postgres    false    226            )           0    0    customer_creation_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.customer_creation_id_seq', 1, false);
          public          postgres    false    228            *           0    0    customer_fees_creation_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.customer_fees_creation_id_seq', 5, true);
          public          postgres    false    230            +           0    0    customer_fees_sublist_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.customer_fees_sublist_id_seq', 4, true);
          public          postgres    false    232            ,           0    0    data_source_creation_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.data_source_creation_id_seq', 8, true);
          public          postgres    false    234            -           0    0    department_creation_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.department_creation_id_seq', 3, true);
          public          postgres    false    236            .           0    0    document_view_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.document_view_id_seq', 5, true);
          public          postgres    false    238            /           0    0    email_template_creation_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.email_template_creation_id_seq', 1, true);
          public          postgres    false    240            0           0    0    expense_creation_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.expense_creation_id_seq', 2, true);
          public          postgres    false    242            1           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public          postgres    false    244            2           0    0    migrations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.migrations_id_seq', 82, true);
          public          postgres    false    246            3           0    0    order_email_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_email_id_seq', 1, false);
          public          postgres    false    248            4           0    0 %   order_entry_borrower_or_seller_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.order_entry_borrower_or_seller_id_seq', 33, true);
          public          postgres    false    251            5           0    0    order_entry_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.order_entry_id_seq', 617, true);
          public          postgres    false    252            6           0    0    orders_file_history_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.orders_file_history_id_seq', 12, true);
          public          postgres    false    254            7           0    0    orders_invoice_mainlist_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.orders_invoice_mainlist_id_seq', 1, false);
          public          postgres    false    256            8           0    0    orders_invoice_sublist_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.orders_invoice_sublist_id_seq', 1, false);
          public          postgres    false    258            9           0    0    orders_note_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.orders_note_id_seq', 4, true);
          public          postgres    false    260            :           0    0    orders_tab_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.orders_tab_id_seq', 1, true);
          public          postgres    false    262            ;           0    0    orders_task_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_task_id_seq', 40, true);
          public          postgres    false    264            <           0    0    payee_creation_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.payee_creation_id_seq', 3, true);
          public          postgres    false    267            =           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);
          public          postgres    false    269            >           0    0    staff_category_creation_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.staff_category_creation_id_seq', 2, true);
          public          postgres    false    272            ?           0    0    staff_creation_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.staff_creation_id_seq', 3, true);
          public          postgres    false    274            @           0    0    state_creation_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.state_creation_id_seq', 8, true);
          public          postgres    false    276            A           0    0    task_creation_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.task_creation_id_seq', 47, true);
          public          postgres    false    278            B           0    0    task_type_creation_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.task_type_creation_id_seq', 2, true);
          public          postgres    false    280            C           0    0    tax_creation_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tax_creation_id_seq', 2, true);
          public          postgres    false    282            D           0    0     transaction_type_creation_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.transaction_type_creation_id_seq', 5, true);
          public          postgres    false    284            E           0    0    user_creation_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.user_creation_id_seq', 7, true);
          public          postgres    false    286            F           0    0    user_log_creation_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.user_log_creation_id_seq', 708, true);
          public          postgres    false    288            G           0    0    user_permission_creation_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.user_permission_creation_id_seq', 1669, true);
          public          postgres    false    290            H           0    0    user_screen_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_screen_id_seq', 69, true);
          public          postgres    false    300            I           0    0    user_type_creation_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.user_type_creation_id_seq', 16, true);
          public          postgres    false    292            J           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    294            K           0    0    work_flow_creation_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.work_flow_creation_id_seq', 49, true);
          public          postgres    false    296            L           0    0    work_flow_group_creation_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.work_flow_group_creation_id_seq', 18, true);
          public          postgres    false    298            �           2606    39067 0   account_year_creation account_year_creation_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.account_year_creation
    ADD CONSTRAINT account_year_creation_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.account_year_creation DROP CONSTRAINT account_year_creation_pkey;
       public            postgres    false    215            �           2606    39069 .   assign_type_creation assign_type_creation_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.assign_type_creation
    ADD CONSTRAINT assign_type_creation_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.assign_type_creation DROP CONSTRAINT assign_type_creation_pkey;
       public            postgres    false    217            �           2606    39071 &   company_creation company_creation_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.company_creation
    ADD CONSTRAINT company_creation_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.company_creation DROP CONSTRAINT company_creation_pkey;
       public            postgres    false    219            �           2606    39073 &   contact_creation contact_creation_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.contact_creation
    ADD CONSTRAINT contact_creation_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.contact_creation DROP CONSTRAINT contact_creation_pkey;
       public            postgres    false    221            �           2606    39075 0   contact_type_creation contact_type_creation_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.contact_type_creation
    ADD CONSTRAINT contact_type_creation_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.contact_type_creation DROP CONSTRAINT contact_type_creation_pkey;
       public            postgres    false    223            �           2606    39077 %   county_creation country_creation_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.county_creation
    ADD CONSTRAINT country_creation_pkey PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.county_creation DROP CONSTRAINT country_creation_pkey;
       public            postgres    false    225            �           2606    39079 (   customer_creation customer_creation_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.customer_creation
    ADD CONSTRAINT customer_creation_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.customer_creation DROP CONSTRAINT customer_creation_pkey;
       public            postgres    false    227            �           2606    39081 2   customer_fees_creation customer_fees_creation_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.customer_fees_creation
    ADD CONSTRAINT customer_fees_creation_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.customer_fees_creation DROP CONSTRAINT customer_fees_creation_pkey;
       public            postgres    false    229            �           2606    39083 0   customer_fees_sublist customer_fees_sublist_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.customer_fees_sublist
    ADD CONSTRAINT customer_fees_sublist_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.customer_fees_sublist DROP CONSTRAINT customer_fees_sublist_pkey;
       public            postgres    false    231            �           2606    39085 .   data_source_creation data_source_creation_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.data_source_creation
    ADD CONSTRAINT data_source_creation_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.data_source_creation DROP CONSTRAINT data_source_creation_pkey;
       public            postgres    false    233            �           2606    39087 ,   department_creation department_creation_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.department_creation
    ADD CONSTRAINT department_creation_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.department_creation DROP CONSTRAINT department_creation_pkey;
       public            postgres    false    235            �           2606    39089     document_view document_view_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.document_view
    ADD CONSTRAINT document_view_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.document_view DROP CONSTRAINT document_view_pkey;
       public            postgres    false    237            �           2606    39091 4   email_template_creation email_template_creation_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.email_template_creation
    ADD CONSTRAINT email_template_creation_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.email_template_creation DROP CONSTRAINT email_template_creation_pkey;
       public            postgres    false    239            �           2606    39093 +   expense_type_creation expense_creation_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.expense_type_creation
    ADD CONSTRAINT expense_creation_pkey PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.expense_type_creation DROP CONSTRAINT expense_creation_pkey;
       public            postgres    false    241            �           2606    39095    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public            postgres    false    243            �           2606    39097 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public            postgres    false    243            �           2606    39099    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public            postgres    false    245            �           2606    39101    order_email order_email_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_email
    ADD CONSTRAINT order_email_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_email DROP CONSTRAINT order_email_pkey;
       public            postgres    false    247            �           2606    39103 B   order_entry_borrower_or_seller order_entry_borrower_or_seller_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.order_entry_borrower_or_seller
    ADD CONSTRAINT order_entry_borrower_or_seller_pkey PRIMARY KEY (id);
 l   ALTER TABLE ONLY public.order_entry_borrower_or_seller DROP CONSTRAINT order_entry_borrower_or_seller_pkey;
       public            postgres    false    250            �           2606    39105    order_entry order_entry_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_entry
    ADD CONSTRAINT order_entry_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_entry DROP CONSTRAINT order_entry_pkey;
       public            postgres    false    249            �           2606    39107 ,   orders_file_history orders_file_history_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.orders_file_history
    ADD CONSTRAINT orders_file_history_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.orders_file_history DROP CONSTRAINT orders_file_history_pkey;
       public            postgres    false    253            �           2606    39109 4   orders_invoice_mainlist orders_invoice_mainlist_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.orders_invoice_mainlist
    ADD CONSTRAINT orders_invoice_mainlist_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.orders_invoice_mainlist DROP CONSTRAINT orders_invoice_mainlist_pkey;
       public            postgres    false    255            �           2606    39111 2   orders_invoice_sublist orders_invoice_sublist_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.orders_invoice_sublist
    ADD CONSTRAINT orders_invoice_sublist_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.orders_invoice_sublist DROP CONSTRAINT orders_invoice_sublist_pkey;
       public            postgres    false    257            �           2606    39113    orders_note orders_note_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.orders_note
    ADD CONSTRAINT orders_note_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.orders_note DROP CONSTRAINT orders_note_pkey;
       public            postgres    false    259            �           2606    39115    orders_tab orders_tab_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.orders_tab
    ADD CONSTRAINT orders_tab_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.orders_tab DROP CONSTRAINT orders_tab_pkey;
       public            postgres    false    261            �           2606    39117    orders_task orders_task_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.orders_task
    ADD CONSTRAINT orders_task_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.orders_task DROP CONSTRAINT orders_task_pkey;
       public            postgres    false    263            �           2606    39119 0   password_reset_tokens password_reset_tokens_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);
 Z   ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
       public            postgres    false    265            �           2606    39121 "   payee_creation payee_creation_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.payee_creation
    ADD CONSTRAINT payee_creation_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.payee_creation DROP CONSTRAINT payee_creation_pkey;
       public            postgres    false    266            �           2606    39123 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public            postgres    false    268            �           2606    39125 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public            postgres    false    268            �           2606    39127    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    270            �           2606    39129 4   staff_category_creation staff_category_creation_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.staff_category_creation
    ADD CONSTRAINT staff_category_creation_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.staff_category_creation DROP CONSTRAINT staff_category_creation_pkey;
       public            postgres    false    271            �           2606    39131 "   staff_creation staff_creation_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.staff_creation
    ADD CONSTRAINT staff_creation_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.staff_creation DROP CONSTRAINT staff_creation_pkey;
       public            postgres    false    273            �           2606    39133 "   state_creation state_creation_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.state_creation
    ADD CONSTRAINT state_creation_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.state_creation DROP CONSTRAINT state_creation_pkey;
       public            postgres    false    275            �           2606    39135     task_creation task_creation_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.task_creation
    ADD CONSTRAINT task_creation_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.task_creation DROP CONSTRAINT task_creation_pkey;
       public            postgres    false    277            �           2606    39137 *   task_type_creation task_type_creation_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.task_type_creation
    ADD CONSTRAINT task_type_creation_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.task_type_creation DROP CONSTRAINT task_type_creation_pkey;
       public            postgres    false    279            �           2606    39139    tax_creation tax_creation_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tax_creation
    ADD CONSTRAINT tax_creation_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tax_creation DROP CONSTRAINT tax_creation_pkey;
       public            postgres    false    281            �           2606    39141 8   transaction_type_creation transaction_type_creation_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.transaction_type_creation
    ADD CONSTRAINT transaction_type_creation_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.transaction_type_creation DROP CONSTRAINT transaction_type_creation_pkey;
       public            postgres    false    283            �           2606    39143     user_creation user_creation_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.user_creation
    ADD CONSTRAINT user_creation_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.user_creation DROP CONSTRAINT user_creation_pkey;
       public            postgres    false    285            �           2606    39145 (   user_log_creation user_log_creation_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.user_log_creation
    ADD CONSTRAINT user_log_creation_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.user_log_creation DROP CONSTRAINT user_log_creation_pkey;
       public            postgres    false    287                        2606    39147 6   user_permission_creation user_permission_creation_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.user_permission_creation
    ADD CONSTRAINT user_permission_creation_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.user_permission_creation DROP CONSTRAINT user_permission_creation_pkey;
       public            postgres    false    289                       2606    39178 %   user_screen_creation user_screen_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.user_screen_creation
    ADD CONSTRAINT user_screen_pkey PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.user_screen_creation DROP CONSTRAINT user_screen_pkey;
       public            postgres    false    299                       2606    39151 *   user_type_creation user_type_creation_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.user_type_creation
    ADD CONSTRAINT user_type_creation_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.user_type_creation DROP CONSTRAINT user_type_creation_pkey;
       public            postgres    false    291                       2606    39153    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public            postgres    false    293                       2606    39155    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    293                       2606    39157 *   work_flow_creation work_flow_creation_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.work_flow_creation
    ADD CONSTRAINT work_flow_creation_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.work_flow_creation DROP CONSTRAINT work_flow_creation_pkey;
       public            postgres    false    295            
           2606    39159 6   work_flow_group_creation work_flow_group_creation_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.work_flow_group_creation
    ADD CONSTRAINT work_flow_group_creation_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.work_flow_group_creation DROP CONSTRAINT work_flow_group_creation_pkey;
       public            postgres    false    297            �           1259    39160 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public            postgres    false    268    268            �           1259    39161    sessions_last_activity_index    INDEX     Z   CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);
 0   DROP INDEX public.sessions_last_activity_index;
       public            postgres    false    270            �           1259    39162    sessions_user_id_index    INDEX     N   CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);
 *   DROP INDEX public.sessions_user_id_index;
       public            postgres    false    270            �   �   x�}�=� Fg|
.��8?�9A���Х]���P��*QB�C���	�v<u�a9zw����{<�Zf�$�$�8���³���6�<�XJ�ш�jl�ܫ�f�qE��s2M&�Q\i��|"98���T�G�r�H7
���~���r��b�`�#녖@D��TX      �   �   x�m��
�0�ϛ��h؟ִy �^��K�A���>��J� 3�����;8�)1��C�R��0^��kw��X�Ԗ��Jh��oR��̋'��V����m
r���c�u��Ox)�5L�,V$C~F��:"�W����Lk�1O�6~      �   �  x�͗�n�0�����$�9���դiݤIӤ��7����@��I}���'q4-+
B��_��0���-@���.2�s_����q�n�C� �6�u^���m�� �Z��+��jz��z����ڲ�,����++�! ��%,QM;tq�����O����#�`/������\'�3IeΙ>�Ӷ��e_��XҸ���K��
�1�X�9�uO�z��՚�cw�c�i[�ls���ߊ�rSI�C	�X�X�9Ӗ����h�{�\,Ul���,u53ĸhD�ڇ�2��®���aÔ������2� �L+@��Ѣ�쐔�&/v��n�:��:)D��jq��L|��,�L�UQU{�#�rV������_/E�s�M��@b��ۛb�C����8mJb|�~�)nL�����{qٵ|d��{�3��qPA��MRf�^�@�H����񒾔|m�q�ዯ�"Ɠ8����H��v�N��!�aHy������
�*L���q�s�%����,�e��Q�Q�;w�kCzw>dSF�d{�Q^nH!��e�Ҳ2)Ӽ��6,k�}*�#�<�gi��%�ԡ�9ݶ*�:�>�>�Դ�-�e�Ga�8��L�1޿h������T���H��
�;��'�}^o�qm����
�xe���h7^PTnػG�
��%���׾�      �   E  x��ѱn�  ����@,��*U];T��,�MG�-�n��=�։�,�*U �����62�H/Ewl�*
�0Nq�4�U��}�Y�(�ba]��M�be߶�`� �*pFe%9R�W+�a��>M��}��ϱ_Jz��K�dR)���|��9+��3�bJ�za��T�Л��ZoГM����n�{�@~>���!�#/Ҿ��a~�Y�060yfr�ĉ���S�-�ST��n�VH�����K��י���}��Ώ�CQ@d��1E�)1�X�g��p����]�}��W��h��ZC����m�$�JW�^      �   �   x�m��
�0���S�Z��h��wOw)Z�0ZaA���0�����'`do0F8�"�,��~$M����LP*P��Ա�]�d٭C{.Z���~���ϴ3��K���c}iI��r�)��1���W��waF�JS����?���� -:�      �   �   x���=n�0Fg���~���t��-�Q�@����=}e$������ԧ`^��4�����qx�:}�����k!�1u謻"�ַ�Z��(!h����O�a+.k����o���Z��R*��O��8'#��8��d���W����`�����5F�槌e��5Fp���~}p#�5�xo�&���ej�Y+,��)/��g	,�����|!ݺ�F�ҍ:��ϟ��Y�Bat����      �      x������ � �      �   �   x���;
�0�Y:E.c�vlk�J��YB�!C����o^�GM�������[���:�ڃ����ϣz�ͧ���������K�^ψ�ja�ʐ�4��k�e���?�#3"1$D����F�Sg��	)�52�Mdh�����j�y^���qȂ�2\���Tl�F�0�Z�-��f��S�
��(u�      �   �   x���[
� ��gg�@�9�K���
��v�o56��)��_�C�lu��0�=�Y �=����y{����*��G:��fKˋׄW��ǆ7 �ή��zȭ�8M���߼\�&��/^z��FzM6�/�Qd      �     x����j!���S��8�U�=����	YHl��c6��F(�*��'ߏE E�S��ާk��i��_�g@��0P���ؓ�y`�fHe#�����ru�	Z3s��-�vq���.�R�DFc��B2�^RN�m���'I�Se/���)Z��65N��4��$'��јg�r��Z~�q�y^���8�YCЈ�ai�wK��Ns�.V�6��(U��qzS���;�S���y�ל.�2�S$�H��bS+��B|EѬa      �   �   x�u�A
�0����@C�$�i�ҍ.�)%h�T���MJ��*��$�f@������bnm�g��J��5+�NA����O����3~e�7Fn��R�Y���;�����$
3�u�+�?�AC{�.�e�x^�i�oָ?l&�'½3@"�uf%�x$I	      �   �   x����
�0���S��&�?��.�=� �U(�'�����A�	��/!_RQbru�U�0>��0l����@o�:�BD���"�eML���o`Ʀn�9b�Ԕ���\�C��u��g�U��ݑa�aZ���ή_|�ȾV�� &�t�ݯ�V��]�5�\L�?�[B���y�      �   l  x��TMo�0='���m@��NWt��c�rXt�aHrP-:�"K�(�Ϳ%;��!0"Q����|P������y1̽��e�oN��'�	,���hp簸g�j�Y��K�����㳥Y�)��!�Z4H$��2�`g[xF����Y�����VI�T�Ah�����v�ت�t5zN#��{�DhiS����i�im:�".!_�W�a5�U��� �_{�̫ x���1F�q�5��ͻ#��������2k��4R��T�}�w�"�w}9$9z����Hw���z����z�V �J�\$�M�������0�b�&�LH�*�@���`�/�Fώ�M�0�������ԓF��'k.Q4�8��N"���b]I�b��0�a_���eqy�q��e*��2Y߫�d�Q7�� 6�>����k��T��ܓH1� ˣj}�����x;���}?���6�.w\�S��ڨJ��gY����I��uO�Q|�MB���&(�2��Y��-�嫯���f}�=:j�E̽en)��`��gJ��M|��|�ӧ����r�-g��C��W�Y���jÇ�'���r4���$��p8����N      �   �   x�m���0E�ׯ��y��euwrdiL�$l�~�"`br�{�s���2��:�1=���6QN���-�[��D�����<�8z���6����1��z�o��.�Oh���=ko�h>Ԯ�y����X���c3b      �      x������ � �      �     x�����H�f�����Vue��u�+�gμ��\H�s�j���4� �6��H��?yה�+�֖��]�v*?h.�J�Z��G��sS����Y.�=�����V�:��>�[�M��!��q�?��:�j�+m�4�${7����c=��KYg�]}�V��ǣ@_APLd'?���������B�3ikf��.]�b�Qڄc���j��F�7�	��&��w.��Y��5ɞ�@�˵j�sx�%@�9�y�9y8��}��1A�*�2x� �׌���U�|�ь3vk��\V!A���ѷ�LK�����X���UޢU��������U�W�bE�	n�m_uUn�[�[�
@vA&3�)]S]�j� >���,�>KƎ����m.y�y�n<�t����	(hR"JSpڟ�������I����#�7����������*�E��au�10.9��,0�9)�h��sa��{�A�p�8`�B�cYK?���iIJ���Vʨ: ��@&��`���x�*�g5r_��)�T��������f#��O=gW_:)�ͼ�N4�u9��n��(60���~�
���1��Y�JCDc�2�_���$Đ�����`_�f�S��c���r��+��ic��k�0
�v`�j��80N��Ar�r�_��`%T��8����6* 8o� �M
��8���MS�cu��өo��gJoZ}��p�*
rVY��*�叴G����B�ㅎ���:�U:���.�g:,�Yy���#������W򁽍+�~6< .( "�pSu�;�2�g���l#��p/�腽~Ȅ��?�l��ru���ōU�d�
4��,Ov��3�0�B�_7������k�c�'��$�E\���@���&��Y�ݤ���I�4��Z-e��i�F��2!��`_C����`��4�3t}8o ���x�U��x�Y�0�ykO{�&�"���V�e}�!��/ �N��      �      x������ � �      �   �  x��V�n�0}�"�D���������ӪRUl�*�)��;�I�RU5*!�̱�s|)5 C�ef�����B�̓�1<�]��P<�j_��?��0Op�c��;S���7�Xƭ�b�T�"��T�{�*+�Q��*��Tc��s1�_���"U�,K��")�5	���!o�l��;�0"!b+�H���4s�����;�:?��?�V��*n9�3���>Ѧ�2�!>~D������2@�A���{��@��c����#��pw��!}���*�_I:$j�C"Ou�	�b z
�%���U6��b����U��e�K(q�A��
0F#t�9pn�9��y�uPSŧu[�Цmy��WT�>$ׁ��MZ5���R���٧Y���bu��zT����)B��NE���.V�H���1�@M�������[o[�"�̥�љ���fi�y���=+K�	�+Kp��' 9qw �E�K;��	L*]Feo��Kk=�M᪪*�����>@Υ�|�a_��/ް��-��R�~�򣧞�U�A����,~�ܔ�+A��c�*�a�I�CS���V	+1R�x�e�jg��0A�pp�O`��;���7f	�{��%��	�zF�����2�7L*)� HQ"H�!�A���4��2��q�&�Y0h��X'����2�Rlߢ臁�UrE�������P:(���(h�W�b��.�� 5�      �   �  x����n1�׾O�ht��K���+�M��V*�TZo���&�O�x2�lz��~s|}l�ad{�ᚽ���������{m�7��
���!�hŲ��C\���~�Ѐ�b�L1iɋ��\ĪX��fż56//�?�s���㳡G�n���(�B�/�`Bd �4p�0��HD�Ҁ�q����S����(e����F�h��a��莳$_$2F�f�
������FʠtE�=С\C��?B�U��a�AS]i��P�s�s09��������":�P�OHR��m ��7� �
�EfP�Z/�,��T�#i*�#UT���~*���T��%�U��n�a}|{}x3?�~w��s�*Eґ�R��r��[��|�RJ&�Q�a�"�꺱��C���;�����OQI�ȃF�%$n�6���E�S�N��Ҥ����g�p�\v-�uӰ�Y�\:��Ɨ7j:�� �i�D�LfUv�� �Ś˩q��8���&�B\>Rť�!s{��y�<(5��!��\��-Se��4vw��/i�^�4�)�\N��9�ɥ>�͜=�m[k���siRT:�+r�k�����SWj�ͽ!Lu%���5�Q/>�3`��Bif�;���^�r����4�+�N�ѵ����
��F�*ݲӥs'��87�I}��~���z񲮥��^�ZŞSEE��E����e�.$�*��*�UťM�����a�q��L#:ni �WqT���Xgܮ ����      �   s  x����j�0���S��`������2��n�R
i2w�{��nK۠�R���E�!�A&��"���E2�^��i�Se�������Un͊/vEa�v�+�=[��'nqf2�80��$]�sL�ȴH(��H�Y]춦�-{l��;7���.�����|k4�����(t��(=ɎvBuQ�r��W18J�Z�\�v���}�"5.R�Qo�Mi&~�<WQW6/�Gq�l�*(گn�LK��Az;�A<zC}�j��l'4H� 'Q��?��Nh�ޭ�>�A�()�� g�4Hq*U;��9�歶y��,�"A�K|�����h5�������8��v��!c��7�}-����	� ���8      �      x������ � �      �      x������ � �      �   �   x�m��
�0��ۧ����������)���v�:�9�9I��n�7`�q��肂 ��3[�yAR��:z��:�2�e�u�؀���.�e㩪���[�*贜�1�
��U�U���J�Y(WMGW0�2\gj��܄�H���$n�ދW��YS]N�xw|��A�=��x'9�_��a      �   O   x�m���0��x��k���l�����ѩ�PTt4�����E������d��>�������Qa�=m���\��dT      �   �  x��WAn�0<���v!R�%��{/��R���hQ��(%[�n��R��p44%e\�_\�x�|{������\Z0.�����kƐ�/����7�⚮x����{�$2ʒϞge)hx�l��e�9�FR0`��O�Ӭ�NR0FY�������U�3Ѵl%)D�l�LnVv')$�,��eE�l��l�0@g��9�?n%)ܽXu��&���fT�^��n%)�թB:��I��T��fU����tI� m^%�,.3���|`�6���5�uZ����V�.3d^���fW5���F�yc}�g~��u��Ph$z�W]w�~�\U����՗߿��|:]��+�#4t��#�WAC+��.T�`�fc���׼FR0 ��I�zFwUtת˓�'*w�#Xϵ_c�V ��I:M^ I����&�a��H
t�n�����������K_c�"�v�6��w��>���q'�1�����&��`�=�h��1��,��wE6��H8G�ϔ��1��`�"�`;_NR�zӶ�<��r�".�X.Q{p����������J-�W���\7�ٮQI
����'>���NR0�ߒ��V-�fď�����I
��b�v*�^��}P�Sz��Pξƈ1�h.G�T�ɼsG��s>/��1`�'�i�w��Μ�NR0���6�� )���|'we_c���z9��٫�ݎ�tox^N]c���
 � �;�F      �      x������ � �      �   �   x�3�4202�5��54�H�TK�K�/Bf&&�d��r��sq���������������1Ta���������%61.cd�\+
R�S�r첰20�&ƅ,�错������1°�N4�ͬL�1-41����� "fLy      �      x������ � �      �      x������ � �      �   �   x�m��
�0���S�$�]S�duwѱK���X0���khi�������k��ǔ��\�0@��ۜ�>�@��^�aӸ�d
B�����:������qz���r���R�s��>[��l�m ����?�˪7J�7��4�      �     x����n�0Eg�+�6D��)MY�v(�NY�XH]�8F����<�f)P� �KB�B C\)��xk�C:�C_wI�4�������vǾn��0�����R ������N#Mc�`N��c�֫s��`׵*`���X��y���An$Z�h.I��#ی�y^�?�8Q���8`a�֔ʹnu���+cD�'r�pf75�҇��v=t�I��SA?���H�oN=��/��[�"�0�L}�n�CWO9�h(�<Ҳ}�e����Z      �   �   x����n� ������D�[�M�z��d%�ԅm�����ZӤa��̗a���g�h����S��Y���ehT	֕P*�OrQIe
�
%��h,B�Ь �ʡlx5��B�%��Z?v�t��#y����F�3���`�M�As��N��ƞi���ot�@�'��c� �n;��B6XI��L�z�x����?6��qC�X�)d=�h4��o�Q�qJ�|��}C��ǉ��o��׈pe��+T�L㗒s��3��      �   �  x���Ms� ���+��a��z�%��%3Ǳ,5���N3�_ߕ���Z�8yeã��E �;Q�AɀA�V��������,W$��o�k4^5&����/�A�����7����A�ź�j��zz�X=�[�몭���j�꺢f�)o��MA����p����.��ʄ�RY,<����2�X�]�ƪ��uȵ�ِ���V����\��.?e��'�dib/]$�y<)6qg�hmEӸ���g�b:Y�%��wd��91�,��QdB[41�qp��)12d?拗�aХ���b������  ��V�P��6�^J�Po�qS5c��l'�!�j� b���R!a�Ll�����J�4:΁���+���2�q�� 4�z׺"Hi��iܝ�>{$�=κDm��:��F'c&�w|"p)�
2Gy�۳��b��qM!2�K'������K�͵c+�;^N�`U�80)w�Q�g&!����P�|I1���+�R�4��`�n��l��B� �fN����VNx�J��	���Ñ���5�:��N�F��C���}kp'L���N��J1Yx��{˛�@��u�HCHB�77BB��"⪋�Q�\j��퍐	t����P!D�s`#t��]J7¯�9S1�yΔ�5��z�K�`��%F�(By{#�:esh#�_#S��F(�`@'67B����}��܉�=�#�f5�����zY��y4�vU7�Q����i���R4�Mh���5ms������Q�f�!;����)���`�n'U�	�m�T����i'�r2Z��n+X��6_�&튈ߗ�s�����?�Y� 58*�Ѹ2!`ɪ��v�m�>��a_��x��#W:�3�z��6�֥�0�[X*s��x@�w����m��C\��9�� ��K�      �   �   x�u�[
�0D�oV�4d�M�c��?�D-�
6u�Va��bˮ��A���g<]3���p+4]���	�v�����u��h별yu�4|vn��wk�q�s���j��0����J��}�i�,�%m���e����?3�      �   v   x�3���I�P0�4�PP���%�e��y��� i 2�4�34��3�32�
��X��)XX�`�2B��d����*C�ЭE6�������!f�  �il����� ʷ,�      �   �   x���A
�0E�3����3I���.�HqэB����HEJ�y���0 ��ԥ	��4�N���N���|{�4�Ԟ׃FN��k�m9�Y�����~5Y��H����d?��3�%2��1�G��ۤ�cVڔ ]��0��q(@I+{�m��UXB����w�$H�`Q�O��:f~/}�      �   2  x�ŔKs�0���W0��\&�ڃ����l�@��Z�_�A+^�l\t�M>�<o���ZB�D  Έ�0R�
z�*�Ζ��0�g+P$I�b�as�K֭�;l'q�^Ts`T��P�wuײzF���dԃ�;����ų/��E9�b�CU�/QLuDuU�Z{�� ���O|g����/��ɸr��d��-�	�F�4
b:c:�GHA\�F�w��8�
9l?W�8��(a\hL����R����d>ŵj�e����xQk�m�ɟ�5�u����m0�õal��5O�D�ݜ�,�V*'�HYLt�uĮ��h��܍����H-/��.*\#D0��N,v}{�9���y���1��D�P��Q��	{}3Nh�l{<��m͑��_��u�]���E.�&!��4�1�#qa�Go�č��A/bp"�ȣ`�S��\ ���S��+Tr� ֲ 0MpB8X8��? 6��	4���	M�\���e���:��Y^s�~�,��nm۽���~��K��,�����&���/�7X(��g��      �      x�ŝˎ�8z�ׇO�/�F�"u�g0��f63F�����?��T1ϯ�`:����JJ)�;���˯���e���~y�e�Ǐ���o���?�����߿���_�럿��o?���������h)p�k��/��\�z:��&ZZ%t.֕7�RQЊRՆ^n�����E2�����&Z�����h�L�p-��ۻ>�]���DK?U<�k��/��,�3g�DK��<�/����&Z
����^g�:�DK�2���cy�M�n��%Kj~��n��e���|8Q�DKKQT<�O��DKK�T��F7�ҲI����t���n���Z�d�n��eM�����3|����M�YPf����h)�lZ��eS��h)�lZ�5?����M��E6�~{�n��,�	e6�n��,�	e���u'׺�k��˔7~��&Z�"�J�.���&Z�"�J�X�o�p-e�M�}�ޡB-�*�	e�su���&ZZoٔ?�Aj�Ŧ^n��uQԂ�t�����,��kmD7�ҭ:Ũ��4]n��ۍ�BEV�Ŧ^n���Jj+�S��h�v�R+*�>��������k%�k�����]on��[5�+u�Zwr�MK{ -1���̏g���M����PW��DK{��j�Dp-��j��?����MR�٦n��}����߸��&Z�E���k�DK�)��-j&Ԧ������7�ұ|C-��s����MH�����&Z:d6���n��CdSm�M�u�DK��&܌ſ��M�t�lB���p-"�곜fGmp-"���*Y�.��&Z:D6���\��n��Sd��̸nJ7��)�����i���N�M۳�Q�n��Sd��~{�:�DK�Ȧ���O�p-�"�z�}n��Sd*�>6�r-��l�����l�7��yH����p-�"�z�u�DK����ž��^n��H��4�D6+l}<����Dv�kpG7р-�`�� _n�[%5g�I��Dv����l��2�Z����DV�*�^�ipX�R(�F"_n��eU��u'���&�"�z��*��h���B��O��&����}#�M4`E5��o���M4`E=
�ڏ�c��h���J���CpX��;�>S��v���h����S7р=�������&ZZ��Km~�/��&�2�����W{���L�6����&��.u�����7р)���wD7р)�/r��I��h���j3w�����h��S���=&�r�yJ�P�Yh���M4`�)��"�����M����
��䗛h��S�*T���&��j��993���<��Bo<ɗ�h��[|��j���M4`�-���۾}�����
���&��_+�=�W��Dv��k�����<���$��Z�\)o�mp--e��
�C0/7р)��}�/7р)�R���}����wr+�/7р)���8�DV����ߕ7nrwX�RKJp���&�"�z!����&�"�����o_n��Sj�+�/7��RE]jiM�w�� qq���2�����7р�)�o�@��h���
e����&�2�wppX�R}⡏-��.��L�ŝ��DV�Բ����&�2����&�2����Dx����M��������ϟ���S���BZ��h�o2����x���L����䗛h�ʔB!k�ntX�R��}�M4`eJ�����M4`eJ��w7р�)�7{h��&��1�V�]��DK�.S*~'�pX�R��N��rX�R��K-�_j�R�L���k3��h�ʔ��~z���L�����Dv�{~-��_��&�"�r�p���M4`EJ�6���rXQ��
�/�p--b�y+����pX�R}]�ݱ;�Dv>��-1>�e��M4`EJ�)�ĥ��h����m�=D1�Dv>��VT/~J7рu�^Ȯ'7р)umX����M4`EJ�B��7р)��o�������M���)�9^m�X
����h�.�jQ����&���׉�Dv�[��n�[$�x�7~��&�UbO���DvS��a.�n��K����D���lv�7р�)�Bާ �����!�h:X�R�M4`eJ����(���L��]��DV��Zߺɕ��z�d�R�a��7р�)U�z�y��Ǔ,S�.f/\p�[J}���6wVkpX�Rm^��ɗ�h���j[�3��h)/�.U������M4`EJ�����`��l�W�F]j��쪰���M4`�Ģ�f�pX�R���A�DV�T����Gj�/C��+R����[On�+R�������&��:�����&Z�y�RW!���r�EbO��r�yJ�.����^n�;�K��
�Wp�y]�r�7р��&��~��|���<�Z��b�^n�;O�V��]��M4`�m[��7y��쩰e5G���h)��_�8؝��D��R�s!wQpX�Rk�~ì���DV�����p���&�"�z�7nr9���+R�ڷ����&����I��M4`EJ��r[��G7р�ץ����m��DV�To(�����h)�R�'��$7рu�^���.���H���y�#5�DV�T�L����&�"�j߬Ӎ��&���R�2����&��.U[���{�rX�R��a�Vj��h����Z]��n�+Rj�k\�p-�*Rjo��o;�Dv�/��}V�1���h����뾽͖��h�����,W����&�!��x�׾H��(��l����Pqd��h�n{�C��M4`��Mƛ�V�X���&���j[!w��&��¢��uu7�R�s�?c󳯯7��M4`�]�3Y��h��9vmݰ�4��&������	n�[$�4W�7р��T�[�0;v��h��S
U����{���h��
�:�}��&���Z?:��mpX�R����{����.Rj��7р)��!m��"���H�v�ٟ�DV�T��i�'7рN�Or�	��n�[��Z��D6�9�&�Bm��Չ�Dv�X���D�Pضϊ���D6�[�n'x)�DK9�=�����%��M4`�-�
��&�Ya��
n��αٟ��D�(��na�D�J�fNn	n��ͱk�i��@�M4`w�}�&��&���|̱}��w,epX�R����n��|���mh����&�"�j_��>R�M4`EJվ��վn�+R����O�pX�R��כ{�DV���'̹W;�DV��և��pn�+Rjok��q��&�"���Q�Sj���H��+i�]7���)�*���`���H������M4`EJ����&��7����c�Go2ip�"�����M4`�ۺa����h�n�Nyn��+lv�Â�h�sl���
n�{α�2+���hi����n��DvQX|�����h�f�]�=���h��S�r��n�;O��E�.v���H��=�^�"���H��P����M4`EJ�MD��mpX�R�x>�1�DV�To�y�^�M��f�R�w����M4`EJ��Q�?|�M4`EJ�6w�;�:���H�v�����DV�T_��-�n�+R��Z��	n�+R�M�5GF��h����mo�In�+Rj뻦�_��&�"��~r�Չ�DK�*Rjozz����h���������/���H��/�t���M4`EJ��JfC3���H���cxC�M4`�~D��'UUs�6�����Hn��K�f6���h��`�'9���9Ŷ֨�44������'X�X��&������V87р�랪�DvUX{��&�����n�;O�k�>��"���<�ڂ0w��&��v��*��M4`�)�
m�#5�DV��ھ�^]*����*Rjm
�{;�DV�T����8�DV�Ti{�z�^�M4`EJ��l�)��M4`EJ������7р)U�N��g��&�"��~V�{���h����㏫��M4`EJ]���v���H���	<����M��u`��/7р)�[�ިWpX�R[����M4`EJm�L��&�"��~ԙ�)n�+Rjkk��.��&�"��q�v�|���H��?v7���H�ޯb7���h�������o\��&ZZw�R{�k �  ��N���)u�I�Vᆛh���z���&�"��	��g~���H��u�>��M4`EJ�����7р��g�WY�Y��M4`w�-���M4`�=ͮ��&�����l7���¶�T�Œ�M4`�u7�n��6�Sރ�h��
ۖZXm��&�Ea��(��l���� 
n�;O��M�G�r�yJ}-�����~j��Sj��Oڿ�p�yJ]+<�)�M���"��c޼��&�"��$��&�"��a$^'BpX�R����pX�R�oJ@pX�R��?��ۗ�h������qpX�R��|޸�B��|\�H��?w�{;�DV�T���kV7�Ry���ݰ��o���H��g[}�M4`EJ�m��/�pX�R��&��@�M4`EJ�q��L��h���j�;���M4`EJm�;Ǜ��DV���\܉��M4`EJ�Bޒ��&�"�����lh��DKe)������B��H���u�7р)���{�N��&�"���[vn���H��_�DV���n�]�n�+R��gj��<�DV���w[�|�>4`�T���Ӻsک��M�n�{*�yD�M�TB��s��&��¶������D6O�me��54��h��
�v�7���h��u���h��9vi�EV\D7р��oec/7р��u:�7y���<����{�Dv�R�ɿy���M�T�yJ�&���n�;O����Ɓ��h���ꅬ�HtX�R�O�t*5�M4`EJ����f�pX�R}$kc��&�"��ƀ�#5�DV��ںحzrtX�R�5��pn�+R�0紁��h��R�7��J��M4`EJ�g߯��7р)�w����&�"���Hގ��M4`EJ�B֚��&�"���$��m��h�����	��M4`EJ�֨}���h����6^��P:�OAp��O����Wlq?�M4`���2��&�Ya��[tt�u�m���|���h��]�ݢ��h�V�]͡��&����譺Tp�]a���S�Dv�R��9?9���<�Zk�<o>����6O�^�v��n�;O�k���<���<�Z���D7р)�־y2�M4`EJ���5��DV��j���n�;^�����齿�Dớh��
�N�����h�kM����쩰��������k��W��c<.�n��H�����M4`�¶����^n��*l�Λ���l�k̻���lU�6�l��/7р��Ե��Q�����<�Z��q��&��N�5��n�;O���1���&Z*�H���5�>R�M4`EJ-mOv���rX�R�5��*��M4`EJ�BF���&�"���uF��M4`EJ�>����
�n�+R�Z?���@w7р)umT����&�"��:4;��h����{���7�R9EJ�~w7р7�Dl��^�^w7р�
ۆO��6���:��6�`����D�̱}Sc~��M4`�[[���M4`7��n.��쮰xˌ�
�n�{̱m�}��n�{α{?Z�}o��h�>ku���DV�T��љ�vwX�RGߋ����&�"��~���7р)�fT9']��DV���&����pX�RG�b����&�"��>'�}���h���:�Ɉ�M��DV���g�W;�DKu)u��(�`��M4`EJ���%�w7р)u�+R�n�;O��`S��n�;O��G����&���}�[a}���<�r�33��n�;O����Cw7р�Z���qʴ��D�T�bm*rw-������ww�Eb��	n��%v3��&������r�2�^
�Vw7р�{�5��&�����Al��&���Z����Dv�R��t��m�M4`�)u���}���h���j��5#w7р���G!�Y�Dv�R�����mp�yJ]3Ž�WpX�R�oV7р��T�T�.�{;�DV�T�3�ݽ���-�>�h(�/�pX�Rm�3M��&�"�
�Qv���&Z��?��#UZ�Ǜ�DV�T?����7р��}��Y�{��쪰�7���h����'�z�L��h���T���:��h�����f6�4���h������<�7y���H����*����h�����!��4�DK����n��xwX�R�{Я�7рu���&vo�pXQ��{����pX�R{? ���&�"�z��7��DV�T/d��pX�RG��po�pؐR[�n}Ʃu���M4`O�-��>������X7��h�.
[�	�M4`��:8�
kp�Ubws2ipآ�y7#�M4`���SA����&��¢��u"7р��ؾg��$��Dv�R�(�A�w7р��T;e3R��h���NF4Ng����<��+�JMpX�R[?�ƪ�7р)����.��&�"��+��\���Ѐ)u�J�*5�M4`EJ}l�}���h���:��ªK7р���{�(?ܙ�M4`�?��b�o��*w7р�
�X=��Dv���S�6��z���h�u�(�}���h�Vu���2	n����-��A�Dv�Wk��{wX(��'7р=��n�T��&Z��L��Nn	n�;O�6�y����h��S�w!�Ӵ��h��
k� 
n�;O�6�֝��D�J�[an�;O���qp��M4`w�-�s���M4`�)������7р�W�]ʽ��&Z���>��H7р)U��5�3�rX�R�4FsZtpX�R�n����&��7?#v���Uj��h��9v�d��h�nslnK-�
kp�]aK1��&����譚cp�s���2m_�p-mq|�+��f�Ep�Ea�;��D6ϱm"���n��*l����&�"�6��DV���k���7р)Տ(�&
7р)�7G�Z�M4`EJ}W�In�+R��S?�
kp-mY�T������h���:z#��
n�+R�&gvc7р��/��]�*V'Bt������n�[��&��{���h��k�~w�Cb����&�����m��DK���bېv��^�M4`�m�}��&�y���ZӢ��h��S���cKtw�yJ]����^n�;O�67�z�{D7р��T+�{���h��S���c��Dv�RסV�&���<�ڼx�Ի�hi+"�r�@����DV���JVOMtX�R(T��n�+R�:��엛��+R�*�>R�M4`EJ�}��7р)�ڋ%��h����WbEJ�Ǽ���M4`EJ�>"�4���hi�"�Z?�7 �DV�T}������"�z!��&���H�^���n�+R��KC��h����]u��btX�R[�X���M4`EJm��w7р)���;�Mn�+Rj���E7�Ҷ������{�DV�T�ޯ�7р)���(��^n�+R�w�ڟ��&�"���6ݫn�+R��}em��DV���N��:���h���:���h���H��z�� z���H�kѐ�R�M���"��~��[�n���%b���zi���M4`�{ME�~��&���[,^/\pآ�����M4`�[��9;�Dv�c�qX� yt�]a�9V&7р=�أOPw�v��쩰�9;����0��=��?�$b�
n��L���7���D6+l��b�Tp�UbO�!��l�c��g�o��h�V��;!���M4`7�]��sKt�]b���&���������&��¶���7��v�S�}�s(���H�՞w�DV����G��hF7р)է�Z+ۢ�h�����z��M4`EJ�6���7р)��)5�DV�T�3`��-���vX�R�i�3?�DV�T��+�n���!R�Ob��!E7р)U�����h�����;�����5`EJ�Ng�1�DV�Կ+R�m_`� 
n�+R�������M4`EJ�^$�.���H������p-���RJ���`�      �   �  x���1�7��կ0T��3C�NR����"@`7F ��J;�6���yPsX��w��p�N����͒e�ے�t{����ڻ���������r���om�%��%�h�K%}��ש�J���e�;�N��sJ�r���(8��1p�s�=�����/�t����Ͽ�~�� ��7�"8��Y�!���g�q�p��@�r9��p�O�$�+�I(� 	%�|�����\|�����m~�z>Pn_�@�ޑ��w>0�w���>��$&>���;��\h?p���F�su=�i�+�_�S��Ӯ��e?w޹�s�9{ãr�G���
N�r8�}�dXy�޸����}�Ζ�ٸ����G�v����ӎ���o�;�Nb��D�3LvL@'�a�c�3�8�2����5ØcZ�Sp�c�V�iW���R9�B�:�&.W�MW�u���堹�?�Y;�iD@7�������F�sL�����0�Z#¹�[kD67�xk���f����]4"��a��F�r3�[ "��a������&�����fX�+���H�f��7�-���0n��8n�qD�q3�\4����-ō1-!��M<���tB+�����5��RS��0P����ɶ��ʨQiK=�$�7T��	��\�8'��\NO+��|�=`���X�r�#�|`Au�޻�s��|=��To#|`A�6������F��y�>G�c=%��$�3�ʽk;';'��!��3�9NL�1�(8ď0�p<�l?�Tpb�CN'泺!guNP;�l�p�p�$���!�Jb�H"(�r ��,vȁ$���!>Jc�� (�r���<vȁ��!>JdM�AP$;��A���}@��&� (�r���|����\vȁ���!>Jf��~>��@S?p�i����'�������v(��U����{׮;8�+Op�sy=�9��Y�#��eX�}X��1�<�޸�<��P��ɜ��C;�����#�!o^qI{=.	a?��m�br\�~>.	%KO�J�u(��}�B�n���>�_L���6|19�ʾo84���@��T���> ���F���
�������	��@���p> ��p> �s�ϙ������*�o�>��:���uP1/�}P�F���>0������V�Ʈ7��]o�cכ���}��Ծ���t:��%�      �     x��X�n�8]�_!x=	�ԃ�"I�E�	&�b0��b3��dHrR��\ʒE�T,W�8:t���KJ�)������jU����
H�Ͽ���k�-��UE	 � I�5��kr��~^b!)�$:Ũ@�tpz�y@I�a�,wE���*��T��e�Iv���`�~yH	p�`ɘ�1� ǁ��?��V5Y���� ��,��]!N%��Ň!&,�� /^�|�:���z[���V+��Vy_+�V�Z���U���$ ֳ�J��S�SĨ���&kԐ��ґB�tp&9�Eb�ڀ�(�Ჷ�OKȁ�$>�p)�C,u��&{~���KY�Y�ÐH�B|���:9��PD>q츽ʚ,��]�T���<���E>qⲫmV5}�H� 'Cp�C�:���V�
h�}2�>�"?`�3�>����p��Y�I�:�b�s����fs<�<��0dV�V��o����2�V]�=��k�$��i"Ʉ�ԇ!���~��Y��\�5P��~\L�����>�����fg>�� P������d��) �Y�^l�{V����O段���x)�Rr��OG<����8����R�"������©Ç�f�U���"��E�d���^U�z��!:B,�5�E�G��|����qJ��c�I��M��g��ߣ��������ڱ]��󺙛_nM�C$5:L��O����k��=J��` �	:�掬��u�XGı���f��V�ޔ�mV��<q3��HP���J�I���7�_2QmZgj���Ɛ�N>�z�������p0k
���V̓�̖KUם yyZ�O�m$���vr1BCՀ�V��:�$x����deѮ�Fe�Ji$�a'P�撠�az=����c�[Y�x^�o�KU��(�3T��a�Y����k2c0u���i����E�t{�]��rtI�c�P�>E���>PO#��e�X��~AQ�Y��BM3�{�������72�w�J�]^8}	b���c�V�'H-�c+�n��CKB�yQ��ߖ˝�{�0�N���"OO�{�����[J/�M���1��(���^:N��9[P���
����R���m�|>��vm]	����w��,�a(J�����y��R$���	�R"�u{^��V���#�7�V��r��#i��ysx���!KN����r��@WB�w��{_���v;��ҏ2/�uC��mY��x�3.���6_��M��#�n��Ț�s���hl�pHS?��YnKo�n��4�u��������_#��
Xp�      �   �  x��T�n�0<�_���ط~@�J��'Bm!T�_/y`B�*��N�gg<,����r9y�}����z�oG~\O�t�A^f�	�RL�1���V�˭2������us��nV�P�J�
�R�k���_���;�Dn��z�����@ӎ�ۗ[���?Zm!Ohei���#�ˤ� �&��h��W�"J;Sx�鴫I1/WP�U�W'��7�cRR��k�{��L13�\���c^.��ܤ��`�,��`BQ���X����,�8�����ߧ���8�Mup����xrc5�9�����W6�çcǮ��i�'�db�INa�.|dw{����͗�@(���渡Ϫ^�(\`��y�>]ώm�dW۷KT��'�U��#�J�`>�~\gU�ͫ�����LX�%t��a&�#�n3J�/ԑ      �      x������ � �      �   �  x����n�6�Ϛ��$�I}���Ӣ-�zًb+����j�}���&)��J.l@�0��|�2OH���Q�2���~���=�Df�c��oM�o�����")��+��xR17���z<�	�6��OI���xO2��k�T�Jc%2[C�d^�ȣ���~��[��ut1F�`�D%ʩ�9���f1T�T�j=�l]��JM���/0տr�Օ����*�������w��_hlQI7�$o�qp0�������`)��E4�TD|����:�O��e�~�sa8^�3J?��N��/��o���-ؓf6������_^w��w@NѲ�+զi�uK��&������25?{I���ӈS�[�_�Wo����z|[]���q�J�_��Z�Vm�7O��i��I����L�U�L�UVw�D8O��ZⲨBX���qo/f��8�4*�g�޾i۵E��u}�Z(,�!`��9k��E�DsH�	/C`1%�15�Nz=,7U�!k���2��͢&����ϩ��cJ���{ƭ�Ar��Pt�����r֎2@s��VT�����n�t�]�j��~������'����F1)�s��)��gSw�g&��G��f�8@�	�����8�m�{���_���ڮ�~��Ӈ�~m�����������T!(���Ue�J,��#gH�cX���Q�z.�`(���m<�t�r�p��Y*c\�r��6�@��c�t�p��~4�#���O�`i8�r��!�}�6�b�Ĭ6��x�i`Ul�C'������rxt����b2�|h u�S���΋���ɛ}�?X�pp��1Fq��y�y���Bv�x������ؼX�/๹p]�Z��Q�0M��}�tɼ�X Ka�^�a�ə%�d�(�Y��PMG��|�!Nͻ�y���Ӷ;�i�~����� D��af3wpC�<���}�=��ۥ�a,Q�L��)r���W����:}�ǁSs�\�0���{ �~q�
      �   g  x����n� @��+��F�$���m�]z�ڴ���*K7��]҆�Nj%�'��8�HP��+�����i��u��h��2d�g?��U�aFr@a=�AeH���iӼY�8e��܀���*� լo�{</$8��Z��0ynD���HgӠ't���U��h�2(b�@����?���/�R�?��[q,��k JIu��C:-�}SU�$sc���\�VJY]%"�V�6Eadc�����ZDЭ�Ҹ�q��� �7�n��,߁I����x�#�8���~d�	�o��µ_���xk�u�}�vl{j[����x��ۆ;�w>�I������3�ܻp�ؐ�e.*A�� �7��     