import { useState } from "react";
import { useStream } from "./stream.js";
import {
  BagTemplate,
  UseStream,
  UseStreamCustom,
  UseStreamCustomOptions,
  UseStreamOptions,
} from "./types.js";

function isCustomOptions<
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
): options is UseStreamCustomOptions<StateType, Bag> {
  return "transport" in options;
}

/**
 * A custom React hook that extends `useStream` with additional CelHive-specific functionality.
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
 * const stream = useCelHiveStream({
 *   assistantId: "my-assistant",
 *   threadId: "my-thread",
 *   // ... other options
 * });
 * ```
 */
export function useCelHiveStream<
  StateType extends Record<string, unknown> = Record<string, unknown>,
  Bag extends {
    ConfigurableType?: Record<string, unknown>;
    InterruptType?: unknown;
    CustomEventType?: unknown;
    UpdateType?: unknown;
  } = BagTemplate
>(options: UseStreamOptions<StateType, Bag>): UseStream<StateType, Bag>;

/**
 * A custom React hook that extends `useStream` with additional CelHive-specific functionality.
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
 * const stream = useCelHiveStream({
 *   transport: myCustomTransport,
 *   threadId: "my-thread",
 *   // ... other options
 * });
 * ```
 */
export function useCelHiveStream<
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

export function useCelHiveStream<
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
  // Store this in useState to make sure we're not changing the implementation in re-renders
  const [isCustom] = useState(isCustomOptions(options));

  // Call the original useStream hook with the appropriate type
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const streamResult = isCustom
    ? useStream(options as UseStreamCustomOptions<StateType, Bag>)
    : useStream(options as UseStreamOptions<StateType, Bag>);

  // TODO: Add your custom CelHive-specific logic here
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
  //     console.log('CelHive: Stream started');
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

