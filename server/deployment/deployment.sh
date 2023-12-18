#!/bin/bash

# Navigate to the project directory
cd /home/gdsdt4admin/GDSDTeam4Project/GDSD-Project-Group4/server

# Pull the latest changes from Git
git pull origin main

# Install dependencies
npm install

# Check values in config.ts
USERNAME=$(grep -oP "(?<=username:\s')[^']+" src/config.ts)
PASSWORD=$(grep -oP "(?<=password:\s')[^']+" src/config.ts)
DATABASE=$(grep -oP "(?<=database:\s')[^']+" src/config.ts)
CLIENTURL=$(grep -oP "(?<=clientUrl:\s)\[[^\]]+" src/config.ts)

echo "Username: $USERNAME"
echo "Password: $PASSWORD"
echo "Database: $DATABASE"
echo "ClientUrl: $CLIENTURL"

# Check if the values exist or meet certain conditions
if [[ "$USERNAME" == "gdsdt4admin" && "$PASSWORD" == "gdsdt4Password$" && "$DATABASE" == "ARTSYNC" && "$CLIENTURL" =~ "https://orange-stone-0a4f77810.4.azurestaticapps.net" ]]; then
    echo "Config values are correct."
    
    # Start the server with PM2
    pm2 start ts-node -- -P tsconfig.json src/server.ts
    pm2 save    # Save the current process list to automatically start on reboot
    pm2 restart ts-node   # Restart the app to apply changes
else
    echo "Config values are incorrect or don't meet the conditions."
    # Handle error or exit the script
    exit 1
fi
