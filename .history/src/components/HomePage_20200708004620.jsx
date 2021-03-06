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
    flexShrimp: 0,
  },

  divider: {
    width: 20,
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
      <div className={classes.mainTextWrapper}>
        <div className={classes.column}>
          {lineBreaker(`ГЛАЗОК (༗)– это платформа для пограничного видео-контента. Нас интересует пространство, где теория и искусство пересекаются с образованием и развлечением, а наслоение различных подходов и практик создает причудливый узор культуры по ту сторону разделения на традицию и эксперимент, мейнстрим и андеграунд.

              Во-первых, ГЛАЗОК (༗) – это онлайн-кинотеатр с премьерами фильмов, специально приглашенных куратор(к)ами и отобранных в рамках опенкола.

              Во-вторых, это студия производства эдьютейнмент-контента. Наконец, это курируемый и регулярно обновляемый блог с ссылками на любимое из того, что уже есть в сети. 
              
              У нас есть рассылка, будем на связи.
          `)}
        </div>
        <div className={classes.divider} />
        <div className={classes.column}>
          {lineBreaker(`GLAZOK (༗)is a platform for borderline video content. We are interested in a space where theory and art intersect with education and entertainment, and the layering of various approaches and practices creates a bizarre cultural pattern on the other side of the division into tradition and experiment, mainstream and underground.
              
              Firstly, GLAZOK (༗) is an online cinema with premieres of films specially invited by the curator(s) and selected as part of the open-air school. 

              Secondly, this is a studio for the production of content development. Finally, this is a curated and regularly updated blog with links to your favorite from what is already on the network.

              We have a newsletter, we will be in touch.          
          `)}
        </div>
      </div>
    </div >
  );
};