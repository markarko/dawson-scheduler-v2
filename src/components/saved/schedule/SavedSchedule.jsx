import React from 'react';
import classes from './SavedSchedules.module.css';
import useIsMobile from '../../../hooks/UseIsMobile';

export const colors = ['#7697a0', '#f0c27b', '#8a9a5b', '#e2d2c1', '#846c5b', '#bdb4a5', '#ff6f61'];

export default function SavedSchedule(props) {
  const isMobile = useIsMobile();
  const mobileWeekDays = ['Mon', 'Tue', 'Web', 'Thu', 'Fri'];

  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hoursInDay = 24;
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const tbodyRef = React.useRef(null);

  React.useEffect(() => {
    if (tbodyRef.current) {
      const height = tbodyRef.current.clientHeight;
      const width = tbodyRef.current.clientWidth;
      setDimensions({ width, height });
    }

    const handleResize = () => {
      if (tbodyRef.current) {
        setDimensions({
          width: tbodyRef.current.clientWidth,
          height: tbodyRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return <table className={classes.SavedSchedule}>
    <div className={classes.THeadDiv}>
      <thead>
        <tr>
          <th></th>
          {(isMobile ? mobileWeekDays : weekDays).map((day) => <th>{day}</th>)}  
        </tr>
      </thead>
    </div>
    <div className={classes.TBodyDiv}>
      <div className={classes.Grid} style={{ width: dimensions.width, height: dimensions.height}}>
        {
          Object.keys(props.savedSchedule).map((courseId, courseIndex) => props.savedSchedule[courseId].schedules.map(schedule => {
            return (
              <div key={JSON.stringify(schedule)} style={{
                gridColumn: schedule.dayOfWeek - 1,
                gridRow: `${(schedule.startTime - (60 * 7)) / 15 + 1} / ${(schedule.endTime - (60 * 7)) / 15 + 1}`,
                backgroundColor: colors[courseIndex % colors.length],
                color: "white",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: `${isMobile ? "5px" : "15px"}`,
                outline: "2px solid #07254a",
                overflowWrap: "break-word",
                hyphens: "manual"
              }}>
                { isMobile ?
                  <div>{courseId.split("-").map(line => <div key={line}>{line}</div>)}</div> :
                  <div>{courseId}</div>
                }
                { !isMobile &&
                  <>
                    <div>{props.savedSchedule[courseId].section}</div>
                    <div>{schedule.location}</div>
                  </>
                }

              </div>
            )
          }))
        }
      </div>
      <tbody ref={tbodyRef}>
        {[Array.from({ length: hoursInDay }, (_, i) => i).slice(isMobile ? 7 : 0).map(hour => {
          return <tr key={hour}>
            <td>{hoursTo12HourClockTime(hour, isMobile)}</td>
            {(isMobile ? mobileWeekDays : weekDays).map(() => <td></td>)}
          </tr>
        })]}
      </tbody>
    </div>
  </table>
}

function hoursTo12HourClockTime(hours, isMobile) {
  if (isMobile) {
    return `${hours}:00`;
  }

  if (hours === 0) {
    return '12:00 AM';
  } else if (hours < 12) {
    return `${hours}:00 AM`;
  } else if (hours === 12) {
    return '12:00 PM';
  } else {
    return `${hours - 12}:00 PM`;
  }
}