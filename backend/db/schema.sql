CREATE TABLE IF NOT EXISTS projetos (
                                        id SERIAL PRIMARY KEY,
                                        titulo TEXT NOT NULL,
                                        descricao TEXT,
                                        linkgithub TEXT,
                                        linkdeploy TEXT
);
