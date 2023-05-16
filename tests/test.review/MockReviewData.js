/* eslint-env jest */
export const mockProductReviews = {
  product: '40344',
  page: 0,
  count: 2,
  results: [
    {
      review_id: 1279637,
      rating: 4,
      summary: 'asdfasfasd',
      recommend: true,
      response: null,
      body: 'asdasdasdasdasdasdasdasdasdasdasdasdsasdsasdsasdsasd',
      date: '2023-04-23T00:00:00.000Z',
      reviewer_name: 'testbot',
      helpfulness: 1,
      photos: [],
    },
    {
      review_id: 1279590,
      rating: 1,
      summary: 'Summary text of the review',
      recommend: false,
      response: null,
      body: 'Continued or full text of the review',
      date: '2023-04-10T00:00:00.000Z',
      reviewer_name: 'reksa',
      helpfulness: 0,
      photos: [
        {
          id: 2458647,
          url: 'url1',
        },
        {
          id: 2458648,
          url: 'url2',
        },
      ],
    },
    {
      review_id: 1279638,
      rating: 4,
      summary: 'asdfasfasd',
      recommend: true,
      response: null,
      body: 'asdasdasdasdasdasdasdasdasdasdasdasdsasdsasdsasdsasd',
      date: '2023-04-23T00:00:00.000Z',
      reviewer_name: 'testbot',
      helpfulness: 1,
      photos: [],
    },
    {
      review_id: 1279639,
      rating: 4,
      summary: 'asdfasfasd',
      recommend: true,
      response: null,
      body: 'asdasdasdasdasdasdasdasdasdasdasdasdsasdsasdsasdsasd',
      date: '2023-04-23T00:00:00.000Z',
      reviewer_name: 'testbot',
      helpfulness: 1,
      photos: [],
    },
  ],
};

export const mockMetaData = {
  product_id: '40344',
  ratings: {
    1: '139',
    2: '201',
    3: '316',
    4: '301',
    5: '668',
  },
  recommended: {
    false: '418',
    true: '1207',
  },
  characteristics: {
    Fit: {
      id: 135219,
      value: '3.3014705882352941',
    },
    Length: {
      id: 135220,
      value: '3.3251072961373391',
    },
    Comfort: {
      id: 135221,
      value: '3.3782559456398641',
    },
    Quality: {
      id: 135222,
      value: '3.3322222222222222',
    },
  },
};

export const mockCharacteristics = {
  comfort: { id: 135221, value: '3.3547334058759521' },
  Fit: { id: 135219, value: '3.2741935483870968' },
  Length: { id: 135220, value: '3.3130165289256198' },
  Quality: { id: 135222, value: '3.3222698072805139' },
};

export const globalContextMock = {
  id: 40344,
  campus: 'hr-rfp',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  created_at: '2021-08-13T14:38:44.509Z',
  updated_at: '2021-08-13T14:38:44.509Z',
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
};
