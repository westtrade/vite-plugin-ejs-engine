# vite-plugin-ejs-engine

[![npm Downloads](https://img.shields.io/npm/dt/vite-plugin-ejs-engine)](https://www.npmjs.com/package/vite-plugin-ejs-engine)

[Vite](https://github.com/vitejs/vite) plugin for [Ejs](https://ejs.co/).

Supports:
- [Templates, Partials, variable declarations...](https://ejs.co/#features)


## Install
**Yarn**
```
yarn add vite-plugin-ejs-engine -D
```
or **npm**
```
npm i vite-plugin-ejs-engine --save-dev
```

## Usage
### Configuration
Use plugin in your Vite config (`vite.config.ts`)
```JavaScript
import ejs from 'vite-plugin-ejs-engine'

export default {
    plugins: [
        ejs(),
    ]
}
```
### Example

Input (`src/index.html`):

```html
 <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>Hello world</h1>

      <!-- variable declaration -->
      <% var users = [{name: 'Jose'}, {name: 'Pedro'}]; %>

      <!-- variable and partial usage -->
      <ul>
        <% users.forEach(function(user){ %>
          <%- include('user/show', {user: user}); %>
        <% }); %>
      </ul>
    </body>
  </html>
```

Template (`src/user/show.ejs`):

```html
<li><%= user.name %></li>
```

**Output** (`dist/index.html`)

```html
 <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>Hello world</h1>
      <ul>
         <li>Jose</li>
         <li>Pedro</li>
      </ul>
    </body>
  </html>
```
