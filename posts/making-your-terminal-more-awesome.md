---
title: Making your terminal more awesome
author: Eric Jiang <eric@ericjiang.dev>
date: '2020-02-07T13:56:00+1000'
summary: I use my terminal 90-100% of the time whenever I’m on my MacBook Pro and like many other developers I really like customising my terminal so that it helps me with my workflow.
tags: ['tech']
---

I use my terminal 90-100% of the time whenever I’m on my MacBook Pro and like many other developers I really like customising my terminal so that it helps me with my workflow.

I started using ZSH before Apple released it as the default shell in macOS Catalina, alongside with iTerm2. This combination was mainly done with Oh-My-ZSH and iTerm2. Recently I discovered PowerLevel10k which basically does the same thing as powerlevel9k but waaaaaaayyyy faster.

So here’s a guide on how to set it up

## Step 1. Installing oh-my-zsh and iTerm2.

This step is fairly straight forward simply following the instructions at Oh-my-Zsh and you can install it, or you can just copy the install script below (installs via curl)

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

iTerm2 is more straightforward, simply visit the website and just drag-n-drop it into your applications folder.

## Step 2. Setup powerlevel10k

Now you can install powerlevel10k, simply visit the site: https://github.com/romkatv/powerlevel10k#oh-my-zsh

Now follow the prompts and you should have a new and awesome tool!
