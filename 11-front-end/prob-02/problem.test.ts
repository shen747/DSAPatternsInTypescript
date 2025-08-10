/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  StateManager,
  EventBus,
  createDevToolsPlugin,
  createPersistencePlugin,
  loggingMiddleware,
  validationMiddleware
} from './problem';

// Type augmentation for unimplemented StateManager methods
declare module './problem' {
  interface StateManager<T> {
    new(initialState: T): StateManager<T>;
    getState(): T;
    setState(updater: ((state: T) => T) | T): void;
    subscribe<K>(selector: (state: T) => K, callback: (value: K, previousValue: K) => void): () => void;
    on(event: string, handler: (payload: any) => void | Promise<void>): void;
    emit(event: string, payload?: any): void | Promise<void>;
    off(event: string, handler: (payload: any) => void): void;
    once(event: string, handler: (payload: any) => void): void;
    computed<R>(computeFn: (state: T) => R, dependencies?: Array<(state: T) => unknown>, options?: any): any;
    use(middleware: any): void;
    dispatch(action: string, payload?: any): Promise<any>;
    enableTimeTravel(): void;
    getSnapshots(): StateSnapshot<T>[];
    undo(): void;
    redo(): void;
    jumpToSnapshot(id: string): void;
    batch(fn: () => void): void;
    getPerformanceMetrics(): PerformanceMetrics;
    install(plugin: any): void;
    uninstall(name: string): void;
    onError(handler: (error: Error) => void): void;
    destroy(): void;
    getSubscriptionCount(): number;
  }

  interface EventBus {
    on(event: string, handler: (payload: any) => void): void;
    emit(event: string, payload?: any): void;
    off(event: string, handler: (payload: any) => void): void;
  }
}

describe('Advanced Frontend Technical Challenge: Event-Driven State Management System', () => {
  interface TestState {
    user: { id: string; name: string; email: string } | null;
    todos: Array<{ id: string; text: string; completed: boolean }>;
    ui: { loading: boolean; theme: 'light' | 'dark' };
    counter: number;
  }

  const initialState: TestState = {
    user: null,
    todos: [],
    ui: { loading: false, theme: 'light' },
    counter: 0
  };

  let stateManager: StateManager<TestState>;

  beforeEach(() => {
    // @ts-ignore - StateManager constructor not fully implemented
    stateManager = new StateManager(initialState);
  });

  afterEach(() => {
    stateManager?.destroy?.();
  });

  describe('StateManager Core Functionality', () => {
    test('should initialize with initial state', () => {
      expect(stateManager.getState()).toEqual(initialState);
    });

    test('should update state immutably', () => {
      const newUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      
      stateManager.setState(state => ({
        ...state,
        user: newUser
      }));

      expect(stateManager.getState().user).toEqual(newUser);
      expect(stateManager.getState()).not.toBe(initialState);
    });

    test('should support functional state updates', () => {
      stateManager.setState(state => ({
        ...state,
        counter: state.counter + 1
      }));

      expect(stateManager.getState().counter).toBe(1);
    });

    test('should support direct state updates', () => {
      const newState = {
        ...initialState,
        counter: 5
      };

      stateManager.setState(newState);
      expect(stateManager.getState().counter).toBe(5);
    });
  });

  describe('Subscription System', () => {
    test('should notify subscribers on state changes', () => {
      const callback = jest.fn();
      
      stateManager.subscribe(state => state.counter, callback);
      stateManager.setState(state => ({ ...state, counter: state.counter + 1 }));

      expect(callback).toHaveBeenCalledWith(1, 0);
    });

    test('should support selective subscriptions', () => {
      const userCallback = jest.fn();
      const counterCallback = jest.fn();
      
      stateManager.subscribe(state => state.user, userCallback);
      stateManager.subscribe(state => state.counter, counterCallback);
      
      stateManager.setState(state => ({ ...state, counter: state.counter + 1 }));

      expect(userCallback).not.toHaveBeenCalled();
      expect(counterCallback).toHaveBeenCalledWith(1, 0);
    });

    test('should return unsubscribe function', () => {
      const callback = jest.fn();
      const unsubscribe = stateManager.subscribe(state => state.counter, callback);
      
      unsubscribe();
      stateManager.setState(state => ({ ...state, counter: state.counter + 1 }));

      expect(callback).not.toHaveBeenCalled();
    });

    test('should handle multiple subscribers for same selector', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      
      stateManager.subscribe(state => state.counter, callback1);
      stateManager.subscribe(state => state.counter, callback2);
      
      stateManager.setState(state => ({ ...state, counter: state.counter + 1 }));

      expect(callback1).toHaveBeenCalledWith(1, 0);
      expect(callback2).toHaveBeenCalledWith(1, 0);
    });

    test('should prevent memory leaks with proper cleanup', () => {
      const callback = jest.fn();
      const unsubscribe = stateManager.subscribe(state => state.counter, callback);
      
      expect(stateManager.getSubscriptionCount()).toBe(1);
      unsubscribe();
      expect(stateManager.getSubscriptionCount()).toBe(0);
    });
  });

  describe('Event System', () => {
    test('should emit and handle events', () => {
      const handler = jest.fn();
      
      stateManager.on('test:event', handler);
      stateManager.emit('test:event', { data: 'test' });

      expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });

    test('should support async event handlers', async () => {
      const handler = jest.fn().mockResolvedValue(undefined);
      
      stateManager.on('async:event', handler);
      await stateManager.emit('async:event', { data: 'async' });

      expect(handler).toHaveBeenCalledWith({ data: 'async' });
    });

    test('should support multiple handlers for same event', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      stateManager.on('multi:event', handler1);
      stateManager.on('multi:event', handler2);
      stateManager.emit('multi:event', { data: 'multi' });

      expect(handler1).toHaveBeenCalledWith({ data: 'multi' });
      expect(handler2).toHaveBeenCalledWith({ data: 'multi' });
    });

    test('should support event handler removal', () => {
      const handler = jest.fn();
      
      stateManager.on('remove:event', handler);
      stateManager.off('remove:event', handler);
      stateManager.emit('remove:event', { data: 'removed' });

      expect(handler).not.toHaveBeenCalled();
    });

    test('should support once listeners', () => {
      const handler = jest.fn();
      
      stateManager.once('once:event', handler);
      stateManager.emit('once:event', { data: 'first' });
      stateManager.emit('once:event', { data: 'second' });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ data: 'first' });
    });
  });

  describe('Computed Properties', () => {
    test('should create computed property that updates with dependencies', () => {
      const completedTodos = stateManager.computed(
        state => state.todos.filter(todo => todo.completed),
        [state => state.todos]
      );

      expect(completedTodos.getValue()).toEqual([]);

      stateManager.setState(state => ({
        ...state,
        todos: [
          { id: '1', text: 'Todo 1', completed: true },
          { id: '2', text: 'Todo 2', completed: false }
        ]
      }));

      expect(completedTodos.getValue()).toEqual([
        { id: '1', text: 'Todo 1', completed: true }
      ]);
    });

    test('should memoize computed property results', () => {
      const computeFn = jest.fn(state => state.todos.filter((todo: any) => todo.completed));
      
      const completedTodos = stateManager.computed(
        computeFn,
        [state => state.todos],
        { memoize: true }
      );

      // First access
      completedTodos.getValue();
      expect(computeFn).toHaveBeenCalledTimes(1);

      // Second access without state change
      completedTodos.getValue();
      expect(computeFn).toHaveBeenCalledTimes(1);

      // After state change
      stateManager.setState(state => ({
        ...state,
        todos: [{ id: '1', text: 'New Todo', completed: true }]
      }));
      
      completedTodos.getValue();
      expect(computeFn).toHaveBeenCalledTimes(2);
    });

    test('should support computed property subscriptions', () => {
      const callback = jest.fn();
      
      const completedCount = stateManager.computed(
        state => state.todos.filter(todo => todo.completed).length,
        [state => state.todos]
      );

      completedCount.subscribe(callback);

      stateManager.setState(state => ({
        ...state,
        todos: [{ id: '1', text: 'Todo 1', completed: true }]
      }));

      expect(callback).toHaveBeenCalledWith(1, 0);
    });
  });

  describe('Middleware System', () => {
    test('should execute middleware in order', () => {
      const order: string[] = [];
      
      const middleware1 = jest.fn((_context: any, next: () => void) => {
        order.push('middleware1:before');
        next();
        order.push('middleware1:after');
      });

      const middleware2 = jest.fn((_context: any, next: () => void) => {
        order.push('middleware2:before');
        next();
        order.push('middleware2:after');
      });

      stateManager.use(middleware1);
      stateManager.use(middleware2);
      
      stateManager.dispatch('test:action', { data: 'test' });

      expect(order).toEqual([
        'middleware1:before',
        'middleware2:before',
        'middleware2:after',
        'middleware1:after'
      ]);
    });

    test('should provide context to middleware', () => {
      const middleware = jest.fn((context, next) => {
        expect(context.action).toBe('test:action');
        expect(context.payload).toEqual({ data: 'test' });
        expect(context.state).toBeDefined();
        expect(context.setState).toBeInstanceOf(Function);
        expect(context.timestamp).toBeInstanceOf(Number);
        next();
      });

      stateManager.use(middleware);
      stateManager.dispatch('test:action', { data: 'test' });

      expect(middleware).toHaveBeenCalled();
    });

    test('should support async middleware', async () => {
      const middleware = jest.fn(async (context, next) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        next();
      });

      stateManager.use(middleware);
      await stateManager.dispatch('async:action', { data: 'async' });

      expect(middleware).toHaveBeenCalled();
    });
  });

  describe('Time Travel Debugging', () => {
    test('should enable time travel and create snapshots', () => {
      stateManager.enableTimeTravel();
      
      stateManager.setState(state => ({ ...state, counter: 1 }));
      stateManager.setState(state => ({ ...state, counter: 2 }));

      const snapshots = stateManager.getSnapshots();
      expect(snapshots).toHaveLength(3); // initial + 2 updates
      expect(snapshots[2].state.counter).toBe(2);
    });

    test('should support undo functionality', () => {
      stateManager.enableTimeTravel();
      
      stateManager.setState(state => ({ ...state, counter: 1 }));
      stateManager.setState(state => ({ ...state, counter: 2 }));
      
      stateManager.undo();
      expect(stateManager.getState().counter).toBe(1);
      
      stateManager.undo();
      expect(stateManager.getState().counter).toBe(0);
    });

    test('should support redo functionality', () => {
      stateManager.enableTimeTravel();
      
      stateManager.setState(state => ({ ...state, counter: 1 }));
      stateManager.setState(state => ({ ...state, counter: 2 }));
      
      stateManager.undo();
      stateManager.undo();
      
      stateManager.redo();
      expect(stateManager.getState().counter).toBe(1);
      
      stateManager.redo();
      expect(stateManager.getState().counter).toBe(2);
    });

    test('should support jumping to specific snapshots', () => {
      stateManager.enableTimeTravel();
      
      stateManager.setState(state => ({ ...state, counter: 1 }));
      const snapshot = stateManager.getSnapshots()[1];
      stateManager.setState(state => ({ ...state, counter: 2 }));
      
      stateManager.jumpToSnapshot(snapshot.id);
      expect(stateManager.getState().counter).toBe(1);
    });
  });

  describe('Performance and Optimization', () => {
    test('should batch updates to prevent excessive notifications', () => {
      const callback = jest.fn();
      stateManager.subscribe(state => state.counter, callback);
      
      stateManager.batch(() => {
        stateManager.setState(state => ({ ...state, counter: 1 }));
        stateManager.setState(state => ({ ...state, counter: 2 }));
        stateManager.setState(state => ({ ...state, counter: 3 }));
      });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(3, 0);
    });

    test('should provide performance metrics', () => {
      stateManager.subscribe(state => state.counter, () => {});
      stateManager.computed(state => state.counter * 2, [state => state.counter]);
      
      const metrics = stateManager.getPerformanceMetrics();
      
      expect(metrics.subscriptionCount).toBe(1);
      expect(metrics.computedPropertiesCount).toBe(1);
      expect(metrics.totalUpdates).toBeDefined();
      expect(metrics.averageUpdateTime).toBeDefined();
    });

    test('should optimize with debounced computed properties', async () => {
      const computeFn = jest.fn(state => state.counter * 2);
      
      const debouncedComputed = stateManager.computed(
        computeFn,
        [state => state.counter],
        { debounceMs: 50 }
      );

      stateManager.setState(state => ({ ...state, counter: 1 }));
      stateManager.setState(state => ({ ...state, counter: 2 }));
      stateManager.setState(state => ({ ...state, counter: 3 }));

      // Should not compute immediately
      expect(computeFn).not.toHaveBeenCalled();

      // Wait for debounce
      await new Promise(resolve => setTimeout(resolve, 60));
      debouncedComputed.getValue();

      expect(computeFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Plugin System', () => {
    test('should install and use plugins', () => {
      const plugin = {
        name: 'test-plugin',
        install: jest.fn()
      };

      stateManager.install(plugin);
      expect(plugin.install).toHaveBeenCalledWith(stateManager);
    });

    test('should uninstall plugins', () => {
      const plugin = {
        name: 'test-plugin',
        install: jest.fn(),
        uninstall: jest.fn()
      };

      stateManager.install(plugin);
      stateManager.uninstall('test-plugin');
      
      expect(plugin.uninstall).toHaveBeenCalledWith(stateManager);
    });
  });

  describe('Error Handling', () => {
    test('should handle errors in event handlers gracefully', () => {
      const errorHandler = jest.fn();
      const faultyHandler = jest.fn(() => {
        throw new Error('Handler error');
      });

      stateManager.onError(errorHandler);
      stateManager.on('error:event', faultyHandler);
      stateManager.emit('error:event', {});

      expect(errorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Handler error'
        })
      );
    });

    test('should handle errors in middleware gracefully', () => {
      const errorHandler = jest.fn();
      const faultyMiddleware = jest.fn(() => {
        throw new Error('Middleware error');
      });

      stateManager.onError(errorHandler);
      stateManager.use(faultyMiddleware);
      stateManager.dispatch('error:action', {});

      expect(errorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Middleware error'
        })
      );
    });

    test('should handle errors in computed properties gracefully', () => {
      const errorHandler = jest.fn();
      const faultyComputed = stateManager.computed(
        () => {
          throw new Error('Computed error');
        },
        [state => state.counter]
      );

      stateManager.onError(errorHandler);
      faultyComputed.getValue();

      expect(errorHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Computed error'
        })
      );
    });
  });

  describe('Async Actions', () => {
    test('should support async action dispatch', async () => {
      const handler = jest.fn().mockResolvedValue('success');
      
      stateManager.on('async:action', handler);
      const result = await stateManager.dispatch('async:action', { data: 'test' });

      expect(result).toBe('success');
      expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });

    test('should handle async action errors', async () => {
      const handler = jest.fn().mockRejectedValue(new Error('Async error'));
      
      stateManager.on('async:action', handler);
      
      await expect(
        stateManager.dispatch('async:action', { data: 'test' })
      ).rejects.toThrow('Async error');
    });
  });

  describe('Built-in Middleware and Plugins', () => {
    test('should work with logging middleware', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      stateManager.use(loggingMiddleware);
      stateManager.dispatch('test:action', { data: 'test' });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should work with validation middleware', () => {
      const schema = {
        type: 'object',
        properties: {
          data: { type: 'string' }
        },
        required: ['data']
      };

      stateManager.use(validationMiddleware(schema));
      
      expect(() => {
        stateManager.dispatch('test:action', { invalidData: 123 });
      }).toThrow();
    });

    test('should work with dev tools plugin', () => {
      const devToolsPlugin = createDevToolsPlugin();
      expect(() => stateManager.install(devToolsPlugin)).not.toThrow();
    });

    test('should work with persistence plugin', () => {
      const persistencePlugin = createPersistencePlugin('localStorage');
      expect(() => stateManager.install(persistencePlugin)).not.toThrow();
    });
  });

  describe('Advanced Integration Tests', () => {
    test('should handle complex state updates with multiple subscribers and computed properties', () => {
      const userCallback = jest.fn();
      const todoCallback = jest.fn();
      const completedCountCallback = jest.fn();

      // Set up subscriptions
      stateManager.subscribe(state => state.user, userCallback);
      stateManager.subscribe(state => state.todos, todoCallback);

      // Set up computed property
      const completedCount = stateManager.computed(
        state => state.todos.filter(todo => todo.completed).length,
        [state => state.todos]
      );
      completedCount.subscribe(completedCountCallback);

      // Perform complex state update
      stateManager.setState(state => ({
        ...state,
        user: { id: '1', name: 'John', email: 'john@test.com' },
        todos: [
          { id: '1', text: 'Task 1', completed: true },
          { id: '2', text: 'Task 2', completed: false },
          { id: '3', text: 'Task 3', completed: true }
        ]
      }));

      expect(userCallback).toHaveBeenCalledTimes(1);
      expect(todoCallback).toHaveBeenCalledTimes(1);
      expect(completedCountCallback).toHaveBeenCalledWith(2, 0);
      expect(completedCount.getValue()).toBe(2);
    });

    test('should support nested computed properties', () => {
      // First level computed property
      const completedTodos = stateManager.computed(
        state => state.todos.filter(todo => todo.completed),
        [state => state.todos]
      );

      // Second level computed property that depends on the first
      const completedTodoTexts = stateManager.computed(
        () => completedTodos.getValue().map(todo => todo.text),
        [() => completedTodos.getValue()]
      );

      stateManager.setState(state => ({
        ...state,
        todos: [
          { id: '1', text: 'Completed Task', completed: true },
          { id: '2', text: 'Pending Task', completed: false }
        ]
      }));

      expect(completedTodoTexts.getValue()).toEqual(['Completed Task']);
    });

    test('should handle rapid state updates efficiently', () => {
      const callback = jest.fn();
      stateManager.subscribe(state => state.counter, callback);

      // Perform many rapid updates
      for (let i = 0; i < 100; i++) {
        stateManager.setState(state => ({ ...state, counter: i }));
      }

      expect(callback).toHaveBeenCalledTimes(100);
      expect(stateManager.getState().counter).toBe(99);
    });

    test('should maintain referential equality for unchanged parts of state', () => {
      const initialTodos = stateManager.getState().todos;
      const initialUI = stateManager.getState().ui;

      stateManager.setState(state => ({
        ...state,
        counter: state.counter + 1
      }));

      const newState = stateManager.getState();
      expect(newState.todos).toBe(initialTodos); // Same reference
      expect(newState.ui).toBe(initialUI); // Same reference
      expect(newState.counter).toBe(1); // Changed value
    });
  });

  describe('EventBus Standalone Tests', () => {
    let eventBus: EventBus;

    beforeEach(() => {
      eventBus = new EventBus();
    });

    test('should work as standalone event bus', () => {
      const handler = jest.fn();

      eventBus.on('test:event', handler);
      eventBus.emit('test:event', { data: 'standalone' });

      expect(handler).toHaveBeenCalledWith({ data: 'standalone' });
    });

    test('should support wildcard event listeners', () => {
      const handler = jest.fn();

      eventBus.on('user:*', handler);
      eventBus.emit('user:login', { userId: '123' });
      eventBus.emit('user:logout', { userId: '123' });

      expect(handler).toHaveBeenCalledTimes(2);
    });

    test('should support event namespacing', () => {
      const userHandler = jest.fn();
      const todoHandler = jest.fn();

      eventBus.on('user:login', userHandler);
      eventBus.on('todo:add', todoHandler);

      eventBus.emit('user:login', {});
      eventBus.emit('todo:add', {});

      expect(userHandler).toHaveBeenCalledTimes(1);
      expect(todoHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Memory Management and Cleanup', () => {
    test('should properly cleanup all resources on destroy', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      stateManager.subscribe(state => state.counter, callback1);
      stateManager.subscribe(state => state.user, callback2);
      stateManager.computed(state => state.counter * 2, [state => state.counter]);

      expect(stateManager.getSubscriptionCount()).toBe(2);
      expect(stateManager.getPerformanceMetrics().computedPropertiesCount).toBe(1);

      stateManager.destroy();

      // After destroy, no callbacks should be triggered
      stateManager.setState(state => ({ ...state, counter: 999 }));
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });

    test('should handle circular references in state gracefully', () => {
      interface CircularState {
        data: { self?: CircularState['data'] };
      }

      const circularManager = new StateManager<CircularState>({
        data: {}
      });

      expect(() => {
        circularManager.setState(state => {
          const newData = { self: undefined as any };
          newData.self = newData; // Create circular reference
          return { data: newData };
        });
      }).not.toThrow();

      circularManager.destroy();
    });
  });

  describe('Type Safety and Generics', () => {
    test('should maintain type safety with complex nested state', () => {
      interface ComplexState {
        nested: {
          deep: {
            value: string;
            array: Array<{ id: number; name: string }>;
          };
        };
      }

      const complexManager = new StateManager<ComplexState>({
        nested: {
          deep: {
            value: 'test',
            array: []
          }
        }
      });

      // TypeScript should enforce correct types
      complexManager.setState(state => ({
        nested: {
          deep: {
            value: 'updated',
            array: [{ id: 1, name: 'item1' }]
          }
        }
      }));

      const computed = complexManager.computed(
        state => state.nested.deep.array.length,
        [state => state.nested.deep.array]
      );

      expect(computed.getValue()).toBe(1);
      complexManager.destroy();
    });
  });
});
