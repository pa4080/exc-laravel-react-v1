# Laravel and React Full-stack App Exercise

The exercise is based on the tutorial ["React + Laravel Full-stack Application | Build and Deploy"](https://youtu.be/qJq9ZMB2Was) provided by [TheCodeholic](https://thecodeholic.com/) on YouTube.

****Table of Contents****

- [Laravel and React Full-stack App Exercise](#laravel-and-react-full-stack-app-exercise)
  - [Deploy the dependencies](#deploy-the-dependencies)
    - [Get Composer](#get-composer)
    - [Install Laravel Installer and Check System Requirements](#install-laravel-installer-and-check-system-requirements)
    - [Install NodeJS and NPM](#install-nodejs-and-npm)
  - [Install React within the Project](#install-react-within-the-project)
  - [Install Laravel within the Project](#install-laravel-within-the-project)
  - [Laravel API Setup](#laravel-api-setup)
    - [AuthController:: login(), register() and logout()](#authcontroller-login-register-and-logout)
    - [UserController:: index(), store(), show(), update() and destroy()](#usercontroller-index-store-show-update-and-destroy)
    - [Seed the database with the `User` model](#seed-the-database-with-the-user-model)
  - [MySQL](#mysql)
  - [Notes](#notes)
    - [Pagination in Laravel](#pagination-in-laravel)
    - [Deploy Laravel on a Production Server](#deploy-laravel-on-a-production-server)
    - [Use NGINX or Apache2 to Serve the Application](#use-nginx-or-apache2-to-serve-the-application)
  - [References](#references)

## Deploy the dependencies

<details>

### Get Composer

First [download](https://getcomposer.org/download/) `composer.phar`, then you can move it somewhere in your `$PATH` or use it as local executable, e.g. `php composer.phar` or `./composer.phar --version`. In my case I moved it to **`/usr/local/bin/composer`**.

In order to get the list of [the global envvars of composer](https://stackoverflow.com/q/30664220/6543935), run `composer config --list --global`, of to get the location of the binaries run `composer global config bin-dir --absolute`.

### Install Laravel Installer and Check System Requirements

Run `composer global require laravel/installer` to install the [Laravel Installer](https://laravel.com/docs/installation#installing-laravel).

The Laravel framework has a few [system requirements](https://laravel.com/docs/deployment#server-requirements) you need to satisfy them before installing it.

### Install NodeJS and NPM

Source [MLW Node.JS Getting started](https://wiki.metalevel.tech/wiki/Node.js_Getting_Started). Install the latest/stable version of NodeJS and NPM on Debian based GNU/Linux.

```bash
sudo apt update
sudo apt install -y nodejs npm

sudo npm cache clean -f
sudo npm install -g n
sudo n stable           # sudo n latest
```

</details>

## Install React within the Project

Then we will use Vite to install React within the project. At this stage React is installed outside the Laravel's directory.

```bash
cd project-root-dir/
npm create vite@latest
# ✔ Project name: … react-app
# ✔ Select a framework: › React
# ✔ Select a variant: › JavaScript
cd react-app/
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

Additional packages to be installed:

```bash
cd react-app/
npm install react-router-dom
npm install axios
```

Finally create [`jsconfig.json`](react-app/jsconfig.json) file in the root directory of the react project to enable the [IntelliSense](https://code.visualstudio.com/docs/languages/javascript#_intellisense) for the JavaScript files.

<details>
<summary>
More example options, generated by GitHub Copilot. And StackOverflow references.
</summary>

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsxFactory": "React.createElement",
    "jsxFragmentFactory": "React.Fragment",
    "lib": ["esnext", "dom"]
  },
  "include": ["src"]
}
```

Refs:

- [How do you configure VSCode jsconfig for React?](https://stackoverflow.com/questions/58910872/how-do-you-configure-vscode-jsconfig-for-react)
- [Auto Import of React Components in Visual Studio Code](https://stackoverflow.com/questions/60637561/auto-import-of-react-components-in-visual-studio-code)

</details>

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

## Laravel API Setup

Go inside the `laravel-app/` directory and follow the steps below to create the relevant [**Controllers**](https://laravel.com/docs/9.x/controllers#main-content) and the relevant API routes.

```bash
cd `laravel-app/`
```

### AuthController:: login(), register() and logout()

First generate the `AuthController` class with the `artisan` command.

```bash
php artisan make:controller Api/AuthController
# INFO  Controller [app/Http/Controllers/Api/AuthController.php] created successfully.
```

Next, generate two new request classes with the `artisan` command.

```bash
php artisan make:request LoginRequest
# INFO  Request [app/Http/Requests/LoginRequest.php] created successfully.
```

```bash
php artisan make:request SignupRequest
# INFO  Request [app/Http/Requests/SignupRequest.php] created successfully.
```

Then define `login()`, `register()` and `logout()` methods in the file [`AuthController.php`](laravel-app/app/Http/Controllers/Api/AuthController.php).

The open [`routes/**api.php**`](laravel-app/routes/api.php) and configure the routes for the `AuthController`.

The next step is to actually create the methods `login()`, `register()` and `logout()` in the file [`AuthController.php`](laravel-app/app/Http/Controllers/Api/AuthController.php): <https://youtu.be/qJq9ZMB2Was?t=4760>

After that edit the newly created classes [`SignupRequest`](./laravel-app/app/Http/Requests/SignupRequest.php) and [`LoginRequest`](./laravel-app/app/Http/Requests/LoginRequest.php): allow the user's requests and define rules about the properties of the request.

Modify [`api.php`](laravel-app/routes/api.php) file create middleware group `auth:api` and move `/logout` route to this group: <https://youtu.be/qJq9ZMB2Was?t=6412>

### UserController:: index(), store(), show(), update() and destroy()

Generate the `UserController` class with the following `artisan` command - [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=6667).

```bash
php artisan make:controller Api/UserController --model=User --resource --requests --api
# INFO  Request [app/Http/Requests/StoreUserRequest.php] created successfully.
# INFO  Request [app/Http/Requests/UpdateUserRequest.php] created successfully.
# INFO  Controller [app/Http/Controllers/Api/UserController.php] created successfully.
```

- Without the `--api` option it will create a `UserController` class for web page with `edit()` and `create()` methods.

Generate also `UserResource` class with the following `artisan` command - [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=6825). Resource is basically a class which is used to convert the database models into JSON serializable data which will be sent from the API to any client.

```bash
php artisan make:resource UserResource
# INFO  Resource [app/Http/Resources/UserResource.php] created successfully.
```

Edit the `UserResource` class and implement the `toArray()` method.
Then edit the `UserController` class and add the methods `index()`, `store()`, `show()`, `update()` and `destroy()`.

After that edit the `api.php` file and add directive for `/users`, the `UserController` - [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=7160).

Now implement the `StoreUserRequest` and `UpdateUserRequest` classes - [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=7178).

### Seed the database with the `User` model

- [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=7468).

First modify the class [`DatabaseSeeder`](laravel-app/database/seeders/DatabaseSeeder.php#18) to generate 50 random users.

Then run the `artisan` command to seed the database with the `User` model.

```bash
php artisan db:seed
# INFO  Seeding database.
```

## MySQL

In the directory [`assets/sql/`](assets/sql/) are available three manual like SQL files. We can suppress the comments and use them as SQL scrips to create or remove the `db_name` and `db_admin` MySQL database and user used in this tutorial.

<details>

<summary> <em>Create or Remove Database. Click for details.</em> </summary>

```bash
sed -r \
-e '/^(-- |$)/d' \
-e 's/db_name/db_name/g' \
-e 's/db_admin/db_admin/g' \
-e 's/strong-password/strong-password/g' \
assets/sql/mariadb_db_create.sql | sudo mysql # assets/sql/mysql_db_create.sql | sudo mysql
```

```bash
sed -r \
-e '/^(-- |$)/d' \
-e 's/db_name/db_name/g' \
-e 's/db_admin/db_admin/g' \
assets/sql/db_remove.sql | sudo mysql
```

</details>

## Notes

### Pagination in Laravel

- [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=7515)

- On the image [...responseObject.png](assets/screenshots/UserController->index->paginate->responseObject.png) (within [`assets/`](assets/screenshots)) is shown a screenshot how the `paginate()` method returns the `UserResource` object with the `data`, `links` and `meta` properties.

### Deploy Laravel on a Production Server

First you need to install the `composer` dependencies - i.e.:

```bash
sudo -u www-data composer install
```

Then may want to create, inspect carefully and modify the [`.env`](laravel-app/.env) file of the application, and the run at least the following commands - [Tutorial Ref.](https://youtu.be/qJq9ZMB2Was?t=10927).

```bash
sudo -u www-data php artisan migrate
sudo -u www-data php artisan key:generate --ansi
sudo -u www-data php artisan config:cache
```

### Use NGINX or Apache2 to Serve the Application

- In the directory [`assets/web.conf/`](assets/web.conf/) are shown two example configuration files for NGINX and Apache2 that allows you to setup them to serve Laravel. The third configuration file available there is the most interesting.

- Some details about the production setup of the app could be found [at the end of the Tutorial provided by TheCodeholic](https://youtu.be/qJq9ZMB2Was?t=10114).

[**`app-nginx.conf`**](assets/web.conf/app-nginx.conf) is used to serve the React application and Laravel simultaneously via NGINX. React is accessible on the `/` route and Laravel on the `/laravel` route.

The document root of the React application is the directory `<project-location>/react-app/dist` directory. So you need to build the application first:

```bash
cd react-app/
npm run build
```

- Note also the file [`.env.production`](react-app/.env.production).

The document root of the Laravel application is the directory `<project-location>/laravel-app/public` directory, but some other directories (like as `laravel-app/storage`, etc.) must be writable by the web server's user (`www-data` (uid:33|gid:33). For this purpose, while the application is not at final production state I would like to bind the project's directory into a directory inside `/var/www/`, as it is shown in the snipped [`assets/fstab/fstab`](assets/fstab/fstab). Thus we deal gracefully with the web server's and the developer's permissions.

After that step you need to go inside the directory `/var/www/<project mount point>/laravel` and rebuild the configuration files of Laravel:

```bash
cd /var/www/<project mount point>/laravel-app/
sudo -u www-data php artisan config:cache
```

Now you can serve Laravel via NGINX (or Apache2). Later if you need to serve Laravel via `artisan` for dev purpose, you can use the following command either from the bind directory or from the project's one:

```bash
sudo -u www-data php artisan serve
```

## References

- [Laravel](https://laravel.com/)
- [Composer Download](https://getcomposer.org/download/)
- [What's New In React 18?](https://blog.webdevsimplified.com/2021-06/react-18-changes/)
- [NodeJS and NPM Install](https://wiki.metalevel.tech/wiki/Node.js_Getting_Started)
- [Vite: Next Generation Frontend Tooling](https://vitejs.dev/)
- [Vite: Env Variables and Modes](https://vitejs.dev/guide/env-and-mode.html)
- [MariaDB Docs](https://mariadb.com/kb/en/authentication-from-mariadb-104/)
- [HTTP Status Codes | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [TheCodeholic at GitHub: laravel-react-starter](https://github.com/thecodeholic/laravel-react-starter)
- React:
  - [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [React Router GitHub](https://github.com/remix-run/react-router)
  - [**How to use `setState` callback on react hooks**](https://stackoverflow.com/q/56247433/6543935)
  - [Emotion: a library designed for writing css styles with JavaScript.](https://emotion.sh/docs/introduction)
- React and VSCode:
  - [JavaScript in Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript)
  - [jsconfig.json in Visual Studio Code](https://code.visualstudio.com/docs/languages/jsconfig)
  - [Using React in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)
  - [VSCode Auto Replace Single Quotes with Double Quotes](https://ourtechroom.com/fix/vscode-auto-replace-single-quotes-with-double-quotes-solved/)
- Next to learn:
  - [Laravel Bootcamp](https://bootcamp.laravel.com/introduction)
  - [Laravel Starter Kits](https://laravel.com/docs/9.x/starter-kits)
  - [Laravel Asset Bundling (Vite)](https://laravel.com/docs/9.x/vite#react)
