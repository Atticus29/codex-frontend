import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { get } from 'lodash-es';

import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Backdrop from '@material-ui/core/Backdrop';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/FilterList';

import { formatDate } from '../../utils/formatters';
import useQueryIndividuals from '../../models/individual/useQueryIndividuals';
import Button from '../Button';
import Text from '../Text';
import Link from '../Link';

export default function IndividualsButton() {
  const intl = useIntl();
  const theme = useTheme();
  const title = intl.formatMessage({ id: 'INDIVIDUALS' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: searchResults,
    queryIndividuals,
  } = useQueryIndividuals();

  function onKeyUp(e) {
    if (e.key === 'Enter' && searchTerm !== '') {
      queryIndividuals(searchTerm);
    }
  }

  useEffect(
    () => {
      document.addEventListener('keyup', onKeyUp);
      return () => {
        document.removeEventListener('keyup', onKeyUp);
      };
    },
    [searchTerm],
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mappableSearchResults = searchResults || [];

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        display="primary"
        onClick={handleClick}
        style={{
          backgroundColor: theme.palette.grey.A100,
          color: theme.palette.grey.A400,
          marginLeft: 8,
        }}
        startIcon={<SearchIcon />}
      >
        {title}
      </Button>
      <Backdrop open={open} />
      <Popover
        marginThreshold={0}
        onClose={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: 600,
            borderRadius: 20,
            backgroundColor: theme.palette.grey['200'],
            paddingBottom: 20,
          },
        }}
      >
        <TextField
          style={{ padding: 16 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            disableUnderline: true,
            autoFocus: true,
            placeholder:
              'Search for an individual by name, alias, or guid',
          }}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
          fullWidth
        />
        {searchResults && <Divider />}
        <List dense>
          {mappableSearchResults.map(result => {
            const resultId = get(result, 'id');
            const nameString = `${get(result, 'name')} (${get(
              result,
              'alias',
            )})`;
            const avatarLetter = get(
              result,
              'alias',
              '-',
            )[0].toUpperCase();
            const dateString = `Last seen ${formatDate(
              get(result, 'last_sighting'),
              true,
            )}`;
            return (
              <ListItem key={resultId}>
                <ListItemAvatar>
                  <Avatar>{avatarLetter}</Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Link
                      onClick={handleClose}
                      href={`/individuals/${resultId}`}
                      noUnderline
                    >
                      {nameString}
                    </Link>
                  }
                  secondary={
                    <Text variant="caption">{dateString}</Text>
                  }
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Link
          onClick={handleClose}
          href="/individuals"
          noUnderline
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 0 0 16px',
          }}
        >
          <ExploreIcon fontSize="small" />
          <Text
            style={{
              paddingLeft: 8,
              color: theme.palette.text.secondary,
            }}
            id="EXPLORE_INDIVIDUALS"
          />
        </Link>
      </Popover>
    </div>
  );
}
