import style from './WelcomePage.module.scss';
import { Developer } from 'components/Developer';
import { developers } from 'utils/developer';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
/* import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; */

//gsap.registerPlugin(ScrollTrigger);
//gsap.registerPlugin(ScrollSmoother);

export const WelcomePage: React.FC = () => {
  /* const animeWrap = useRef<HTMLDivElement>(null);

  const animeGalL = useRef<HTMLDivElement>(null);
  const animeGalLL = gsap.utils.selector(animeGalL);

  useEffect(() => {
    const ctx = gsap.context();
    ScrollSmoother.create({
      wrapper: '.welcome_page',
      content: '.welcome_page_wrap',
      smooth: 1.5,
      effects: true,
    });

    gsap.fromTo(
      animeWrap,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: '.welcome_title_wrap',
          start: 'center',
          end: '820',
          scrub: true,
        },
      }
    );

    const itemsL = gsap.utils.toArray('.gallery_left .gallery__item');

    itemsL.forEach((item) =>
      gsap.fromTo(
        '.gallery__item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: '.gallery__item',
            start: '-850',
            end: '-100',
            scrub: true,
          },
        }
      )
    );

    const itemsR = gsap.utils.toArray('.gallery_right .gallery__item');

    itemsR.forEach((item) =>
      gsap.fromTo(
        '.gallery__item',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: '.gallery__item',
            start: '-750',
            end: 'top',
            scrub: true,
          },
        }
      )
    );

    //return () => ctx.revert();
  }, []); */
  return (
    <div className={style.welcome_page}>
      <div className={style.welcome_page_wrap}>
        <div className={style.welcome_title_wrap}>
          <div className={style.title}>
            <h1 className={style.title_main}>GraphiQL</h1>
            <p className={style.title_text}>
              the GraphQL integrated development environment (IDE). It’s a powerful (and all-around
              awesome) tool you’ll use often while building Gatsby websites. It offers syntax
              highlighting, intellisense autocompletion, automatic documentation, and much more.
            </p>
          </div>
          <img className={style.bg_img__welcome} src="/bg-welcome.png" alt="alt" />
        </div>
        <div className={style.gallery}>
          <div className={classNames(style.gallery_left, style.gallery_side)}>
            <Developer {...developers[0]} />
            <p className={classNames(style.gallery_description, style.gallery__item)}>
              {developers[1].description}
            </p>
            <Developer {...developers[2]} />
          </div>
          <div className={classNames(style.gallery_right, style.gallery_side)}>
            <p className={classNames(style.gallery_description, style.gallery__item)}>
              {developers[0].description}
            </p>
            <Developer {...developers[1]} />
            <p className={classNames(style.gallery_description, style.gallery__item)}>
              {developers[2].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
