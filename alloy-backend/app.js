const express = require('express')
const bodyParser = require("body-parser");

const sdk = require('api')('@alloy-public/v1.0#qzpq7nl9iv368f');
const fetch = require('node-fetch');
var cors = require('cors');

const app = express()
const port = 3001

app.use(cors());
app.use(express.json())

const tokenSecret = `${process.env.TOKEN}:${process.env.SECRET}`
const AUTH_TOKEN = `Basic ${btoa(tokenSecret)}`

const submitEvaluation = ({
  nameFirst,
  nameLast,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressPostalCode,
  addressCountryCode,
  documentSsn,
  emailAddress,
  birthDate
}) => {
  const url = 'https://sandbox.alloy.co/v1/evaluations';

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: AUTH_TOKEN
    },
    body: JSON.stringify({
      name_first: nameFirst,
      name_last: nameLast,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      address_city: addressCity,
      address_state: addressState,
      address_postal_code: addressPostalCode,
      address_country_code: addressCountryCode,
      document_ssn: documentSsn,
      email_address: emailAddress,
      birth_date: new Date(birthDate).toISOString()
    })
  };

  return fetch(url, options)
  .then(res => res.json())
  .then(data => {
    const {
      error,
      evaluation_token
    } = data

    return { evaluationToken: evaluation_token, error }
   })
  .catch(err => {
    console.log('inhere', err.body)
  });
}

const viewEvaluation = (evaluationToken) => {
  const url = `https://sandbox.alloy.co/v1/evaluations/${evaluationToken}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: AUTH_TOKEN
    }
  };

  return fetch(url, options)
  .then(res => res.json())
  .then(data => {
    const {
      summary
    } = data

    if (summary['outcome'] == 'Manual Review') {
      const { supplied } = data 
      return { summary, supplied }
    } else {
      const { summary } = data
      return { summary }
    }

   })
  .catch(err => {
    console.log('error', err.body)
  });

}

app.post('/evaluate', async (req, res) => {
  const {
    nameFirst,
    nameLast,
    addressLine1,
    addressLine2,
    addressCity,
    addressState,
    addressPostalCode,
    addressCountryCode,
    documentSsn,
    emailAddress,
    birthDate
   } = req.body

  const { evaluationToken, error } = await submitEvaluation({ 
    nameFirst,
    nameLast,
    addressLine1,
    addressLine2,
    addressCity,
    addressState,
    addressPostalCode,
    addressCountryCode,
    documentSsn,
    emailAddress,
    birthDate
  })

  if (error == null) {
    const evaluation = await viewEvaluation(evaluationToken)
    res.send(evaluation)
  } else {
    res.send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})