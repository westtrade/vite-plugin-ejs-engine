import { Options as EjsOptions } from 'ejs';
import { HmrContext, IndexHtmlTransformContext, IndexHtmlTransformResult } from 'vite';
import * as path from 'path';
import { compile } from './compile';

export default (
  options: {
    inject?: object;
  } = {},
) => {
  return {
    name: 'ejs',
    enforce: 'pre',
    handleHotUpdate: handleHotUpdate,
    transformIndexHtml: {
      enforce: 'pre',
      transform: (html: string, context: IndexHtmlTransformContext) => handleTransformHtml(html, context, options),
    },
  };
};

function handleTransformHtml(
  html: string,
  context: IndexHtmlTransformContext,
  options: {
    inject?: Record<string, any>;
    ejsOptions?: EjsOptions;
  },
): IndexHtmlTransformResult | void | Promise<IndexHtmlTransformResult | void> {
  return new Promise((resolve, reject) => {
    try {
      const compiledHTML = compile({
        html,
        filename: context.filename,
        options,
      });
      resolve(compiledHTML);
    } catch (error) {
      reject(error);
    }
  });
}

function handleHotUpdate(context: HmrContext): void | [] {
  const filename = path.resolve(context.file);

  if (filename.endsWith('.html') || filename.endsWith('.ejs')) {
    console.info(`Template file ${path.basename(filename)} has been changed. Sending full-reload.`);
    context.server.ws.send({ type: 'full-reload' });
    return [];
  }
}
