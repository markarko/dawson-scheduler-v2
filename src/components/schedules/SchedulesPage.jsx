import SelectedCourses from "../search/SelectedCourse/SelectedCourses";
import classes from './SchedulesPage.module.css';
import Schedules from './schedule/Schedules';
import React from 'react';
import Dropdown from "../search/elements/Dropdown";
import FiltersPanel, { FiltersToggleButton } from "./filters/FiltersPanel";
import { toast } from "react-toastify";
import useIsMobile from "../../hooks/UseIsMobile";
import Filters from "./filters/Filters";

const MobileZoom = {
  Small: {
    label: "Small",
    scale: 1
  },
  Large: {
    label: "Large",
    scale: 2.5
  }
}

const Zoom = {
  ...MobileZoom,
  Medium: {
    label: "Medium",
    scale: 1.5
  },
}

export default function SchedulesPage(props) {
  const [zoom, setZoom] = React.useState(Zoom.Small);
  const isMobile = useIsMobile();

  const onScheduleSave = (schedule) => {
    const scheduleExists = props.savedSchedules.some(savedSchedule => JSON.stringify(savedSchedule) === JSON.stringify(schedule));
    if (scheduleExists) {
      toast.error("This schedule is already saved", {
        autoClose: 2000
      })
    } else {
      props.setSavedSchedules([...props.savedSchedules, schedule]);
    }
  }

  return <>
    { isMobile ?
      <MobileView
        selectedCourses={props.selectedCourses}
        setSelectedCourses={props.setSelectedCourses}
        applyFilters={props.applyFilters}
        schedules={props.schedules}
        savedSchedules={props.savedSchedules}
        onScheduleSave={onScheduleSave}
        zoom={zoom}
        setZoom={setZoom}
        onView={props.onView}
      /> :
      <DesktopView
        selectedCourses={props.selectedCourses}
        setSelectedCourses={props.setSelectedCourses}
        schedules={props.schedules}
        savedSchedules={props.savedSchedules}
        onView={props.onView}
        onScheduleSave={onScheduleSave}
        zoom={zoom}
        setZoom={setZoom}
        applyFilters={props.applyFilters}
      />
    }
  </>
}

function MobileView(props) {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return <div className={classes.SchedulesPage}>
    <div className={classes.MobileActionsContainer}>
      <div className={classes.Zoom}>
        <div>Zoom</div>
        <Dropdown
          values={Object.keys(MobileZoom).map(key => Zoom[key].label)}
          onSelect={(key) => props.setZoom(Zoom[key])}
        />  
      </div>
      <FiltersToggleButton isPanelOpen={isPanelOpen} togglePanel={togglePanel}/>
    </div>

    <div className={`${classes.panelContent} ${isPanelOpen ? classes.open : ''}`}>
      <Filters selectedCourses={props.selectedCourses} applyFilters={props.applyFilters}/>
    </div>
    <div className={classes.SelectedCourses}>
      <SelectedCourses selectedCourses={props.selectedCourses} setSelectedCourses={props.setSelectedCourses} />
    </div>
    <Schedules schedules={props.schedules || []} selectedCourses={props.selectedCourses}
      zoom={props.zoom} onScheduleSave={props.onScheduleSave} savedSchedules={props.savedSchedules} onView={props.onView} />
  </div>  
}

function DesktopView(props) {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return <div className={classes.SchedulesPage}>
    <div className={classes.Filters}>
      <div className={classes.SelectedCoursesWrapper}>
        <SelectedCourses selectedCourses={props.selectedCourses} setSelectedCourses={props.setSelectedCourses} />
      </div>
      <div className={classes.RightFilters}>
        <div className={classes.Zoom}>
          <div>Zoom</div>
          <Dropdown values={Object.keys(Zoom).map(key => Zoom[key].label)} onSelect={(key) => props.setZoom(Zoom[key])} />  
        </div>
        <FiltersToggleButton isPanelOpen={isPanelOpen} togglePanel={togglePanel}/>
      </div>
    </div>
    <div className={`${classes.panelContent} ${isPanelOpen ? classes.open : ''}`}>
      <Filters selectedCourses={props.selectedCourses} applyFilters={props.applyFilters}/>
    </div>
    <Schedules schedules={props.schedules || []} selectedCourses={props.selectedCourses}
      zoom={props.zoom} onScheduleSave={props.onScheduleSave} savedSchedules={props.savedSchedules} onView={props.onView} />
  </div>
}