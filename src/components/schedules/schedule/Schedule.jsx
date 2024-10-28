import React from 'react';
import classes from './Schedules.module.css';
import { useGridConfig } from './GridConfig';
import ScheduleTable from './ScheduleTable';
import ScheduleGrid from './ScheduleGrid';
import ActionButtons from './ActionButtons';

export const colors = ['#7697a0', '#f0c27b', '#8a9a5b', '#e2d2c1', '#846c5b', '#bdb4a5', '#ff6f61'];

function Schedule(props) {
  const gridConfigs = useGridConfig(props.zoom.scale);

  const isScheduleSaved = React.useMemo(() => 
    props.savedSchedules.some(saved => JSON.stringify(saved) === JSON.stringify(props.schedule)), 
    [props.savedSchedules, props.schedule]
  );

  if (!props.schedule) return <div></div>;

  return (
    <div
      className={classes.FlipCard}
      style={{
        width: 7 * gridConfigs.tdWidth + 1,
        height: 48 * gridConfigs.tdHeight + 1,
        visibility: props.hide ? "hidden" : "visible"
      }}
    >
      <div className={classes.FlipCardInner}>
        <div className={classes.ScheduleFront}>
          <div className={classes.Table}>
            <ScheduleTable tdHeight={gridConfigs.tdHeight} tdWidth={gridConfigs.tdWidth} />
            <ScheduleGrid schedule={props.schedule} tdHeight={gridConfigs.tdHeight} tdWidth={gridConfigs.tdWidth} />
          </div>
        </div>
        <div className={classes.ScheduleBack}>
          <ActionButtons onSave={props.onScheduleSave} onView={props.onView} isSaved={isScheduleSaved} schedule={props.schedule}/>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Schedule, (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});