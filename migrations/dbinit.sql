DROP TABLE IF EXISTS cat_images cascade;

CREATE TABLE cat_images
(
    id INT GENERATED ALWAYS AS IDENTITY,
    name text  NOT NULL,
    image text NOT NULL,
	size text NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP,
	deleted_at TIMESTAMP,
    PRIMARY KEY(id)
);
