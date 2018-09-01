# jsGame

![](https://orig00.deviantart.net/bdc4/f/2010/182/2/b/cave___blind_pokemon_mapping_by_quilavaking.png)

* [The idea](#idea)
* [Documentation](#documentation)
    * [Architecture](#architecture)
    * [Events: how state is changed](#events)
        * [Benefits of using events](#benefits-of-using-events)
    * [EventBus](#eventbus)
    * [Testing](#testing)

# Idea

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

# Documentation
## Architecture
The game is split up into a **Functional Core and Imperative Shell**, following Gary Bernhardt's [Boundaries talk](https://www.destroyallsoftware.com/talks/boundaries), which is similar to the [Hexagonal Architecture](https://github.com/jschairb/sandbox/wiki/HexagonalArchitecture) and [Ports and Adapters pattern](https://spin.atomicobject.com/2013/02/23/ports-adapters-software-architecture/) ideas.

* The [Shell](https://github.com/nd9600/jsGame/tree/master/src/shell) handles all interaction, takes in input, passes it to the Core, and returns output to the screen. It will be written with Vue.
* The [Core](https://github.com/nd9600/jsGame/tree/master/src/core) is given input from the Shell, makes decisions based on that input, and returns new data to the Shell to be displayed in whatever format the Shell wants. It's written in Typescript.
    * The Core is purely [functional](http://blog.jenkster.com/2015/12/what-is-functional-programming.html) - its output depends only on its input - with one exception; the [EventBus](#eventbus).
* The game's current state is represented by a [GameState](https://github.com/nd9600/jsGame/blob/master/src/core/GameState.ts).

Simply, **the Core makes decisions, and the Shell applies those decisions**.
So far, the only library this really uses is [Ramda](https://ramdajs.com/), for nice functional Javascript.

## Events: how state is changed
In this game, the Shell receives input from somewhere (typically the user, but theoretically, it can be anywhere) and creates an [Event](https://github.com/nd9600/jsGame/tree/master/src/core/events) from it - normally an [InputEvent](https://github.com/nd9600/jsGame/blob/master/src/core/events/Game/InputEvent.ts).

Each Event has a [handle() method](https://github.com/nd9600/jsGame/blob/master/src/core/events/Movement/SuccessfulMovementEvent.ts#L18), which takes in a [GameState](https://github.com/nd9600/jsGame/blob/master/src/core/GameState.ts), does something to it, and returns a new GameState. An Event can create and handle other events in turn, as the [InputEvent](https://github.com/nd9600/jsGame/blob/master/src/core/events/Game/InputEvent.ts) does.

Events all have a `type: string` property, as well as their own `data: any` property, which can be overridden in a subclass to change its type.

When the `handle()` method is called is entirely up to the section of code that created the Event.

Every Event extends from a superclass Event - for example, a SuccessfulMovementEvent is a MovementEvent, which is an Event.

Events are the **only** way state is changed in the game. This is kinda like [Event Sourcing](https://eventstore.org/docs/event-sourcing-basics/) [[video here]](https://www.youtube.com/watch?v=8JKjvY4etTY) (but easier, because I don't really understand Event Sourcing), and has some [benefits]().

### Benefits of using Events
* Similar to [Vuex](https://vuex.vuejs.org/guide/), only changing the State inside Events means it is very easy to see where the State was changed.
* Like with Event Sourcing, Events can be [stored](https://eventstore.org/docs/event-sourcing-basics/events-as-a-storage-mechanism/index.html) and [played back](https://eventstore.org/docs/event-sourcing-basics/event-store-as-a-functional-database/index.html) at a later date very easily. You can see how this is done in [this test](https://github.com/nd9600/jsGame/blob/master/__tests__/Events/EventApplicationTest.ts), which uses the [EventRunner](https://github.com/nd9600/jsGame/blob/master/src/core/events/EventRunner.ts) to apply a list of Events and creates a final State that is exactly the same as if I had started playing a game with the web client, and pressed down and then left.
* The same list of Events can be processed in many different ways, and at different times, to produce different results. For example, a list with a particular input (like Up, Down, Up, Right, Left, Down) that created a bug at one point, can be replayed after the bug is fixed, to produce the same behaviour.
* Exporting and importing events is really easy, since an Event is just a `type` and a `data` property that can be encoded to JSON. This means a list of Events can be shown to a User, who can copy them somewhere, close the game, open the game again, import the list, and come back to exactly where they were before. This doesn't even need to be on the same machine!

## EventBus
When an [Event](#event) is created - **not** when it's handled - the event is [dispatched](https://github.com/nd9600/jsGame/blob/master/src/core/events/Event.ts#L17) to the [EventBus](https://github.com/nd9600/jsGame/blob/master/src/shell/EventBus.ts) that has been registered on the [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window), if it exists. This is the only linkage from the Core -> the Shell. Apart from this, the Shell creates and handles [Events](#events) using the Core. 

When an [Event](#event) is fired, it's sent to any listeners that have been [added](https://github.com/nd9600/jsGame/blob/master/src/shell/EventBus.ts#L24) to the EventBus. A listener, could, for example, shake the screen a bit or play a "bump" sound if someone tries to move up when they're right beside a wall, or it could just store them somehow. **Event listeners must not modify the State.**

An Event can be fired to multiple listeners at the same time, and one listener can listen to multiple types of Events. 

An Event is fired all the way up the chain - a SuccessfulMovementEvent is fired as aSuccessfulMovementEvent, a MovementEvent, and as the base Event.

## Testing
Because of the game's [architecture](#architecture), testing it is [really really easy](https://github.com/nd9600/jsGame/blob/master/__tests__/Board/BoardMovementTest.ts#L42). All I have to do is create an initial [GameState](https://github.com/nd9600/jsGame/blob/master/src/core/GameState.ts), call some function in the Core that returns an [Event](#event), and assert something about that Event's data. Nothing needs to be mocked or spied on.

The Core is very thoroughly tested, and the Shell doesn't need to be, because it's so simple - it just takes in user input, calls a function that makes all the decisions, and applies that decision.
