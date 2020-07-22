import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { get, uniqBy } from 'lodash-es';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { selectSiteSettings } from '../../modules/site/selectors';
import siteSettingsSchema from '../../constants/siteSettingsSchema';
import LabeledInput from '../../components/LabeledInput';
import Button from '../../components/Button';
import useSiteSettings from '../../models/site/useSiteSettings';
import usePutSiteSettings from '../../models/site/putSiteSettings';

function getFieldsetErrors(intl, fieldset, fieldsetName) {
  const noLabelFields = fieldset.filter(field => field.label === '');
  const noValueFields = fieldset.filter(field => field.label === '');
  const sameLabels =
    uniqBy(fieldset, 'label').length !== fieldset.length;
  const sameValues =
    uniqBy(fieldset, 'value').length !== fieldset.length;

  const errors = [];
  if (noLabelFields.length > 0)
    errors.push(
      intl.formatMessage(
        { id: 'CUSTOM_FIELD_NO_LABEL_ERROR' },
        { fieldsetName },
      ),
    );
  if (noValueFields.length > 0)
    errors.push(
      intl.formatMessage(
        { id: 'CUSTOM_FIELD_NO_VALUE_ERROR' },
        { fieldsetName },
      ),
    );
  if (sameLabels)
    errors.push(
      intl.formatMessage(
        { id: 'CUSTOM_FIELD_SAME_LABEL_ERROR' },
        { fieldsetName },
      ),
    );
  if (sameValues)
    errors.push(
      intl.formatMessage(
        { id: 'CUSTOM_FIELD_SAME_VALUE_ERROR' },
        { fieldsetName },
      ),
    );

  return errors;
}

export default function SiteSettings({ primaryButtonId }) {
  const intl = useIntl();
  const siteSettings = useSelector(selectSiteSettings);
  const newSiteSettings = useSiteSettings();
  const putSiteSettings = usePutSiteSettings();

  const [siteName, setSiteName] = useState('');

  const siteNameSetting = newSiteSettings.data
    ? newSiteSettings.data.find(setting => setting.id === 'site.name')
    : null;
  const edmSiteName = get(siteNameSetting, 'value', '');
  useEffect(
    () => {
      setSiteName(edmSiteName);
    },
    [edmSiteName],
  );

  const [submissionAttempted, setSubmissionAttempted] = useState(
    false,
  );

  const [formValues, setFormValues] = useState(
    siteSettingsSchema.reduce((memo, field) => {
      memo[field.name] = siteSettings[field.name];
      return memo;
    }, {}),
  );

  const sightingErrors = getFieldsetErrors(
    intl,
    formValues.sightingFields,
    intl.formatMessage({ id: 'CUSTOM_SIGHTING_FIELD_LABEL' }),
  );
  const individualErrors = getFieldsetErrors(
    intl,
    formValues.individualFields,
    intl.formatMessage({ id: 'CUSTOM_INDIVIDUAL_FIELD_LABEL' }),
  );

  const errors = [...sightingErrors, ...individualErrors];

  return (
    <Grid container direction="column" style={{ marginTop: 40 }}>
      <Grid
        onClick={() => setSubmissionAttempted(false)}
        item
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            style={{
              marginTop: 20,
            }}
            variant="subtitle1"
          >
            <FormattedMessage id="SITE_NAME" />
          </Typography>
          <Typography
            style={{
              marginTop: 4,
            }}
          >
            <FormattedMessage id="SITE_NAME_DESCRIPTION" />
          </Typography>
        </div>
        <div
          style={{
            marginTop: 24,
            marginLeft: 80,
            width: 400,
            minWidth: 400,
          }}
        >
          <LabeledInput
            schema={{
              labelId: 'SITE_NAME',
              descriptionId: 'SITE_NAME_DESCRIPTION',
              fieldType: 'string',
            }}
            minimalLabels
            value={siteName}
            onChange={value => {
              setSiteName(value);
            }}
          />
        </div>
      </Grid>
      {siteSettingsSchema.map(settingSchema => {
        if (settingSchema.hidden) return null;

        return (
          <Grid
            onClick={() => setSubmissionAttempted(false)}
            key={settingSchema.name}
            item
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                style={{
                  marginTop: 20,
                }}
                variant="subtitle1"
              >
                <FormattedMessage id={settingSchema.labelId} />
                {settingSchema.required && ' *'}
              </Typography>
              <Typography
                style={{
                  marginTop: 4,
                }}
              >
                <FormattedMessage id={settingSchema.descriptionId} />
              </Typography>
            </div>
            <div
              style={{
                marginTop: 24,
                marginLeft: 80,
                width: 400,
                minWidth: 400,
              }}
            >
              <LabeledInput
                schema={settingSchema}
                minimalLabels
                value={formValues[settingSchema.name]}
                onChange={value => {
                  setFormValues({
                    ...formValues,
                    [settingSchema.name]: value,
                  });
                }}
                dark={
                  settingSchema.name === 'darkBackgroundLogo'
                    ? true
                    : undefined
                }
              />
            </div>
          </Grid>
        );
      })}
      <Grid
        item
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 28,
        }}
      >
        {submissionAttempted && (
          <div>
            {errors.map(error => (
              <Typography style={{ color: '#DC2113' }}>
                {error}
              </Typography>
            ))}
          </div>
        )}
        <Button
          onClick={() => {
            setSubmissionAttempted(true);
            putSiteSettings({
              'site.name': siteName,
            });
          }}
          style={{ marginTop: 12 }}
          display="primary"
        >
          <FormattedMessage id={primaryButtonId} />
        </Button>
      </Grid>
    </Grid>
  );
}
