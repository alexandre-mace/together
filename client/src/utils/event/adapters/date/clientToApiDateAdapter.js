export default function clientToApiDateAdapter(values) {
  if (values['date'] && typeof values.date === 'string') {
    values['date'] = values['date'].replace(/\//g, '-')
  }

  return values;
}
