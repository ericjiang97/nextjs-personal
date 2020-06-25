---
title: Analysing COVID-19 Flights in Australia with Python.
author: Eric Jiang <eric@ericjiang.dev>
date: '2020-04-02T15:55:00+1000'
summary: I you all may have been aware over the past few months, the COVID-19 Coronavirus outbreak started spreading all over the world and into Australia. I’ve been tracking the Australian cases as it started to slowly climb the exponential curve, with most of the cases being imported (and still is) and now central way of keeping track of it. I decided to build a tool which captures this data source from various government websites.
tags: ['development']
category: 'Review'
---

As you all may have been aware over the past few months, the COVID-19 Coronavirus outbreak started spreading all over the world and into Australia. I’ve been tracking the Australian cases as it started to slowly climb the exponential curve, with most of the cases being imported (and still is) and now central way of keeping track of it. I decided to build a tool which captures this data source from various government websites.

The entire script is automated with Python, and runs every two hours. So the script automatically crawls through various Department of Health websites across the various states (cause this is reported by the states not the Federal Government) and collects certain data points, for example: the Airline, Flight Number, Origin, Destination and Close Contact Rows, Arrival Date.

Then the symptom onset date is calculated by adding 2 weeks onto the arrival date, this is the standard as defined by both the World Health Organisation (WHO) and the Australian Federal Department of Health.

After the data is collated and wrangled with a simple GitHub Action script, it commits it to the Frontend/Backend Repository to be served over Google App Engine. One of the more complex tasks is finding all the edge cases of how to parse the dates, airline – cause this is all manually updated by humans (Humans, smh. Am i right?) and is really error prone.

One of the things I love to do especially is making information more readable and organise it in a way so that people can read it and access it via one single location or source of truth.

You can try the app at https://covid19-flights.ericjiang.dev
