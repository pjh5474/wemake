export namespace Route {
  export interface LoaderArgs {
    request: Request;
    params: Record<string, string>;
  }

  export interface ActionArgs {
    request: Request;
    params: Record<string, string>;
  }

  export interface ComponentProps<T = any, U = any> {
    loaderData: T;
    actionData: U;
  }

  export type MetaFunction = () => Array<Record<string, string>>;
}
