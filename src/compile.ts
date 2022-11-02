import ejs, { Options } from 'ejs';

export const compile = ({
  html,
  filename,
  options,
}: Options & {
  html: string;
  options: {
    inject?: object;
  };
}) => {
  return ejs.compile(html, {
    filename,
    async: false,
  })(options?.inject || {});
};
