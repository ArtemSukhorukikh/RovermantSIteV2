// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/company/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/company/[id].get').default>>>>
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
    '/api/stateProgram/addCondition': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/addCondition.post').default>>>>
    }
    '/api/stateProgram/create': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/create.post').default>>>>
    }
    '/api/stateProgram/user/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/stateProgram/user/[id].get').default>>>>
    }
    '/api/user/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/user/[id].get').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}