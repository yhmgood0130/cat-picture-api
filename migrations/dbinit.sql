DROP TABLE IF EXISTS cat_images cascade;
DROP TABLE IF EXISTS cat_users cascade;

CREATE TABLE cat_users
(
    user_id INT GENERATED ALWAYS AS IDENTITY, -- For user id, I would prefer to use UUID (or GUID)
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO cat_users(first_name, last_name, email, password) VALUES ('cat', 'person', 'awesome@cat.com', 'cat1234');

CREATE TABLE cat_images
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name text  NOT NULL,
    image text NOT NULL,
	size text NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	deleted_at TIMESTAMP,
    user_id int NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES cat_users(user_id)
);
