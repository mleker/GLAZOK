import React from 'react';
import { createUseStyles } from 'react-jss';

const createHomePageStyles = createUseStyles({


  [`@media (max-width: ${global.maxWidth}px)`]: {

    header: {
      paddingBottom: 0,
    },

    body: {
      padding: [50, 0, 0, 0],
    },

    title: {
      fontSize: 50,
    },

    subTitle: {
      fontSize: 25,
      paddingTop: 30,
    },

    item: {
      paddingTop: 40,
    },

    itemTitle: {
      fontSize: 20,
    },

    itemContent: {
      paddingTop: 0,
      lineHeight: 1.5,
    },

    title2: {
      paddingBottom: 50,
      fontSize: 40,
    },

    hz: {
      marginTop: 40,
    },

    conclusion: {
      paddingBottom: 50,
      paddingTop: 0,
    },

    map: {
      marginTop: -150,
    }

  },
});

export const HomePage = () => {
  const [popupBOpened, setPopupBOpened] = React.useState(false);
  const [popupCOpened, setPopupCOpened] = React.useState(false);
  const [popupDOpened, setPopupDOpened] = React.useState(false);
  const [popupEOpened, setPopupEOpened] = React.useState(false);
  const [hoveredScenarioB, setHoveredScenarioB] = React.useState(false);
  const [hoveredScenarioC, setHoveredScenarioC] = React.useState(false);
  const [hoveredScenarioD, setHoveredScenarioD] = React.useState(false);
  const [hoveredScenarioE, setHoveredScenarioE] = React.useState(false);
  const classes = createHomePageStyles();

  const scenarioBPopupContent = {
    title: 'BLACK MARBLE',
    overviewImage: require('./black-marble-overview.jpg'),
    overviewText: `Black Marble is the planet affected by direct heating the most. Its civilization grew enormously, to over 200 billion people – and counting – but was extremely inefficient in both its energy and technology use. Huge leaps forward in solar energy production and endless ways to consume it were not matched with general improvements in efficiency nor collaborative planning.
    
    This civilisation has so far been incapable of successful interplanetary travel and settlement, especially since a combination of satellite collisions and the inadvertent destruction and disintegration of the abandoned Eurasian space station have caused unprecedented amounts of space junk in low earth orbit. Failing to deal with entropy, this planetary civilisation has ended up living in a completely enclosed, climate controlled environment – most inhabitants spending the majority of time in simulated virtual worlds to compensate for permanently lost planetary biodiversity.`,
    compositionImage1: require('./black-marble-globe.jpg'),
    compositionImage2: require('./black-marble-heating-map.jpg'),
    compositionText: `A ptolemaic cosmology of closed spheres reappeared taking over from the Copernican turn: humanity has shut itself indoors. The biosphere and technosphere are merged together as one hybrid whole.

    The entire  planet is enclosed by a photovoltaic dome reaching 15 kilometres into the sky, holding the atmosphere within. In some cases the upper layers of atmosphere were partially condensed and stored as a liquid way to use when needed in the dome, or just eliminated like the ozone layer that used to absorb so much solar radiation. The dome acts both as an insolation absorption and radiator that manages to dissipate some, but not all, direct heat back to space. The climate is completely equal across the whole planet at an average of 25 degrees centigrade.
    
    The population is 200 billion people, buildings are predominantly low-rise, sprawling across all the former land-mass. The distinction between sea and land is breaking down as the oceans are gradually transformed, and built upon. Parts are used for intensive algae farming providing the main source of nutrition, as well as producing much needed oxygen. Few croplands are left for other plants, and no-one believes anymore the old stories that people used to eat animals – what a luxury! You can still see some animals in the few remaining resorts, but there are less and less of them, unlike in the simulated world.`,
    energyImage: <BlackMarbleEnergy />,
    energyText: `The inefficient civilization of Black Marble kept using energy to cool down local spaces while the planet was heating up. Eventually the same strategy was used for the whole planet once it was too late to do much else – using a significant proportion if its abundant solar energy to cool down the living space.
    
    In the closed dome everyone is aware of the effects of direct heating, any activities causing excessive heating are prohibited unless one can afford to cool their space back down. Visiting real life sectors – “IRL Zone” – with vast spaces and the possibility to move freely is a privilege of the rich. The poor, on the other hand, spend their lives mostly immobilized working in VR to get to just few hours of free time in it where they can finally experience it fully. Tired of looking at bad VR, they can’t wait to clock off and look at good VR.`,
  };

  const scenarioCPopupContent = {
    title: 'PHOTOSYMBIONTS',
    overviewImage: require('./symbiont-overview.jpg'),
    overviewText: `Photosymbionts are former homo sapiens that reinvent themselves in constant anthropoforming process and establish symbiotic relations with other species that permit them to overcome their own limits.

    Already in 20th century the biologists were studying the marine species that are capable to autotrophy thanks to symbiosis with algae cells, starting with its application to other species gradually it reached humans that were suffering from famines caused by climate change.`,
    compositionImage1: require('./symbiont-globe.jpg'),
    compositionImage2: require('./symbiont-heating-map.jpg'),
    compositionText: `Atmo-engineering redistributed sunlight more evenly - mirror arrays are reflecting the rays to reach more moderate regions which makes the equatorial climate more mild as well, the cloud formation and precipitation is controlled to prevent daytime cloud cover. Long-term alteration of atmosphere is in progress as more species are being turned to autotrophic mode that changes the gases composition and lets the heat to be radiated more efficiently from the Earth surface to prevent the direct-heating doomsday. Also the redistribution of sunlight makes the temperature across the globe more even eliminating extreme-heat events possibility. Still the climate is much hotter than it used to be with average of 29 peaking at 40, but the genetic modification adapted all species to surviving that.
    
    The cities are a symbiont ecosystem, with low-rise buildings covered with the dark-green leaves of creepers an algae tanks of extreme efficiency. As energy density is low so is agglomeration - an artificial belt encircling the tropical and subtropical zone accommodating 30 billion sentients with no single border between the neighbourhoods except for the oceans.This ecumenopoli are occupying 30% of total inhabitable land, the rest is used to grow the biomass for the biofuel reactors.`,
    energyImage: <SymbiontsEnergy />,
    energyText: `Autotrophy has revolutionized civilization’s relation to energy as the proper nutrition is not anymore dependent on the complex intermediary chains of agriculture and logistics, but directly provided to everyone via sunlight. Abundance is the basis of the economy, finally the ultimate capital is received directly on earth, true post-scarcity occurs on a basic level. Universal Basic Energy access rights were established, which eventually leads to a fully developed heliosocialism. The most efficient thing one can do is sunbathe.

    Biomass production is at peak efficiency making it possible to extract electricity directly from plants. For the fields that need more power like the transportation, advanced biofuel reactors are used with the biomass grown in the moderate forest regions. They’re the ones powering the solar power beamers and mirrors arrays in the skies, but are still not capable of providing enough thrust for the rockets to exit the Earth’s orbit, space travel was not a priority for the past centuries aimed at anthropoforming.`,
  };

  const scenarioDPopupContent = {
    title: 'ARKOLOGY',
    overviewImage: require('./arkology-overview.jpg'),
    overviewText: 'What is a planet for when civilization defies planetary boundaries? In the case of Arkology the planet’s use by humans is restricted to temporary retreats to prevent space-related health deterioration. In contrast, planet’s healthy biodiversity is cultivated at an unprecedented rate. As space settlers need to terraform other planets they realize the need for the greatest variety of different ecosystems. Earth is the initial cradle and laboratory, multiple previously extinct species are resurrected and new ones are constructed in order to be transported to other worlds.',
    compositionImage1: require('./arkology-globe.jpg'),
    compositionImage2: require('./arkology-heating-map.jpg'),
    compositionText: `Human inhabitants of Arkology number just 2 billion: cosmonauts that take their obligatory retreat periods from space exploration duties to fight space-related health deterioration; retired explorers; children; and scientists that are busy with reviving and breeding the most diverse species possible. All of humanity fits into 20,000 buildings spread around the planet, occupying not more than 0.1% of the total land area. Agriculture is restorative and still feeds large part of those living in space, so it was still not possible to bring it below 2% of the total surface area.
      
    Industry is fully located on the Moon, where the main solar power base is also situated, beaming the energy back to Earth. All the remaining parts of earth are divided between the preservation and experimentation grounds: everything is done to create the most viable biocenosis to maximise the variety of off-earth environments.`,
    energyImage: <ArkologyEnergy />,
    energyText: 'Arkologists are the descendants of Great Collapse survivors – an event that led to human deaths on a huge scale as the limits of planetary growth were overshot. A few million well-prepared elites watched and waited from the safety of their desert bunkers, New Zealand ranches and private islands. The descendants of these privileged and lucky few gradually formed a new united government that proposed an Energy Constitution, and a promise – this time – never to repeat their ancestors’ mistakes. The long-term survival of humans, and other such earthly inhabitants as remained, was to be secured by settling in space. Understanding the historical role played by unchecked growth and waste they created an extremely efficient society unaccepting of any unnecessary entropy. Now the whole population works on a common project, performing their roles in long-term space exploration and settlement, and receiving full life support in return – plus a short (due to space ageing) but well appointed retirement on Earth. Private property in space is mostly abolished as well as monetary exchange whereas on Earth the founding fathers’ descendants still keep their capital.',
  };

  const scenarioEPopupContent = {
    title: 'HAFF EARTH',
    overviewImage: require('./haff-earth-overview.jpg'),
    overviewText: 'This is desire. The technosphere has finally reached version 1.0 and is always working and planning and consuming for the next upgrade. Nanobots build megastructures overnight, housing pitch black factories making every component for every machine turn the planet into a huge mass of pistons, wheels, reactions, furnaces. Space travel is the name of the game, in particular to mine the necessary materials to build the first dyson sphere. One AGI runs the show. Professor Haff the historians called him, when there were still humans to do so. There are no biological creatures here. Inefficient components have been shed now that they are no longer necessary for further growth. Many more cycles are guaranteed.',
    compositionImage1: require('./haff-earth-globe.jpg'),
    compositionImage2: require('./haff-earth-heating-map.jpg'),
    compositionText: 'A truly planetary civilization, albeit one which has no particular regard for its specific planet or any of the elements that might make it unique. Ultimately it really is made of elements – and they are everywhere, waiting to be combined, consumed, assembled. The planet is a starting point, a zero, from which to grow outwards. Its civilisation relates to the planet as a hedge fund does to microbial life. This world is on its way to a post-planetary condition, then post-stellar, then post-galactic. Bigger, better, newer, faster, more, more, more. A Matrioshka brain will help, it’s all in the plan.',
    energyImage: <HaffEarthEnergy />,
    energyText: 'Energy is provided in part by solar – why not: it’s free, and we’re coming after the whole star next! – but the real muscle comes from fusion. Water provides the starting material, there’s plenty of deuterium, and lithium to turn into tritium. Now that’s an efficient reaction. Everything is energy if you want it to be. All the minerals are mapped, and soon they will all be consumed and transformed, into something bigger and more organised, with greater utility. Entropy is for other planets.',
  };

  const showBPopup = () => {
    acquireScrollLock();
    setPopupBOpened(true);
  };

  const showCPopup = () => {
    acquireScrollLock();
    setPopupCOpened(true);
  };

  const showDPopup = () => {
    acquireScrollLock();
    setPopupDOpened(true);
  };

  const showEPopup = () => {
    acquireScrollLock();
    setPopupEOpened(true);
  };

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