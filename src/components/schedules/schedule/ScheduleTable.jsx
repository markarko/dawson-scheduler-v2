import React from 'react';
import classes from './Schedules.module.css';

function ScheduleTable({ tdHeight, tdWidth }) {
  const numHoursInDay = 24;
  const slotsPerHour = 2; // 30-minute slots per hour
  const daysInWeek = 7;
  const verticalTableSlots = Array.from({ length: numHoursInDay * slotsPerHour });
  const horizontalTableSlots = Array.from({ length: daysInWeek });

  return (
    <table className={classes.TableSchedule}>
      <tbody>
        {verticalTableSlots.map((_, rowIndex) => (
          <tr key={rowIndex}>
            {horizontalTableSlots.map((_, colIndex) => (
              <td
                key={colIndex}
                className={classes.TableScheduleTd}
                style={{ width: tdWidth, height: tdHeight }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(ScheduleTable);
