import { Carousel } from '@mantine/carousel';
import classes from './CardsCarousel.module.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import SavedSchedule from '../schedule/SavedSchedule';
import useIsMobile from '../../../hooks/UseIsMobile';

export default function CardsCarousel(props) {
  const isMobile = useIsMobile();

  if (!props.savedSchedules.length) {
    return <div></div>
  }
  
	return (
		<Carousel
			className={classes.control}
			slideGap="md"
			draggable={isMobile}
			controlSize={64}
			>
      { props.savedSchedules.map((savedSchedule, i) => {
        return <Carousel.Slide key={i} style={{ display: "flex", alignItems: "center"}}>
				  <SavedSchedule selectedCourses={props.selectedCourses} savedSchedule={savedSchedule} />
			  </Carousel.Slide>
      })}
		</Carousel>
	);
  }