import { OpenAPIV3 } from 'openapi-types';
import * as R from 'ramda';

const mergeDeepAll = R.reduce<any, any>(R.mergeDeepRight, {});

const combineInfo = (infoObjects: OpenAPIV3.InfoObject[]): OpenAPIV3.InfoObject =>
  R.last(infoObjects) || {
    title: '',
    version: '',
  };

const combineServers = (serversObjects: OpenAPIV3.ServerObject[][]): OpenAPIV3.ServerObject[] =>
  R.flatten(serversObjects);

const combinePaths = (pathObjects: OpenAPIV3.PathsObject[]): OpenAPIV3.PathsObject =>
  mergeDeepAll(pathObjects);

const combineComponents = (
  componentObjects: OpenAPIV3.ComponentsObject[],
): OpenAPIV3.ComponentsObject => mergeDeepAll(componentObjects);

const combineSecurity = (
  securityObjects: OpenAPIV3.SecurityRequirementObject[][],
): OpenAPIV3.SecurityRequirementObject[] => R.flatten(securityObjects);

const combineTags = (tagsObjects: OpenAPIV3.TagObject[][]): OpenAPIV3.TagObject[] =>
  R.flatten(tagsObjects);

const combineExternalDocs = (
  externalDocObjects: OpenAPIV3.ExternalDocumentationObject[],
): OpenAPIV3.ExternalDocumentationObject | undefined => R.last(externalDocObjects);

const pluckIfExists = (key: string, objs: any) =>
  R.pipe<Record<string, any>[], Record<string, any>[], any[]>(
    R.filter(R.has(key)),
    R.pluck(key),
  )(objs);

export const combine = (schemas: OpenAPIV3.Document[]): OpenAPIV3.Document => {
  const document: OpenAPIV3.Document = {
    openapi: '3.0.2',
    info: combineInfo(pluckIfExists('info', schemas)),
    paths: combinePaths(pluckIfExists('paths', schemas)),
  };

  document.servers = combineServers(pluckIfExists('servers', schemas));
  document.components = combineComponents(pluckIfExists('components', schemas));
  document.security = combineSecurity(pluckIfExists('security', schemas));
  document.tags = combineTags(pluckIfExists('tags', schemas));
  document.externalDocs = combineExternalDocs(pluckIfExists('externalDocs', schemas));

  return document;
};
