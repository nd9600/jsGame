# jsGame

![](https://orig00.deviantart.net/bdc4/f/2010/182/2/b/cave___blind_pokemon_mapping_by_quilavaking.png)

* [The idea](#idea)
  * [Documentation](#documentation)
    * [Architecture](#architecture)

## Idea

- Two players
- Each player given 50 blocks & builds a maze, like the outer walls of the picture above
- Can see both mazes on the same screen
- Players try to get from the start of their maze to the end, and from the start of their opponent's to the end, **at the same time**
- **Can only move up/down/left/right, both characters move at the same time, you move entire way possible**
- You don't see your opponent's maze until both of you are finished making them

If
- you complete your maze & opponent doesn't, you get 10 points
- both complete a maze, you get 5 points
- neither complete a maze, you get 0 points
- you complete your opponent's maze & they don't, you get 20 points
---
- you don't complete your maze & opponent does, they get 20 points
- both complete your opponent's maze, they get 5 points
- neither complete your opponent's maze, thye get 0 points
- you don't complete your opponent's maze & they do, they get 10 points

## Documentation
### Architecture
The game is split up into a *Functional Core* and *Imperative Shell*, following Gary Bernhardt's [Boundaries talk](https://www.destroyallsoftware.com/talks/boundaries), which is similar to the [Hexagonal Architecture](https://github.com/jschairb/sandbox/wiki/HexagonalArchitecture) and [Ports and Adapters pattern](https://spin.atomicobject.com/2013/02/23/ports-adapters-software-architecture/) ideas.

* The Shell handles all user interaction, taking in input, passes it to the Core, and returns output to the screen
* The Core is given input from the Shell, makes decisions based on that input, and returns new data to the Shell to be displayed in whatever format the Shell wants.
