import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../App';
import { Footer } from '../footer/Footer';
import { HeaderSlide } from '../header/HeaderSlide';

const createAboutPageStyles = createUseStyles(() => ({

  aboutPage: ({ background, color }) => ({
    width: '100%',
    color: color,
    backgroundColor: background,
    paddingTop: 150,
    maxWidth: 800,
    display: 'flex',
  }),

  column: {
    width: '50%',
  }

  [`@media (max-width: ${global.maxWidth}px)`]: {

},
}));

export const AboutPage = () => {
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const { theme } = React.useContext(ThemeContext);

  React.useEffect(() => {

  })

  const classes = createAboutPageStyles({ background: theme.background, color: theme.color });

  return (
    <>
      {winWidth > global.maxWidth && (
        <div className={classes.aboutPage}>
          <div className={classes.column}>
            {``
            ГЛАЗОК (༗) — это нестабильная видеоплатформа, медиа-мираж, эффект преломления визуальных потоков в пространстве институциональных и технологических связей разной плотности. Мы показываем фильмы, лекции, стримы и все, что посчитаем любопытным.

            Если вы хотите, чтобы на глазке показали ваше уже готовое видео, заполните форму — мы постараемся дать вам обратную связь.

            Все, что мы когда-либо публиковали, можно найти в архиве. По той же ссылке — библиотека выложенных в открытый доступ фильмов, в формировании которой может поучаствовать каждая или каждый.

            Мы полностью независимы и вкладываем в развитие платформы свое время и ресурсы. Поддержать нас можно с помощью Buy Me a Coffee!

            По всем остальным вопросам и с предложениями сотрудничества пишите на почту.

            Кураторы: Рита Соколовская, Кирилл Роженцов
            Дизайн: Даша Браженко, Вася Кондрашов
            Разработка: Настя Млеко, Илья Осипов
            Спасибо: Женя Л Збань, Анна Зыкина, Евгений Уваровский

            [лого] При поддержке Фонда Владимира Смирнова и Константина Сорокина

          </div>
          <div className={classes.column}>

          </div>
          <Footer />
        </div>
      )}
      {winWidth <= global.maxWidth && (
        <div className={classes.aboutPage}>
          <HeaderSlide withArrows={false} />
          {'ABOUT'}
        </div>
      )}
    </>
  );
};
