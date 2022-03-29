import ejs, { Options } from 'ejs';

export const compile = ({ html, filename }: Options & { html: string }) => {
  return ejs.compile(html, {
    filename,
    async: false,
  })();
};
