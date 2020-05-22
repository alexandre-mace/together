export default function clientToApiDateAdapter(values) {
  if (values['maxPlaces'] && typeof values.maxPlaces === 'string') {
    values['maxPlaces'] = parseInt(values['maxPlaces'])
  }

  return values;
}
