let data = {
    "events": [
      {
        "event": {
          "id": 1297989,
          "title": "Portal",
          "url": "",
          "updated_at": "2018-06-18T11:55:45-04:00",
          "created_at": "2018-05-24T14:50:09-04:00",
          "facebook_id": null,
          "first_date": "2018-08-23",
          "last_date": "2018-11-09",
          "hashtag": "",
          "urlname": "portal",
          "user_id": 67244,
          "directions": "",
          "allows_reviews": true,
          "allows_attendance": true,
          "location": "",
          "room_number": "",
          "location_name": "Olin Library",
          "created_by": 67244,
          "updated_by": 9224,
          "city_id": null,
          "neighborhood_id": null,
          "school_id": 10,
          "campus_id": null,
          "recurring": true,
          "free": true,
          "private": false,
          "verified": true,
          "rejected": false,
          "sponsored": false,
          "venue_id": 7901,
          "ticket_url": "",
          "ticket_cost": "",
          "keywords": [],
          "tags": [],
          "description_text": "The gold-painted shipping container equipped with innovative audiovisual technology and life-sized screens allows for serendipitous and spontaneous conversations with other Portals around the world. The Cornell Portal will be located outside Olin Library, on the side facing the Arts Quad. Classes, groups and individuals can sign up to use it, and the Center for Teaching Innovation and Office of Engagement Initiatives can help faculty prepare impactful class programming in advance.\n\nThe portal is being coordinated by Cornell University Library and sponsored by the Office of the Vice Provost for International Affairs and the Office of Engagement Initiatives.",
          "photo_id": 677227,
          "detail_views": 70,
          "event_instances": [
            {
              "event_instance": {
                "id": 3651351,
                "ranking": 0,
                "event_id": 1297989,
                "start": "2018-08-23T00:00:00-04:00",
                "end": null,
                "all_day": true
              }
            }
          ],
          "address": "Olin Library, Ithaca, NY 14850, USA",
          "description": "<p>The gold-painted shipping container equipped with innovative audiovisual technology and life-sized screens allows for serendipitous and spontaneous conversations with other Portals around the world. The Cornell Portal will be located outside Olin Library, on the side facing the Arts Quad. Classes, groups and individuals can sign up to use it, and the Center for Teaching Innovation and Office of Engagement Initiatives can help faculty prepare impactful class programming in advance.</p>\r\n\r\n<p>The portal is being coordinated by Cornell University Library and sponsored by the <a href=\"https://global.cornell.edu/about/office-vice-provost-international-affairs\">Office of the Vice Provost for International Affairs</a> and <a href=\"http://oei.engaged.cornell.edu/\">the Office of Engagement Initiatives</a>.</p>\r\n",
          "featured": false,
          "geo": {
            "latitude": "42.447777",
            "longitude": "-76.484535",
            "street": "Olin Library",
            "city": "Ithaca",
            "state": "NY",
            "country": "US",
            "zip": "14850"
          },
          "filters": {
            "departments": [
              {
                "name": "Cornell University Library",
                "id": 4205
              },
              {
                "name": "Center for Teaching Innovation (CTI)",
                "id": 14006
              },
              {
                "name": "Engaged Cornell",
                "id": 47217
              },
              {
                "name": "Office of Engagement Initiatives",
                "id": 90875
              },
              {
                "name": "Global Cornell",
                "id": 42838
              }
            ],
            "event_types": [
              {
                "name": "Cultural",
                "id": 4254
              },
              {
                "name": "Special Event",
                "id": 4270
              }
            ]
          },
          "custom_fields": {
            "contact_email": "portal@cornell.edu",
            "contact_name": "Jessica Withers",
            "contact_phone": "607-255-8045",
            "open_to": "public"
          },
          "localist_url": "http://events.cornell.edu/event/portal",
          "localist_ics_url": "http://events.cornell.edu/event/portal.ics",
          "photo_url": "http://images-cf.localist.com/photos/677227/huge/71951671301e64b0ee348d9d96072974d17b7375.jpg",
          "venue_url": "http://events.cornell.edu/olin_library"
        }
      }
    ],
    "page": {
      "current": 1,
      "size": 100,
      "total": 1
    },
    "date": {
      "first": "2018-07-03",
      "last": "2019-07-03"
    }
  }

  export let findAll = () => new Promise(resolve => resolve(data));