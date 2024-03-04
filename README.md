
# Ptero Share

Ptero Share is a Pterodactyl server allocator with a focus on ease of use for the end user. If you want to allow your friends and family to generate their own Pterodactyl servers without having to do it for them or setup a billing service, PteroShare might be the answer for you.


## Screenshots

![Dashboard showing server allocation and a list of servers](https://i.imgur.com/3fLYG6a.png)


## Features

- Display server capacity
- List user servers
- Responsive layout
- Discord authentication


## Roadmap

- API to create servers

- Validating new users prior to letting them use the service

- Pterodactyl Egg for hosting


## FAQ

#### What isnt Ptero Share?

Ptero Share is NOT a billing service. This project is simply meant to allow friends to create their own servers easily, on their own. No money, no subscriptions, just servers.

#### Will Ptero Share limit how many servers or resources a user can allocate?

Not yet. This project is developing as needed by my friends and I. Currently the honor system of "be mindful of resource usage" is enough for us. If this is needed in the future it will be added.

#### How do I host Ptero Share?

Currently just like any other node and react setup. I would like to make these hostable from the Pterodactyl Panel itself in the future.
## Environment Variables

To run this project, you will need to add the following environment variables 

#### api/.env

`PANEL_URL`

`PANEL_API_KEY`

`SUPABASE_URL`

`SUPABASE_KEY`

#### react/.env

`VITE_PANEL_URL`

`VITE_BASE_API_URL`

`VITE_SUPABASE_URL`

`VITE_SUPABASE_KEY` 

## Tech Stack

**Client:** React, TailwindCSS, shadcn, Supabase Auth

**Server:** Node, Express, Supabase Auth, Pterodactyl Panel API
