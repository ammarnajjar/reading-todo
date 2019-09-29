FROM postgres

ENV PGDATA=/data
ENV POSTGRES_USER=ammar
ENV POSTGRES_PASSWORD=secret
ENV POSTGRES_DB=books

COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
