export default class Meal {
  constructor(
    title = 'Italian',
    description = 'A great meal',
    hostedBy = { _id: '5678', fullName: 'Israel Ahroni', imgUrl: 'https://randomuser.me/api/portraits/med/men/75.jpg' },
    date = Date.now(),
    price = 150,
    capacity = 8,
    cuisine = 'Italian',
    mealType = 'Dinner',
    menu = {
      firstCourse: 'Soup',
      mainSoup: 'Steak',
      desserts: ['Strawberries'],
      beverages: ['Sparkling Water', 'Softdrinks', 'Merlot'],
    },
    tags = ['Dumplings', 'Bochari'],
    location = { lat: 32.08783, lan: 34.80308, address: 'Habonim 2, Ramat Gan, Israel', city: 'Ramat-Gan', country: 'Israel' },
    imgUrls = [
      'https://www.weekend.co.il/restaurant/thumb.aspx?imgUrl=C:\\Web\\Templates\\Templates\\21501\\IMG_0347.jpg',
      'https://www.weekend.co.il/restaurant/thumb.aspx?imgUrl=C:\\Web\\Templates\\Templates\\24633\\IMG_6586.JPG',
      'https://www.weekend.co.il/restaurant/thumb.aspx?imgUrl=C:\\Web\\Templates\\Templates\\24633\\IMG_6639.JPG',
      'https://ilrosso.co.uk/8pageflip/files/mobile-ext/backGroundImgURL.jpg',
    ],
  ) {
    this.isActive = true;
    this.hostedBy = hostedBy; //needs to be a real object
    this.title = title;
    this.description = description;
    this.date = date;
    this.price = price;
    this.capacity = capacity;
    this.cuisine = cuisine; //Italian, Fusion, Middele Esteran
    this.mealType = mealType; //Dinner,Lunch,Breakfest
    this.menu = menu;
    this.tags = tags;
    this.location = location;
    this.imgUrls = imgUrls;
    this.attendees = [];
    this.reviews = [];
  }
}

/*

 {
      "_id": 1539,
      "isActive": true,
      "cuisineType": "asian",
      "mealType": "dinner",
      "title": "Dani's Chef dinner",
      "price": 215,
      "attendees": [
        {
          "_id": "5645",
          "fullName": "arkadi duchin",
          "imgUrl": "https://randomuser.me/api/portraits/med/men/75.jpg"
        },
        {
          "_id": "5649",
          "fullName": "puki shmuki",
          "imgUrl": "https://randomuser.me/api/portraits/med/men/75.jpg"
        }
      ],
      "date": 1579098102911,
      "capacity": 15,
      "tags": [
        "bochari",
        "dumplings",
        "eastern"
      ],
      "location": {
        "lat": 32.08783,
        "lan": 34.80308,
        "address": "Habonim 2, Ramat Gan, Israel",
        "city": "Ramat-Gan",
        "country": "Israel"
      },
      "imgUrls": [
        "https://www.weekend.co.il/restaurant/thumb.aspx?imgUrl=C:\\Web\\Templates\\Templates\\21501\\IMG_0347.jpg",
        "https://www.weekend.co.il/restaurant/thumb.aspx?imgUrl=C:\\Web\\Templates\\Templates\\24633\\IMG_6586.JPG",
        "https://www.weekend.co.il/restaurant/thumb.aspx?imgUrl=C:\\Web\\Templates\\Templates\\24633\\IMG_6639.JPG",
        "https://ilrosso.co.uk/8pageflip/files/mobile-ext/backGroundImgURL.jpg"
      ],
      "hostedBy": {
        "_id": "5641",
        "fullName": "israel aharoni",
        "imgUrl": "https://randomuser.me/api/portraits/med/men/75.jpg"
      },
      "description": "an amazing romantic restaurant in the heart of the busy city. a nice quiet place for two or for a family dinner close to anyplace that is interesting in the city",
      "reviews": [
        {
          "byUser": {
            "_id": "5649",
            "fullName": "puki shmuki",
            "imgUrl": "https://randomuser.me/api/portraits/med/men/75.jpg"
          },
          "txt": "had an amazing time here. definetaly recommended and will come back soon!",
          "rate": 4,
          "at": 1579098002911
        }
      ],
      "menu": {
        "firstCourse": "soup",
        "mainSoup": "steak",
        "desserts": [
          "malabi",
          "knafe"
        ],
        "beverages": [
          "coke",
          "sprite",
          "red wine"
        ]
      }
    }


*/
