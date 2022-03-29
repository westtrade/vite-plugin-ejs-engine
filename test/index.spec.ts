import compile from '../src';

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

  const compiled = compile(html);

  expect(compiled).toBe(html);
});
