import React from 'react';
import classes from './FiltersPanel.module.css';
import { ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconFilter, IconArrowRight } from '@tabler/icons-react';
import Filters from './Filters';
import useIsMobile from '../../../hooks/UseIsMobile';

export default function FiltersPanel(props) {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return <div className={`${classes.filterPanel} ${isPanelOpen ? classes.open : ''}`}>
    { !isMobile && 
      <FiltersToggleButton isPanelOpen={isPanelOpen} togglePanel={togglePanel} />
    }
    <div className={classes.panelContent}>
      <Filters selectedCourses={props.selectedCourses} applyFilters={props.applyFilters}/>
    </div>
  </div>
}

export function FiltersToggleButton(props) {
  const theme = useMantineTheme();
  const isMobile = useIsMobile();

  return <ActionIcon className={`${classes.toggleButton}`} size={48} radius="xl" color={theme.primaryColor} variant="filled" onClick={props.togglePanel}>
    { props.isPanelOpen && 
      <IconArrowRight style={{ width: rem(isMobile ? 64 : 32), height: rem(isMobile ? 64 : 32) }} stroke={2} />
    }
    { !props.isPanelOpen &&
      <IconFilter style={{ width: rem(isMobile ? 64 : 32), height: rem(isMobile ? 64 : 32) }} stroke={2} />
    }
  </ActionIcon>
}