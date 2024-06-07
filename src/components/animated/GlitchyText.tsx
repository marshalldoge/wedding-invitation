import { useEffect } from 'react';
import Splitting from 'splitting';
// @ts-ignore
import ScrollOut from 'scroll-out';

interface props {
  text: string;
  className?: string;
  speed?: 'normal' | 'fast' | 'slow';
}
const GlitchyText = ({ text = '', className = 'text-black', speed = 'normal' }: props) => {
  useEffect(() => {
    Splitting();
    ScrollOut({});
    const allKana = 'ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゙゚゛゜ゝゞゟァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ';
    const GLITCH_CHARS = (allKana+'愛美夢生命光和力平和自由希望').split('');
    const CHARS = document.querySelectorAll(`.glitchy-${speed} .char`);
    for (let c = 0; c < CHARS.length; c++) {
      // We are going to inline 10 CSS variables
      for (let g = 0; g < 10; g++) {
        // @ts-ignore
        CHARS[c].style.setProperty(
          `--char-${g}`,
          `"${GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]}"`
        );
      }
    }

  }, []);

  return (
    <div>
      <div aria-hidden="true" className={`glitchy-${speed}`} data-splitting={true}>
        <div className={className} data-scroll>{text}</div>
      </div>
    </div>
  );
};

export default GlitchyText;
