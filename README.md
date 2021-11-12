# ticketing-microservices
A microservices application where users can buy and sell their movie tickets.

## About
- Users can list a ticket for an event (concert, sports) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is 'locked' for 15 minutes. The user has 15 minutes to enter their payment info
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should 'unlock'
- Ticket prices can be edited if they are not locked

## Running locally
- First you will have to install Docker (https://www.docker.com/)
- After that enable Kubernetes by goind in to your Docker settings
- Install Skaffold (https://skaffold.dev/docs/install/), a tool for pushing docker images while development
- Make sure that skaffold is installed by running `skaffold version`
- Now start project by running `skaffold dev`
