const mapStyles = [
    {width: '100%', height: '100%', position: 'absolute'},
    {elementType: 'geometry', stylers: [{color: '#445072'}]},
    {elementType: 'labels.text.stroke', stylers: [{"visibility": "off"}]},
    {elementType: 'labels.text.fill', stylers: [{"visibility": "off"}]},
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9799A8'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#1A1E37'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{"visibility": "off"}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{"visibility": "off"}]
    }
  ];

  const deliveredGradient = [
    'rgba(69, 220, 229, 0)',
    'rgba(69, 220, 229, 1)',
    'rgba(69, 220, 229, 1)',
    'rgba(69, 220, 229, 1)',
    'rgba(69, 220, 229, 1)',
    'rgba(69, 220, 229, 1)',
    'rgba(69, 220, 229, 1)',
  ]

  const OFDgradient = [
    'rgba(255, 148, 110, 0)',
    'rgba(255, 148, 110, 1)',
    'rgba(255, 148, 110, 1)',
    'rgba(255, 148, 110, 1)',
    'rgba(255, 148, 110, 1)',
    'rgba(255, 148, 110, 1)',
    'rgba(255, 148, 110, 1)',
  ]

  const inTransitGradient = [
    'rgba(100, 95, 232, 0)',
    'rgba(100, 95, 232, 1)',
    'rgba(100, 95, 232, 1)',
    'rgba(100, 95, 232, 1)',
    'rgba(100, 95, 232, 1)',
    'rgba(100, 95, 232, 1)',
    'rgba(100, 95, 232, 1)',
  ]

  const ExceptionGradient = [
    'rgba(230, 70, 136, 0)',
    'rgba(230, 70, 136, 1)',
    'rgba(230, 70, 136, 1)',
    'rgba(230, 70, 136, 1)',
    'rgba(230, 70, 136, 1)',
    'rgba(230, 70, 136, 1)',
    'rgba(230, 70, 136, 1)',
  ]

export {
    mapStyles,
    deliveredGradient,
    OFDgradient,
    inTransitGradient,
    ExceptionGradient
}