import React from 'react'
import { context, trace } from '@opentelemetry/api'

import { startSpan } from 'helpers/tracing'

import styles from './styles.module.scss'

interface Props {
  label: string
  id?: string
  onClick: () => void
}

export default (props: Props) => {
  const onClick = async () => {
    const singleSpan = startSpan(`'${props.label}' button clicked`)
    context.with(trace.setSpan(context.active(), singleSpan), async () => {
      props.onClick()
      singleSpan.end()
    })
  }

  return (
    <div>
      <button id={props.id} className={styles.button} onClick={onClick}>
        {props.label}
      </button>
    </div>
  )
}
