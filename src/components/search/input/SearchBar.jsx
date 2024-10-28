import React from 'react';
import './SearchBar.module.css';
import { TextInput, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import { toast } from 'react-toastify';


export default function SearchBar(props) {
  const theme = useMantineTheme();
  const [query, setQuery] = React.useState('');

  return (
    <TextInput
      className={classes.search}
      radius="xl"
      size="md"
      placeholder="Search courses by title"
      rightSectionWidth={42}
      value={query}
      onChange={(event) => setQuery(event.currentTarget.value)}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled"
                    onClick={() => fetchResults(props.setResults, query)}>
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      onKeyUp={e => handleKeyPress(e, props.setResults, query)}
    />
  );  
}

function fetchResults(setResults, query) {
  fetch("https://schedurator-a4fzaxeshbe9gxg8.canadacentral-01.azurewebsites.net/scheduler/courses?query=" + query)
    .then(response => response.json())
    .then(json => {
        if (json.status === "OK"){
          setResults(json.data);
        } else if (json.status === "NOT_FOUND") {
          toast.error("Could not find any courses for this query", {
            autoClose: 2000
          })
          setResults([]);
        } else if (json.status !== "BAD_REQUEST") {
          toast.error("We are have technical issues. Please try again later", {
            autoClose: 2000
          })
          setResults([]);
        } else {
          setResults([]);
        }
    })
    .catch(error => {
      toast.error("Our server is restarting. Please give us a minute", {
        autoClose: 2000
      });
      console.log(error);
    });
}

function handleKeyPress(e, setResults, query) {
  if (e.key === 'Enter') {
    fetchResults(setResults, query);
  }
}