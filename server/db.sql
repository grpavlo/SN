create TABLE clients(
    id SERIAL PRIMARY KEY,
    nick VARCHAR(255) UNIQUE,
    password  VARCHAR(255),
    email  VARCHAR(255) UNIQUE,
    avatar VARCHAR(5)
);

create TABLE post(
    id SERIAL PRIMARY KEY,
    clients_id INTEGER,
    FOREIGN KEY (clients_id) REFERENCES clients (id),
    text  VARCHAR(255),
    photo  VARCHAR(255)
);

drop table post;
drop table clients;
