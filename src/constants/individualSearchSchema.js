import fieldTypes from './fieldTypes';

export const individualSearchCategories = {
  time: {
    name: 'time',
    labelId: 'TIME',
  },
  location: {
    name: 'location',
    labelId: 'LOCATION',
  },
  attributes: {
    name: 'attributes',
    labelId: 'ATTRIBUTES',
  },
  relationships: {
    name: 'relationships',
    labelId: 'RELATIONSHIPS',
  },
};

/* Excludes species, region and custom fields. These will be computed in
selectors based on site settings. */
export default [
  {
    name: 'sightingDateRange',
    labelId: 'SIGHTING_DATE_RANGE',
    descriptionId: 'SIGHTING_DATE_RANGE_DESCRIPTION',
    category: individualSearchCategories.time.name,
    fieldType: fieldTypes.daterange,
    defaultValue: [null, null],
  },
  {
    name: 'birthDateRane',
    labelId: 'BIRTH_DATE_RANGE',
    descriptionId: 'BIRTH_DATE_RANGE_DESCRIPTION',
    category: individualSearchCategories.time.name,
    fieldType: fieldTypes.daterange,
    defaultValue: [null, null],
  },
  {
    name: 'deathDateRange',
    labelId: 'DEATH_DATE_RANGE',
    descriptionId: 'DEATH_DATE_RANGE_DESCRIPTION',
    category: individualSearchCategories.time.name,
    fieldType: fieldTypes.daterange,
    defaultValue: [null, null],
  },
  {
    name: 'location',
    labelId: 'LOCATION',
    descriptionId: 'LOCATION_DESCRIPTION',
    category: individualSearchCategories.location.name,
    fieldType: fieldTypes.latlong,
    defaultValue: null,
  },
  {
    name: 'sex',
    labelId: 'SEX',
    category: individualSearchCategories.attributes.name,
    fieldType: fieldTypes.select,
    choices: ['male', 'female', 'non-binary', 'unknown'],
    defaultValue: null,
  },
  {
    name: 'status',
    labelId: 'STATUS',
    descriptionId: 'STATUS_DESCRIPTION',
    category: individualSearchCategories.attributes.name,
    fieldType: fieldTypes.select,
    choices: ['Alive', 'Dead', 'Unknown'],
    defaultValue: null,
  },
  {
    name: 'name_contains',
    labelId: 'NAME_CONTAINS',
    descriptionId: 'NAME_CONTAINS_DESCRIPTION',
    category: individualSearchCategories.attributes.name,
    fieldType: fieldTypes.string,
    defaultValue: '',
  },
  {
    name: 'has_media',
    labelId: 'HAS_MEDIA',
    descriptionId: 'HAS_MEDIA_DESCRIPTION',
    category: individualSearchCategories.attributes.name,
    fieldType: fieldTypes.boolean,
    defaultValue: '',
  },
  {
    name: 'max_years_between_sightings',
    labelId: 'MAX_YEARS_BETWEEN_SIGHTINGS',
    descriptionId: 'MAX_YEARS_BETWEEN_SIGHTINGS_DESCRIPTION',
    category: individualSearchCategories.attributes.name,
    fieldType: fieldTypes.comparator,
    defaultValue: null,
  },
];
