FROM alpine:3.12.4

LABEL maintainer="LinkPhonix <linkphoenix@protonmail.com>" \
    description="NGINX Docker image running on Alpine Linux" \
    nginx-version="1.18.0" \
    alpine-version="3.12.4" \
    build="13-Mar-2021"

ENV NGINX_VERSION 1.18.0
ENV PKG_RELEASE   2

# Update
RUN apk update

RUN \
    # Create the nginx user/group as system group
    # https://wiki.alpinelinux.org/wiki/Setting_up_a_new_user#addgroup
    addgroup -g 101 -S nginx \
    # Add user with ID 101 in the nginx system group
    # -D No Password
    # https://stackoverflow.com/a/49955098/12317483
    && adduser -D -u 101 -G nginx -g nginx nginx \
    # Install Nginx from the offical depo
    # With `apk add nginx` the command `nginx -g `daemon off;` fail
    && nginxPackages=" \
        nginx=${NGINX_VERSION}-r${PKG_RELEASE} \
    " \
    # Get key for download the Offical Nginx binary
    && KEY_SHA512="e7fa8303923d9b95db37a77ad46c68fd4755ff935d0a534d26eba83de193c76166c68bfe7f65471bf8881004ef4aa6df3e34689c305662750c0172fca5d8552a *stdin" \
    && apk add --no-cache --virtual .cert-deps \
        openssl \
    && wget -O /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub \
    && if [ "$(openssl rsa -pubin -in /tmp/nginx_signing.rsa.pub -text -noout | openssl sha512 -r)" = "$KEY_SHA512" ]; then \
        echo "key verification succeeded!"; \
        mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/; \
    else \
        echo "key verification failed!"; \
        exit 1; \
    fi \
    && apk del .cert-deps \
    && apk add -X "https://nginx.org/packages/alpine/v$(egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release)/main" --no-cache $nginxPackages \
    # if we have leftovers from building, let's purge them (including extra, unnecessary build deps)
    && if [ -n "$tempDir" ]; then rm -rf "$tempDir"; fi \
    && if [ -n "/etc/apk/keys/abuild-key.rsa.pub" ]; then rm -f /etc/apk/keys/abuild-key.rsa.pub; fi \
    && if [ -n "/etc/apk/keys/nginx_signing.rsa.pub" ]; then rm -f /etc/apk/keys/nginx_signing.rsa.pub; fi \
    # --no-cache option allows to not cache the index locally,
    # which is useful for keeping containers small.
    # https://stackoverflow.com/a/49119046/12317483
    && apk add --no-cache openrc openssl openssh \
    # forward request and error logs to docker log collector
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

ADD	Config/nginx.conf /etc/nginx/
ADD	Config/sshd_config /etc/ssh/
COPY www /var/www/localhost

# Expose Port for HTTP/HTTPS/SSH
EXPOSE 80
EXPOSE 443
EXPOSE 22

# Start the Nginx Daemon
# https://stackoverflow.com/a/34821579/12317483
# Nginx to stay in the foreground
# useful if there's a 3rd party tool like Supervisor controlling your services
CMD ["nginx", "-g", "daemon off;"]