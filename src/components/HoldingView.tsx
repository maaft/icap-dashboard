import React, { useEffect, useState } from 'react';

import { Message } from 'semantic-ui-react';

import { Account } from '../generated-client';

type Props = {
    account?: Account
}

export default function AccountView( {account } : Props) {
 return  <Message>
 <Message.Header>Changes in Service</Message.Header>
 <p>
   We updated our privacy policy here to better service our customers. We
   recommend reviewing the changes.
 </p>
</Message>
}
