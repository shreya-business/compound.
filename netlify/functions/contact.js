exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch(e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { email, firstName, lastName, company, service, message } = data;
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_CONTACT_KEY
      },
      body: JSON.stringify({
        email,
        listIds: [4],
        updateEnabled: true,
        attributes: {
          FIRSTNAME: firstName || '',
          LASTNAME: lastName || '',
          COMPANY: company || '',
          SERVICE_INTEREST: service || '',
          MESSAGE: (message || '').substring(0, 500)
        }
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (res.status === 400 && err.code === 'duplicate_parameter') {
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
      }
      return { statusCode: res.status, body: JSON.stringify({ error: err.message || 'Brevo error' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
