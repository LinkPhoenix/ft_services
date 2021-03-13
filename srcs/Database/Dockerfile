FROM alpine:3.12.4

LABEL maintainer="LinkPhonix <linkphoenix@protonmail.com>" \
    description="MariaDB Docker image running on Alpine Linux" \
    mariadb-version="10.4.15" \
    alpine-version="3.12.4" \
    build="13-Mar-2021"

# Update
RUN apk update

# Pwgen use for create strong password
RUN apk add --no-cache mariadb mariadb-client mariadb-server-utils pwgen


# Defaut port connection for MariaDB
EXPOSE 3306
