import React from 'react';
import classes from './Schedules.module.css';
import { colors } from './Schedule';

function ScheduleGrid(props) {
  return (
    <div
      className={classes.Grid}
      style={{ width: 7 * props.tdWidth, height: 48 * props.tdHeight }}
    >
      {Object.keys(props.schedule).map((courseId, courseIndex) =>
        props.schedule[courseId].schedules.map((slot, index) => (
          <div
            key={`${courseId}-${index}`}
            style={{
              gridColumn: slot.dayOfWeek,
              gridRow: `${slot.startTime / 30} / ${slot.endTime / 30}`,
              backgroundColor: colors[courseIndex],
            }}
          />
        ))
      )}
    </div>
  );
}

export default React.memo(ScheduleGrid);
