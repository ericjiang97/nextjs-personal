---
title: Supercharging your development environment on Visual Studio Code
author: Eric Jiang <eric@ericjiang.dev>
date: '2020-02-15T12:24:00+1100'
summary: Today, while browsing through Reddit I came upon a post where the user was talking about how he was talking to his Lyft driver. This reminded me of a conversation that I had with my taxi driver last year.
tags: ['development']
category: 'Technology'
---

Like many developers out there, Visual Studio Code (VSCode) is now my go to editor for almost everything (with the exception for Android Studio (for Android) and IntelliJ IDEA (for Java)). I really like customising my VSCode, so that it is easier for me to develop on.

## Shortcuts

There’s a lot of shortcuts that I use on a day to day basis within VSCode, the ones that I use the most include:

| Shortcut (macOS)                        | Description                       |
| --------------------------------------- | --------------------------------- |
| ⌘ (Command) + P                         | Quick Find                        |
| ⌘ (Command) + Shift + P                 | Command Palette                   |
| ^ (Control) + \`                        | Open Terminal                     |
| ⌥ (Option) + Shift + (Up or Down arrow) | Duplicate current line up or down |
| ⌥ (Option) + (Up or Down)               | Move current line up or down      |

There’s a lot more shortcut keys that I use, but those are the most common ones. The VSCode team also has some awesome key binding posters that you can print out and stick near your desk (I used to print these out with macOS on one side and Windows on the other and stick it around the office).

Windows: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf

macOS: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf

Linux: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf

## User Settings

There’s some neat settings that I always loved being enabled within my VSCode User Settings (globally).

The first one is Format on Save, with this enabled VSCode automatically formats the file you are working on, it picks up ESLint, TSLint and Prettier configs which is pretty neat.

The second one is the Terminal Font Family, if you customised ZSH like me, the default terminal sometimes doesn’t know what font to render your icons in your terminal in and you’ll end up with question marks in boxes.

The last one is Enable Commit Signing, this automatically uses the -S for your commits, (use this if you use GPG signing for your git commits!) and integrates nicely with VSCode’s inbuilt Git feature.

## Plugins

I always loved the customisability of VSCode with the community building many beautiful plugins (and language support!).

Excluding language based plugins such as C/C++, Dart, Python, etc. I usually add themes, formatters, and other tools that I use.

## Development Based

These plugins help me with my day-to-day use.

| Plugin   | Description                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| GitLens  | GitLens gives you the ability to see the history of the file, in addition to files. Also can use git blame more easily too! 🙈 |
| Polacode | Share your code by sending awesome screenshots!                                                                                |

Themes that I love using include Halcyon and One Dark Pro

There’s a lot more tips and tricks that I use for my VSCode, but they’re not really for everyone.

Thanks for reading this!
