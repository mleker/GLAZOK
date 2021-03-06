import React from 'react';
import { createUseStyles } from 'react-jss';

const createHomePageStyles = createUseStyles({
  body: {
    width: 700,
    margin: '0 auto',
    padding: 20,
    height: '100vh',
  },

  mainTextWrapper: {
    display: 'flex',
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

  body: {

  },

},
});

export const HomePage = () => {
  const classes = createHomePageStyles();

  const lineBreaker = (text) => (
    text.split('\n').map((item, key) => (
      <span key={key}>
        {item}
        <br />
      </span>
    ))
  );

  return (
    <div className={classes.body}>
      {'Glazok'}
      <div className={classes.mainTextWrapper}>
        <div className={classes.column}>
          {'
          ГЛАЗОК (༗)– это платформа для пограничного видео-контента. Нас интересует пространство, где теория и искусство пересекаются с образованием и развлечением, а наслоение различных подходов и практик создает причудливый узор культуры по ту сторону разделения на традицию и эксперимент, мейнстрим и андеграунд.
          Во-первых, ГЛАЗОК (༗) – это онлайн-кинотеатр с премьерами фильмов, специально приглашенных куратор(к)ами
          и отобранных в рамках опенкола.

          Во-вторых, это студия производства эдьютейнмент-контента. Наконец, это курируемый и регулярно обновляемый блог с ссылками на любимое из того, что уже есть в сети.

          У нас есть рассылка, будем на связи.'}
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>

        </div>
      </div>
    </div >
  );
};