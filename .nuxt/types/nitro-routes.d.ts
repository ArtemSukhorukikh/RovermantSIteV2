// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/combineConditionals': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../.../../server/api/combineConditionals.get').default>>>>
    }
    '/api/company/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/[id].get').default>>>>
    }
    '/api/company/addCondition': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/addCondition.post').default>>>>
    }
    '/api/company/addExtractData': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/addExtractData.post').default>>>>
    }
    '/api/company/all': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/all.get').default>>>>
    }
    '/api/company/create': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/create.post').default>>>>
    }
    '/api/company/delete': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/delete.post').default>>>>
    }
    '/api/company/update': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/update.post').default>>>>
    }
    '/api/company/user/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/user/[id].get').default>>>>
    }
    '/api/company/user/full/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/user/full/[id].get').default>>>>
    }
    '/api/login': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/login.post').default>>>>
    }
    '/api/register': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/register.post').default>>>>
    }
    '/api/stateProgram/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/[id].get').default>>>>
    }
    '/api/stateProgram/addConditions': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/addConditions.post').default>>>>
    }
    '/api/stateProgram/all': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/all.get').default>>>>
    }
    '/api/stateProgram/create': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/create.post').default>>>>
    }
    '/api/stateProgram/delete': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/delete.post').default>>>>
    }
    '/api/stateProgram/update': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/update.post').default>>>>
    }
    '/api/stateProgram/user/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/user/[id].get').default>>>>
    }
    '/api/user/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user/[id].get').default>>>>
    }
    '/api/user/edit': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user/edit.post').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}