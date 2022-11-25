# PorPlanner_Automation_Challenge
Here you will find automated tests implemented with playwright and JavaScript.

## Introduction

Playwright works similarly to other testing frameworks (Selenium, Cypress); it launches the actual application and mimics the actions a user would do, clicking on elements, writing things in text inputs, going through different flows. Assertions are added to make sure the expected results happen in the UI - for example, the opening of a panel or changing a label.

## Table of contents

* [Getting started](#getting-started)
* [Running tests](#running-tests)
* [Running specific tests](#running-specific-tests)

## Getting Started

To get started, you need to install the local dependencies using yarn:

``` bash
# install and link project dependencies
yarn install
```
## Running tests

run the entire test suite of a project

```bash
yarn test:e2e
```

## Running specific tests

run a specific test suite

```bash
yarn playwrith test <TEST_PATH>
```