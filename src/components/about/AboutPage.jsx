import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../App';
import { themes } from '../../App';

const createAboutPageStyles = createUseStyles(() => ({

  aboutPage: ({ background, color }) => ({
    width: '100%',
    color: color,
    backgroundColor: background,
    maxWidth: 1000,
    display: 'flex',
    margin: '0 auto',
  }),

  logoWrapper: {
    display: 'flex',
    alignItems: 'start',
  },

  logo: {
    objectFit: 'contain',
    width: 50,
    height: 50,
    marginRight: 20,
    flexShrink: 0,
  },

  content: {
    width: '100%',
    display: 'flex',
    overflow: 'scroll',
  },

  column: {
    width: '50%',
    padding: 40,
  },

  [`@media (max-width: ${global.maxWidth}px)`]: {
    aboutPage: () => ({
      flexDirection: 'column',
      overflow: 'scroll',
    }),

    content: {
      flexDirection: 'column',
    },

    column: {
      width: '100%',
      paddingTop: 0,
    }
  },
}));

const debounce = (fn, ms) => {
  let timer;
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export const AboutPage = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    setTheme(themes.black);
  }, [])

  const classes = createAboutPageStyles({ background: theme.background, color: theme.color });

  return (
    <div className={classes.aboutPage}>
      <div className={classes.content}>
        <div className={classes.column}>
          {`ГЛАЗОК (༗) — это нестабильная видеоплатформа, медиа-мираж, эффект преломления визуальных потоков в пространстве институциональных и технологических связей разной плотности. Мы показываем фильмы, лекции, стримы и все, что посчитаем любопытным.`}
          <br />
          <br />
          {`Если вы хотите, чтобы на глазке показали ваше уже готовое видео, заполните форму — мы постараемся дать вам обратную связь.`}
          <br />
          <br />
          {`Все, что мы когда-либо публиковали, можно найти в архиве. По той же ссылке — библиотека выложенных в открытый доступ фильмов, в формировании которой может поучаствовать каждая или каждый.`}
          <br />
          <br />
          {`Мы полностью независимы и вкладываем в развитие платформы свое время и ресурсы. Поддержать нас можно с помощью Buy Me a Coffee!`}
          <br />
          <br />
          {`По всем остальным вопросам и с предложениями сотрудничества пишите на почту.`}
          <br />
          <br />
          {`Кураторы: Рита Соколовская, Кирилл Роженцов`}
          <br />
          {`Дизайн: Даша Браженко, Вася Кондрашов`}
          <br />
          {`Разработка: Настя Млеко, Илья Осипов`}
          <br />
          {`Спасибо: Женя Л Збань, Анна Зыкина, Евгений Уваровский`}
          <br />
          <br />
          <br />
          <div className={classes.logoWrapper}>
            <img
              className={classes.logo}
              src={require('./images/C-01.png')}
              alt="logo"
            />
            <div className={classes.logoText}>
              {`При поддержке Фонда Владимира Смирнова и Константина Сорокина`}
            </div>
          </div>
        </div>
        <div className={classes.column}>
          {`GLAZOK (༗) is an unstable video platform, a media-mirage, a deflection effect, produced by visual streams running through space with varying densities of institutional and technological relations. We screen films, lectures, live-feeds, and everything that we find curious.`}
          <br />
          <br />
          {`If you want your finished video to premiere on glazok, please fill out the form. We will do our best to give you feedback.`}
          <br />
          <br />
          {`Everything we have ever screened is listed in our archive. There you can also find a catalogue of films available online and for free that is collectively updated and open to submissions from everyone.`}
          <br />
          <br />
          {`We are completely independent and invest our own funds and energy into the platform. You can support us and donate via Buy Me a Coffee.`}
          <br />
          <br />
          {`If you have any questions or want to collaborate, send us a letter.`}
          <br />
          <br />
          {`Curating: Rita Sokolovskaya, Kirill Rozhentsov`}
          <br />
          {`Design: Dasha Brazhenko, Vasya Kondrashov`}
          <br />
          {`Code: Nastya Mleko, Ilya Osipov`}
          <br />
          {`Thanks: Zhenya L Zban, Anna Zykina, Evgeniy Uvarovskiy`}
          <br />
          <br />
          <br />
          <div className={classes.logoWrapper}>
            <img
              className={classes.logo}
              src={require('./images/C-01.png')}
              alt="logo"
            />
            <div className={classes.logoText}>
              {`With the support of the Vladimir Smirnov and Konstantin Sorokin Foundation`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
