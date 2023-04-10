   ## Rabbithole Allowlist Creator

### About the project

Quickly create allowlists from rabbithole quest data to be imported to guild.xyz. The data for the allowlist will silently update in the background every 6 hours. This can be changed by updating the cron syntax in the cron.js file ```./lib/cron.js```

### Instructions
  - After cloning/forking the project, you will need to setup the .env file in the root of the app.
  - The .env file must include your alchemy key in this format ```ALCHEMY_KEY=insert your key here```
  - If you dont have an alchemy key, you can sign up for one at https://www.alchemy.com/
  
  To install dependencies:
  
```bash
npm install
```
  
  To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
