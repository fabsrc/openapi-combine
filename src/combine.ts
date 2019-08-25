import { OpenAPIV3 } from 'openapi-types';
import * as R from 'ramda';

const mergeDeepAll = R.reduce(R.mergeDeepRight, {});

const combineInfo = (infoObjects: OpenAPIV3.InfoObject[]): OpenAPIV3.InfoObject =>
  R.last(infoObjects);

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
): OpenAPIV3.ExternalDocumentationObject => R.last(externalDocObjects);

export const combine = (schemas: OpenAPIV3.Document[]): OpenAPIV3.Document => {
  const document: OpenAPIV3.Document = {
    openapi: '3.0.2',
    info: combineInfo(R.map(R.prop('info'), schemas)),
    paths: combinePaths(R.map(R.prop('paths'), schemas)),
  };

  if (R.any(R.has('servers'), schemas)) {
    const schemasWithServers = R.filter(R.has('servers'), schemas);
    //@ts-ignore TODO: Fix me
    const serversObjects: OpenAPIV3.ServerObject[][] = R.map(R.prop('servers'), schemasWithServers);
    document.servers = combineServers(serversObjects);
  }

  if (R.any(R.has('components'), schemas)) {
    const schemasWithComponents = R.filter(R.has('components'), schemas);
    const componentObjects: OpenAPIV3.ComponentsObject[] = R.map(
      //@ts-ignore TODO: Fix me
      R.prop('components'),
      schemasWithComponents,
    );
    document.components = combineComponents(componentObjects);
  }

  if (R.any(R.has('security'), schemas)) {
    const schemasWithSecurity = R.filter(R.has('security'), schemas);
    const securityObjects: OpenAPIV3.SecurityRequirementObject[][] = R.map(
      //@ts-ignore TODO: Fix me
      R.prop('security'),
      schemasWithSecurity,
    );
    document.security = combineSecurity(securityObjects);
  }

  if (R.any(R.has('tags'), schemas)) {
    const schemasWithTags = R.filter(R.has('tags'), schemas);
    //@ts-ignore TODO: Fix me
    const tagsObjects: OpenAPIV3.TagObject[][] = R.map(R.prop('tags'), schemasWithTags);
    document.tags = combineTags(tagsObjects);
  }

  if (R.any(R.has('externalDocs'), schemas)) {
    const schemasWithExternalDocs = R.filter(R.has('externalDocs'), schemas);
    const externalDocObjects: OpenAPIV3.ExternalDocumentationObject[] = R.map(
      //@ts-ignore TODO: Fix me
      R.prop('externalDocs'),
      schemasWithExternalDocs,
    );
    document.externalDocs = combineExternalDocs(externalDocObjects);
  }

  return document;
};
