/**
 * All interfaces and types sourced from @types/node. Provided here in order to allow node types to be used in packages
 * like @sentry/tracing, which are themselves used in both @sentry/node and @sentry/browser (and their derivatives).
 */

/** -------------------- */
//  Exported interfaces  //
/** -------------------- */

export interface Domain extends EventEmitter {
  members: Array<EventEmitter | Timer>;
  enter(): void;
  exit(): void;
  run<T>(fn: (...args: any[]) => T, ...args: any[]): T;
  add(emitter: EventEmitter | Timer): void;
  remove(emitter: EventEmitter | Timer): void;
  bind<T extends Function>(cb: T): T;
  intercept<T extends Function>(cb: T): T;
}

export interface DomainModule {
  _stack: Domain[];
}

/** ------------------------------------------ */
//  Helper types and interfaces, not exported  //
/** ------------------------------------------ */

// declare module "domain" {
//   import { EventEmitter } from "events";

//   global {
//       namespace NodeJS {
//           interface Domain extends EventEmitter {
//               run<T>(fn: (...args: any[]) => T, ...args: any[]): T;
//               add(emitter: EventEmitter | Timer): void;
//               remove(emitter: EventEmitter | Timer): void;
//               bind<T extends Function>(cb: T): T;
//               intercept<T extends Function>(cb: T): T;
//           }
//       }
//   }

//   interface Domain extends NodeJS.Domain {}
//   class Domain extends EventEmitter {
//       members: Array<EventEmitter | NodeJS.Timer>;
//       enter(): void;
//       exit(): void;
//   }

//   function create(): Domain;
// }

interface EventEmitter {
  captureRejections: boolean;
  readonly captureRejectionSymbol: unique symbol;
  defaultMaxListeners: number;
  readonly errorMonitor: unique symbol;
  addListener(event: string | symbol, listener: (...args: any[]) => void): this;
  emit(event: string | symbol, ...args: any[]): boolean;
  eventNames(): Array<string | symbol>;
  getMaxListeners(): number;
  listenerCount(type: string | symbol): number;
  listeners(event: string | symbol): Array<(...args: any[]) => any>;
  off(event: string | symbol, listener: (...args: any[]) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
  on(emitter: EventEmitter, event: string): AsyncIterableIterator<any>;
  once(event: string | symbol, listener: (...args: any[]) => void): this;
  once(emitter: DOMEventTarget, event: string): Promise<any[]>;
  once(emitter: NodeEventTarget, event: string | symbol): Promise<any[]>;
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
  rawListeners(event: string | symbol): Array<(...args: any[]) => any>;
  removeAllListeners(event?: string | symbol): this;
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
  setMaxListeners(n: number): this;
}

interface NodeEventTarget {
  once(event: string | symbol, listener: (...args: any[]) => void): this;
}

interface DOMEventTarget {
  addEventListener(event: string, listener: (...args: any[]) => void, opts?: { once: boolean }): any;
}

interface Timer extends RefCounted {
  hasRef(): boolean;
  refresh(): this;
}

interface RefCounted {
  ref(): this;
  unref(): this;
}
