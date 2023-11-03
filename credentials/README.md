# Credentials

Azure IP: 74.234.41.238

Azure Domain: https://gdsdt4.northeurope.cloudapp.azure.com

Azure User: gdsdt4admin

Azure ssh key: In this directory

MySQL user: gdsdt4admin

MySQL password: gdsdt4Password$

# Tutorial Server

1. Connect to the VM

```bash
ssh -i gdsdt4.pem gdsdt4admin@74.234.41.238
```

2. GitHub Project is under /home/gdsdt4admin/...

3. Nginx is running

```bash
sudo systemctl nginx status
```

4. Nginx restart
```bash
sudo systemctl nginx restart
```

# Tutorial Database

1. Connect to the VM

2. Open Database
```
mysql -u gdsdt4admin -p
```

3. Enter password

# Tutorial Database MySQL Workbench

1. Download and install MySQL Workbench

2. Add connection to the remote server DB

3. Fill fields
```
SSH Hostname: 74.234.41.238:22
SSH Username: gdsdt4admin
SSH Key File: <Path to your credentials folder and the key file>
MySQL Hostname: 127.0.0.1
MySQL Server Port: 3306
Username: gdsdt4admin
Password: gdsdt4Password$
```

4. Test connections

# Tutorial Deployment

1. Connect to VM

2. Pull changes from the Github. Project under ~/GDSDTeam4Project/GDSD-Project-Group4/
```
git pull
```

3. Change into client directory, remove dist directory and run build command
```
cd client/
rm -rf dist/
npm run build
```

4. Copy dist folder (Build output) to the nginx folder specified in the configuration
```
cp -r dist/* /var/www/gdsdt4/html/
```