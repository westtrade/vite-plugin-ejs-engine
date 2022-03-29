import { compile } from '../src/compile';

it('Should compile a valid html', () => {
  const html = `
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
      </body>
    </html>
  `;

  const compiled = compile({ html });

  expect(compiled).toBe(html);
});

it('Should generate a correct html when there are a variable defined in', () => {
  const html = `
        <% var name = 'John'; %>
        <h1>Hello world</h1>
  `;

  const compiled = compile({ html });

  expect(cleanUpString(compiled)).toBe(`<h1>Hello world</h1>`);
});

it('Should generate a correct html when there are a variable reference as a content', () => {
  const html = `
        <% var name = 'Ejs'; %>
        <h1>Hello <%= name %></h1>
  `;

  const compiled = compile({ html });

  expect(cleanUpString(compiled)).toBe(`<h1>Hello Ejs</h1>`);
});

it('Should throw Reference error when we reference for non defined variable', () => {
  const html = `
        <h1>Hello <%= name %></h1>
  `;

  expect(() => compile({ html })).toThrow(ReferenceError);
});

it('Should render two li tag item with user name', () => {
  const html = `
    <% var users = [{name: 'Jose'}, {name: 'Pedro'}]; %>

    <ul>
      <% users.forEach(function(user){ %>
       <li><%= user.name %></li>
      <% }); %>
    </ul>
  `;

  const compiled = compile({ html });

  expect(cleanUpString(compiled)).toBe(`<ul>  <li>Jose</li>  <li>Pedro</li>  </ul>`);
});

it('Should render partial inside a forEach', () => {
  const html = `
    <% var users = [{name: 'Jose'}, {name: 'Pedro'}]; %>

    <ul>
      <% users.forEach(function(user){ %>
       <%- include('user/show', {user: user}); %>
      <% }); %>
    </ul>
  `;

  const { pathname: root } = new URL(import.meta.url);

  const compiled = compile({ html, filename: root });

  expect(cleanUpString(compiled)).toBe(`<ul>  <li>Jose</li>  <li>Pedro</li>  </ul>`);
});

function cleanUpString(html: string) {
  return html.replace(/\n+|\s+/g, ' ').trim();
}
