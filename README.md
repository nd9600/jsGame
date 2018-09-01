# jsGame

![](https://orig00.deviantart.net/bdc4/f/2010/182/2/b/cave___blind_pokemon_mapping_by_quilavaking.png)

* [The idea](#idea)
* [Documentation](#documentation)
    * [Architecture](#architecture)
    * [Events: how state is changed](#events)
        * [Benefits of using events](#benefits-of-using-events)
    * [EventBus](#eventbus)

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
In this game, the Shell receives input from somewhere (typically the user, but theoretically, it can be anywhere) and creates an [Event](https://github.com/nd9600/jsGame/tree/master/src/core/events) from it - normally an [InputEvent](https://github.com/nd9600/jsGame/blob/master/src/core/events/Game/InputEvent.ts).

Each Event has a [handle() method](https://github.com/nd9600/jsGame/blob/master/src/core/events/Movement/SuccessfulMovementEvent.ts#L18), which takes in a GameState, does something to it, and returns a new GameState. An Event can create and handle other events in turn, as the [InputEvent](https://github.com/nd9600/jsGame/blob/master/src/core/events/Game/InputEvent.ts) does.

When the `handle()` method is called is entirely up to the section of code that created the Event.

Every Event extends from a parent type of Event - for example, a SuccessfulMovementEvent is a MovementEvent, which is an Event.

Events are the **only** way state is changed in the game. This is kinda like [Event Sourcing](https://eventstore.org/docs/event-sourcing-basics/) [[video here]](https://www.youtube.com/watch?v=8JKjvY4etTY) (but easier, because I don't really understand Event Sourcing), and has some [benefits]().

#### Benefits of using Events
[EventRunner](https://github.com/nd9600/jsGame/blob/master/src/core/events/EventRunner.ts).

### EventBus

When an [Event](#event) is created - **not** when it's handled - the event is [dispatched](https://github.com/nd9600/jsGame/blob/master/src/core/events/Event.ts#L17) to the [EventBus](https://github.com/nd9600/jsGame/blob/master/src/shell/EventBus.ts) that has been registered on the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window), if it exists. This is the only linkage from the Core -> the Shell. Apart from this, the Shell creates and handles [Events](#events) using the Core.

When an [Event](#event) is fired, it's sent to any listeners that have been [added](https://github.com/nd9600/jsGame/blob/master/src/shell/EventBus.ts#L24) to the EventBus. 

An Event can be fired to multiple listeners at the same time, and one listener can listen to multiple types of Events. 

An Event is fired all the way up the chain - a SuccessfulMovementEvent is fired as aSuccessfulMovementEvent, a MovementEvent, and as the base Event.
