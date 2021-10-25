import React from 'react'
import styled from 'styled-components'

import useLang from '../../hooks/useLang'

const ActivityWrapper = styled.div`
  @media (min-width: 768px) {
    display: inline-block;
    width: 50%;
  }
`

const Activity = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
`

const ActivityNumber = styled.h6`
  width: 20px;
  margin-right: 20px;
  text-align: left;
  color: ${({ theme }) => theme.gray};
`

const ActivityName = styled.h6``

export default function ActivityItem({ activity, index }) {
  const { lang } = useLang()

  return (
    <ActivityWrapper>
      <Activity key={activity.titolo[lang]}>
        <ActivityNumber>{`${index + 1 <= 9 ? 0 : ''}${
          index + 1
        }`}</ActivityNumber>
        <ActivityName>{activity.titolo[lang]}</ActivityName>
      </Activity>
    </ActivityWrapper>
  )
}
