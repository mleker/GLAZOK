import React from 'react';
import { createUseStyles } from 'react-jss';

const createHomePageStyles = createUseStyles({


  [`@media (max-width: ${global.maxWidth}px)`]: {

   

  },
});

export const HomePage = () => {
  const classes = createHomePageStyles();

  return (
    <div>
      <div className={classes.body}>
        {popupBOpened && (
          <PopupScenario
            content={scenarioBPopupContent}
            onClose={() => setPopupBOpened(false)}
          />
        )}
        {popupCOpened && (
          <PopupScenario
            content={scenarioCPopupContent}
            onClose={() => setPopupCOpened(false)}
          />
        )}
        {popupDOpened && (
          <PopupScenario
            content={scenarioDPopupContent}
            onClose={() => setPopupDOpened(false)}
          />
        )}
        {popupEOpened && (
          <PopupScenario
            content={scenarioEPopupContent}
            onClose={() => setPopupEOpened(false)}
          />
        )}
        <div className={classes.header}>
          <div className={classes.headerContent}>
            <div className={classes.title}>
              Backcasting Kardashev One
          </div>
            <div className={classes.subTitle}>
              Considering future visions of Earth reveals the necessity of rethinking the relationships between energy, civilisation and planetarity
          </div>
          </div>
          <div className={classes.hz}>
            <div className={classes.coverImageWrapper}
            >
              <FadeInImg
                className={classes.coverImage}
                src={require('./cover.png')}
                alt="Kardashevian Turn cover"
              />
            </div>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.item}>
            <div className={classes.itemTitle}>
              1. The Kardashev Scale
            </div>
            <div className={classes.itemContent}>
              <p>In 1964, Russian astrophysicist Nikolai Kardashev proposed a scale to classify technologically developed civilisations. The context was the search for extraterrestrial intelligence so the key consideration was detectability. Even the nearest stars are extremely far away and space is full of background noise, so the transmission of an extraterrestrial information signal detectable on earth would require huge amounts of energy.</p>
              <p>Based on this insight Kardashev proposed a three level classification system, based entirely on the amount of energy harnessed. Nowadays the scale is commonly defined as follows:</p>

              <p>
                - Type 1 “planetary” civilisation: can use and store all of the energy available on its planet.<br />
                - Type 2 “stellar” civilisation: can use and control energy at the scale of its planetary system including the entire energy of its nearest star.<br />
                - Type 3 “galactic” civilisation: can control energy at the scale of its entire host galaxy.
              </p>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemTitle}>
              2. Kardashev One
          </div>
            <div className={classes.itemContent}>
              <p>The amounts of energy implied here are truly staggering. Let’s take Earth as an example. A Kardashev Type 1 – or K1 – civilisation would control all of the energy available on the planet: the equivalent of the 174 Petawatts of solar radiation reaching the upper atmosphere. That would be almost 10,000 times more than the current total power output of human civilisation, roughly 18.4 Terawatts.</p>
              <p>To contextualise that, let’s imagine a time when humanity metabolised 10,000 times less energy than today. That would be thousands of years ago, before the large-scale adoption of farming beginning around 10,000 BC. A time when the most advanced technology was a sharp stone. So a future K1 civilisation would control an incredible amount of power.</p>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemTitle}>
              3. Energy as a Constraint
            </div>
            <div className={classes.itemContent}>
              <p>This amount of energy is so large that the very act of its consumption becomes a possible constraint for the continuation of life on Earth. In a closed system such as Earth the energy we use is inevitably released as thermal energy, increasing earth’s temperature in an effect known as direct heating. While currently negligible compared to the impacts of greenhouse gases, at K1 levels it would threaten the end of civilisation as we know it, heating up the Earth by perhaps as much as 24˚C – climate change on an unimaginable scale.</p>
              <p>Direct heating is a consequence of the laws of thermodynamics. Increased efficiency, and the sources used to generate energy, would both play a role in delaying direct heating. But ultimately, if K1 energy levels are reached, the only way to avoid direct heating would be to use a significant proportion of energy off-earth. This provided us with two primary variables to speculate on four possible, and very different, scenarios. First, whether energy is used primarily on earth or in space. Second, the way in which civilisation produces energy: if it optimises the surface of the planet mostly for solar energy absorption (black) or instead using other sources leaving some of earth’s surface free (blue).</p>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemTitle}>
              4. Backcasting Kardashev One
            </div>
            <div className={classes.itemContent}>
              <p>In looking at these, we consider how exercising agency in just two ways in relation to energy leads to hugely varying outcomes, and hugely varying relationships between civilisation and planet.</p>
              <p>To explore these pathways we “backcasted” from each of the scenarios, tracing the chain of events in reverse to build one detailed but tentative timeline of how each of these these scenarios could come about.  In doing that, we connect them to where we are now.</p>
            </div>
          </div>
          {/* <a
            className={classes.showMoreLink}
            target="blanc"
            href={"https://drive.google.com/file/d/1fbivR27OEsdnsH_Zv8FHbL1ZrJhzxRHi/preview"}
          >
            <div>
              {'READ THE FULL ESSAY'}
            </div>
            <ArrowIcon className={classes.arrow} />
          </a> */}
          <div className={classes.title2}>
            Kardashev One Multiverse
          </div>
        </div>
        <ParallaxCache>
          <>
            <div className={classes.parallax}>
              <Parallax
                y={[-20, 20]}
              >
                <Axes className={classes.axes} />
                <div className={classes.planets}>
                  <div
                    onMouseEnter={() => setHoveredScenarioC(true)}
                    onMouseLeave={() => setHoveredScenarioC(false)}
                    onClick={showCPopup}
                    className={classNames(classes.planet, classes.planetC)}
                  >
                    <FadeInImg
                      className={classes.planetImg}
                      src={require('./symbionts-axes.png')}
                      alt="Photosymbionts scenario"
                    />
                    <div className={classNames(classes.planetTitle, classes.planetLeftTitle, hoveredScenarioC ? classes.hoveredPlanetTitle : '')}>
                      {'PHOTOSYMBIONTS'}
                    </div>
                  </div>
                  <FadeInImg
                    onMouseEnter={() => setHoveredScenarioD(true)}
                    onMouseLeave={() => setHoveredScenarioD(false)}
                    onClick={showDPopup}
                    className={classNames(classes.planet, classes.planetD)}
                    src={require('./arkology-axes.png')}
                    alt="Arkology scenario"
                  />
                  <FadeInImg
                    onMouseEnter={() => setHoveredScenarioB(true)}
                    onMouseLeave={() => setHoveredScenarioB(false)}
                    onClick={showBPopup}
                    className={classNames(classes.planet, classes.planetB)}
                    src={require('./black-marble-axes.png')}
                    alt="Black marble scenario"
                  />
                  <FadeInImg
                    onMouseEnter={() => setHoveredScenarioE(true)}
                    onMouseLeave={() => setHoveredScenarioE(false)}
                    onClick={showEPopup}
                    className={classNames(classes.planet, classes.planetE)}
                    src={require('./haff-earth-axes.png')}
                    alt="Haff earth scenario"
                  />
                </div>
              </Parallax>
            </div>
            <div className={classes.map}>
              <FadeInImg
                className={classes.mapBg}
                src={require('./map-bg.jpg')}
                alt="Scenarios"
              />
              <Scenarios2
                className={
                  classNames(classes.scenarios,
                    hoveredScenarioB
                      ? classes.hoveredScenarioB : hoveredScenarioC
                        ? classes.hoveredScenarioC : hoveredScenarioD
                          ? classes.hoveredScenarioD : hoveredScenarioE
                            ? classes.hoveredScenarioE : ''
                  )
                }
                scenarioBOnClick={showBPopup}
                scenarioCOnClick={showCPopup}
                scenarioDOnClick={showDPopup}
                scenarioEOnClick={showEPopup}
              />
            </div>
          </>
        </ParallaxCache>
        <div className={classes.conclusion}>
          <div className={classes.content}>
            <div className={classes.item}>
              <div className={classes.itemTitle}>
                5. A Plan
              </div>
              <div className={classes.itemContent}>
                <p>Let’s look at ourselves, not even a one on the scale, and recognise that we are not as advanced as we sometimes think. Indeed, developing incredible technology, or using godlike amounts of energy, might not make us advanced either. As our scenarios make clear, other factors matter - not least, the thermodynamic, metabolic flows involved. K1 might not even be our choice. We may be carried along an exponential trajectory by forces we don’t control, risking collapse all along the way.</p>
                <p>Direct heating shows that physics and chemistry will get us in the end, but we already knew that. Sooner or later, climate change requires a deep look into what it would mean to be advanced and reveals the necessity to respond to this anthropogenic climate change with an equally artificial planetarity. That is to say, a planet, that makes a civilisation, that remakes a planet. It must do so first by imagining its end state. In other words, a plan.</p>
              </div>
            </div>
            <div className={classes.cast}>
              <p><b>Project by</b> Yevheniia Berchul, Yulya Besplemennova, Stuart Turner, Iani Zeigerman</p>

              <p>
                <a
                  className={classes.castLink}
                  href="https://theterraforming.strelka.com/"
                  target="blanc"
                >
                  The Terraforming 2020,&nbsp;
                </a>
                <a
                  className={classes.castLink}
                  href="https://strelka.com/"
                  target="blanc"
                >
                  Strelka Institute for Media Architecture and Design
                </a>
              </p>
              <p>
                <b>Program Director:</b> Benjamin H. Bratton<br />
                <b>Program Tutors:</b> Nicolay Boyadjiev, Lisa Dorrer<br />
              </p>

              <p>Thanks to Lukáš Likavčan and James Boyd.</p>

            </div>
          </div>
        </div>
      </div>
    
    </div >
  );
};