
export const  evaluateUser = async ({
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
  birthDate,
}) => {
  return fetch('http://localhost:3001/evaluate', {
    method: 'POST',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({ 
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
  }).then(res => res.json())
}