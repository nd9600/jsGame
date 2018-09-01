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

* The [Shell](https://github.com/nd9600/jsGame/tree/master/src/shell) handles all interaction, takes in input, passes it to the Core, and returns output to the screen
* The [Core](https://github.com/nd9600/jsGame/tree/master/src/core) is given input from the Shell, makes decisions based on that input, and returns new data to the Shell to be displayed in whatever format the Shell wants.
    * The Core is purely [functional](http://blog.jenkster.com/2015/12/what-is-functional-programming.html) - its output depends only on its input - with one exception; the [EventBus](#eventbus).
* The game's current state is represented by a [GameState](https://github.com/nd9600/jsGame/blob/master/src/core/GameState.ts).

### Events: how state is changed
In this game, the Shell receives input from somewhere (typically the user, but theoretically, it can be anywhere) and creates an [Event](https://github.com/nd9600/jsGame/tree/master/src/core/events) from it - normally an [InputEvent](https://github.com/nd9600/jsGame/blob/master/src/core/events/Game/InputEvent.ts)

Each Event has a [handle() method](https://github.com/nd9600/jsGame/blob/master/src/core/events/Movement/SuccessfulMovementEvent.ts#L18), which takes in a GameState, does something to it, and returns a new GameState. An Event can create and handle other events in turn, as the [InputEvent](https://github.com/nd9600/jsGame/blob/master/src/core/events/Game/InputEvent.ts) does.

### EventBus
