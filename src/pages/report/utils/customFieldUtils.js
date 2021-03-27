import { get } from 'lodash-es';

export function getCustomFields(siteSettings, property) {
  return get(
    siteSettings,
    [
      'data',
      `site.custom.customFields.${property}`,
      'value',
      'definitions',
    ],
    [],
  );
}

export function deriveCustomFieldSchema(
  siteSettings,
  fieldPath,
  categoryPath,
) {
  const customFields = getCustomFields(siteSettings, fieldPath);
  console.log(siteSettings);
  const allCategories = get(
    siteSettings,
    ['data', 'site.custom.customFieldCategories', 'value'],
    [],
  );
  const categories = allCategories.filter(
    c => c.type === categoryPath,
  );
  const schema = customFields.map(customField => {
    const result = {
      ...get(customField, 'schema', {}),
      fieldType: get(customField, ['schema', 'displayType']),
      defaultValue: get(customField, 'defaultValue', null),
      ...customField,
    };

    delete result.schema;
    delete result.displayType;
    return result;
  });

  return {
    schema,
    categories,
  };
}
