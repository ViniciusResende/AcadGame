/** React imports */
import React from 'react';

/** React Component */
import Slider from '../../Common/Slider';

/** Styles */
import './Home.scss';

/** Assets */
import {
  ChevronIcon,
  CrowdTableIcon,
  GroupPictureIcon,
  IdentifyCardIcon,
  LaptopIcon,
  MoneyImprovementIcon,
  PeopleConnectionIcon,
  PeopleCrowdIcon,
  PersonProfileIcon,
  PersonRunIcon,
  PresentationIcon,
  QuestionPersonIcon,
  StarPersonIcon,
} from '../../../assets/svg/icons';
import {
  AirplaneIllustration,
  BaseballMenIllustration,
  FriendsHangoutIllustration,
  GroupPlanningIllustration,
  HalterWorkoutIllustration,
  RunningWomanIllustration,
  WomanMetricsIllustration,
} from '../../../assets/svg/illustrations';

function HomeComponent() {
  return (
    <div className="home-page__container">
      <section className="home-page__head">
        <div className="home-page__head-left">
          <div className="home-page__head-title">
            <QuestionPersonIcon />
            <h1>O que é o Acad Game?</h1>
          </div>
          <ul className="home-page__head-items">
            <li>
              <ChevronIcon /> <span>Uma forma para competir com os amigos</span>
            </li>
            <li>
              <ChevronIcon /> <span>Um incentivo para continuar evoluindo</span>
            </li>
            <li>
              <ChevronIcon /> <span>Uma ferramenta para voar mais longe</span>
            </li>
          </ul>
        </div>
        <div className="home-page__head-right">
          <AirplaneIllustration />
        </div>
      </section>
      <main className="home-page__main">
        <Slider className="home-page__slider">
          <section className="home-page__slide -first">
            <div className="home-page__slide-head">
              <IdentifyCardIcon />
              <h2>Como o Acad Game impacta você?</h2>
            </div>
            <main className="home-page__slide-content">
              <HalterWorkoutIllustration className="home-page__illustration -first" />
              <div className="home-page__first-slide-info">
                <div className="slide-info">
                  <PeopleConnectionIcon />
                  <p>
                    É possível adicionar e acompanhar as métricas de seus
                    amigos, e se motivar através deles
                  </p>
                </div>
                <div className="slide-info">
                  <MoneyImprovementIcon />
                  <p>
                    Com métricas objetivas é possível acompanhar seu desempenho
                    e constância semanalmente
                  </p>
                </div>
              </div>
              <FriendsHangoutIllustration className="home-page__floating-illustration -first" />
            </main>
          </section>
          <section className="home-page__slide -second">
            <div className="home-page__slide-head">
              <PresentationIcon />
              <h2>Como o Acad Game funciona?</h2>
            </div>
            <main className="home-page__slide-content">
              <div className="home-page__second-slide-info">
                <div className="slide-info">
                  <PersonProfileIcon />
                  <p>
                    Primeiramente é importante obter pelo menos uma ficha de
                    treino
                  </p>
                </div>
                <div className="slide-info">
                  <PeopleCrowdIcon />
                  <p>Para melhorar a experiência, adicione alguns amigos!</p>
                </div>
                <div className="slide-info">
                  <PersonRunIcon />
                  <p>
                    Com elas em mão, você deve agora executar os exercícios, e
                    marcá-los no como feitos no Acad Game
                  </p>
                </div>
                <div className="slide-info">
                  <GroupPictureIcon />
                  <p>
                    Voilà, agora é só acompanhar seus dados e dos seus amigos na
                    plataforma!
                  </p>
                </div>
              </div>
              <WomanMetricsIllustration className="home-page__illustration -second" />
            </main>
          </section>
          <section className="home-page__slide -third">
            <div className="home-page__slide-head">
              <CrowdTableIcon />
              <h2>Quem somos nós?</h2>
            </div>
            <main className="home-page__slide-content">
              <div className="home-page__third-slide-info">
                <div className="slide-info">
                  <StarPersonIcon />
                  <p>Somos aficionados em academia</p>
                </div>
                <div className="slide-info">
                  <PeopleCrowdIcon />
                  <p>Competidores natos</p>
                </div>
                <div className="slide-info">
                  <LaptopIcon />
                  <p>Estudantes de Sistemas de Informação na UFMG</p>
                </div>
              </div>
              <GroupPlanningIllustration className="home-page__illustration -third" />
            </main>
          </section>
        </Slider>
      </main>
      <footer className="home-page__footer">
        <div className="home-page__footer-running">
          <h3>Toda maratona começa com um passo</h3>
          <RunningWomanIllustration />
        </div>
        <div className="home-page__footer-baseball">
          <h3>Pronto para começar a sua?</h3>
          <BaseballMenIllustration />
        </div>
        <div className="home-page__footer-contact">
          <h3>Tem alguma dúvida?</h3>
          <a href="mailto:contact.acadgame@gmail.com">
            contact.acadgame@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

/** Exports */
export default HomeComponent;
