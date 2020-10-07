import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { values } from 'lodash-es';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ExifIcon from '@material-ui/icons/FlashOn';

import {
  selectSightingSchema,
  selectSightingCategories,
} from '../../modules/sightings/selectors';
import { selectSiteName } from '../../modules/site/selectors';
import { getLocationSuggestion } from '../../utils/exif';
import LabeledInput from '../../components/LabeledInput';
import Button from '../../components/Button';
import InlineButton from '../../components/InlineButton';
import TermsAndConditionsDialog from './TermsAndConditionsDialog';

export default function StandardReport({
  exifData,
  variant,
  onBack,
}) {
  const intl = useIntl();
  const categories = useSelector(selectSightingCategories);
  const schema = useSelector(selectSightingSchema);
  const siteName = useSelector(selectSiteName);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [exifButtonClicked, setExifButtonClicked] = useState(false);
  const [acceptEmails, setAcceptEmails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [incompleteFields, setIncompleteFields] = useState([]);
  const [termsError, setTermsError] = useState(false);
  const categoryList = values(categories);

  const [formValues, setFormValues] = useState(
    schema.reduce((memo, field) => {
      memo[field.name] = field.defaultValue;
      return memo;
    }, {}),
  );

  const locationSuggestion = useMemo(
    () => getLocationSuggestion(exifData),
    [exifData],
  );

  const showErrorAlertBox = incompleteFields.length > 0 || termsError;

  return (
    <>
      <TermsAndConditionsDialog
        visible={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <Grid item>
        <Button
          onClick={onBack}
          style={{ marginTop: 8 }}
          display="back"
        >
          <FormattedMessage id="BACK_TO_PHOTOS" />
        </Button>
      </Grid>
      <Grid item>
        {categoryList.map(category => {
          const inputsInCategory = schema.filter(
            f => f.category === category.name,
          );

          if (variant === 'multiple' && category.individualFields)
            return null;

          const showExifData =
            category.name === 'location' &&
            locationSuggestion &&
            !exifButtonClicked;

          return (
            <div key={category.name}>
              <div style={{ marginLeft: 12 }}>
                <Typography variant="h6" style={{ marginTop: 20 }}>
                  <FormattedMessage id={category.labelId} />
                </Typography>
                {category.descriptionId && (
                  <Typography
                    variant="subtitle2"
                    style={{ marginBottom: 12 }}
                  >
                    <FormattedMessage id={category.descriptionId} />
                  </Typography>
                )}
              </div>
              <Paper
                elevation={2}
                style={{
                  marginTop: 20,
                  marginBottom: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {showExifData && (
                  <Alert
                    style={{ marginTop: 24 }}
                    icon={<ExifIcon />}
                    action={
                      <Button
                        display="panel"
                        size="small"
                        onClick={() => {
                          setFormValues({
                            ...formValues,
                            location: locationSuggestion,
                          });
                          setExifButtonClicked(true);
                        }}
                      >
                        <FormattedMessage id="AUTOFILL_FIELDS" />
                      </Button>
                    }
                  >
                    <AlertTitle>
                      <FormattedMessage id="IMAGE_METADATA_DETECTED" />
                    </AlertTitle>
                    <FormattedMessage id="LOCATION_METADATA_DETECTED" />
                  </Alert>
                )}
                {inputsInCategory.map(input => (
                  <div
                    key={`${category.name} - ${input.name}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: 20,
                        minWidth: 200,
                        maxWidth: 400,
                      }}
                    >
                      <Typography>
                        <FormattedMessage id={input.labelId} />
                        {input.required && ' *'}
                      </Typography>
                      {input.descriptionId && (
                        <Typography variant="caption">
                          <FormattedMessage
                            id={input.descriptionId}
                          />
                        </Typography>
                      )}
                    </div>
                    <LabeledInput
                      minimalLabels
                      schema={input}
                      value={formValues[input.name]}
                      onChange={value => {
                        setFormValues({
                          ...formValues,
                          [input.name]: value,
                        });
                      }}
                      width={220}
                    />
                  </div>
                ))}
              </Paper>
            </div>
          );
        })}
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptEmails}
              onChange={() => setAcceptEmails(!acceptEmails)}
            />
          }
          label={
            <FormattedMessage
              id="ONE_SIGHTING_EMAIL_CONSENT"
              values={{ siteName }}
            />
          }
        />
      </Grid>
      <Grid item style={{ marginBottom: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
          }
          label={
            <span>
              <FormattedMessage id="TERMS_CHECKBOX_1" />
              <InlineButton onClick={() => setDialogOpen(true)}>
                <FormattedMessage id="TERMS_CHECKBOX_2" />
              </InlineButton>
              <FormattedMessage id="END_OF_SENTENCE" />
            </span>
          }
        />
      </Grid>
      {showErrorAlertBox && (
        <Grid item style={{ marginBottom: 12 }}>
          <Alert severity="error">
            <AlertTitle>
              <FormattedMessage id="SUBMISSION_ERROR" />
            </AlertTitle>
            {termsError && (
              <p style={{ margin: '4px 0' }}>
                <FormattedMessage id="TERMS_ERROR" />
              </p>
            )}
            {incompleteFields.map(incompleteField => (
              <p
                style={{ margin: '4px 0' }}
                key={incompleteField.name}
              >
                <FormattedMessage
                  id="INCOMPLETE_FIELD"
                  values={{
                    fieldName: intl.formatMessage({
                      id: incompleteField.labelId,
                    }),
                  }}
                />
              </p>
            ))}
          </Alert>
        </Grid>
      )}
      <Grid
        item
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 12,
        }}
      >
        <Button
          onClick={() => {
            // check that required fields are complete
            const nextIncompleteFields = schema.filter(
              field =>
                field.required &&
                field.defaultValue === formValues[field.name],
            );
            setIncompleteFields(nextIncompleteFields);

            // check that terms and conditions were accepted
            setTermsError(!acceptedTerms);

            if (nextIncompleteFields.length === 0 && acceptedTerms) {
              console.log('Time to report the sighting');
              setLoading(true);
              setTimeout(() => {
                console.log('Sighting submitted');
                setLoading(false);
              }, 150000);
            }
          }}
          style={{ width: 200 }}
          loading={loading}
          display="primary"
        >
          <FormattedMessage id="REPORT_SIGHTING" />
        </Button>
      </Grid>
    </>
  );
}
