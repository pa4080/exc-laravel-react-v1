# Laravel and React Full-stack App Exercise

The exercise is based on the tutorial ["React + Laravel Full-stack Application | Build and Deploy"](https://youtu.be/qJq9ZMB2Was) provided by [TheCodeholic](https://thecodeholic.com/) on YouTube.

## Deploy the dependencies

### Get Composer

First [download](https://getcomposer.org/download/) `composer.phar`, then you can move it somewhere in your `$PATH` or use it as local executable, e.g. `php composer.phar` or `./composer.phar --version`. In my case I moved it to **`~/composer`**.

In order to get the list of [the global envvars of composer](https://stackoverflow.com/q/30664220/6543935), run `composer config --list --global`, of to get the location of the binaries run `composer global config bin-dir --absolute`.

### Install Laravel Installer and Check System Requirements

Run `composer global require laravel/installer` to install the [Laravel Installer](https://laravel.com/docs/installation#installing-laravel).

The Laravel framework has a few [system requirements](https://laravel.com/docs/deployment#server-requirements) you need to satisfy them before installing it.

## Install Laravel within the Project

Run **`laravel new laravel-app`** to install Laravel within the project. Note that the project name is `laravel-app` and it is not possible to install it in already existing directory which is not empty, but the current GitHub repository was previously initialized...

The next step is to setup the database details in the `laravel-app/.env` file. Then run [`php artisan migrate`](https://youtu.be/qJq9ZMB2Was?t=781) to create the tables in the database.

```bash
cd laravel-app/
php artisan migrate
```

At this stage we can spin up the server and check the app in the browser.

```bash
php artisan serve
```

## Install React within the Project

First you need to [install NodeJS and NPM](https://wiki.metalevel.tech/wiki/Node.js_Getting_Started). Then we will use Vite to install React within the project. At this stage React is installed outside the Laravel's directory.

```bash
cd project-root-dir/ 
npm create vite@latest
# ✔ Project name: … react-app
# ✔ Select a framework: › React
# ✔ Select a variant: › JavaScript
cd react-app
npm install
```

To start the Vite's dev server use:

```bash
npm run dev
```

In order to change the port of the dev server, edit the `react-app/package.json` file and add the `--port` option to the `dev` script.

```json
"scripts": {
    "dev": "vite --port 3000", 
},
```

## MySQL

<details>

<summary> <em>Create or Remove Database:</em>

In the directory [`scripts/sql`](scripts/sql/) are available three manual like SQL files. We can suppress the comments and use them as SQL scrips to create or remove the `db_name` and `db_admin` MySQL database and user used in this tutorial.

</summary>

```bash
sed -r \
-e '/^(-- |$)/d' \
-e 's/db_name/db_name/g' \
-e 's/db_admin/db_admin/g' \
-e 's/strong-password/strong-password/g' \
scripts/sql/mariadb_db_create.sql | sudo mysql # scripts/sql/mysql_db_create.sql | sudo mysql
```

```bash
sed -r \
-e '/^(-- |$)/d' \
-e 's/db_name/db_name/g' \
-e 's/db_admin/db_admin/g' \
scripts/sql/db_remove.sql | sudo mysql
```

</details>

## References

- [Laravel](https://laravel.com/)
- [Composer Download](https://getcomposer.org/download/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [NodeJS and NPM Install](https://wiki.metalevel.tech/wiki/Node.js_Getting_Started)
- [Vite: Next Generation Frontend Tooling](https://vitejs.dev/)
- [MariaDB Docs](https://mariadb.com/kb/en/authentication-from-mariadb-104/)
- Next to learn:
  - [Laravel Bootcamp](https://bootcamp.laravel.com/introduction)
  - [Laravel Starter Kits](https://laravel.com/docs/9.x/starter-kits)
  - [Laravel Asset Bundling (Vite)](https://laravel.com/docs/9.x/vite#react)
