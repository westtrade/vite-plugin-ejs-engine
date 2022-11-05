import ejs, { Options as EjsOptions } from 'ejs';

export const compile = ({
  html,
  filename,
  options,
}: EjsOptions & {
  html: string;
  options?: {
    inject?: Record<string, any>;
    ejsOptions?: EjsOptions;
  };
}) => {
  const ejsOptions = {
    filename,
    async: false,
    ...(options?.ejsOptions || {}),
  };
  return ejs.compile(html, ejsOptions)(options?.inject || {});
};
