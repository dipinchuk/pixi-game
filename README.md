## Description

Test project for the Game Developer position at DidgiCode. The goal is to assess my skills in **PixiJS**, a 2D rendering engine for creating interactive games and multimedia applications.

In response to the job vacancy, I eagerly express my commitment to mastering the necessary tech stack. As a demonstration of my dedication, I added an animation to the company name at the beginning of this document. I sourced the code from the [website](https://codemyui.com/text-reveal-animation-using-threejs/), where I learned how to create a text reveal animation using **Three.js**. _I aimed to showcase my eagerness to continuously expand my skills and knowledge to meet the requirements of this position._

## Demo

[DEMO LINK](https://pixi-test-task.vercel.app/)

## Installation

1. Clone this repository.
```
git clone https://github.com/dipinchuk/pixi-test-task.git
```
3. Install dependencies using command `npm i` from project root folder.
4. Run localhost with `npm start`

## Functionality

[TASK](https://docs.google.com/document/d/1IDo_wB9WxgOAZXlxsPwhRZsxp-rshoRjAw0f_NIwZ_s/edit?usp=sharing)

Completed:

- [x] Generated falling shapes from top to bottom.
- [x] Initialized shapes outside the upper boundary and with random X positions along the top edge of the rectangle.
- [x] Ensured that the lower position of shapes is outside the lower boundary of the rectangle.
- [x] Concealed parts of shapes that extend beyond the rectangle.
- [x] Managed gravity, quantity and time settings, allowing the increase or decrease of gravity values through buttons and input.
    - [x] The initial state of gravity is 1, minimum value at which the decrease button is disabled.
    - [x] The initial state of quantity is 1 shape per second, minimum value at which the decrease button is disabled.
    - [x] The initial state of time is 3000 seconds to show timer in work, minimum value is 1000, at which the decrease button is disabled.
    - [x] Restricted input fields to accept only numbers. Disabled input for values less than the specified minimum.
- [x] Displayed the total count of shapes that have appeared.
- [x] Implemented a timer to count seconds up to the time interval, with a specific number of shapes appearing in each cycle.
- [x] Allowed the selection of shapes and colors to generate at the bottom of the rectangle.
    - [x] Generated random shapes from a predefined list (3 sides, 4 sides, 5 sides, 6 sides, circle, ellipse, star) with random colors from a predefined list (5 grey colors).
    - [x] By default, All is selected along with all buttons.
    - [x] If you deselect at least one shape, All is automatically deselected and becomes active.
    - [x] If at least one shape is not selected and you press All, all shapes become selected along with All, but All becomes disabled, while the rest do not.
    - [x] It is impossible to cancel the selection of all shapes; at least one must be selected. If All is enabled, it should be disabled. If only one selected shape remains, it should also be deactivated until at least one other shape is selected.
    - [x] 5. If you select the last inactive shape, All should become enabled but disabled (the same as by default).
- [x] Added removal of shapes when clicked on it and addition shapes when clicked on epmty space.
- [x] Added two text fields in the upper-left corner to display the number of visible shapes and the total area they occupy.
- [x] Ensured mobile version.

In progress:

- [ ] Generate irregular shape when clicked on epmty space.
- [ ] Add the ability to choose between normal and angled shape falling.
- [ ] Add the ability to adjust shape size.

## Screenshots
![interface scheme](https://github.com/dipinchuk/pixi-test-task/blob/main/src/assets/2023-10-19%2015%2019%2016.png)

---

![interface scheme](https://github.com/dipinchuk/pixi-test-task/blob/main/src/assets/2023-10-19%2015%2019%2023.png)

---

![interface scheme](https://github.com/dipinchuk/pixi-test-task/blob/main/src/assets/2023-10-19%2015%2019%2031.png)

---
![interface scheme](https://github.com/dipinchuk/pixi-test-task/blob/main/src/assets/2023-10-19%2015%2019%2056.png)
