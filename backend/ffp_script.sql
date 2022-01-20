CREATE DATABASE ffpdb;

\c ffpdb

CREATE TABLE IF NOT EXISTS public.app_user (
	id integer NOT NULL,
	username varchar(200) NOT NULL,
	password varchar(200) NOT NULL,
	designation varchar(200),
	pfp varchar(200),
	CONSTRAINT user_id_pk PRIMARY KEY (id),
	CONSTRAINT user_username_unq UNIQUE (username)
);

CREATE SEQUENCE user_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY app_user.id;

CREATE TABLE IF NOT EXISTS public.app_role (
	id integer NOT NULL,
	name varchar(200) NOT NULL,
	description varchar(200),
	img varchar(200),
	CONSTRAINT role_id_pk PRIMARY KEY (id),
	CONSTRAINT role_name_unq UNIQUE (name)
);

CREATE SEQUENCE role_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY app_role.id;

INSERT INTO app_role (id, name) VALUES (nextval('role_id_seq'), 'ROLE_RO');
INSERT INTO app_role (id, name) VALUES (nextval('role_id_seq'), 'ROLE_USER');
INSERT INTO app_role (id, name) VALUES (nextval('role_id_seq'), 'ROLE_ADMIN');

CREATE TABLE IF NOT EXISTS public.app_user_roles (
	app_user_id integer NOT NULL,
	roles_id integer NOT NULL,
	CONSTRAINT au_id_fk FOREIGN KEY (app_user_id) REFERENCES public.app_user(id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE CASCADE,
	CONSTRAINT ar_id_fk FOREIGN KEY (roles_id) REFERENCES public.app_role(id) MATCH SIMPLE
		ON UPDATE NO ACTION	
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.firepoint_data (
	ID integer NOT NULL,
	LATITUDE double precision NOT NULL,
	LONGITUDE double precision NOT NULL,
	SOURCE_SYSTEM_TYPE varchar(200),
	SOURCE_SYSTEM varchar(200),
	NWCG_REPORTING_AGENCY varchar(200),
	NWCG_REPORTING_UNIT_ID varchar(200),
	NWCG_REPORTING_UNIT_NAME varchar(200),
	FIRE_YEAR integer,
	DISCOVERY_DATE Date,
	DISCOVERY_DOY integer,
	DISCOVERY_TIME integer,
	STAT_CAUSE_CODE integer,
	STAT_CAUSE_DESCR varchar(200),
	CONT_DATE Date,
	CONT_DOY integer,
	CONT_TIME integer,
	FIRE_SIZE double precision,
	FIRE_SIZE_CLASS varchar(2),
	OWNER_CODE integer,
	OWNER_DESCR varchar(200),
	STATE varchar(200),
	COUNTY varchar(200),
	CONSTRAINT firepoint_id_pk PRIMARY KEY (id)
);

CREATE SEQUENCE firepoint_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY firepoint_data.id;

CREATE TABLE IF NOT EXISTS public.source_system (
	id integer NOT NULL,
    name varchar(200),
    type varchar(200),
    img varchar(200),
    CONSTRAINT source_system_id_pk PRIMARY KEY (id),
    CONSTRAINT source_system_name_unq UNIQUE (name)
);

CREATE SEQUENCE source_system_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY source_system.id;

INSERT INTO source_system (id, name, type) VALUES (nextval('source_system_id_seq'), 'FS-FIRESTAT', 'FED');

CREATE TABLE IF NOT EXISTS public.nwcg_reporting (
	id integer NOT NULL,
    name varchar(200),
    agency varchar(200),
    img varchar(200),
    CONSTRAINT nwcg_reporting_id_pk PRIMARY KEY (id),
    CONSTRAINT nwcg_reporting_name_unq UNIQUE (name)
);

CREATE SEQUENCE nwcg_reporting_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY nwcg_reporting.id;

INSERT INTO nwcg_reporting (id, name, agency) VALUES (nextval('nwcg_reporting_id_seq'), 'National Forests in Florida', 'FS');

CREATE TABLE IF NOT EXISTS public.fire_cause (
    id integer NOT NULL,
    name varchar(200),
    img varchar(200),
    CONSTRAINT fire_cause_id_pk PRIMARY KEY (id)
);

CREATE SEQUENCE fire_cause_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY fire_cause.id;

INSERT INTO fire_cause (id, name) VALUES (nextval('fire_cause_id_seq'), 'Debris Burning');

CREATE TABLE IF NOT EXISTS public.owner_list (
    id integer NOT NULL,
    name varchar(200),
    img varchar(200),
    CONSTRAINT owner_list_id_pk PRIMARY KEY (id)
);

CREATE SEQUENCE owner_list_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY owner_list.id;

INSERT INTO owner_list (id, name) VALUES (nextval('owner_list_id_seq'), 'Union');

CREATE TABLE IF NOT EXISTS public.fire_size (
    id integer NOT NULL,
    grade varchar(200),
    size varchar(200),
    img varchar(200),
    CONSTRAINT fire_size_id_pk PRIMARY KEY (id)
);

CREATE SEQUENCE fire_size_id_seq
	START 1
	INCREMENT 1
	MINVALUE 1
	OWNED BY fire_size.id;

INSERT INTO fire_size (id, grade, size) VALUES (nextval('fire_size_id_seq'), 'A', '0-0.25 HA');