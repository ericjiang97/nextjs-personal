---
title: monPlan Beta Release
author: Eric Jiang <eric@ericjiang.dev>
date: '2018-02-09T00:00:00+1000'
summary: Today, we are excited to announce the release of v2018.0.0. This release launches 🚀 us out of Alpha into Beta.
tags: ['announcements']
category: 'MonPlan'
coverImageUrl: 'https://miro.medium.com/max/700/0*3vleLVUj9o0e6gY_.'
---

Today, we are excited to announce the release of v2018.0.0. This release launches 🚀 us out of Alpha into Beta.

### Performance Increases

We have migrated our backend to the Australian region, meaning faster load times (334 ms to load a unit compared to 1.04s previously), a increase of around 70%! ⏩💯

This means, we can deliver faster content to the majority of our users, ensuring faster and smoother transactions.

### Unit Search Engine

Working with another project — _Smart Electives_ has allowed us utilise a better search engine. We are using a system like Google which allows us to search better. Whether its searching ambiguous things from modern culture, all the way to rocket science, we’ve got you fam. 👪

![unit search](/images/blog/monplan-beta-and-v2018-0-0-release/1_Phk7QLWhtDzCgmjira6MBw.png)

### More Mobile Friendly 📱 and Responsive 💻 then Ever Before

![mobile](/images/blog/monplan-beta-and-v2018-0-0-release/1_Ck_Bg02UAHnubIfyRi3LsA.png)

After looking at our user traffic we have decided to make our app more mobile friendly then before, with semester on the sidebar, as well as clearer shortcuts on the toolbar. But, we still recommend you to use a laptop.

- Semester/Teaching Periods are now on the left of the units which belong in that teaching period
- Icons are now display on the top of the sidebar
- Adding Units are now done directly inside the teaching period or via the unit place holder
- Unit Size (by Credit Points) resize per teaching period (not whole)

### Printing, Emailing your Course Plans

![print and emailing your course plan](/images/blog/monplan-beta-and-v2018-0-0-release/1_rTmleTvN0k7GprbC0fIDSA.png)

That’s right, you’ve heard me. You can now print and email course plans to whoever you like (just don’t spam email your course advisor, our system will kick 👢you off and block 🛡️you).

### We’ve got you, our users.

It’s really great that most of our users are returning to us. That’s why we are dedicated to be as transparent as possible, whether it’s feature requests all the way to issues. We’ve got a new issue form over via [https://tinyurl.com/monplanissue](https://tinyurl.com/monplanissue) and a new Public 🌏tracking board over at Trello for you to monitor and see your issue! [https://trello.com/b/oYR5vu8S/public-bug-tracking-board](https://trello.com/b/oYR5vu8S/public-bug-tracking-board) 🐛For our delivery status visit: [https://stats.uptimerobot.com/OM9AOf2D0](https://stats.uptimerobot.com/OM9AOf2D0)

### Other Changes

- 2018 Units and Course Maps (really really minor, but whatever)
- Credit Points are displayed on the front of each unit to make it clearer about the weights of each unit.

---

### Notes to Developers

Here is some notes which may affect external systems

#### monPlan Prod API (JP Region, monplan-api-dev)

This service will become a dev environment, where we test out various new endpoints, all of this means that this application will not become our source of truth and may have a degraded service from time to time.

#### monPlan Dev API (JP Region, monplan-api-development)

This service will be suspended and shut down.

#### monPlan Prod AU API (AU Region, monplan-api-au-prod)

This is a new service, the API URI is [https://monplan-api-au-prod.appspot.com](https://monplan-api-au-prod.appspot.com) with same endpoints as the previous dev environment

#### monPlan Search API (AU Region, monplan-searchapi-prod)

This is a new service. Just send a POST request to [https://monplan-searchapi-prod.appspot.com](https://monplan-searchapi-prod.appspot.com) with a JSON object.

```
{
    search: // text: ,
    filter: // object: the object to search,
    from: 0 // integer,
    size: 30 // integer: number of results,
}
```
