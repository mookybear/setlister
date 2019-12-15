import * as fastifyPlugin from 'fastify-plugin';
import { renderModuleFactory } from '@angular/platform-server';
import { FastifyInstance, FastifyReply } from 'fastify';
import { FastifyNgUniversalOptions } from './model';
import { StaticProvider } from '@angular/core';

function fastifyNgUniversal(fastify: FastifyInstance, opts: FastifyNgUniversalOptions, next: () => void): void {

  // add a reply decorator
  fastify.decorateReply('renderNg', function (this: FastifyReply<any>, url: string, options: FastifyNgUniversalOptions = {}): void {
    const serverModule = options.serverModule || opts.serverModule;
    const documentTemplate = options.document || opts.document;
    let extraProviders: StaticProvider[] = [];

    // set default value for the reply decorator extraProviders option
    options.extraProviders = options.extraProviders || [];

    // append custom extra providers if there is any
    extraProviders = extraProviders.concat(opts.extraProviders || [], options.extraProviders);

    // check if the server module has value or not
    if (!serverModule) {
      throw new Error('Missing Angular Server module to render.');
    }

    // check if the document template has value or not
    if (!documentTemplate) {
      throw new Error('Missing template where the Angular app will be rendered.');
    }

    // assemble the options
    const renderOpts = {
      document: documentTemplate,
      url: url,
      extraProviders
    };

    // render the angular application
    renderModuleFactory(serverModule, renderOpts)
      .then((html: string) => {
        this.header('Content-Type', 'text/html').send(html);
      })
      ;
  });

  next();
}

export const fastifyUniversalPlugin = fastifyPlugin(fastifyNgUniversal, '>=1.5.0');
