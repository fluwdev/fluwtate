import { createStore } from "./store/store";
import { createModule } from "./modules/create-module";
import { devtool } from "./middleware/devtool";
import { useStore } from "./react/use-store";
import { shallow } from "./shallow";

export {
  shallow,
  createStore,
  createModule,
  useStore,
  devtool,
};
