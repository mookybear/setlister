import { StaticProvider, NgModuleFactory } from '@angular/core';
import { FastifyRequest } from 'fastify';

export interface FastifyNgUniversalOptions {
  extraProviders?: StaticProvider[];
  serverModule?: NgModuleFactory<unknown>;
  document?: string;
}

export interface UniversalFastifyRequest<T> extends FastifyRequest<T> {
  renderNg: (url: string, options?: FastifyNgUniversalOptions) => void;
};
