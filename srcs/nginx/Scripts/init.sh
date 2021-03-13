# --- Env Variables
# SSH_ROOT_PASSWORD <- Password to access to nginx container through SSH

#echo "root:$SSH_ROOT_PASSWORD" | chpasswd

# Creating SSL keys
openssl req -x509 -nodes -subj '/CN=localhost' -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/server.key -out /etc/ssl/certs/server.crt

#tail -F /dev/null