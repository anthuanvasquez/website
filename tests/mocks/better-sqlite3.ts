class Statement {
  run(..._args: unknown[]) {
    return { changes: 0, lastInsertRowid: 0 };
  }
  get(..._args: unknown[]) {
    return undefined;
  }
  all(..._args: unknown[]) {
    return [];
  }
  iterate(..._args: unknown[]) {
    return [][Symbol.iterator]();
  }
}

class Database {
  inTransaction = false;
  readonly = false;
  memory = false;
  name = ':mock:';
  open = true;

  constructor(_path: string, _options?: unknown) {}

  exec(_sql: string) {
    return this;
  }

  prepare(_sql: string) {
    return new Statement();
  }

  close() {}

  transaction(fn: (...args: unknown[]) => unknown) {
    return (...args: unknown[]) => fn(...args);
  }

  pragma(_pragma: string, _options?: unknown) {
    return [];
  }

  backup(_destination: string) {
    return Promise.resolve();
  }

  serialize(_options?: unknown) {
    return Buffer.alloc(0);
  }
}

export default Database;
export { Database };
