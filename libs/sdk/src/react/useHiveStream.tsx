import { useStream } from "./stream.js";
import {
  BagTemplate,
  UseStream,
  UseStreamCustom,
  UseStreamCustomOptions,
  UseStreamOptions,
} from "./types.js";

/**
 * A custom React hook that extends `useStream` with additional Hive-specific functionality.
 *
 * This hook wraps the original `useStream` hook and adds extra features while maintaining
 * full compatibility with the base implementation. When `useStream` is updated, this hook
 * automatically inherits all improvements.
 *
 * @template StateType The type of the thread state (default: `Record<string, unknown>`)
 * @template Bag Type configuration bag containing:
 *   - `ConfigurableType`: Type for the `config.configurable` property
 *   - `InterruptType`: Type for interrupt values
 *   - `CustomEventType`: Type for custom events
 *   - `UpdateType`: Type for the submit function updates
 *
 * @example
 * ```tsx
 * const stream = useHiveStream({
 *   assistantId: "my-assistant",
 *   threadId: "my-thread",
 *   // ... other options
 * });
 * ```
 */
export function useHiveStream<
  StateType extends Record<string, unknown> = Record<string, unknown>,
  Bag extends {
    ConfigurableType?: Record<string, unknown>;
    InterruptType?: unknown;
    CustomEventType?: unknown;
    UpdateType?: unknown;
  } = BagTemplate
>(options: UseStreamOptions<StateType, Bag>): UseStream<StateType, Bag>;

/**
 * A custom React hook that extends `useStream` with additional Hive-specific functionality.
 *
 * This hook wraps the original `useStream` hook and adds extra features while maintaining
 * full compatibility with the base implementation. When `useStream` is updated, this hook
 * automatically inherits all improvements.
 *
 * @template StateType The type of the thread state (default: `Record<string, unknown>`)
 * @template Bag Type configuration bag containing:
 *   - `ConfigurableType`: Type for the `config.configurable` property
 *   - `InterruptType`: Type for interrupt values
 *   - `CustomEventType`: Type for custom events
 *   - `UpdateType`: Type for the submit function updates
 *
 * @example
 * ```tsx
 * const stream = useHiveStream({
 *   transport: myCustomTransport,
 *   threadId: "my-thread",
 *   // ... other options
 * });
 * ```
 */
export function useHiveStream<
  StateType extends Record<string, unknown> = Record<string, unknown>,
  Bag extends {
    ConfigurableType?: Record<string, unknown>;
    InterruptType?: unknown;
    CustomEventType?: unknown;
    UpdateType?: unknown;
  } = BagTemplate
>(
  options: UseStreamCustomOptions<StateType, Bag>
): UseStreamCustom<StateType, Bag>;

export function useHiveStream<
  StateType extends Record<string, unknown> = Record<string, unknown>,
  Bag extends {
    ConfigurableType?: Record<string, unknown>;
    InterruptType?: unknown;
    CustomEventType?: unknown;
    UpdateType?: unknown;
  } = BagTemplate
>(
  options:
    | UseStreamOptions<StateType, Bag>
    | UseStreamCustomOptions<StateType, Bag>
): UseStream<StateType, Bag> | UseStreamCustom<StateType, Bag> {
  // Call the original useStream hook
  // TypeScript will resolve the correct overload based on the options type
  const streamResult = useStream(
    options as UseStreamOptions<StateType, Bag> & UseStreamCustomOptions<StateType, Bag>
  );

  // TODO: Add your custom Hive-specific logic here
  // You can:
  // 1. Add additional state management with useState/useReducer
  // 2. Add side effects with useEffect
  // 3. Transform or enhance the returned values
  // 4. Add new methods or properties
  // 5. Wrap existing methods with additional functionality
  //
  // Example:
  // const [customState, setCustomState] = useState(null);
  //
  // useEffect(() => {
  //   // React to stream changes
  //   if (streamResult.isLoading) {
  //     console.log('Hive: Stream started');
  //   }
  // }, [streamResult.isLoading]);
  //
  // const enhancedSubmit = async (...args) => {
  //   // Add pre-processing logic
  //   await streamResult.submit(...args);
  //   // Add post-processing logic
  // };

  // For now, return the original stream result unchanged
  // You can extend this to return additional properties or wrapped methods
  return streamResult;
}

