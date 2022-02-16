-- public.chat_histories definition

-- Drop table

-- DROP TABLE chat_histories;

CREATE TABLE chat_histories (
	id int8 NOT NULL DEFAULT nextval('chat_history_id_seq'::regclass),
	userid varchar NOT NULL,
	message varchar NOT NULL,
	"createdAt" timestamptz NULL DEFAULT now(),
	"updatedAt" timestamptz NULL DEFAULT now(),
	CONSTRAINT chats_pk PRIMARY KEY (id)
);
CREATE INDEX chats_id_idx ON public.chat_histories USING btree (id, userid);


-- public.users definition

-- Drop table

-- DROP TABLE users;

CREATE TABLE users (
	userid varchar NOT NULL,
	"name" varchar NULL,
	state varchar NULL,
	dob date NULL,
	"createdAt" timestamptz NULL DEFAULT now(),
	"updatedAt" timestamptz NULL DEFAULT now(),
	CONSTRAINT users_pk PRIMARY KEY (userid)
);
CREATE INDEX users_userid_idx ON public.users USING btree (userid);