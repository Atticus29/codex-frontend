import React, { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { get, capitalize } from 'lodash-es';

import Grid from '@material-ui/core/Grid';
import CustomAlert from '../../components/Alert';

import usePutSiteSettings from '../../models/site/usePutSiteSettings';
import DataDisplay from '../../components/dataDisplays/DataDisplay';
import ActionIcon from '../../components/ActionIcon';
import Text from '../../components/Text';
import SpeciesEditor from '../fieldManagement/settings/defaultFieldComponents/SpeciesEditor'; // TODO UserEditor

const testData = [
  {
    id: 'user1',
    backendPath: 'site.species', // TODO
    userId: 'user1',
    fullName: 'User 1',
    Editor: SpeciesEditor, // TODO
  },
  {
    id: 'user2',
    backendPath: 'site.custom.regions',
    userId: 'user2',
    fullName: 'User 2',
    Editor: SpeciesEditor, // TODO
  },
  {
    id: 'user3',
    backendPath: 'site.general.relationships',
    userId: 'user3',
    fullName: 'User 3',
    Editor: SpeciesEditor, // TODO
  },
];

function getInitialFormState(siteSettings) {
  const regions = get(siteSettings, ['site.custom.regions', 'value']);
  const species = get(siteSettings, ['site.species', 'value'], []);
  const relationships = get(
    siteSettings,
    ['site.general.relationships', 'value'],
    [],
  );

  return { regions, species, relationships };
}

export default function DefaultFieldTable({
  siteSettings,
  siteSettingsVersion,
}) {
  const intl = useIntl();
  const [formSettings, setFormSettings] = useState(null);
  const [editField, setEditField] = useState(null);
  const { putSiteSetting, error, setError } = usePutSiteSettings();

  useEffect(
    () => setFormSettings(getInitialFormState(siteSettings)),
    [siteSettingsVersion],
  );

  const tableColumns = [
    {
      name: 'userId',
      label: intl.formatMessage({ id: 'USER' }),
      options: {
        customBodyRender: userId => (
          <Text variant="body2">{ userId }</Text>
        ),
      },
    },
    {
      name: 'fullName',
      label: intl.formatMessage({ id: 'FULLNAME' }),
      options: {
        customBodyRender: fullName => (
          <Text variant="body2">{ fullName }</Text>
        ),
      },
    },
    {
      name: 'actions',
      label: intl.formatMessage({ id: 'ACTIONS' }),
      options: {
        customBodyRender: (_, field) => (
          <div>
            <ActionIcon
              variant="edit"
              onClick={() => {
                setEditField(field);
              }}
            />
            <ActionIcon
              variant="delete"
              onClick={() => {
                setEditField(field);
              }}
            />
          </div>
        ),
      },
    },
  ];

  const onCloseEditor = () => {
    setError(null);
    setEditField(null);
  };

  return (
    <Grid item>
      {editField && (
        <editField.Editor
          siteSettings={siteSettings}
          formSettings={formSettings}
          setFormSettings={setFormSettings}
          onClose={() => {
            setFormSettings(getInitialFormState(siteSettings));
            onCloseEditor();
          }}
          onSubmit={() => {
            if (editField.id === 'region') {
              putSiteSetting(
                editField.backendPath,
                formSettings.regions,
              ).then(success => {
                if (success) onCloseEditor();
              });
            }
            if (editField.id === 'species') {
              putSiteSetting(
                editField.backendPath,
                formSettings.species,
              ).then(success => {
                if (success) onCloseEditor();
              });
            }
          }}
        >
          {error ? (
            <CustomAlert
              style={{ margin: '20px 0 12px 0', maxWidth: 600 }}
              severity="error"
              description={error}
            />
          ) : null}
        </editField.Editor>
      )}
      <DataDisplay
        style={{ marginTop: 8 }}
        noTitleBar
        variant="secondary"
        columns={tableColumns}
        data={testData}
      />
    </Grid>
  );
}
