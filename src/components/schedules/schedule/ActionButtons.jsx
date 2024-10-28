import React from 'react';
import { Button } from '@mantine/core';
import classes from './Schedules.module.css';

function ActionButtons(props) {
  return (
    <div className={classes.ActionButtons}>
      <Button className={classes.ActionButton} onClick={() => props.onSave(props.schedule)}>
        <div>{props.isSaved ? "Saved" : "Save"}</div>
      </Button>
      <Button className={classes.ActionButton} disabled={!props.isSaved} onClick={() => props.onView(props.schedule)}>
        <div>View</div>
      </Button>
    </div>
  );
}

export default React.memo(ActionButtons);
