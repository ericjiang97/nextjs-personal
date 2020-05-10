---
title: Test Article
author: Eric Jiang <eric@ericjiang.dev>
date: '2019-07-10T10:00:00Z'
summary: Aliquam lobortis a quam ut vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius, dui in vehicula ullamcorper, augue nisi elementum sapien, at euismod tellus turpis a ligula. Phasellus nec urna velit. Nam vel tempor erat. Proin vel metus mattis tellus vulputate pretium a a sem. Duis at sem aliquam, suscipit lorem ut, venenatis enim. In at dui tempus lacus auctor commodo id id nunc.
---

This is a test article.

<!-- html block comment -->

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

---

Aliquam lobortis a quam ut vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius, dui in vehicula ullamcorper, augue nisi elementum sapien, at euismod tellus turpis a ligula. Phasellus nec urna velit. Nam vel tempor erat. Proin vel metus mattis tellus vulputate pretium a a sem. Duis at sem aliquam, suscipit lorem ut, venenatis enim. In at dui tempus lacus auctor commodo id id nunc. Nam sit amet lobortis libero. Aenean at nunc et purus fringilla consectetur. Sed nisi libero, gravida in eros ut, sodales condimentum ex.

_italics_

**bold**

~~strike~~

## Language Tests

```python
# print Hello World!

if __name__ == "__main__":
  print('Hello World')
```

```ts
// Refer to https://tools.ietf.org/html/rfc6265.html#section-4.1 for grammar

export default class CookieReader {
  /**
   * Attempts to obtain the value of the 'csrftoken' cookie (expected from
   * Django), and falls back to an empty string when one is not found.
   */
  static getCsrfToken(): string {
    const match = document.cookie.match(
      /csrftoken="?([\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*)"?/,
    );
    return match ? match[1] : '';
  }
}
```

```md
## Hello

### Markdown

#### in

##### Markdown
```

---

## Embeds

https://www.youtube.com/watch?v=dQw4w9WgXcQ

You should check out this [Google Cloud](https://cloud.google.com) video https://www.youtube.com/watch?v=AlSS3d9QHOk

https://twitter.com/ericjiang97/status/1247493010213855233

https://twitter.com/madebygoogle/status/1254802907402252292
