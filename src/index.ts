import ejs from 'ejs';

export default (html: string) => {
  return ejs.compile(html)();
};
