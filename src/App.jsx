import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import classes from './App.module.css';
import React from 'react';
import { Navbar, NavbarItem } from './components/nav/Navbar';
import SearchPage from './components/search/SearchPage';
import SchedulesPage from './components/schedules/SchedulesPage';
import SavedSchedulesPage from './components/saved/SavedSchedulesPage';
import { ToastContainer, toast } from 'react-toastify';

const theme = createTheme({
  colors: {
    blue: [
      '#345280',
      '#b8b8b8',
      '#2a4874',
      '#25456e',
      '#204068',
      '#1b3962',
      '#16345c',
      '#112f56',
      '#0c2a50',
      '#07254a',
    ]
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  }
});

export default function App() {
  const [activePage, setActivePage] = React.useState(NavbarItem.Search);
  const [savedSchedules, setSavedSchedules] = React.useState([]);
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  const [schedules, setSchedules] = React.useState([]);

  React.useEffect(() => {
    const body = {};
    body.selectedCourses = {};
    Object.keys(selectedCourses).forEach(key => {
      body.selectedCourses[key] = selectedCourses[key].sections;
    });
    fetchSchedules(setSchedules, body);
  }, [selectedCourses]);

  const onScheduleView = (schedule) => {
    const savedSchedulIndex = savedSchedules.findIndex(savedSchedule => JSON.stringify(savedSchedule) === JSON.stringify(schedule))

    if (savedSchedulIndex > -1) {
      setActivePage(NavbarItem.Saved);
      setSavedSchedules(prevSchedules => {
        const newSchedules = [...prevSchedules];
        const tmp = newSchedules[0];
        newSchedules[0] = schedule;
        newSchedules[savedSchedulIndex] = tmp;
        return newSchedules;
      });
    }
  }

  const pages = {
    [NavbarItem.Search]: <SearchPage selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />,
    [NavbarItem.Schedules]: <SchedulesPage
                              selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses}
                              savedSchedules={savedSchedules} setSavedSchedules={setSavedSchedules}
                              schedules={schedules} setSchedules={setSchedules}
                              onView={onScheduleView} applyFilters={(filters) => {
                                let body = {};
                                body.selectedCourses = {};
                                Object.keys(selectedCourses).forEach(key => {
                                  body.selectedCourses[key] = selectedCourses[key].sections;
                                });
                                body = {...body, ...filters}
                                fetchSchedules(setSchedules, body)}
                              }
                            />,
    [NavbarItem.Saved]: <SavedSchedulesPage selectedCourses={selectedCourses} savedSchedules={savedSchedules} />,
    // [NavbarItem.Plugins]: <div>Plugins</div>,
    // [NavbarItem.Settings]: <div>Settings</div>,
  };

  return <MantineProvider theme={theme} classNamesPrefix={classes.MantineProviderOverride}>
    <div className={classes.App}>
      <Navbar activePage={activePage} setActivePage={setActivePage}/>
      { pages[activePage] }
      <ToastContainer />
    </div>
  </MantineProvider>
}

function fetchSchedules(setSchedules, body, ) {
  fetch("http://localhost:8000/scheduler/schedules", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(json => {
    if (json.status === "OK"){
      setSchedules(json.data);
    } else if (json.status === "NOT_FOUND") {
      toast.error("Could not find any schedules for the selected courses and sections", {
        autoClose: 2000
      })
    } else if (json.status !== "BAD_REQUEST") {
      console.log(json);
      toast.error("We are have technical issues. Please try again later", {
        autoClose: 2000
      })
    }
  })
  .catch(error => {
    setSchedules([]);
    console.log(error);
    toast.error("We are having technical issues. Please try again later", {
      autoClose: 2000
    })
  });
}