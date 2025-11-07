// Datei: web-frontend/sanity-client.js

import {createClient} from 'https://cdn.skypack.dev/@sanity/client'

export default createClient({
  // HIER DEINE PROJEKT-ID EINFÜGEN
  projectId: '2njambki', 
  dataset: 'production',
  apiVersion: '2024-03-11', // Heutiges Datum, um sicherzustellen, dass die API stabil bleibt
  useCdn: true, // Macht die Abfragen schneller
})