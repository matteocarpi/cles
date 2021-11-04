/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const SEND_EMAIL = gql`
  mutation SendEmail($email: String!, $body: String!, $from: String!) {
    sendEmail(
      input: {
        replyTo: $email
        subject: "Message from CLES Website"
        body: $body
        from: $from
      }
    ) {
      message
      origin
      replyTo
      sent
      to
    }
  }
`
