'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { CustomSwiperProps } from './interface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { cn } from '../../lib';
import { BREAKPOINTS, SLIDES_PER_VIEW } from './constant';
import NavigationButton from './navigation-button';

const CustomSwiper = ({
  slides,
  navigation = true,
  pagination = true,
  autoplay = false,
  spaceBetween = 30,
  className,
  onSlideChange,
}: CustomSwiperProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [navigationState, setNavigationState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const autoplayConfig = useMemo(() => {
    if (!autoplay) return undefined;
    if (typeof autoplay === 'boolean') {
      return { delay: 3000, disableOnInteraction: false };
    }
    return autoplay;
  }, [autoplay]);

  const breakpointsConfig = useMemo(
    () => ({
      [BREAKPOINTS.mobile]: { slidesPerView: SLIDES_PER_VIEW.mobile },
      [BREAKPOINTS.tablet]: { slidesPerView: SLIDES_PER_VIEW.tablet },
      [BREAKPOINTS.desktop]: { slidesPerView: SLIDES_PER_VIEW.desktop },
      [BREAKPOINTS.wide]: { slidesPerView: SLIDES_PER_VIEW.wide },
    }),
    []
  );

  const updateNavigationState = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    setNavigationState({
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
    });
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      updateNavigationState();
      onSlideChange?.(swiper.activeIndex);
    },
    [updateNavigationState, onSlideChange]
  );

  const handlePrevSlide = useCallback(() => {
    if (!navigationState.isBeginning && swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, [navigationState.isBeginning]);

  const handleNextSlide = useCallback(() => {
    if (!navigationState.isEnd && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, [navigationState.isEnd]);

  const handleSwiperInit = useCallback(
    (swiper: SwiperType) => {
      swiperRef.current = swiper;
      updateNavigationState();
    },
    [updateNavigationState]
  );

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.on('slideChange', updateNavigationState);
    swiper.on('reachBeginning', updateNavigationState);
    swiper.on('reachEnd', updateNavigationState);

    return () => {
      swiper.off('slideChange', updateNavigationState);
      swiper.off('reachBeginning', updateNavigationState);
      swiper.off('reachEnd', updateNavigationState);
    };
  }, [updateNavigationState]);

  return (
    <div className={cn('custom-swiper', className)}>
      <div className="relative px-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={spaceBetween}
          loop={false}
          autoplay={autoplayConfig}
          pagination={
            pagination
              ? {
                  clickable: true,
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                }
              : undefined
          }
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          className="w-full"
          breakpoints={breakpointsConfig}
          watchSlidesProgress
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              {() => <>{slide}</>}
            </SwiperSlide>
          ))}
        </Swiper>

        {navigation && (
          <div className="hidden md:block ">
            <NavigationButton
              direction="prev"
              onClick={handlePrevSlide}
              disabled={navigationState.isBeginning}
              ariaLabel="Previous Slide"
            />
            <NavigationButton
              direction="next"
              onClick={handleNextSlide}
              disabled={navigationState.isEnd}
              ariaLabel="Next Slide"
            />
          </div>
        )}
      </div>

      {navigation && (
        <div className="flex md:hidden justify-center items-center gap-4 mt-[30px]">
          <NavigationButton
            direction="prev"
            onClick={handlePrevSlide}
            disabled={navigationState.isBeginning}
            ariaLabel="Previous Slide"
          />
          <NavigationButton
            direction="next"
            onClick={handleNextSlide}
            disabled={navigationState.isEnd}
            ariaLabel="Next Slide"
          />
        </div>
      )}
    </div>
  );
};

export default CustomSwiper;
