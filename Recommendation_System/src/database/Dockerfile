FROM postgres:14.1-alpine

# Install build dependencies
RUN apk add --no-cache git make gcc musl-dev postgresql-dev

# Clone and install pgvector
RUN git clone https://github.com/pgvector/pgvector.git /pgvector && \
    cd /pgvector && \
    make && \
    make install && \
    rm -rf /pgvector

# Copy SQL initialization script
COPY init.sql /database/docker-entrypoint-initdb.d/



# Set default command
CMD ["postgres"]
