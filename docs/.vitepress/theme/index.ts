import Theme from 'vitepress/dist/client/theme-default';
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css';
// 插件的组件，主要是demo组件
import { registerComponents } from './register-components.js';

import Moui from '../../../packages/components';
import '../../../packages/theme/index.css';

export default {
  ...Theme,
  enhanceApp({ app }) {
    registerComponents(app);
    app.use(Moui);
  }
};
