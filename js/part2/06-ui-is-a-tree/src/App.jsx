// https://uk.react.dev/learn/understanding-your-ui-as-a-tree

import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Застосунок 'Натхнення'" />
      <InspirationGenerator>
        <Copyright year={2025} />
      </InspirationGenerator>
    </>
  );
}
// TODO: fix styles
// TODO: fix colors